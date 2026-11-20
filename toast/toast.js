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
 class PinballToast extends Base {
  static observedAttributes=['message','variant','duration','disabled'];
  static css=':host{display:block;min-width:230px}.shell{display:flex;align-items:center;gap:10px;border-left:4px solid #d08a27;background:#fffdf7;padding:10px 12px;border-radius:8px;box-shadow:0 5px 16px #38271320}.shell[hidden]{display:none}.message{flex:1}.close{border:0;background:transparent;font-size:18px}.mark{width:10px;height:10px;border-radius:50%;background:#d08a27}.shell[data-variant=success]{border-color:#59875e}.shell[data-variant=error]{border-color:#b3322b}.shell[data-variant=error] .mark{background:#b3322b}.trigger{border:1px solid #9f6a2a;border-radius:8px;background:#f0ca88;padding:7px 11px}';
  render(){return '<div class="machine"><button class="trigger" type="button">Show notification</button><div class="shell" role="status" aria-live="polite" hidden><span class="mark"></span><span class="message"></span><button type="button" class="close" aria-label="Dismiss">×</button></div></div>'}
  setup(){this.panel=this.$('.shell');this.message=this.$('.message');this.$('.trigger').addEventListener('click',()=>this.show(this.getAttribute('message')||'Saved successfully'));this.$('.close').addEventListener('click',()=>this.dismiss());this.update()}
  update(){if(!this.panel)return;this.message.textContent=this.getAttribute('message')||'Notification';this.panel.dataset.variant=this.getAttribute('variant')||'info';}
  show(message,duration){this.message.textContent=message||this.getAttribute('message')||'Notification';this.panel.dataset.variant=this.getAttribute('variant')||'info';this.panel.hidden=false;clearTimeout(this.timer);const ms=duration===undefined?Number(this.getAttribute('duration')||3500):Number(duration);if(ms>0)this.timer=setTimeout(()=>this.dismiss(),ms);this.emit('show',{message:this.message.textContent})}
  dismiss(){if(!this.panel||this.panel.hidden)return;this.panel.hidden=true;clearTimeout(this.timer);this.emit('dismiss',{})}
  attributeChangedCallback(){if(this.ready)this.update()}
 }
 if(!customElements.get('pinball-toast'))customElements.define('pinball-toast',PinballToast);
})();
