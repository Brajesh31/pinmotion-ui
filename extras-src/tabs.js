(() => {
 const {Base,esc,clamp}=window.PinmotionExtras;
 class PinballTabs extends Base {
  static observedAttributes=['labels','active','label','disabled'];
  static css=':host{display:block;min-width:230px}.tabs{display:flex;gap:3px;border-bottom:1px solid #c8bdad}.tab{border:0;border-bottom:3px solid transparent;background:transparent;padding:9px 12px;font-weight:650;color:#766d62}.tab[aria-selected=true]{color:#8b5014;border-color:#d18b2e}.panel{padding:12px 4px;min-height:42px;color:#403a32}';
  render(){return '<div class="machine"><div class="tabs" role="tablist"></div><div class="panel" role="tabpanel"><slot name="panel-0"></slot></div></div>'}
  setup(){this.labels=this.parse();this._active=clamp(this.getAttribute('active')||0,0,this.labels.length-1);this.$('.tabs').setAttribute('aria-label',this.getAttribute('label')||'Tabs');this.draw();this.$('.tabs').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)this.select(Number(b.dataset.index),true)});this.$('.tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?this.labels.length-1:(this.activeIndex+(e.key==='ArrowRight'?1:-1)+this.labels.length)%this.labels.length;this.select(n,true);this.$('[data-index="'+n+'"]').focus()})}
  parse(){return (this.getAttribute('labels')||'Overview,Details,History').split(',').map(x=>x.trim()).filter(Boolean).slice(0,8)}
  get activeIndex(){return this._active} set activeIndex(v){this.select(Number(v),false)}
  draw(){if(!this.$('.tabs'))return;this.$('.tabs').innerHTML=this.labels.map((l,i)=>'<button type="button" class="tab" role="tab" id="tab-'+i+'" aria-controls="panel-'+i+'" aria-selected="'+(i===this.activeIndex)+'" tabindex="'+(i===this.activeIndex?0:-1)+'" data-index="'+i+'">'+esc(l)+'</button>').join('');const p=this.$('.panel');p.id='panel-'+this.activeIndex;p.setAttribute('aria-labelledby','tab-'+this.activeIndex);p.innerHTML='<slot name="panel-'+this.activeIndex+'"></slot>'}
  select(i,user){const n=clamp(Math.round(i),0,this.labels.length-1);if(n===this.activeIndex)return;this._active=n;this.setAttribute('active',String(n));this.draw();if(user)this.emit('change',{activeIndex:n,label:this.labels[n]})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='labels')this.labels=this.parse();if(n==='active')this._active=clamp(v||0,0,(this.labels||[]).length-1);if(n==='label')this.$('.tabs')?.setAttribute('aria-label',v||'Tabs');this.draw()}
 }
 if(!customElements.get('pinball-tabs'))customElements.define('pinball-tabs',PinballTabs);
})();