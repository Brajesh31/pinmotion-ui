(() => {
 const {Base,esc}=window.PinmotionExtras;
 class PinballFileDrop extends Base {
  static observedAttributes=['accept','multiple','label','disabled'];
  static css=':host{width:min(340px,90vw)}.drop{border:2px dashed #b8a78f;border-radius:12px;background:#fbf5e9;text-align:center;padding:18px 14px}.drop[data-over=true]{border-color:#c47c24;background:#f8e8ca}.icon{font-size:24px;color:#ad6c20}.choose{border:1px solid #9f6a2a;border-radius:8px;background:#f2cc8e;padding:7px 11px;font-weight:700}.files{font-size:12px;color:#675e53;margin-top:8px;overflow-wrap:anywhere}';
  render(){return '<div class="machine"><div class="drop" tabindex="0" role="button" aria-label="Choose files"><div class="icon">⬆</div><div class="label"></div><button type="button" class="choose">Browse files</button><input type="file" hidden><div class="files"></div></div></div>'}
  setup(){this.zone=this.$('.drop');this.input=this.$('input');this.$('.label').textContent=this.getAttribute('label')||'Drop files here or browse';this.apply();this.$('.choose').addEventListener('click',()=>this.input.click());this.zone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();this.input.click()}});this.input.addEventListener('change',()=>this.setFiles(this.input.files));this.zone.addEventListener('dragover',e=>{e.preventDefault();this.zone.dataset.over='true'});this.zone.addEventListener('dragleave',()=>delete this.zone.dataset.over);this.zone.addEventListener('drop',e=>{e.preventDefault();delete this.zone.dataset.over;this.setFiles(e.dataTransfer.files)})}
  apply(){if(!this.input)return;this.input.accept=this.getAttribute('accept')||'';this.input.multiple=this.hasAttribute('multiple')}
  get files(){return this._files||[]}
  setFiles(list){this._files=Array.from(list||[]);this.$('.files').textContent=this.files.length?this.files.map(f=>f.name+' ('+Math.ceil(f.size/1024)+' KB)').join(', '):'No files selected';this.emit('change',{files:this.files})}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='accept'||n==='multiple')this.apply();if(n==='label')this.$('.label').textContent=v||'Drop files here or browse'}
 }
 if(!customElements.get('pinball-file-drop'))customElements.define('pinball-file-drop',PinballFileDrop);
})();