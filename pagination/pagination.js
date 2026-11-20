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
 class PinballPagination extends Base {
  static observedAttributes=['pages','page','label','disabled'];
  static css=':host{display:inline-block}.pages{display:flex;align-items:center;gap:4px;flex-wrap:wrap}.page,.nav{min-width:34px;height:34px;border:1px solid #c9bead;border-radius:8px;background:#fffdf7}.page[aria-current=page]{background:linear-gradient(#f7d99e,#e5b45f);border-color:#ab6d21;font-weight:800}.nav:disabled,.page:disabled{opacity:.4;cursor:not-allowed}.ellipsis{padding:0 4px;color:#756b60}';
  render(){return '<nav class="pages" aria-label="Pagination"></nav>'}
  setup(){this._page=clamp(this.getAttribute('page')||1,1,this.pages);this.draw();this.$('nav').addEventListener('click',e=>{const b=e.target.closest('button[data-page]');if(b)this.setPage(Number(b.dataset.page),true)})}
  get pages(){return clamp(this.getAttribute('pages')||10,1,1000)}
  get page(){return this._page} set page(v){this.setPage(Number(v),false)}
  draw(){const nav=this.$('nav');if(!nav)return;nav.setAttribute('aria-label',this.getAttribute('label')||'Pagination');const nums=new Set([1,this.pages,this.page-1,this.page,this.page+1]);const list=[...nums].filter(n=>n>=1&&n<=this.pages).sort((a,b)=>a-b);let last=0,html='<button class="nav" data-page="'+(this.page-1)+'" '+(this.page<=1?'disabled':'')+' aria-label="Previous page">‹</button>';for(const n of list){if(n-last>1)html+='<span class="ellipsis" aria-hidden="true">…</span>';html+='<button class="page" data-page="'+n+'" '+(n===this.page?'aria-current="page"':'')+'>'+n+'</button>';last=n}html+='<button class="nav" data-page="'+(this.page+1)+'" '+(this.page>=this.pages?'disabled':'')+' aria-label="Next page">›</button>';nav.innerHTML=html}
  setPage(v,user){const n=clamp(Math.round(v),1,this.pages);if(n===this.page)return;this._page=n;this.setAttribute('page',String(n));this.draw();if(user)this.emit('change',{page:n,pages:this.pages})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='page')this._page=clamp(v||1,1,this.pages);if(n==='pages')this._page=clamp(this.page,1,this.pages);this.draw()}
 }
 if(!customElements.get('pinball-pagination'))customElements.define('pinball-pagination',PinballPagination);
})();
