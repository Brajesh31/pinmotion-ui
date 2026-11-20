(() => {
 const {Base,esc,safeURL}=window.PinmotionExtras;
 class PinballBreadcrumbs extends Base {
  static observedAttributes=['items','label'];
  static css='nav{border:1px solid #c9bead;border-radius:10px;background:#fffdf7;padding:10px 12px}ol{display:flex;align-items:center;gap:8px;list-style:none;margin:0;padding:0;flex-wrap:wrap}li{display:flex;align-items:center;gap:8px;color:#766d62;font-size:13px}a{color:#87501b;text-decoration:none;border-bottom:1px solid #d9b87f}a[aria-current=page]{color:#302921;border:0;font-weight:750}.sep{color:#b5a58d}';
  render(){return '<nav aria-label="Breadcrumb"><ol></ol></nav>'}
  setup(){this.draw()}
  parse(){return (this.getAttribute('items')||'Home|/;Components|/components;Current').split(';').map(s=>{const p=s.trim().split('|');return {label:p[0],href:p[1]||''}}).filter(x=>x.label)}
  draw(){const ol=this.$('ol');if(!ol)return;const items=this.parse();ol.innerHTML=items.map((x,i)=>'<li>'+(i===items.length-1?'<span aria-current="page">'+esc(x.label)+'</span>':'<a href="'+esc(safeURL(x.href))+'">'+esc(x.label)+'</a>')+(i<items.length-1?'<span class="sep" aria-hidden="true">›</span>':'')+'</li>').join('');this.$('nav').setAttribute('aria-label',this.getAttribute('label')||'Breadcrumb')}
  attributeChangedCallback(){if(this.ready)this.draw()}
 }
 if(!customElements.get('pinball-breadcrumbs'))customElements.define('pinball-breadcrumbs',PinballBreadcrumbs);
})();