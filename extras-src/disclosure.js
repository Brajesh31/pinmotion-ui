(() => {
 const {Base}=window.PinmotionExtras;
 class PinballDisclosure extends Base {
  static observedAttributes=['open','disabled'];
  static css=':host{display:block;min-width:220px}details{border:1px solid #c9bead;border-radius:10px;background:#fffdf7;overflow:hidden}summary{cursor:pointer;list-style:none;padding:11px 13px;font-weight:700;display:flex;align-items:center;gap:9px}summary::-webkit-details-marker{display:none}summary:before{content:"+";color:#b66c17;font-size:20px;width:15px}details[open] summary:before{content:"−"}.body{padding:0 13px 13px;color:#645c52}';
  render(){return '<details><summary><slot name="summary">More details</slot></summary><div class="body"><slot></slot></div></details>'}
  setup(){this.details=this.$('details');if(this.hasAttribute('open'))this.details.open=true;this.details.addEventListener('toggle',()=>{if(this.details.open!==this.hasAttribute('open'))this.toggleAttribute('open',this.details.open);this.emit('toggle',{open:this.details.open})})}
  get open(){return !!this.details?.open} set open(v){if(this.details)this.details.open=!!v;this.toggleAttribute('open',!!v)}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v||n!=='open'||!this.details)return;this.details.open=v!==null}
 }
 if(!customElements.get('pinball-disclosure'))customElements.define('pinball-disclosure',PinballDisclosure);
})();