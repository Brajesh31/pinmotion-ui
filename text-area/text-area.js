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
      padding:30px 10px 10px;border:2px solid #62686a;border-radius:10px;
      background:
        radial-gradient(circle at 9px 9px,#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        radial-gradient(circle at calc(100% - 9px) 9px,#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        radial-gradient(circle at 9px calc(100% - 9px),#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        radial-gradient(circle at calc(100% - 9px) calc(100% - 9px),#fff 0 1px,#bfc3c3 1.2px 2px,#5d6264 2.2px 3.4px,transparent 3.8px),
        linear-gradient(138deg,#f9f5eb 0%,#b6b5b0 20%,#e5e0d6 43%,#f8f1e4 72%,#aaa9a4 100%);
      box-shadow:inset 0 1px 2px #fff,inset 0 -4px 10px #3c352c32,0 3px 0 #55514a,0 6px 12px #21180f36;
    }
    .pinball-deck:before{
      content:none;
    }
    .pinball-deck:after{
      content:"";position:absolute;right:8px;top:5px;width:17px;height:17px;border-radius:50%;
      background:radial-gradient(circle at 28% 23%,#fff 0 6%,#e4e9e9 10%,#a5afb2 27%,#596267 49%,#e7eeee 63%,#60686b 79%,#30383b 100%);
      border:1px solid #545b5e;box-shadow:0 0 0 1px #f8f5ed,0 1px 3px #17130e88;
      pointer-events:none;z-index:6;
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

    .backglass{position:absolute!important;left:8px;right:31px;top:3px;height:20px;z-index:7!important;display:flex;align-items:center;gap:5px;overflow:visible;color:#42382c;pointer-events:none}
    .backglass svg{flex:none;width:25px;height:16px;overflow:visible;fill:none;stroke:#b37a32;stroke-width:1.35;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px #fff9)}
    .backglass-brand{color:#443729;font:800 7.5px/1 "Century Gothic",Arial,sans-serif;letter-spacing:.11em;white-space:nowrap;text-shadow:0 1px #fff9}
    .backglass-brand b{color:#be7929;padding:0 2px}
    .backglass-code{color:#815523;font:700 7px/1 ui-monospace,monospace;letter-spacing:.08em;border-left:1px solid #8b7b6755;padding-left:5px}
    .backglass-lamps{display:flex;align-items:center;gap:3px;margin-left:auto;padding-right:3px}
    .backglass-lamps i{display:block;width:5px;height:5px;border-radius:50%;background:#645b4e;border:1px solid #302a22;box-shadow:inset 0 1px 1px #0009}
    .backglass-lamps i.on{background:radial-gradient(circle at 30% 25%,#fff8d1,#ffc04a 42%,#a74b09 88%);border-color:#8c551d;box-shadow:0 0 4px 2px #e9a13b99,0 0 8px #e78d2988,inset 0 1px #fff}
    .chrome-ball{position:absolute;right:-25px;top:-2px;width:26px;height:26px;padding:0;opacity:0;display:block;overflow:visible;border:0;background:transparent;filter:drop-shadow(0 1px 2px #22180f88);transition:opacity .12s ease}
    .pinball-deck.has-live-ball .chrome-ball{opacity:1}
    .pinball-deck.has-live-ball:after{opacity:0}
    .pinball-deck.impact .chrome-ball{animation:chrome-impact .32s cubic-bezier(.2,.8,.3,1)}
    .pinball-deck.impact:after{animation:chrome-impact .32s cubic-bezier(.2,.8,.3,1)}
    @keyframes chrome-impact{0%{translate:0 0;rotate:0deg}38%{translate:-2px 1px;rotate:-18deg}72%{translate:1px -1px;rotate:10deg}100%{translate:0 0;rotate:0deg}}
    @media (prefers-reduced-motion:reduce){.chrome-ball{transition:none!important}.pinball-deck.impact .chrome-ball,.pinball-deck.impact:after{animation:none!important}}

    @media (prefers-reduced-motion:reduce){
      .pinball-deck button{transition:none!important}
    }
  `;


  // Component-specific vector backglass emblems. These are decorative motifs, not photographic plate replacements.
  const MODELS = Object.freeze({
    'pinball-checkbox': { name:'CHECKBOX', code:'01', svg:'<rect x="5" y="3" width="14" height="14" rx="3"/><path d="m8 10 3 3 6-7"/><path d="M23 6h5M23 11h5M23 16h5"/>' },
    'pinball-radio-group': { name:'RADIO BANK', code:'02', svg:'<circle cx="8" cy="10" r="5"/><circle cx="8" cy="10" r="2"/><circle cx="21" cy="10" r="5"/><circle cx="21" cy="10" r="2"/>' },
    'pinball-segmented': { name:'SEGMENT RAIL', code:'03', svg:'<rect x="3" y="4" width="26" height="12" rx="3"/><path d="M12 4v12M21 4v12"/><rect x="4" y="5" width="7" height="10" rx="2" fill="#d18a2b" stroke="#ffe2a5"/>' },
    'pinball-progress': { name:'LAMP LANE', code:'04', svg:'<path d="M3 10h26"/><circle cx="6" cy="10" r="2"/><circle cx="13" cy="10" r="2"/><circle cx="20" cy="10" r="2"/><circle cx="27" cy="10" r="2"/><path d="M4 4v12M28 4v12"/>' },
    'pinball-meter': { name:'GAUGE', code:'05', svg:'<path d="M4 16a12 12 0 0 1 24 0"/><path d="M16 15 23 7"/><circle cx="16" cy="15" r="2.5"/><path d="M7 17h18"/>' },
    'pinball-rating': { name:'STAR TARGET', code:'06', svg:'<path d="m8 3 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z"/><path d="M19 5h10M19 10h8M19 15h6"/>' },
    'pinball-tabs': { name:'SELECTOR BANK', code:'07', svg:'<path d="M3 6h8v10H3zM12 4h8v12h-8zM21 6h8v10h-8z"/><path d="M5 18h22"/>' },
    'pinball-accordion': { name:'HINGED PANELS', code:'08', svg:'<rect x="3" y="3" width="26" height="4" rx="1"/><rect x="3" y="9" width="26" height="4" rx="1"/><rect x="3" y="15" width="26" height="4" rx="1"/><path d="M25 4v2M25 10v2M25 16v2"/>' },
    'pinball-disclosure': { name:'LATCH', code:'09', svg:'<path d="M4 4h24v13H4z"/><path d="m11 8 5 5 5-5"/><circle cx="7" cy="7" r="1"/><circle cx="25" cy="7" r="1"/>' },
    'pinball-tooltip': { name:'CALLOUT', code:'10', svg:'<path d="M4 3h24v12H15l-5 4v-4H4z"/><circle cx="11" cy="9" r="1"/><circle cx="16" cy="9" r="1"/><circle cx="21" cy="9" r="1"/>' },
    'pinball-dialog': { name:'BACKGLASS WINDOW', code:'11', svg:'<rect x="3" y="3" width="26" height="16" rx="2"/><path d="M3 7h26M7 5h1M10 5h1M14 11h14M14 15h10"/>' },
    'pinball-toast': { name:'SIGNAL BEACON', code:'12', svg:'<path d="M10 16a6 6 0 1 1 12 0"/><path d="M7 16h18v3H7zM13 4V2M5 7 3 5M27 7l2-2"/><circle cx="16" cy="10" r="2" fill="#d18a2b"/>' },
    'pinball-breadcrumbs': { name:'TRACK LINKS', code:'13', svg:'<path d="M4 10h24"/><circle cx="5" cy="10" r="3"/><circle cx="16" cy="10" r="3"/><circle cx="27" cy="10" r="3"/><path d="M8 7 11 10 8 13M19 7l3 3-3 3"/>' },
    'pinball-pagination': { name:'SCORE REELS', code:'14', svg:'<rect x="3" y="4" width="26" height="12" rx="2"/><path d="M11 4v12M20 4v12"/><path d="M6 8h3M14 8h3M23 8h3"/><circle cx="7.5" cy="13" r="1"/><circle cx="16" cy="13" r="1"/><circle cx="25" cy="13" r="1"/>' },
    'pinball-search': { name:'RADAR SCAN', code:'15', svg:'<circle cx="13" cy="9" r="6"/><path d="m18 14 8 6"/><path d="M13 4v5l4 2"/><path d="M23 4h6M25 8h4"/>' },
    'pinball-text-field': { name:'INPUT RAIL', code:'16', svg:'<rect x="3" y="5" width="26" height="10" rx="2"/><path d="M7 10h13M22 8v4"/><circle cx="25" cy="10" r="1"/>' },
    'pinball-text-area': { name:'PAPER FEED', code:'17', svg:'<path d="M7 2h17l5 5v12H7z"/><path d="M24 2v5h5M11 11h14M11 15h14"/><path d="M3 5v13"/>' },
    'pinball-select': { name:'SELECT LEVER', code:'18', svg:'<path d="M4 16h24"/><path d="M16 16 22 5"/><circle cx="22" cy="5" r="3"/><path d="M8 13v6M24 13v6"/>' },
    'pinball-combobox': { name:'CHOICE TRACK', code:'19', svg:'<rect x="3" y="3" width="26" height="5" rx="1"/><path d="M5 12h22M5 16h17"/><circle cx="25" cy="13" r="3" fill="#d18a2b"/>' },
    'pinball-file-drop': { name:'FEED CHUTE', code:'20', svg:'<path d="M10 3h12l-2 6H12zM12 9h8l-2 6h-4z"/><path d="M16 2v5M13 4l3 3 3-3"/><path d="M8 18h16"/>' },
    'pinball-date-picker': { name:'DATE CLOCK', code:'21', svg:'<rect x="3" y="4" width="26" height="15" rx="2"/><path d="M3 8h26M9 2v4M23 2v4M9 12h4M17 12h5M9 16h4"/>' },
    'pinball-color-picker': { name:'COLOR LAMPS', code:'22', svg:'<circle cx="8" cy="10" r="5" fill="#bd3d2d"/><circle cx="16" cy="10" r="5" fill="#d6a12c"/><circle cx="24" cy="10" r="5" fill="#397d75"/>' }
  });
  const deckHeader = (tag) => {
    const model = MODELS[tag] || MODELS['pinball-checkbox'];
    return '<div class="backglass" aria-hidden="true" data-model="' + tag + '">' +
      '<svg viewBox="0 0 32 20" focusable="false">' + model.svg + '</svg>' +
      '<span class="backglass-brand">PINBALL <b>·</b> ' + model.name + '</span>' +
      '<span class="backglass-code">' + model.code + '</span>' +
      '<span class="backglass-lamps"><i></i><i></i><i></i></span>' +
      '<canvas class="chrome-ball" width="64" height="64"></canvas></div>';
  };
  let chromeProgram = null;
  let chromeProgramOwner = null;


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
    captureFormState(){
      const state={};
      if('checked' in this){const value=this.checked;if(value!==undefined)state.checked=value}
      if('value' in this){const value=this.value;if(value!==undefined&&(value===null||['string','number','boolean'].includes(typeof value)||Array.isArray(value)))state.value=value}
      return state;
    }
    restoreFormState(state){
      let snapshot=state;
      if(typeof state==='string'){try{snapshot=JSON.parse(state)}catch{snapshot={value:state}}}
      if(!snapshot||typeof snapshot!=='object')snapshot={value:snapshot};
      if(Object.prototype.hasOwnProperty.call(snapshot,'checked')&&'checked' in this)this.checked=snapshot.checked;
      if(Object.prototype.hasOwnProperty.call(snapshot,'value')&&'value' in this)this.value=snapshot.value;
      this.syncForm();
    }
    formResetCallback(){if(this._formDefaults)this.restoreFormState(this._formDefaults)}
    formStateRestoreCallback(state){this.restoreFormState(state)}

    constructor(){
      super();
      this.root=this.attachShadow({mode:'open',delegatesFocus:true});
      try{if(this.constructor.formAssociated)this.internals=this.attachInternals()}catch{this.internals=null}
    }
    connectedCallback(){
      if(!this.ready){
        this.ready=true;
        this.root.innerHTML='<style>'+baseCSS+(this.constructor.css||'')+mechanicalCSS+'</style><div class="pinball-deck">'+deckHeader(this.localName)+this.render()+'</div>';
        this.setup();
        if(this.internals)this._formDefaults=this.captureFormState();
        this.tryChromeRenderer();
        this._disabledObserver=new MutationObserver(()=>this.syncDisabled());
        this._disabledObserver.observe(this,{attributes:true,attributeFilter:['disabled']});
      }
      this.syncDisabled();
      this.syncForm();
    }
    disconnectedCallback(){if(this._disabledObserver)this._disabledObserver.disconnect();clearTimeout(this._lampTimer);clearTimeout(this._impactTimer);if(this._ballFrame)cancelAnimationFrame(this._ballFrame)}
    $(s){return this.root.querySelector(s)}
    emit(type,detail={}){
      const kit=window.PinballKit;
      if(kit?.sound&&kit.sfx){
        if(type==='change'||type==='toggle')kit.sfx.relay(true);
        else if(type==='open'||type==='show')kit.sfx.kick(.42);
        else if(type==='close'||type==='dismiss'||type==='cancel')kit.sfx.relay(false);
        else if(type==='search')kit.sfx.clack(.25);
      }
      this.pulseDeck(type);
      this.dispatchEvent(new CustomEvent(type,{bubbles:true,composed:true,detail}));
    }

    tryChromeRenderer(){
      const kit=window.PinballKit,canvas=this.$('.chrome-ball');
      if(!canvas||!kit?.glsl?.head||!kit?.glsl?.ball||typeof kit.program!=='function'||typeof kit.paint!=='function')return false;
      try{
        if(!chromeProgram||chromeProgramOwner!==kit){
          const fragment=kit.glsl.head+'\n'+
            'vec4 scene(vec2 p){\n'+
            'float lane=1.0-smoothstep(0.015,0.12,abs(p.y-0.66));\n'+
            'float rail=1.0-smoothstep(0.006,0.024,min(abs(p.x-0.16),abs(p.x-0.84)));\n'+
            'float grain=sin(p.x*92.0+p.y*31.0)*0.018;\n'+
            'vec3 wood=vec3(0.34,0.25,0.16)+grain;\n'+
            'return vec4(wood,clamp(max(lane*0.72,rail*0.5),0.0,0.82));\n'+
            '}\n'+kit.glsl.ball+'\n'+
            'void main(){\n'+
            'vec2 p=uView.xy+vUv*uView.zw;\n'+
            'vec4 under=shadow(scene(p),p);\n'+
            'gl_FragColor=ball(p,under);\n'+
            '}';
          chromeProgram=kit.program(kit.glsl.vs,fragment);
          chromeProgramOwner=kit;
        }
        if(!chromeProgram||!kit.getGL?.())return false;
        canvas.width=64;canvas.height=64;
        const painted=kit.paint(chromeProgram,64,64,(gl,u)=>{
          gl.uniform4f(u.uView,0,0,1,1);
          gl.uniform3f(u.uBall,0.5,0.5,0.34);
          gl.uniform1f(u.uRoll,this._ballRoll||0);
          gl.uniform1f(u.uPx,1/64);
          gl.uniform3f(u.uPage,0.95,0.93,0.88);
        },canvas);
        if(!painted)return false;
        this.$('.pinball-deck')?.classList.add('has-live-ball');
        return true;
      }catch{
        this.$('.pinball-deck')?.classList.remove('has-live-ball');
        return false;
      }
    }
    paintChromeBall(){return this.tryChromeRenderer()}
    rollChromeBall(type){
      const deck=this.$('.pinball-deck');
      if(deck){
        deck.classList.remove('impact');deck.classList.add('impact');
        clearTimeout(this._impactTimer);
        this._impactTimer=setTimeout(()=>deck.classList.remove('impact'),360);
      }
      const delta=type==='change'||type==='toggle'?0.95:type==='open'||type==='show'?1.2:type==='search'?0.72:0.48;
      if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
        this._ballRoll=(this._ballRoll||0)+delta;this.paintChromeBall();return;
      }
      if(this._ballFrame)cancelAnimationFrame(this._ballFrame);
      const from=this._ballRoll||0,to=from+delta,started=performance.now(),duration=300;
      const frame=(now)=>{
        const t=Math.min(1,(now-started)/duration),eased=1-Math.pow(1-t,3);
        this._ballRoll=from+(to-from)*eased;this.paintChromeBall();
        if(t<1)this._ballFrame=requestAnimationFrame(frame);else this._ballFrame=0;
      };
      this._ballFrame=requestAnimationFrame(frame);
    }
    pulseDeck(type){
      const lamps=this.root.querySelectorAll('.backglass-lamps i');
      const index=type==='open'||type==='show'||type==='search'?1:type==='close'||type==='dismiss'||type==='cancel'?2:0;
      lamps.forEach((lamp,i)=>lamp.classList.toggle('on',i===index));
      clearTimeout(this._lampTimer);
      this._lampTimer=setTimeout(()=>lamps.forEach(lamp=>lamp.classList.remove('on')),220);
      this.tryChromeRenderer();this.rollChromeBall(type);
    }

    syncDisabled(){this.inert=this.hasAttribute('disabled');this.syncForm()}
    syncForm(){if(!this.internals||typeof this.formValue!=='function')return;try{this.internals.setFormValue(this.hasAttribute('disabled')?null:this.formValue(),JSON.stringify(this.captureFormState()))}catch{}}
    formDisabledCallback(disabled){this.inert=!!disabled||this.hasAttribute('disabled');this.syncForm()}
    render(){return ''} setup(){}
  }
  window.PinmotionExtras=Object.freeze({Base,esc,clamp,safeURL,baseCSS,mechanicalCSS});
})();
(() => {
 const {Base}=window.PinmotionExtras;
 class PinballTextArea extends Base {
  static formAssociated=true; static observedAttributes=['value','label','placeholder','rows','maxlength','required','disabled'];
  static css=':host{width:min(340px,90vw)}.field{display:grid;gap:6px}.area{width:100%;min-height:90px;resize:vertical;border:1px solid #aaa08f;border-radius:9px;background:#fffdf8;padding:10px 11px;color:#28231d}.counter{font-size:11px;color:#766d62;text-align:right}';
  render(){return '<div class="machine field"><label class="label" for="area"></label><textarea class="area" id="area"></textarea><span class="counter"></span></div>'}
  setup(){this.area=this.$('textarea');this.area.value=this.getAttribute('value')||'';this.area.placeholder=this.getAttribute('placeholder')||'';this.area.rows=Number(this.getAttribute('rows')||4);if(this.hasAttribute('maxlength'))this.area.maxLength=Number(this.getAttribute('maxlength'));this.area.required=this.hasAttribute('required');this.$('label').textContent=this.getAttribute('label')||'Message';this.area.addEventListener('input',()=>{this.syncForm();this.updateCount();this.emit('input',{value:this.value})});this.area.addEventListener('change',()=>this.emit('change',{value:this.value}));this.updateCount()}
  get value(){return this.area?.value||''} set value(v){if(this.area)this.area.value=String(v);this.syncForm();this.updateCount()}
  formValue(){return this.value}
  updateCount(){if(this.$('.counter'))this.$('.counter').textContent=this.hasAttribute('maxlength')?this.value.length+' / '+this.getAttribute('maxlength'):''}
  attributeChangedCallback(n,o,v){if(!this.ready||o===v)return;if(n==='value'&&this.area)this.area.value=v||'';if(n==='label')this.$('label').textContent=v||'Message';if(n==='placeholder'&&this.area)this.area.placeholder=v||'';if(n==='rows'&&this.area)this.area.rows=Number(v||4);if(n==='maxlength'&&this.area){this.area.maxLength=v===null?-1:Number(v);this.updateCount()}if(n==='required'&&this.area)this.area.required=v!==null}
 }
 if(!customElements.get('pinball-text-area'))customElements.define('pinball-text-area',PinballTextArea);
})();
