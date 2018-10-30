import { Actor } from "./actor";
import { style } from "./data";
import { application_width, application_height } from "./index";

export class Background extends PIXI.extras.TilingSprite {
  constructor(texture:PIXI.Texture, width:number, height:number) {
    super(texture, width, height);

    this.name = 'background';
    this.anchor.set(0.5);
    this.scale.set(1, -1);
    this.interactive = true;
  }
  public scale_to_stage() {
    const scale_x = application_width / this.texture.width;
    const scale_y = application_height / this.texture.height;
    const scale = scale_x < scale_y ? scale_x : scale_y;
    console.log('scale', scale);
    this.scale.set(scale, -scale);
  }

  public set_x(num:number) {
    this.tilePosition.x = num;
  }
  public set_y(num:number) {
    this.tilePosition.y = num;
  }
}

export class Scene extends PIXI.Container {
  private background:any;
  public id:string;
  private actors:PIXI.Container;
  constructor(id:string) {
    super();
    this.id = id;
    const image = '../assets/background.jpg';
    const bg_texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(image));
    this.background = new Background(bg_texture, 1800, 900);
    this.addChild(this.background);

    this.actors = new PIXI.Container();
    this.actors.name = 'actors';
    this.addChild(this.actors);

    this.interactive = true;
    this.background.on('pointerdown', this.hide_all_editor.bind(this));
  }

  public hide_all_editor() {
    this.actors.children.forEach((actor:any) => {
      if (actor.getChildByName('sprite_editor')) {
        actor.getChildByName('sprite_editor').hide();
      }
    });
  }

  public get_actors() {
    return this.actors;
  }

  public get_background() {
    return this.background;
  }
}