(() => {
 const {Base,clamp}=window.PinmotionExtras;
 class PinballMeter extends Base {
  static observedAttributes=['value','min','max','low','high','optimum','label'];
  static css=':host{width:min(320px,90vw)}.track{height:20px;display:flex;align-items:stretch;border:1px solid #a99f8e;border-radius:8px;background:linear-gradient(90deg,#d9b8a6,#d9d2b7 50%,#b8ceb8);overflow:hidden}.needle{width:4px;height:26px;background:#302b25;box-shadow:0 0 0 2px #fff9;transform:translateX(-50%);margin-top:-4px}.read{font-weight:750;font-variant-numeric:tabular-nums}';
  render(){return '<div class="machine"><div class="row" style="justify-content:space-between"><span class="label"></span><span class="read"></span></div><div class="track" role="meter"><span class="needle"></span></div></div>'}
  setup(){this.update()} get value(){return Number(this.getAttribute('value')||0)} set value(v){this.setAttribute('value',String(v))}
  update(){if(!this.$('.track'))return;const min=Number(this.getAttribute('min')||0),max=Math.max(min+.0001,Number(this.getAttribute('max')||100)),v=clamp(this.value,min,max),pct=100*(v-min)/(max-min);this.$('.label').textContent=this.getAttribute('label')||'Level';this.$('.read').textContent=String(v);this.$('.track').setAttribute('aria-valuemin',String(min));this.$('.track').setAttribute('aria-valuemax',String(max));this.$('.track').setAttribute('aria-valuenow',String(v));this.$('.track').setAttribute('aria-valuetext',v+' of '+max);this.$('.needle').style.marginLeft=pct+'%'}
  attributeChangedCallback(){if(this.ready)this.update()}
 }
 if(!customElements.get('pinball-meter'))customElements.define('pinball-meter',PinballMeter);
})();