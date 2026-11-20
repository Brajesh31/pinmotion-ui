(() => {
 const {Base}=window.PinmotionExtras;
 class PinballTooltip extends Base {
  static observedAttributes=['content','placement','disabled'];
  static css=':host{position:relative}.tip{position:relative;border:1px solid #aa9f8f;border-radius:9px;background:#fffdf8;padding:8px 12px;display:inline-block}.bubble{position:absolute;z-index:20;left:50%;bottom:calc(100% + 9px);transform:translate(-50%,4px);min-width:120px;max-width:220px;border-radius:8px;background:#302a22;color:#fff8eb;padding:7px 10px;font-size:12px;box-shadow:0 5px 15px #0003;opacity:0;visibility:hidden;transition:opacity .12s,transform .12s}.bubble[data-open=true]{opacity:1;visibility:visible;transform:translate(-50%,0)}:host([placement=bottom]) .bubble{top:calc(100% + 9px);bottom:auto}';
  render(){return '<span class="tip" tabindex="0" aria-describedby="bubble"><slot></slot><span class="bubble" id="bubble" role="tooltip"></span></span>'}
  setup(){this.tip=this.$('.tip');this.bubble=this.$('.bubble');this.update();this.tip.addEventListener('focus',()=>this.show());this.tip.addEventListener('blur',()=>this.hide());this.tip.addEventListener('pointerenter',()=>this.show());this.tip.addEventListener('pointerleave',()=>this.hide());this.tip.addEventListener('keydown',e=>{if(e.key==='Escape')this.hide()})}
  update(){if(this.bubble)this.bubble.textContent=this.getAttribute('content')||'More information'}
  show(){this.bubble?.setAttribute('data-open','true')} hide(){this.bubble?.removeAttribute('data-open')}
  attributeChangedCallback(){if(this.ready)this.update()}
 }
 if(!customElements.get('pinball-tooltip'))customElements.define('pinball-tooltip',PinballTooltip);
})();