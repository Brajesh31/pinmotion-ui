(() => {
 const {Base}=window.PinmotionExtras;
 class PinballDialog extends Base {
  static observedAttributes=['open','label','disabled'];
  static css=':host{display:inline-block}.launch{border:1px solid #9f6a2a;border-radius:9px;background:linear-gradient(#f8d99d,#e4af5d);padding:8px 13px;font-weight:750}.backdrop::backdrop{background:#211a12a8;backdrop-filter:blur(2px)}dialog{width:min(440px,calc(100vw - 32px));border:1px solid #b6a48d;border-radius:16px;background:#f8f2e8;color:#29241e;padding:0;box-shadow:0 20px 70px #0005}header{padding:16px 18px 10px;border-bottom:1px solid #ddd0bd;font-weight:800;font-size:16px}section{padding:18px;min-height:50px}footer{display:flex;justify-content:flex-end;gap:8px;padding:0 18px 16px}button{border:1px solid #b7aa97;border-radius:8px;padding:7px 12px;background:#fffaf1}';
  render(){return '<button type="button" class="launch">Open dialog</button><dialog class="backdrop" aria-modal="true"><header><slot name="title">Dialog title</slot></header><section><slot></slot></section><footer><button type="button" class="close">Close</button></footer></dialog>'}
  setup(){this.dialog=this.$('dialog');this.$('.launch').addEventListener('click',()=>this.showModal());this.$('.close').addEventListener('click',()=>this.close());this.dialog.addEventListener('close',()=>{this.removeAttribute('open');this.emit('close',{})});this.dialog.addEventListener('cancel',()=>this.emit('cancel',{}));if(this.hasAttribute('open'))this.showModal()}
  get open(){return !!this.dialog?.open}
  showModal(){if(!this.dialog||this.open)return;try{this.dialog.showModal();this.setAttribute('open','');this.emit('open',{})}catch{}}
  close(){if(this.dialog?.open)this.dialog.close()}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v||n!=='open'||!this.dialog)return;if(v!==null)this.showModal();else if(this.dialog.open)this.dialog.close()}
 }
 if(!customElements.get('pinball-dialog'))customElements.define('pinball-dialog',PinballDialog);
})();