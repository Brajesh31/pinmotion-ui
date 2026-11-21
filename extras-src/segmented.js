(() => {
 const {Base,esc}=window.PinmotionExtras;
 class PinballSegmented extends Base {
  static formAssociated=true; static observedAttributes=['options','value','disabled'];
  static css='.segments{display:flex;gap:4px;padding:4px;background:#e8dfd0;border:1px solid #c8bdad;border-radius:12px}.segment{flex:1;min-width:0;border:0;border-radius:8px;padding:8px 10px;background:transparent;color:#5d554b;font-weight:650}.segment[aria-pressed=true]{background:linear-gradient(#fffdf8,#f2e6d3);color:#28231d;box-shadow:0 1px 4px #33200d22,inset 0 1px #fff}';
  render(){return '<div class="segments" role="group" aria-label="Select one"></div>'}
  setup(){this.group=this.$('.segments');this.options=this.parse();this._value=this.getAttribute('value')||this.options[0]?.value||'';this.draw();this.group.addEventListener('click',e=>{const b=e.target.closest('[data-value]');if(b)this.setValue(b.dataset.value,true)});this.group.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft'].includes(e.key))return;e.preventDefault();const i=this.options.findIndex(o=>o.value===this.value),n=(i+(e.key==='ArrowRight'?1:-1)+this.options.length)%this.options.length;this.setValue(this.options[n].value,true);this.group.querySelectorAll('button')[n].focus()})}
  parse(){return (this.getAttribute('options')||'day:Day;week:Week;month:Month').split(';').map(x=>{const p=x.trim().split(':');return{value:p[0],label:p[1]||p[0]}})}
  draw(){if(this.group)this.group.innerHTML=this.options.map(o=>'<button type="button" class="segment" data-value="'+esc(o.value)+'" aria-pressed="'+(o.value===this.value)+'" tabindex="'+(o.value===this.value?'0':'-1')+'">'+esc(o.label)+'</button>').join('')}
  get value(){return this._value||''} set value(v){this.setValue(String(v),false)} formValue(){return this.value||null}
  setValue(v,user){if(!this.options.some(o=>o.value===v)||this._value===v)return;this._value=v;this.draw();this.syncForm();if(user)this.emit('change',{value:v})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='options'){this.options=this.parse();if(!this.options.some(x=>x.value===this._value))this._value=this.options[0]?.value||'';this.draw()}else if(n==='value'){this._value=v||'';this.draw()}this.syncForm()}
 }
 if(!customElements.get('pinball-segmented'))customElements.define('pinball-segmented',PinballSegmented);
})();