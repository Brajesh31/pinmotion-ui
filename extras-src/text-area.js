(() => {
 const {Base}=window.PinmotionExtras;
 class PinballTextArea extends Base {
  static formAssociated=true; static observedAttributes=['value','label','placeholder','rows','maxlength','required','disabled'];
  static css=':host{width:min(340px,90vw)}.field{display:grid;gap:6px}.area{width:100%;min-height:90px;resize:vertical;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;padding:10px 11px;color:#28231d}.counter{font-size:11px;color:#766d62;text-align:right}';
  render(){return '<div class="machine field"><label class="label" for="area"></label><textarea class="area" id="area"></textarea><span class="counter"></span></div>'}
  setup(){this.area=this.$('textarea');this.area.value=this.getAttribute('value')||'';this.area.placeholder=this.getAttribute('placeholder')||'';this.area.rows=Number(this.getAttribute('rows')||4);if(this.hasAttribute('maxlength'))this.area.maxLength=Number(this.getAttribute('maxlength'));this.area.required=this.hasAttribute('required');this.$('label').textContent=this.getAttribute('label')||'Message';this.area.addEventListener('input',()=>{this.syncForm();this.updateCount();this.emit('input',{value:this.value})});this.area.addEventListener('change',()=>this.emit('change',{value:this.value}));this.updateCount()}
  get value(){return this.area?.value||''} set value(v){if(this.area)this.area.value=String(v);this.syncForm();this.updateCount()}
  formValue(){return this.value}
  updateCount(){if(this.$('.counter'))this.$('.counter').textContent=this.hasAttribute('maxlength')?this.value.length+' / '+this.getAttribute('maxlength'):''}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='value'&&this.area)this.area.value=v||'';if(n==='label')this.$('label').textContent=v||'Message';if(n==='placeholder'&&this.area)this.area.placeholder=v||'';if(n==='rows'&&this.area)this.area.rows=Number(v||4);if(n==='maxlength'&&this.area){this.area.maxLength=v===null?-1:Number(v);this.updateCount()}if(n==='required'&&this.area)this.area.required=v!==null}
 }
 if(!customElements.get('pinball-text-area'))customElements.define('pinball-text-area',PinballTextArea);
})();