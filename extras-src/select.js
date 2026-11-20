(() => {
 const {Base,esc}=window.PinmotionExtras;
 class PinballSelect extends Base {
  static formAssociated=true; static observedAttributes=['options','value','label','disabled'];
  static css=':host{width:min(280px,90vw)}.field{display:grid;gap:6px}.select{width:100%;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;padding:9px 11px;color:#28231d}';
  render(){return '<div class="machine field"><label class="label" for="select"></label><select class="select" id="select"></select></div>'}
  setup(){this.selectEl=this.$('select');this.options=this.parse();this.$('label').textContent=this.getAttribute('label')||'Choose';this.draw();this.selectEl.addEventListener('change',()=>{this._value=this.selectEl.value;this.syncForm();this.emit('change',{value:this.value,label:this.options.find(o=>o.value===this.value)?.label||''})})}
  parse(){return (this.getAttribute('options')||'basic:Basic;pro:Professional;team:Team').split(';').map(x=>{const p=x.trim().split(':');return{value:p[0],label:p[1]||p[0]}})}
  get value(){return this._value||''} set value(v){this._value=String(v);if(this.selectEl)this.selectEl.value=this._value;this.syncForm()} formValue(){return this.value}
  draw(){if(!this.selectEl)return;this._value=this.getAttribute('value')||this._value||this.options[0]?.value||'';this.selectEl.innerHTML=this.options.map(o=>'<option value="'+esc(o.value)+'">'+esc(o.label)+'</option>').join('');this.selectEl.value=this._value;this.$('label').textContent=this.getAttribute('label')||'Choose'}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='options'){this.options=this.parse();this.draw()}else if(n==='value'){this._value=v||'';this.draw()}else if(n==='label')this.$('label').textContent=v||'Choose';this.syncForm()}
 }
 if(!customElements.get('pinball-select'))customElements.define('pinball-select',PinballSelect);
})();