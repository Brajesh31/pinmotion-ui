(() => {
 const {Base}=window.PinmotionExtras;
 class PinballDatePicker extends Base {
  static formAssociated=true; static observedAttributes=['value','min','max','label','disabled'];
  static css=':host{width:min(260px,90vw)}.field{display:grid;gap:6px}.date{width:100%;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;padding:9px 11px}';
  render(){return '<div class="machine field"><label class="label" for="date"></label><input class="date" id="date" type="date"></div>'}
  setup(){this.input=this.$('input');this.apply();this.$('label').textContent=this.getAttribute('label')||'Date';this.input.addEventListener('input',()=>{this.syncForm();this.emit('input',{value:this.value})});this.input.addEventListener('change',()=>this.emit('change',{value:this.value}))}
  apply(){if(!this.input)return;this.input.value=this.getAttribute('value')||'';this.input.min=this.getAttribute('min')||'';this.input.max=this.getAttribute('max')||''}
  get value(){return this.input?.value||''}set value(v){if(this.input)this.input.value=String(v);this.syncForm()}formValue(){return this.value}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='label')this.$('label').textContent=v||'Date';if(['value','min','max'].includes(n))this.apply();this.syncForm()}
 }
 if(!customElements.get('pinball-date-picker'))customElements.define('pinball-date-picker',PinballDatePicker);
})();