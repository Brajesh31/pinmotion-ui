// Pinball UI auxiliary base. Keeps utility components self-contained while matching the mechanical visual language.
(() => {
  if (window.PinmotionExtras) return;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));
  const safeURL = (value) => { const s=String(value||'').trim(); return /^(https?:|mailto:|tel:|\/|#|\.\/|\.\.\/)/i.test(s) ? s : '#'; };

  // The same warm cream, dark ink, steel, amber and red palette as the original PinballKit controls.
  const baseCSS = `
    :host {
      display:inline-block; vertical-align:middle; color:#2b2620;
      font:13px/1.4 Futura,"Century Gothic","Avenir Next",Arial,sans-serif;
      --pb-page:#f3efe5; --pb-ink:#2b2620; --pb-dim:#7a7064; --pb-line:#d9d1c1;
      --pb-steel:#747a7d; --pb-steel-dark:#343a3d; --pb-brass:#c18a43;
      --pb-amber:#c9700f; --pb-red:#b3322b; --pb-focus:#e8961e;
      --pui-bg:var(--pb-page); --pui-ink:var(--pb-ink); --pui-dim:var(--pb-dim);
      --pui-line:var(--pb-line); --pui-amber:var(--pb-amber); --pui-red:var(--pb-red);
      --pui-focus:var(--pb-focus);
      -webkit-tap-highlight-color:transparent;
    }
    *{box-sizing:border-box}
    button,input,textarea,select{font:inherit}
    button{color:inherit;cursor:pointer}
    button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible,[tabindex]:focus-visible{
      outline:2px solid var(--pb-focus);outline-offset:3px
    }
    :host([disabled]){opacity:.62}
    .pinball-deck{
      position:relative;isolation:isolate;display:block;max-width:100%;
      padding:27px 10px 10px;border:2px solid #62686a;border-radius:10px;
      background:
        radial-gradient(circle at 9px 9px,#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        radial-gradient(circle at calc(100% - 9px) 9px,#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        radial-gradient(circle at 9px calc(100% - 9px),#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        radial-gradient(circle at calc(100% - 9px) calc(100% - 9px),#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        linear-gradient(138deg,#f9f5eb 0%,#b6b5b0 20%,#e5e0d6 43%,#f8f1e4 72%,#aaa9a4 100%);
      box-shadow:inset 0 1px 2px #fff,inset 0 -4px 10px #3c352c32,0 3px 0 #55514a,0 6px 12px #21180f36;
    }
    .pinball-deck:before{
      content:"PINBALL  •  CONTROL PANEL";position:absolute;left:12px;top:6px;
      color:#4b4032;font:700 8px/14px "Century Gothic",Arial,sans-serif;
      letter-spacing:.16em;text-transform:uppercase;text-indent:13px;
      text-shadow:0 1px #fff9;pointer-events:none;z-index:2;
    }
    .pinball-deck:after{
      content:"";position:absolute;right:8px;top:5px;width:17px;height:17px;border-radius:50%;
      background:radial-gradient(circle at 28% 23%,#fff 0 6%,#e4e9e9 10%,#a5afb2 27%,#596267 49%,#e7eeee 63%,#60686b 79%,#30383b 100%);
      border:1px solid #545b5e;box-shadow:0 0 0 1px #f8f5ed,0 1px 3px #17130e88;
      pointer-events:none;z-index:3;
    }
    .pinball-deck>*{position:relative;z-index:1}
    .machine{
      position:relative;border:1px solid #766c5d;border-radius:6px;
      background:linear-gradient(180deg,#332e28 0 23px,#e7dece 23px,#fbf4e8 100%);
      box-shadow:inset 0 1px #fff,inset 0 0 0 2px #fff5,inset 0 -3px 8px #4c403022,0 2px 3px #17110b30;
      padding:9px;
    }
    .label{
      display:block;color:#86602f;font:700 10px/1.3 "Century Gothic",Futura,Arial,sans-serif;
      letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px;
      text-shadow:0 1px #fff9;
    }
    .machine>.label:first-child,.machine .label:first-child{
      color:#f6dfb5;text-shadow:0 1px #17120d;background:linear-gradient(#5b4a36,#302820);
      border-bottom:1px solid #bb7d2e;border-radius:3px;padding:5px 8px 5px 20px;
      margin:-1px -1px 9px;position:relative;
    }
    .machine>.label:first-child:before,.machine .label:first-child:before{
      content:"";position:absolute;left:7px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;
      background:radial-gradient(circle at 30% 25%,#fff4bd,#f4ae39 38%,#9c4a09 82%);
      box-shadow:0 0 5px #f2a82d99,0 0 0 1px #211a12;
    }
    .control,.pinball-deck input:not([type=color]):not([type=file]),.pinball-deck textarea,.pinball-deck select{
      border:1px solid #7a6e5e;border-radius:5px;background:linear-gradient(#fffdf7,#e8dfd0);
      color:#2b2620;min-height:36px;padding:7px 10px;
      box-shadow:inset 0 2px 4px #3d30251e,inset 0 1px #fff,0 1px 0 #fff9;
    }
    .pinball-deck button:not(.star):not(.tab):not(.close){
      border:1px solid #8b642f;border-radius:6px;
      background:linear-gradient(180deg,#ffedc5 0%,#e7bd78 54%,#c48a42 100%);
      color:#32271b;font-weight:750;
      box-shadow:inset 0 1px #fff9,inset 0 -2px 2px #885b292e,0 2px 0 #73502d,0 3px 5px #261a0d33;
      transition:transform .08s ease,filter .12s ease,box-shadow .08s ease;
    }
    .pinball-deck button:not(.star):not(.tab):not(.close):active{
      transform:translateY(2px);filter:brightness(.97);
      box-shadow:inset 0 1px #fff8,0 0 0 #73502d,0 1px 3px #261a0d33;
    }
    .pinball-deck button[disabled]{opacity:.45;cursor:not-allowed;filter:grayscale(.45)}
    .pinball-deck button[aria-checked=true],.pinball-deck button[aria-pressed=true],.pinball-deck button[aria-current=page]{
      background:linear-gradient(#ffe7a8,#d88a27 65%,#a95612);color:#24190e;border-color:#7c4918;
      box-shadow:inset 0 1px #fff9,0 0 9px #e99b35aa,0 2px 0 #74410f;
    }
    .lamp,.mark{
      display:inline-block;width:8px;height:8px;border-radius:50%;background:#8e877c;
      box-shadow:inset 0 1px 2px #0008,0 0 0 1px #352d23;
    }
    .lamp.on,.mark.on{
      background:radial-gradient(circle at 30% 25%,#fff4c6,#ffc14f 42%,#bf5b0a 88%);
      box-shadow:0 0 4px 2px #eaa13e88,0 0 11px #e68b1c77,inset 0 1px #fff;
    }
    .row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .muted{color:#776e62}
    .hidden{display:none!important}
    @media (prefers-reduced-motion:reduce){
      .pinball-deck button{transition:none!important}
    }
  `;

  // Component-specific details which should still read as buttons, lamps, score reels and backglass controls.
  const mechanicalCSS = `
    .pinball-deck .check,.pinball-deck .choice,.pinball-deck .heading,.pinball-deck .choose,.pinball-deck .go,
    .pinball-deck .launch,.pinball-deck .trigger,.pinball-deck .nav,.pinball-deck .page{
      min-height:34px;
    }
    .pinball-deck .check{padding:7px 10px;border-radius:999px}
    .pinball-deck .box{border:2px solid #6f6454;background:linear-gradient(#39352f,#6b5b46);box-shadow:inset 0 2px 4px #0008,0 1px #fff8}
    .pinball-deck .check[aria-checked=true] .box{background:radial-gradient(circle at 50% 42%,#fff5b7 0 12%,#f0aa32 42%,#9b4c0a 92%);box-shadow:0 0 10px #eba43b99,inset 0 1px #fff}
    .pinball-deck .segments{padding:4px;gap:4px;background:linear-gradient(#302a24,#514537);border:1px solid #241d17;border-radius:7px;box-shadow:inset 0 2px 5px #0009,0 1px #fff8}
    .pinball-deck .segment{border-radius:4px}
    .pinball-deck .choice{background:linear-gradient(#eee6d8,#d2c4ad);border-color:#8a7a64}
    .pinball-deck .choice[aria-checked=true]{background:linear-gradient(#ffe8af,#d98b29);border-color:#8a4f13;box-shadow:0 0 8px #e5a14288,0 2px 0 #80501e}
    .pinball-deck .star{background:transparent;border:0;box-shadow:none;text-shadow:0 1px #fff8}
    .pinball-deck .tab{background:transparent;border:0;box-shadow:none;color:#76634d}
    .pinball-deck .tab[aria-selected=true]{color:#713f12;border-color:#d18b2e;text-shadow:0 0 7px #f2b54d55}
    .pinball-deck .heading{background:linear-gradient(#fff0cd,#dbb16e);border-color:#8c6737;text-align:left}
    .pinball-deck .track{box-shadow:inset 0 2px 5px #0007,0 1px #fff9}
    .pinball-deck .fill{filter:drop-shadow(0 0 3px #eda63b99)}
    .pinball-deck .needle{filter:drop-shadow(0 1px 1px #fff9)}
    .pinball-deck .tip{border:1px solid #806f58;background:linear-gradient(#fff4d8,#dfc99e);box-shadow:inset 0 1px #fff,0 2px 0 #7b5c34}
    .pinball-deck .bubble{border:1px solid #c08a3d;background:linear-gradient(#3d3830,#1e1b18);box-shadow:0 0 0 2px #fff4,0 5px 12px #0005}
    .pinball-deck dialog{border:3px solid #555a5b;border-radius:8px;background:linear-gradient(#38332b 0 42px,#e8decd 42px);box-shadow:0 0 0 4px #c3b9a9,0 16px 50px #0008}
    .pinball-deck dialog header{color:#f7e1b6;text-transform:uppercase;letter-spacing:.13em}
    .pinball-deck .shell{border:1px solid #806d51;background:linear-gradient(145deg,#fff5df,#ded0b7);box-shadow:inset 0 1px #fff,0 3px 0 #8b6a40,0 5px 10px #0002}
    .pinball-deck .shell[data-variant=success]{border-left:5px solid #68874d}
    .pinball-deck .shell[data-variant=error]{border-left:5px solid #b3322b}
    .pinball-deck nav{border:1px solid #796c5a;background:linear-gradient(#f9efdb,#ded0b8);box-shadow:inset 0 1px #fff,0 2px 0 #897c69}
    .pinball-deck .drop{border:2px dashed #7d6c54;background:linear-gradient(#f4e9d4,#d9c7a6);box-shadow:inset 0 2px 7px #6e573a2a}
    .pinball-deck .drop[data-over=true]{border-color:#c9700f;box-shadow:inset 0 0 0 2px #ecab4f77,0 0 8px #de922e77}
    .pinball-deck .color{border:2px solid #71685b;box-shadow:inset 0 1px #fff,0 2px 0 #7e715e}
  `;

  class Base extends HTMLElement {
    constructor(){
      super();
      this.root=this.attachShadow({mode:'open',delegatesFocus:true});
      try{if(this.constructor.formAssociated)this.internals=this.attachInternals()}catch{this.internals=null}
    }
    connectedCallback(){
      if(!this.ready){
        this.ready=true;
        this.root.innerHTML='<style>'+baseCSS+(this.constructor.css||'')+mechanicalCSS+'</style><div class="pinball-deck">'+this.render()+'</div>';
        this.setup();
        this._disabledObserver=new MutationObserver(()=>this.syncDisabled());
        this._disabledObserver.observe(this,{attributes:true,attributeFilter:['disabled']});
      }
      this.syncDisabled();
      this.syncForm();
    }
    disconnectedCallback(){if(this._disabledObserver)this._disabledObserver.disconnect()}
    $(s){return this.root.querySelector(s)}
    emit(type,detail={}){
      const kit=window.PinballKit;
      if(kit?.sound&&kit.sfx){
        if(type==='change'||type==='toggle')kit.sfx.relay(true);
        else if(type==='open'||type==='show')kit.sfx.kick(.42);
        else if(type==='close'||type==='dismiss'||type==='cancel')kit.sfx.relay(false);
        else if(type==='search')kit.sfx.clack(.25);
      }
      this.dispatchEvent(new CustomEvent(type,{bubbles:true,composed:true,detail}));
    }
    syncDisabled(){this.inert=this.hasAttribute('disabled');this.syncForm()}
    syncForm(){if(!this.internals||typeof this.formValue!=='function')return;try{this.internals.setFormValue(this.hasAttribute('disabled')?null:this.formValue())}catch{}}
    formDisabledCallback(disabled){this.inert=!!disabled||this.hasAttribute('disabled')}
    render(){return ''} setup(){}
  }
  window.PinmotionExtras=Object.freeze({Base,esc,clamp,safeURL,baseCSS,mechanicalCSS});
})();
(() => {
 const {Base,esc}=window.PinmotionExtras;
 class PinballAccordion extends Base {
  static observedAttributes=['labels','open','multiple','label','disabled'];
  static css=':host{display:block;min-width:240px}.item{border:1px solid #c9bead;border-radius:9px;margin:5px 0;overflow:hidden;background:#fffdf7}.heading{width:100%;display:flex;justify-content:space-between;align-items:center;border:0;background:transparent;padding:10px 12px;text-align:left;font-weight:700}.plus{color:#b66c17;font-size:19px}.panel{padding:0 12px 12px;color:#655c51}';
  render(){return '<div class="machine"><div class="label"></div><div class="items"></div></div>'}
  setup(){this.labels=this.parse();this.openSet=new Set((this.getAttribute('open')||'0').split(',').map(Number));this.draw();this.$('.items').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)this.toggle(Number(b.dataset.index),true)});this.$('.items').addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;const bs=[...this.$$('.heading')],i=bs.indexOf(e.target),n=e.key==='Home'?0:e.key==='End'?bs.length-1:(i+(e.key==='ArrowDown'?1:-1)+bs.length)%bs.length;e.preventDefault();bs[n].focus()})}
  $$(s){return [...this.root.querySelectorAll(s)]}
  parse(){return (this.getAttribute('labels')||'Playfield,Scoring,Sound').split(',').map(x=>x.trim()).filter(Boolean).slice(0,8)}
  draw(){if(!this.$('.items'))return;this.$('.label').textContent=this.getAttribute('label')||'Details';this.$('.items').innerHTML=this.labels.map((l,i)=>'<section class="item"><button type="button" class="heading" data-index="'+i+'" aria-expanded="'+this.openSet.has(i)+'" aria-controls="acc-panel-'+i+'"><span>'+esc(l)+'</span><span class="plus">'+(this.openSet.has(i)?'−':'+')+'</span></button><div class="panel" id="acc-panel-'+i+'" '+(this.openSet.has(i)?'':'hidden')+'><slot name="panel-'+i+'"></slot></div></section>').join('')}
  toggle(i,user){if(!this.labels[i])return;if(this.openSet.has(i))this.openSet.delete(i);else{if(!this.hasAttribute('multiple'))this.openSet.clear();this.openSet.add(i)}this.draw();if(user)this.emit('change',{index:i,open:this.openSet.has(i),openItems:[...this.openSet]})}
  get expanded(){return [...this.openSet]} set expanded(v){this.openSet=new Set(Array.isArray(v)?v.map(Number):[]);this.draw()}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='labels')this.labels=this.parse();if(n==='open')this.openSet=new Set((v||'').split(',').map(Number));this.draw()}
 }
 if(!customElements.get('pinball-accordion'))customElements.define('pinball-accordion',PinballAccordion);
})();
