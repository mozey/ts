import habitat from 'preact-habitat';

import Widget from './component';

const _habitat = habitat(Widget);

_habitat.render({
  // selector: '[data-widget-host="habitat"]',
  selector: 'my-widget',
  clean: true
});
