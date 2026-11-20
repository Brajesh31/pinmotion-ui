(() => {
 const {Base}=window.PinmotionExtras;
 class PinballTextField extends Base {
  static formAssociated=true; static observedAttributes=['value','label','placeholder','type','name','required','disabled'];
  static css=':host{width:min(320px,90vw)}.field{display:grid;gap:6px}.input{width:100%;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;padding:9px 11px;color:#28231d}.input:invalid{border-color:#b3322b}.hint{font-size:11px;color:#766d62}';
  render(){return '<div class="machine field"><label class="label" for="input"></label><input class="input" id="input"><span class="hint"></span></div>'}
  setup(){this.input=this.$('input');this.input.type=this.getAttribute('type')||'text';this.input.placeholder=this.getAttribute('placeholder')||'';this.input.value=this.getAttribute('value')||'';this.input.required=this.hasAttribute('required');this.$('label').textContent=this.getAttribute('label')||'Text';this.input.addEventListener('input',()=>{this.syncForm();this.emit('input',{value:this.value})});this.input.addEventListener('change',()=>this.emit('change',{value:this.value}));this.$('.hint').textContent=this.getAttribute('hint')||''}
  get value(){return this.input?.value||''} set value(v){if(this.input)this.input.value=String(v);this.syncForm()}
  formValue(){return this.value}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='value'&&this.input)this.input.value=v||'';if(n==='label')this.$('label').textContent=v||'Text';if(n==='placeholder'&&this.input)this.input.placeholder=v||'';if(n==='type'&&this.input)this.input.type=v||'text';if(n==='required'&&this.input)this.input.required=v!==null;if(n==='name'&&this.internals)this.syncForm()}
 }
 if(!customElements.get('pinball-text-field'))customElements.define('pinball-text-field',PinballTextField);
})();