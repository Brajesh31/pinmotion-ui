(() => {
 const {Base}=window.PinmotionExtras;
 class PinballToast extends Base {
  static observedAttributes=['message','variant','duration','disabled'];
  static css=':host{display:block;min-width:230px}.shell{display:flex;align-items:center;gap:10px;border-left:4px solid #d08a27;background:#fffdf7;padding:10px 12px;border-radius:8px;box-shadow:0 5px 16px #38271320}.shell[hidden]{display:none}.message{flex:1}.close{border:0;background:transparent;font-size:18px}.mark{width:10px;height:10px;border-radius:50%;background:#d08a27}.shell[data-variant=success]{border-color:#59875e}.shell[data-variant=error]{border-color:#b3322b}.shell[data-variant=error] .mark{background:#b3322b}.trigger{border:1px solid #9f6a2a;border-radius:8px;background:#f0ca88;padding:7px 11px}';
  render(){return '<div class="machine"><button class="trigger" type="button">Show notification</button><div class="shell" role="status" aria-live="polite" hidden><span class="mark"></span><span class="message"></span><button type="button" class="close" aria-label="Dismiss">×</button></div></div>'}
  setup(){this.panel=this.$('.shell');this.message=this.$('.message');this.$('.trigger').addEventListener('click',()=>this.show(this.getAttribute('message')||'Saved successfully'));this.$('.close').addEventListener('click',()=>this.dismiss());this.update()}
  update(){if(!this.panel)return;this.message.textContent=this.getAttribute('message')||'Notification';this.panel.dataset.variant=this.getAttribute('variant')||'info';}
  show(message,duration){this.message.textContent=message||this.getAttribute('message')||'Notification';this.panel.dataset.variant=this.getAttribute('variant')||'info';this.panel.hidden=false;clearTimeout(this.timer);const ms=duration===undefined?Number(this.getAttribute('duration')||3500):Number(duration);if(ms>0)this.timer=setTimeout(()=>this.dismiss(),ms);this.emit('show',{message:this.message.textContent})}
  dismiss(){if(!this.panel||this.panel.hidden)return;this.panel.hidden=true;clearTimeout(this.timer);this.emit('dismiss',{})}
  disconnectedCallback(){clearTimeout(this.timer);this.timer=0;super.disconnectedCallback()}
  attributeChangedCallback(){if(this.ready)this.update()}
 }
 if(!customElements.get('pinball-toast'))customElements.define('pinball-toast',PinballToast);
})();