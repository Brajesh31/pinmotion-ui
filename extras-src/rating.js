(() => {
 const {Base,clamp}=window.PinmotionExtras;
 class PinballRating extends Base {
  static formAssociated=true; static observedAttributes=['value','max','label','readonly','disabled'];
  static css=':host{min-width:180px}.stars{display:flex;gap:3px}.star{border:0;background:transparent;color:#a9a092;font-size:30px;line-height:1;padding:2px}.star[aria-checked=true]{color:#d18a23;text-shadow:0 0 8px #e7a33a55}.hint{font-size:12px;color:#746b60;margin-top:5px}';
  render(){return '<div class="machine"><span class="label" id="label"></span><div class="stars" role="radiogroup" aria-labelledby="label"></div><div class="hint" aria-live="polite"></div></div>'}
  setup(){this.max=clamp(this.getAttribute('max')||5,1,10);this._value=clamp(this.getAttribute('value')||0,0,this.max);this.update();this.$('.stars').addEventListener('click',e=>{const b=e.target.closest('button[data-value]');if(b)this.setValue(Number(b.dataset.value),true)});this.$('.stars').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowUp','ArrowLeft','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();let n=this.value;if(e.key==='Home')n=1;else if(e.key==='End')n=this.max;else n=clamp(n+(e.key==='ArrowRight'||e.key==='ArrowUp'?1:-1),1,this.max);this.setValue(n,true);this.$('[data-value="'+n+'"]').focus()})}
  get value(){return this._value} set value(v){this.setValue(Number(v),false)} formValue(){return String(this.value)}
  update(){if(!this.$('.stars'))return;this.max=clamp(this.getAttribute('max')||5,1,10);this.$('.label').textContent=this.getAttribute('label')||'Rating';this.$('.stars').innerHTML=Array.from({length:this.max},(_,i)=>'<button type="button" class="star" data-value="'+(i+1)+'" role="radio" aria-checked="'+(this.value===i+1)+'" aria-label="'+(i+1)+' of '+this.max+'" tabindex="'+(this.value===i+1||(this.value===0&&i===0)?'0':'-1')+'" '+(this.hasAttribute('readonly')?'disabled':'')+'>★</button>').join('');this.$('.hint').textContent=this.value+' / '+this.max}
  setValue(v,user){if(this.hasAttribute('readonly'))return;const n=clamp(Math.round(v),0,this.max);if(n===this._value)return;this._value=n;this.setAttribute('value',String(n));this.update();this.syncForm();if(user)this.emit('change',{value:n,max:this.max})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='value')this._value=clamp(v||0,0,this.max||5);this.update();this.syncForm()}
 }
 if(!customElements.get('pinball-rating'))customElements.define('pinball-rating',PinballRating);
})();