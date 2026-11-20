(() => {
 const {Base,clamp}=window.PinmotionExtras;
 class PinballProgress extends Base {
  static observedAttributes=['value','max','label','indeterminate'];
  static css=':host{width:min(320px,90vw)}.track{height:14px;border:1px solid #aaa08f;border-radius:99px;background:#ded6c9;padding:2px;overflow:hidden}.fill{height:100%;width:0;border-radius:99px;background:repeating-linear-gradient(110deg,#d68b2e 0 9px,#f1bd64 9px 16px);transition:width .18s}.track[aria-busy=true] .fill{width:38%;animation:travel 1s ease-in-out infinite alternate}@keyframes travel{to{transform:translateX(160%)}}@media(prefers-reduced-motion:reduce){.track[aria-busy=true] .fill{animation:none;transform:none}}.value{font-variant-numeric:tabular-nums;color:#71695f;font-size:12px}';
  render(){return '<div class="machine"><div class="row" style="justify-content:space-between"><span class="label"></span><span class="value"></span></div><div class="track" role="progressbar"><div class="fill"></div></div></div>'}
  setup(){this.track=this.$('.track');this.fill=this.$('.fill');this.valueText=this.$('.value');this.update()}
  get value(){return Number(this.getAttribute('value')||0)} set value(v){this.setAttribute('value',String(v))} get max(){return Math.max(0,Number(this.getAttribute('max')||100))}
  update(){if(!this.track)return;const ind=this.hasAttribute('indeterminate'),v=clamp(this.value,0,this.max||100),pct=this.max?100*v/this.max:0;this.$('.label').textContent=this.getAttribute('label')||'Progress';this.track.setAttribute('aria-valuemin','0');this.track.setAttribute('aria-valuemax',String(this.max));if(ind){this.track.removeAttribute('aria-valuenow');this.track.setAttribute('aria-busy','true');this.valueText.textContent='Working'}else{this.track.setAttribute('aria-valuenow',String(v));this.track.removeAttribute('aria-busy');this.fill.style.width=pct+'%';this.valueText.textContent=Math.round(pct)+'%'}}
  attributeChangedCallback(){if(this.ready)this.update()}
 }
 if(!customElements.get('pinball-progress'))customElements.define('pinball-progress',PinballProgress);
})();