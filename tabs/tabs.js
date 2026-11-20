(() => {
  if (window.PinmotionExtras) return;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));
  const safeURL = (value) => { const s=String(value||'').trim(); return /^(https?:|mailto:|tel:|\/|#|\.\/|\.\.\/)/i.test(s) ? s : '#'; };
  const baseCSS = ':host{display:inline-block;vertical-align:middle;color:#28231d;font:14px/1.45 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--pui-bg:#f7f2e8;--pui-ink:#28231d;--pui-dim:#776e62;--pui-line:#c9bead;--pui-amber:#c9700f;--pui-red:#b3322b;--pui-focus:#d18420}*{box-sizing:border-box}button,input,textarea,select{font:inherit}button{color:inherit;cursor:pointer}button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--pui-focus);outline-offset:3px}:host([disabled]){opacity:.58}.machine{border:1px solid var(--pui-line);border-radius:14px;background:linear-gradient(155deg,#fffdf8,#eee5d5);box-shadow:inset 0 1px #fff,0 3px 8px #38271312;padding:12px}.label{display:block;color:var(--pui-dim);font-size:11px;font-weight:750;letter-spacing:.12em;text-transform:uppercase;margin:0 0 7px}.control{border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;color:var(--pui-ink);min-height:36px;padding:7px 10px}.action{border:1px solid #9f6a2a;border-radius:9px;background:linear-gradient(#f8d99d,#e4af5d);font-weight:700;padding:8px 13px;box-shadow:inset 0 1px #fff8,0 2px 0 #9e6b31}.action:active{transform:translateY(1px);box-shadow:inset 0 1px #fff8,0 1px 0 #9e6b31}.muted{color:var(--pui-dim)}.lamp{display:inline-block;width:8px;height:8px;border-radius:50%;background:#b9b3a8;box-shadow:inset 0 1px 2px #0003}.lamp.on{background:#efa42c;box-shadow:0 0 9px #e89b2e99,inset 0 1px #fff9}.row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.hidden{display:none!important}';
  class Base extends HTMLElement {
    constructor(){super();this.root=this.attachShadow({mode:'open',delegatesFocus:true});try{if(this.constructor.formAssociated)this.internals=this.attachInternals()}catch{this.internals=null}}
    connectedCallback(){if(!this.ready){this.ready=true;this.root.innerHTML='<style>'+baseCSS+(this.constructor.css||'')+'</style>'+this.render();this.setup();this._disabledObserver=new MutationObserver(()=>this.syncDisabled());this._disabledObserver.observe(this,{attributes:true,attributeFilter:['disabled']})}this.syncDisabled();this.syncForm()}
    disconnectedCallback(){if(this._disabledObserver)this._disabledObserver.disconnect()}
    $(s){return this.root.querySelector(s)}
    emit(type,detail={}){this.dispatchEvent(new CustomEvent(type,{bubbles:true,composed:true,detail}))}
    syncDisabled(){this.inert=this.hasAttribute('disabled');this.syncForm()}
    syncForm(){if(!this.internals||typeof this.formValue!=='function')return;try{this.internals.setFormValue(this.hasAttribute('disabled')?null:this.formValue())}catch{}}
    formDisabledCallback(disabled){this.inert=!!disabled||this.hasAttribute('disabled')}
    render(){return ''} setup(){}
  }
  window.PinmotionExtras=Object.freeze({Base,esc,clamp,safeURL,baseCSS});
})();
(() => {
 const {Base,esc,clamp}=window.PinmotionExtras;
 class PinballTabs extends Base {
  static observedAttributes=['labels','active','label','disabled'];
  static css=':host{display:block;min-width:230px}.tabs{display:flex;gap:3px;border-bottom:1px solid #c8bdad}.tab{border:0;border-bottom:3px solid transparent;background:transparent;padding:9px 12px;font-weight:650;color:#766d62}.tab[aria-selected=true]{color:#8b5014;border-color:#d18b2e}.panel{padding:12px 4px;min-height:42px;color:#403a32}';
  render(){return '<div class="machine"><div class="tabs" role="tablist"></div><div class="panel" role="tabpanel"><slot name="panel-0"></slot></div></div>'}
  setup(){this.labels=this.parse();this._active=clamp(this.getAttribute('active')||0,0,this.labels.length-1);this.draw();this.$('.tabs').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)this.select(Number(b.dataset.index),true)});this.$('.tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?this.labels.length-1:(this.activeIndex+(e.key==='ArrowRight'?1:-1)+this.labels.length)%this.labels.length;this.select(n,true);this.$('[data-index="'+n+'"]').focus()})}
  parse(){return (this.getAttribute('labels')||'Overview,Details,History').split(',').map(x=>x.trim()).filter(Boolean).slice(0,8)}
  get activeIndex(){return this._active} set activeIndex(v){this.select(Number(v),false)}
  draw(){if(!this.$('.tabs'))return;this.$('.tabs').innerHTML=this.labels.map((l,i)=>'<button type="button" class="tab" role="tab" id="tab-'+i+'" aria-controls="panel-'+i+'" aria-selected="'+(i===this.activeIndex)+'" tabindex="'+(i===this.activeIndex?0:-1)+'" data-index="'+i+'">'+esc(l)+'</button>').join('');const p=this.$('.panel');p.id='panel-'+this.activeIndex;p.setAttribute('aria-labelledby','tab-'+this.activeIndex);p.innerHTML='<slot name="panel-'+this.activeIndex+'"></slot>'}
  select(i,user){const n=clamp(Math.round(i),0,this.labels.length-1);if(n===this.activeIndex)return;this._active=n;this.setAttribute('active',String(n));this.draw();if(user)this.emit('change',{activeIndex:n,label:this.labels[n]})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='labels')this.labels=this.parse();if(n==='active')this._active=clamp(v||0,0,(this.labels||[]).length-1);if(n==='label')this.$('.tabs')?.setAttribute('aria-label',v||'Tabs');this.draw()}
 }
 if(!customElements.get('pinball-tabs'))customElements.define('pinball-tabs',PinballTabs);
})();
