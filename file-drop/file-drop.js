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
 class PinballFileDrop extends Base {
  static observedAttributes=['accept','multiple','label','disabled'];
  static css=':host{width:min(340px,90vw)}.drop{border:2px dashed #b8a78f;border-radius:12px;background:#fbf5e9;text-align:center;padding:18px 14px}.drop[data-over=true]{border-color:#c47c24;background:#f8e8ca}.icon{font-size:24px;color:#ad6c20}.choose{border:1px solid #9f6a2a;border-radius:8px;background:#f2cc8e;padding:7px 11px;font-weight:700}.files{font-size:12px;color:#675e53;margin-top:8px;overflow-wrap:anywhere}';
  render(){return '<div class="machine"><div class="drop" tabindex="0" role="button" aria-label="Choose files"><div class="icon">⬆</div><div class="label"></div><button type="button" class="choose">Browse files</button><input type="file" hidden><div class="files"></div></div></div>'}
  setup(){this.zone=this.$('.drop');this.input=this.$('input');this.$('.label').textContent=this.getAttribute('label')||'Drop files here or browse';this.apply();this.$('.choose').addEventListener('click',()=>this.input.click());this.zone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();this.input.click()}});this.input.addEventListener('change',()=>this.setFiles(this.input.files));this.zone.addEventListener('dragover',e=>{e.preventDefault();this.zone.dataset.over='true'});this.zone.addEventListener('dragleave',()=>delete this.zone.dataset.over);this.zone.addEventListener('drop',e=>{e.preventDefault();delete this.zone.dataset.over;this.setFiles(e.dataTransfer.files)})}
  apply(){if(!this.input)return;this.input.accept=this.getAttribute('accept')||'';this.input.multiple=this.hasAttribute('multiple')}
  get files(){return this._files||[]}
  setFiles(list){this._files=Array.from(list||[]);this.$('.files').textContent=this.files.length?this.files.map(f=>f.name+' ('+Math.ceil(f.size/1024)+' KB)').join(', '):'No files selected';this.emit('change',{files:this.files})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='accept'||n==='multiple')this.apply();if(n==='label')this.$('.label').textContent=v||'Drop files here or browse'}
 }
 if(!customElements.get('pinball-file-drop'))customElements.define('pinball-file-drop',PinballFileDrop);
})();
