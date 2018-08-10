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

    this.editor_box = new PIXI.Graphics();
    this.addChild(this.editor_box);
    this.rotation_btn = new PIXI.Graphics();
    this.addChild(this.rotation_btn);
    this.scale_buttons = new PIXI.Container();
    this.addChild(this.scale_buttons);

  }
  public set_size(w:number, h:number) {
    this.w = w;
    this.h = h;
    this.draw_box();
    this.draw_buttons();
    this.draw_rotation_btn();
  }
  public draw_box() {
    this.editor_box.clear();
    this.editor_box.lineStyle(4, 0xCCCCCC, 0.5);
    this.editor_box.drawRect(- this.w / 2, - this.h / 2, this.w, this.h);
    this.editor_box.endFill();
  }
  public draw_buttons() {
    this.scale_buttons.children.forEach(child => {
      if (child && child instanceof PIXI.Graphics) {
        child.clear();
      }
    });
    for (let i = 1; i < 5; i++) {
      const scale_btn = new PIXI.Graphics();
      scale_btn.lineStyle(4, 0xCCCCCC, 0.5);
      scale_btn.beginFill(0xFFFFFF, 1);
      const x_offset = i % 2 == 0 ? 0: this.w;
      const y_offset = i < 3 ? 0 : this.h;
      const x = -this.w / 2 - this.scale_btn_size / 2;
      const y = -this.h / 2 - this.scale_btn_size / 2;
      scale_btn.drawRect(x + x_offset, y + y_offset, this.scale_btn_size, this.scale_btn_size);
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
  public rotation_btn_pointerdown() {
    this.dragging_rotation_btn = true;
  }
  public rotation_btn_pointermove(e:PIXI.interaction.InteractionEvent) {
    if (!this.dragging_rotation_btn) {
      return;
    }
    
  }
  public rotation_btn_pointerup() {
    
  }
  public update_editor() {
    this.draw_box();
  }
  public hide() {
    this.visible = false;
  }
  public show() {
    this.visible = true;
  }
}