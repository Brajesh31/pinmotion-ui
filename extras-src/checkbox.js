(() => {
 const {Base}=window.PinmotionExtras;
 class PinballCheckbox extends Base {
  static formAssociated=true; static observedAttributes=['checked','disabled','label','value'];
  static css=':host{min-width:190px}.check{display:flex;align-items:center;gap:11px;cursor:pointer}.box{width:24px;height:24px;border:2px solid #817969;border-radius:6px;background:linear-gradient(#fff,#e7dece);display:grid;place-items:center;flex:none}.box:after{content:"";width:7px;height:12px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg) scale(0);transition:transform .12s}.check[aria-checked=true] .box{background:linear-gradient(#e8a944,#bd6b17);border-color:#9d5d1b}.check[aria-checked=true] .box:after{transform:rotate(45deg) scale(1)}';
  render(){return '<button type="button" class="check" role="checkbox"><span class="box" aria-hidden="true"></span><span class="text"></span></button>'}
  setup(){this.btn=this.$('.check');this.checked=this.hasAttribute('checked');this.update();this.btn.addEventListener('click',()=>this.setChecked(!this.checked,true))}
  get checked(){return !!this._checked} set checked(v){this.setChecked(!!v,false)}
  get value(){return this.getAttribute('value')||'on'} formValue(){return this.checked?this.value:null}
  setChecked(v,user){const n=!!v;if(this._checked===n){this.update();return}this._checked=n;if(this.hasAttribute('checked')!==n)this.toggleAttribute('checked',n);this.update();this.syncForm();if(user)this.emit('change',{checked:n,value:this.value})}
  update(){if(!this.btn)return;this.btn.setAttribute('aria-checked',String(this.checked));this.btn.setAttribute('aria-label',this.getAttribute('label')||'Checkbox')}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='checked')this._checked=v!==null;this.update();this.syncForm()}
 }
 if(!customElements.get('pinball-checkbox'))customElements.define('pinball-checkbox',PinballCheckbox);
})();