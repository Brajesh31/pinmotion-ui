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
 class PinballSelect extends Base {
  static formAssociated=true; static observedAttributes=['options','value','label','disabled'];
  static css=':host{width:min(280px,90vw)}.field{display:grid;gap:6px}.select{width:100%;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;padding:9px 11px;color:#28231d}';
  render(){return '<div class="machine field"><label class="label" for="select"></label><select class="select" id="select"></select></div>'}
  setup(){this.selectEl=this.$('select');this.options=this.parse();this.$('label').textContent=this.getAttribute('label')||'Choose';this.draw();this.selectEl.addEventListener('change',()=>{this._value=this.selectEl.value;this.syncForm();this.emit('change',{value:this.value,label:this.options.find(o=>o.value===this.value)?.label||''})})}
  parse(){return (this.getAttribute('options')||'basic:Basic;pro:Professional;team:Team').split(';').map(x=>{const p=x.trim().split(':');return{value:p[0],label:p[1]||p[0]}})}
  get value(){return this._value||''} set value(v){this._value=String(v);if(this.selectEl)this.selectEl.value=this._value;this.syncForm()} formValue(){return this.value}
  draw(){if(!this.selectEl)return;this._value=this.getAttribute('value')||this._value||this.options[0]?.value||'';this.selectEl.innerHTML=this.options.map(o=>'<option value="'+esc(o.value)+'">'+esc(o.label)+'</option>').join('');this.selectEl.value=this._value;this.$('label').textContent=this.getAttribute('label')||'Choose'}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='options'){this.options=this.parse();this.draw()}else if(n==='value'){this._value=v||'';this.draw()}else if(n==='label')this.$('label').textContent=v||'Choose';this.syncForm()}
 }
 if(!customElements.get('pinball-select'))customElements.define('pinball-select',PinballSelect);
})();
