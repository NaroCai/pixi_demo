import * as PIXI from 'pixi.js';
import { Actor } from './actor';
export class ActorEditor extends PIXI.Graphics {
  private editor_box:PIXI.Graphics;
  private scale_buttons:PIXI.Container;
  private rotation_btn:PIXI.Graphics;
  private w:number;
  private h:number;
  private scale_btn_size:number = 20;
  private dragging_rotation_btn = false;
  constructor(actor:Actor) {
    super();
    this.w = actor.width;
    this.h = actor.height;
    this.visible = false;

    this.name = 'sprite_editor';

    this.editor_box = new PIXI.Graphics();
    this.addChild(this.editor_box);
    this.rotation_btn = new PIXI.Graphics();
    this.addChild(this.rotation_btn);
    this.scale_buttons = new PIXI.Container();
    this.addChild(this.scale_buttons);

    this.draw_box();
    this.draw_buttons();

    this.filters = [new PIXI.filters.ColorMatrixFilter()];

  }
  public set_size(w:number, h:number) {
    this.w = w;
    this.h = h;
    this.update_editor();
    this.draw_rotation_btn();
  }
  public draw_box() {
    this.editor_box.clear();
    this.editor_box.lineStyle(4, 0xCCCCCC, 0.5);
    this.editor_box.drawRect(- this.w / 2, - this.h / 2, this.w, this.h);
    this.editor_box.endFill();
  }
  public draw_buttons() {
    for (let i = 1; i < 5; i++) {
      const scale_btn = new PIXI.Graphics();
      scale_btn.lineStyle(4, 0xCCCCCC, 0.5);
      scale_btn.beginFill(0xFFFFFF, 1);
      scale_btn.drawRect(0, 0, this.scale_btn_size, this.scale_btn_size);
      scale_btn.endFill();
      scale_btn.interactive = true;
      this.scale_buttons.addChild(scale_btn);
    }
  }
  public draw_rotation_btn() {
    this.rotation_btn.clear();
    this.rotation_btn.lineStyle(4, 0xCCCCCC, 0.5);
    const x = 0;
    const y = -this.h / 2;
    this.rotation_btn.moveTo(x, y);
    this.rotation_btn.lineTo(x, y - 40);
    this.rotation_btn.beginFill(0xFFFFFF, 1);
    this.rotation_btn.drawCircle(x, y - 40, 10);
    this.rotation_btn.endFill();
    this.rotation_btn.interactive = true;
    this.rotation_btn.on('pointerdown', this.rotation_btn_pointerdown.bind(this));
    this.rotation_btn.on('pointermove', this.rotation_btn_pointermove.bind(this));
    this.rotation_btn.on('pointerup', this.rotation_btn_pointerup.bind(this));
    this.rotation_btn.on('pointerupoutside', this.rotation_btn_pointerup.bind(this));
  }
  public rotation_btn_pointerdown(e:PIXI.interaction.InteractionEvent) {
    e.stopPropagation();
    this.dragging_rotation_btn = true;
  }
  public rotation_btn_pointermove(e:PIXI.interaction.InteractionEvent) {
    if (!this.dragging_rotation_btn) {
      return;
    }
    const sprite = this.parent;
    const x = e.data.getLocalPosition(sprite.parent).x - sprite.x;
    const y = e.data.getLocalPosition(sprite.parent).y - sprite.y;
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    let a = Math.asin(y / distance);
    a = Math.PI / 2 - a;
    if (x < 0) {
      a = a > 0 ? -a : a;
    }
    sprite.rotation = -a;
  }
  public rotation_btn_pointerup() {
    this.dragging_rotation_btn = false;  
  }
  public update_editor() {
    this.draw_box();

    for(let i = 1; i < 5; i++) {
      const scale_btn = this.scale_buttons.children[i-1];
      const x_offset = i % 2 == 0 ? 0: this.w;
      const y_offset = i < 3 ? 0 : this.h;
      const x = -this.w / 2 - this.scale_btn_size / 2;
      const y = -this.h / 2 - this.scale_btn_size / 2;
      scale_btn.x = x + x_offset;
      scale_btn.y = y + y_offset;
    }
  }
  public hide() {
    this.visible = false;
  }
  public show() {
    this.visible = true;
  }
  public set_color() {
    this.tint = 0xffffff;
  }
}