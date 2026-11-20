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