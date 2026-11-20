(() => {
 const {Base}=window.PinmotionExtras;
 class PinballSearch extends Base {
  static observedAttributes=['value','placeholder','label','disabled'];
  static css=':host{width:min(340px,90vw)}.wrap{display:flex;gap:6px}.query{min-width:0;flex:1;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;padding:9px 11px}.go{border:1px solid #9f6a2a;border-radius:9px;background:linear-gradient(#f8d99d,#e4af5d);padding:8px 12px;font-weight:750}';
  render(){return '<div class="machine"><label class="label"></label><form class="wrap"><input class="query" type="search"><button class="go" type="submit">Search</button></form></div>'}
  setup(){this.input=this.$('input');this.$('.label').textContent=this.getAttribute('label')||'Search';this.input.placeholder=this.getAttribute('placeholder')||'Search…';this.input.value=this.getAttribute('value')||'';this.input.addEventListener('input',()=>{this.emit('input',{value:this.value})});this.$('form').addEventListener('submit',e=>{e.preventDefault();this.search()})}
  get value(){return this.input?.value||''} set value(v){if(this.input)this.input.value=String(v)}
  search(){this.emit('search',{value:this.value.trim()})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='value'&&this.input)this.input.value=v||'';if(n==='placeholder'&&this.input)this.input.placeholder=v||'Search…';if(n==='label')this.$('.label').textContent=v||'Search'}
 }
 if(!customElements.get('pinball-search'))customElements.define('pinball-search',PinballSearch);
})();