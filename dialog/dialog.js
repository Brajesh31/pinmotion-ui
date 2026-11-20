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
 const {Base}=window.PinmotionExtras;
 class PinballDialog extends Base {
  static observedAttributes=['open','label','disabled'];
  static css=':host{display:inline-block}.launch{border:1px solid #9f6a2a;border-radius:9px;background:linear-gradient(#f8d99d,#e4af5d);padding:8px 13px;font-weight:750}.backdrop::backdrop{background:#211a12a8;backdrop-filter:blur(2px)}dialog{width:min(440px,calc(100vw - 32px));border:1px solid #b6a48d;border-radius:16px;background:#f8f2e8;color:#29241e;padding:0;box-shadow:0 20px 70px #0005}header{padding:16px 18px 10px;border-bottom:1px solid #ddd0bd;font-weight:800;font-size:16px}section{padding:18px;min-height:50px}footer{display:flex;justify-content:flex-end;gap:8px;padding:0 18px 16px}button{border:1px solid #b7aa97;border-radius:8px;padding:7px 12px;background:#fffaf1}';
  render(){return '<button type="button" class="launch">Open dialog</button><dialog class="backdrop" aria-modal="true"><header><slot name="title">Dialog title</slot></header><section><slot></slot></section><footer><button type="button" class="close">Close</button></footer></dialog>'}
  setup(){this.dialog=this.$('dialog');this.$('.launch').addEventListener('click',()=>this.showModal());this.$('.close').addEventListener('click',()=>this.close());this.dialog.addEventListener('close',()=>{this.removeAttribute('open');this.emit('close',{})});this.dialog.addEventListener('cancel',()=>this.emit('cancel',{}));if(this.hasAttribute('open'))this.showModal()}
  get open(){return !!this.dialog?.open}
  showModal(){if(!this.dialog||this.open)return;try{this.dialog.showModal();this.setAttribute('open','');this.emit('open',{})}catch{}}
  close(){if(this.dialog?.open)this.dialog.close()}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v||n!=='open'||!this.dialog)return;if(v!==null)this.showModal();else if(this.dialog.open)this.dialog.close()}
 }
 if(!customElements.get('pinball-dialog'))customElements.define('pinball-dialog',PinballDialog);
})();
