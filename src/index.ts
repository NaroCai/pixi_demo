import * as PIXI from 'pixi.js';
import { PIXIApp } from './app';
import { Actor } from './actor';
import { init_blocks } from './blocks';
import { update_property_panel } from './properties';
// const renderer = PIXI.autoDetectRenderer(620, 900);
// const stage = new PIXI.Container();
// renderer.render(stage);
const options = {
  backgroundColor: 0x1099bb,
}
// const app = new PIXIApp(620, 900, options);
const config = {
  width: 620,
  height: 750,
  options: options,
}
const app = PIXIApp.get_instance(config);
const dom = document.body.getElementsByClassName('canvas')[0];
dom.appendChild(app.view);

init_blocks();
update_property_panel();