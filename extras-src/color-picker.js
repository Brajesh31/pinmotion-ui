(() => {
 const {Base}=window.PinmotionExtras;
 class PinballColorPicker extends Base {
  static formAssociated=true; static observedAttributes=['value','label','disabled'];
  static css=':host{min-width:190px}.field{display:flex;align-items:center;gap:12px}.color{width:58px;height:42px;padding:3px;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8}.hex{font:700 13px ui-monospace,monospace;color:#554c42}';
  render(){return '<div class="machine"><label class="label" for="color"></label><div class="field"><input class="color" id="color" type="color"><output class="hex"></output></div></div>'}
  setup(){this.input=this.$('input');this.$('.label').textContent=this.getAttribute('label')||'Accent colour';this.input.value=this.getAttribute('value')||'#c9700f';this.update();this.input.addEventListener('input',()=>{this.update();this.syncForm();this.emit('input',{value:this.value})});this.input.addEventListener('change',()=>this.emit('change',{value:this.value}))}
  get value(){return this.input?.value||'#c9700f'}set value(v){if(this.input)this.input.value=String(v);this.update();this.syncForm()}formValue(){return this.value}
  update(){if(this.$('.hex'))this.$('.hex').textContent=this.value.toUpperCase()}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='value'&&this.input)this.input.value=v||'#c9700f';if(n==='label')this.$('.label').textContent=v||'Accent colour';this.update();this.syncForm()}
 }
 if(!customElements.get('pinball-color-picker'))customElements.define('pinball-color-picker',PinballColorPicker);
})();