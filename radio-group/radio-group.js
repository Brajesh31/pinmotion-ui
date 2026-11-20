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
 const {Base,esc}=window.PinmotionExtras;
 class PinballRadioGroup extends Base {
  static formAssociated=true; static observedAttributes=['options','value','label','disabled'];
  static css='.choices{display:grid;gap:6px}.choice{display:flex;align-items:center;gap:9px;text-align:left;border:1px solid #c8bdad;border-radius:9px;background:#fffcf5;padding:9px 11px}.dot{width:16px;height:16px;border:2px solid #8d8578;border-radius:50%;display:grid;place-items:center}.dot:after{content:"";width:7px;height:7px;border-radius:50%;background:#bf741e;transform:scale(0)}.choice[aria-checked=true]{border-color:#be7b2b;background:#f9ebd1}.choice[aria-checked=true] .dot:after{transform:scale(1)}';
  render(){return '<div class="machine"><div class="label" id="label"></div><div class="choices" role="radiogroup"></div></div>'}
  setup(){this.group=this.$('.choices');this.options=this.parse();this._value=this.getAttribute('value')||this.options[0]?.value||'';this.$('#label').textContent=this.getAttribute('label')||'Choose one';this.draw();this.group.addEventListener('click',e=>{const b=e.target.closest('button[data-value]');if(b)this.select(b.dataset.value,true)});this.group.addEventListener('keydown',e=>{const keys=['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'];if(keys.includes(e.key)){e.preventDefault();const dir=e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1;const i=this.options.findIndex(o=>o.value===this.value);const n=this.options[(i+dir+this.options.length)%this.options.length];this.select(n.value,true);[...this.group.querySelectorAll('button')].find(x=>x.dataset.value===this.value)?.focus()}else if(e.key==='Home'||e.key==='End'){e.preventDefault();this.select(this.options[e.key==='Home'?0:this.options.length-1].value,true)}})}
  parse(){return (this.getAttribute('options')||'standard:Standard;pro:Pro;team:Team').split(';').map(x=>x.trim()).filter(Boolean).map(x=>{const p=x.split(':');return{value:p[0].trim(),label:(p.slice(1).join(':')||p[0]).trim()}})}
  draw(){this.group.innerHTML=this.options.map(o=>'<button type="button" class="choice" role="radio" data-value="'+esc(o.value)+'" aria-checked="'+(o.value===this.value)+'"><span class="dot"></span><span>'+esc(o.label)+'</span></button>').join('')}
  get value(){return this._value||''} set value(v){this.select(String(v),false)} formValue(){return this.value||null}
  select(v,user){if(!this.options.some(o=>o.value===v)||this._value===v)return;this._value=v;this.draw();this.syncForm();if(user)this.emit('change',{value:v})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='options'){this.options=this.parse();if(!this.options.some(x=>x.value===this._value))this._value=this.options[0]?.value||'';this.draw()}else if(n==='value'){this._value=v||'';this.draw()}else if(n==='label')this.$('#label').textContent=v||'Choose one';this.syncForm()}
 }
 if(!customElements.get('pinball-radio-group'))customElements.define('pinball-radio-group',PinballRadioGroup);
})();
