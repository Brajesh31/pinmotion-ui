(() => {
 const {Base,esc}=window.PinmotionExtras;
 class PinballAccordion extends Base {
  static observedAttributes=['labels','open','multiple','label','disabled'];
  static css=':host{display:block;min-width:240px}.item{border:1px solid #c9bead;border-radius:9px;margin:5px 0;overflow:hidden;background:#fffdf7}.heading{width:100%;display:flex;justify-content:space-between;align-items:center;border:0;background:transparent;padding:10px 12px;text-align:left;font-weight:700}.plus{color:#b66c17;font-size:19px}.panel{padding:0 12px 12px;color:#655c51}';
  render(){return '<div class="machine"><div class="label"></div><div class="items"></div></div>'}
  setup(){this.labels=this.parse();this.openSet=new Set((this.getAttribute('open')||'0').split(',').map(Number));this.draw();this.$('.items').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)this.toggle(Number(b.dataset.index),true)});this.$('.items').addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;const bs=[...this.$$('.heading')],i=bs.indexOf(e.target),n=e.key==='Home'?0:e.key==='End'?bs.length-1:(i+(e.key==='ArrowDown'?1:-1)+bs.length)%bs.length;e.preventDefault();bs[n].focus()})}
  $$(s){return [...this.root.querySelectorAll(s)]}
  parse(){return (this.getAttribute('labels')||'Playfield,Scoring,Sound').split(',').map(x=>x.trim()).filter(Boolean).slice(0,8)}
  draw(){if(!this.$('.items'))return;this.$('.label').textContent=this.getAttribute('label')||'Details';this.$('.items').innerHTML=this.labels.map((l,i)=>'<section class="item"><button type="button" class="heading" data-index="'+i+'" aria-expanded="'+this.openSet.has(i)+'" aria-controls="acc-panel-'+i+'"><span>'+esc(l)+'</span><span class="plus">'+(this.openSet.has(i)?'−':'+')+'</span></button><div class="panel" id="acc-panel-'+i+'" '+(this.openSet.has(i)?'':'hidden')+'><slot name="panel-'+i+'"></slot></div></section>').join('')}
  toggle(i,user){if(!this.labels[i])return;if(this.openSet.has(i))this.openSet.delete(i);else{if(!this.hasAttribute('multiple'))this.openSet.clear();this.openSet.add(i)}this.draw();if(user)this.emit('change',{index:i,open:this.openSet.has(i),openItems:[...this.openSet]})}
  get expanded(){return [...this.openSet]} set expanded(v){this.openSet=new Set(Array.isArray(v)?v.map(Number):[]);this.draw()}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='labels')this.labels=this.parse();if(n==='open')this.openSet=new Set((v||'').split(',').map(Number));this.draw()}
 }
 if(!customElements.get('pinball-accordion'))customElements.define('pinball-accordion',PinballAccordion);
})();