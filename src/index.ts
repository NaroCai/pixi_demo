import * as PIXI from 'pixi.js';
import { PIXIApp } from './app';
import { init_blocks } from './blocks';
import { init_property_panel } from './properties';
export const application_width = 620;
export const application_height = 750;
const options = {
  backgroundColor: 0xffffff,
}
const config = {
  width: application_width,
  height: application_height,
  options: options,
}
const app = PIXIApp.get_instance(config);
const dom = document.body.getElementsByClassName('canvas')[0];
dom.appendChild(app.view);

init_blocks();
init_property_panel();