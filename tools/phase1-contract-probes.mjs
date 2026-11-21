// Runtime defaults for every distributed component, evaluated inside each isolated clean-consumer page.
const result = (label, ok, detail = '') => ({ label, ok: !!ok, detail: String(detail) });

export const DEFAULT_CONTRACT_PROBES = Object.freeze({
  toggle: () => {
    const e = document.querySelector('pinball-toggle');
    return [
      result('checked defaults to false', e.checked === false, e.checked),
      result('unchecked controls contribute no form value', e.formValue() === null, e.formValue())
    ];
  },
  slider: () => {
    const e = document.querySelector('pinball-slider');
    return [
      result('value defaults to 0', e.value === 0, e.value),
      result('minimum defaults to 0', e.min === 0, e.min),
      result('maximum defaults to 100', e.max === 100, e.max),
      result('step defaults to 1', e.stepSize === 1, e.stepSize)
    ];
  },
  plunger: () => {
    const e = document.querySelector('pinball-plunger');
    return [result('flip state defaults to false', e.flipped === false, e.flipped)];
  },
  stepper: () => {
    const e = document.querySelector('pinball-stepper');
    return [
      result('value defaults to 0', e.value === 0, e.value),
      result('minimum defaults to 0', e.min === 0, e.min),
      result('maximum defaults to 99', e.max === 99, e.max),
      result('step defaults to 1', e.stepSize === 1, e.stepSize),
      result('automatic digit count defaults to 2', e.digitCount === 2, e.digitCount)
    ];
  },
  targets: () => {
    const e = document.querySelector('pinball-targets');
    return [
      result('default target labels are EMAIL,PUSH,TEXT,CALLS', e.items.join(',') === 'EMAIL,PUSH,TEXT,CALLS', e.items.join(',')),
      result('all targets start unchecked', e.checked.length === 4 && e.checked.every(v => v === false), JSON.stringify(e.checked)),
      result('selected list starts empty', e.selected.length === 0, JSON.stringify(e.selected)),
      result('empty target selection contributes no form value', e.formValue() === '', e.formValue())
    ];
  },
  drain: () => {
    const e = document.querySelector('pinball-drain');
    return [
      result('lifecycle starts ready', e.state === 'ready', e.state),
      result('undo window defaults to 6000ms', e.undoWindow === 6000, e.undoWindow),
      result('remaining time starts at 0', e.remaining === 0, e.remaining)
    ];
  },
  bumper: () => {
    const single = document.querySelector('pinball-bumper');
    const cluster = document.querySelector('pinball-bumpers');
    return [
      result('single bumper cap defaults to 100', single.capText === '100', single.capText),
      result('single bumper points default to 100', single.pointValue === 100, single.pointValue),
      result('single bumper counters start at 0', single.count === 0 && single.score === 0 && single.combo === 0, JSON.stringify({count:single.count,score:single.score,combo:single.combo})),
      result('cluster caps default to 100,500,100', cluster.caps.join(',') === '100,500,100', cluster.caps.join(',')),
      result('cluster counters start at 0', cluster.hits === 0 && cluster.score === 0 && cluster.combo === 0, JSON.stringify({hits:cluster.hits,score:cluster.score,combo:cluster.combo}))
    ];
  },
  checkbox: () => {
    const e = document.querySelector('pinball-checkbox');
    return [
      result('checked defaults to false', e.checked === false, e.checked),
      result('value defaults to on', e.value === 'on', e.value),
      result('unchecked checkbox contributes no form value', e.formValue() === null, e.formValue())
    ];
  },
  'radio-group': () => {
    const e = document.querySelector('pinball-radio-group');
    return [
      result('default radio options are standard,pro,team', e.options.map(x => x.value).join(',') === 'standard,pro,team', e.options.map(x => x.value).join(',')),
      result('first radio option is selected by default', e.value === 'standard', e.value)
    ];
  },
  segmented: () => {
    const e = document.querySelector('pinball-segmented');
    return [
      result('default segments are day,week,month', e.options.map(x => x.value).join(',') === 'day,week,month', e.options.map(x => x.value).join(',')),
      result('first segment is selected by default', e.value === 'day', e.value)
    ];
  },
  progress: () => {
    const e = document.querySelector('pinball-progress');
    return [
      result('progress value defaults to 0', e.value === 0, e.value),
      result('progress maximum defaults to 100', e.max === 100, e.max),
      result('progress starts determinate', !e.hasAttribute('indeterminate'), e.hasAttribute('indeterminate'))
    ];
  },
  meter: () => {
    const e = document.querySelector('pinball-meter');
    return [result('meter value defaults to 0', e.value === 0, e.value)];
  },
  rating: () => {
    const e = document.querySelector('pinball-rating');
    return [
      result('rating value defaults to 0', e.value === 0, e.value),
      result('rating maximum defaults to 5', e.max === 5, e.max)
    ];
  },
  tabs: () => {
    const e = document.querySelector('pinball-tabs');
    return [
      result('default labels are Overview,Details,History', e.labels.join(',') === 'Overview,Details,History', e.labels.join(',')),
      result('active tab defaults to index 0', e.activeIndex === 0, e.activeIndex)
    ];
  },
  accordion: () => {
    const e = document.querySelector('pinball-accordion');
    return [
      result('default labels are Playfield,Scoring,Sound', e.labels.join(',') === 'Playfield,Scoring,Sound', e.labels.join(',')),
      result('first section is expanded by default', e.expanded.length === 1 && e.expanded[0] === 0, JSON.stringify(e.expanded)),
      result('multiple-open mode defaults off', !e.hasAttribute('multiple'), e.hasAttribute('multiple'))
    ];
  },
  disclosure: () => {
    const e = document.querySelector('pinball-disclosure');
    return [result('disclosure starts closed', e.open === false, e.open)];
  },
  tooltip: () => {
    const e = document.querySelector('pinball-tooltip');
    return [
      result('tooltip has a bubble element', !!e.bubble, !!e.bubble),
      result('tooltip starts hidden', e.bubble?.hidden === true, e.bubble?.hidden)
    ];
  },
  dialog: () => {
    const e = document.querySelector('pinball-dialog');
    return [result('dialog starts closed', e.open === false, e.open)];
  },
  toast: () => {
    const e = document.querySelector('pinball-toast');
    return [
      result('default message is Notification', e.message?.textContent === 'Notification', e.message?.textContent),
      result('default variant is info', e.getAttribute('variant') === null || e.getAttribute('variant') === 'info', e.getAttribute('variant') || 'info'),
      result('toast starts hidden', e.panel?.hidden === true, e.panel?.hidden)
    ];
  },
  breadcrumbs: () => {
    const e = document.querySelector('pinball-breadcrumbs');
    const labels = [...e.root.querySelectorAll('li')].map(li => li.textContent.replace('›','').trim());
    return [
      result('default breadcrumb has three items', labels.length === 3, labels.length),
      result('last breadcrumb is current', e.root.querySelector('li:last-child [aria-current="page"]') !== null, labels.join(' / '))
    ];
  },
  pagination: () => {
    const e = document.querySelector('pinball-pagination');
    return [
      result('current page defaults to 1', e.page === 1, e.page),
      result('page count defaults to 10', e.pages === 10, e.pages)
    ];
  },
  search: () => {
    const e = document.querySelector('pinball-search');
    return [
      result('search value defaults to empty', e.value === '', e.value),
      result('placeholder defaults to Search…', e.input?.placeholder === 'Search…', e.input?.placeholder)
    ];
  },
  'text-field': () => {
    const e = document.querySelector('pinball-text-field');
    return [
      result('text field value defaults to empty', e.value === '', e.value),
      result('native input type defaults to text', e.input?.type === 'text', e.input?.type),
      result('required defaults off', e.input?.required === false, e.input?.required),
      result('default visible label is Text', e.root.querySelector('label')?.textContent === 'Text', e.root.querySelector('label')?.textContent)
    ];
  },
  'text-area': () => {
    const e = document.querySelector('pinball-text-area');
    return [
      result('text area value defaults to empty', e.value === '', e.value),
      result('visible row count defaults to 4', e.area?.rows === 4, e.area?.rows),
      result('required defaults off', e.area?.required === false, e.area?.required),
      result('default visible label is Message', e.root.querySelector('label')?.textContent === 'Message', e.root.querySelector('label')?.textContent)
    ];
  },
  select: () => {
    const e = document.querySelector('pinball-select');
    return [
      result('default select has three options', e.options.length === 3, e.options.length),
      result('first option basic is selected by default', e.value === 'basic', e.value)
    ];
  },
  combobox: () => {
    const e = document.querySelector('pinball-combobox');
    return [
      result('default combobox has four options', e.options.length === 4, e.options.length),
      result('combobox value defaults to empty', e.value === '', e.value),
      result('placeholder defaults to Start typing…', e.input?.placeholder === 'Start typing…', e.input?.placeholder),
      result('listbox starts closed', e.opened === false, e.opened)
    ];
  },
  'file-drop': () => {
    const e = document.querySelector('pinball-file-drop');
    return [
      result('files defaults to an empty array', Array.isArray(e.files) && e.files.length === 0, JSON.stringify(e.files)),
      result('multiple selection defaults off', e.input?.multiple === false, e.input?.multiple),
      result('accept filter defaults empty', e.input?.accept === '', e.input?.accept)
    ];
  },
  'date-picker': () => {
    const e = document.querySelector('pinball-date-picker');
    return [
      result('date value defaults empty', e.value === '', e.value),
      result('minimum date defaults empty', e.input?.min === '', e.input?.min),
      result('maximum date defaults empty', e.input?.max === '', e.input?.max)
    ];
  },
  'color-picker': () => {
    const e = document.querySelector('pinball-color-picker');
    return [
      result('color value defaults to #c9700f', e.value.toLowerCase() === '#c9700f', e.value),
      result('hex readout defaults uppercase', e.root.querySelector('.hex')?.textContent === '#C9700F', e.root.querySelector('.hex')?.textContent)
    ];
  }
});
