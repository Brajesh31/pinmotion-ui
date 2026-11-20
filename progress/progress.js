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
 const {Base,clamp}=window.PinmotionExtras;
 class PinballProgress extends Base {
  static observedAttributes=['value','max','label','indeterminate'];
  static css=':host{width:min(320px,90vw)}.track{height:14px;border:1px solid #aaa08f;border-radius:99px;background:#ded6c9;padding:2px;overflow:hidden}.fill{height:100%;width:0;border-radius:99px;background:repeating-linear-gradient(110deg,#d68b2e 0 9px,#f1bd64 9px 16px);transition:width .18s}.track[aria-busy=true] .fill{width:38%;animation:travel 1s ease-in-out infinite alternate}@keyframes travel{to{transform:translateX(160%)}}.value{font-variant-numeric:tabular-nums;color:#71695f;font-size:12px}';
  render(){return '<div class="machine"><div class="row" style="justify-content:space-between"><span class="label"></span><span class="value"></span></div><div class="track" role="progressbar"><div class="fill"></div></div></div>'}
  setup(){this.track=this.$('.track');this.fill=this.$('.fill');this.valueText=this.$('.value');this.update()}
  get value(){return Number(this.getAttribute('value')||0)} set value(v){this.setAttribute('value',String(v))} get max(){return Math.max(0,Number(this.getAttribute('max')||100))}
  update(){if(!this.track)return;const ind=this.hasAttribute('indeterminate'),v=clamp(this.value,0,this.max||100),pct=this.max?100*v/this.max:0;this.$('.label').textContent=this.getAttribute('label')||'Progress';this.track.setAttribute('aria-valuemin','0');this.track.setAttribute('aria-valuemax',String(this.max));if(ind){this.track.removeAttribute('aria-valuenow');this.track.setAttribute('aria-busy','true');this.valueText.textContent='Working'}else{this.track.setAttribute('aria-valuenow',String(v));this.track.removeAttribute('aria-busy');this.fill.style.width=pct+'%';this.valueText.textContent=Math.round(pct)+'%'}}
  attributeChangedCallback(){if(this.ready)this.update()}
 }
 if(!customElements.get('pinball-progress'))customElements.define('pinball-progress',PinballProgress);
})();
