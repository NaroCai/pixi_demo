import * as PIXI from 'pixi.js';
import { style } from './data';
import { Actor } from './actor';
import { State } from './state';
import { Scene } from './scene';
import { application_width, application_height } from './index';
export class PIXIApp extends PIXI.Application {
  public textures:any = {};
  private actors:{[id:string]:Actor} = {};
  private scenes:PIXI.Container;
  private current_scene_id:string;
  private static app:PIXIApp;
  private state:State;
  constructor(width:number, height:number, options?:PIXI.ApplicationOptions) {
    super(width, height, options);
    this.stage.scale.y = -1;
    this.stage.pivot.set(-width/2, height/2);
    this.stage.hitArea = new PIXI.Rectangle(-width / 2, -height / 2, width, height);
    this.state = State.get_instance();

    this.scenes = new PIXI.Container();
    this.stage.addChild(this.scenes);

    this.add_scene('bg');

    this.load_textures('actor', style.url);
    const texture = this.textures['actor'];
    this.add_actor('actor', texture, 'bg');
    this.add_actor('copy_1', texture, 'bg');
  }
  public static get_instance(config?:any) {
    if (!this.app) {
      this.app = new PIXIApp(config.width, config.height, config.options);
    }
    return this.app;
  }
  public load_textures(actor_id:string, image:any) {
    this.textures[actor_id] = new PIXI.Texture(PIXI.BaseTexture.fromImage(image));
  }

  public add_scene(scene_id:string) {
    const scene = new Scene(scene_id);
    this.scenes.addChild(scene);
  }

  public get_scene_by_id(scene_id:string) {
    const scenes = this.scenes.children.filter((scene:Scene) => {
      return scene.id === scene_id;
    }) as Scene[];
    return scenes[0];
  }

  public add_actor(actor_id:string, texture:PIXI.Texture, scene_id:string) {
    const actor = new Actor(actor_id, texture, scene_id);
    this.actors[actor_id] = actor;
    const scene = this.get_scene_by_id(scene_id);
    if (!scene) {
      console.error('No such scene');
    }
    const actors = scene.get_actors();
    actors.addChild(actor);
    this.state.add_actor(actor);
  }
  public get_actor_by_id(id:string) {
    return this.actors[id];
  }
  public move_towards(id:string, steps:number) {
    const actor = this.get_actor_by_id(id);
    if (actor) {
      actor.move_towards(steps);
    } else {
      console.error('actor does not exist');
    }
  }
  public rotate(id:string, angle:number) {
    const actor = this.get_actor_by_id(id);
    if (actor) {
      actor.rotate(angle);
    } else {
      console.error('actor does not exist');
    }
  }
  public reset_states() {
    for(const actor_id in this.actors) {
      const state = this.state.read_state(actor_id);
      this.actors[actor_id] = Object.assign(this.actors[actor_id], state);
    }
  }
  public get_actors() {
    return this.actors;
  }

  public get_background() {
    return (this.scenes.children[0] as any).get_background();
  }

  public detect_color() {
    const actor = this.get_actor_by_id('actor');
    // const renderTexture = PIXI.RenderTexture.create(actor.width, actor.height);
    // this.renderer.render(actor, renderTexture);
    // const filter = new PIXI.SpriteMaskFilter(actor);
    // const vertshader = `
    // attribute vec2 aVertexPosition;
    // attribute vec2 aTextureCoord;
    
    // uniform mat3 projectionMatrix;
    // uniform mat3 otherMatrix;
    
    // varying vec2 vMaskCoord;
    // varying vec2 vTextureCoord;
    
    // void main(void)
    // {
    //     gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    
    //     vTextureCoord = aTextureCoord;
    //     vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
    // }
    // `;
    // const shader = `
    // varying vec2 vMaskCoord;
    // varying vec2 vTextureCoord;
    
    // uniform sampler2D uSampler;
    // uniform sampler2D mask;
    // uniform float alpha;
    // uniform vec4 maskClamp;
    
    // void main(void)
    // {
    //     float clip = step(3.5,
    //         step(maskClamp.x, vMaskCoord.x) +
    //         step(maskClamp.y, vMaskCoord.y) +
    //         step(vMaskCoord.x, maskClamp.z) +
    //         step(vMaskCoord.y, maskClamp.w));
    
    //     vec4 original = texture2D(uSampler, vTextureCoord);
    //     vec4 masky = texture2D(mask, vMaskCoord);
    
    //     original *= (masky.a * alpha * clip);
    
    //     gl_FragColor = original;
    // }
    // `;
    // const filter = new PIXI.Filter(vertshader, shader);
    // this.stage.filters = [filter];

    // const render_texture = PIXI.RenderTexture.create(this.renderer.width, this.renderer.height);
    // this.renderer.render(this.stage, render_texture);

    
    
    
    // const shader = `
    //   precision mediump float;
    //   varying vec2 vTextureCoord;
    //   uniform sampler2D uSampler;
      
    //   void main(void) {
    //     vec4 c = texture2D(uSampler, vTextureCoord);
    //     if (c.a != 0.0) {
    //       c.r = 0.0;
    //     }
    //     gl_FragColor = c;
    //   }
    // `;
    // const filter = new PIXI.Filter(undefined, shader);
    // actor.filters = [filter];
    // actor.tint = 0x00ff00;
    // actor.set_color();
    
    
    // const baseRenderTexture = new PIXI.BaseRenderTexture(this.renderer.width, this.renderer.height);
    // const frame = new PIXI.Rectangle(-actor.width / 2, -actor.height / 2, actor.width, actor.height);
    // actor.x = actor.width / 2;
    // actor.y = actor.height / 2;
    // // actor.scale.y *= -1;
    // this.stage.mask = actor;
    // const renderTexture = PIXI.RenderTexture.create(application_width, application_height);
    // this.stage.mask = actor;
    // this.renderer.render(actor, renderTexture);
    // renderTexture.frame = frame;
    // this.renderer.render(this.stage, renderTexture, false, undefined, false);
    // const canvas = this.renderer.extract.canvas(render_texture);
    // this.stage.filters = null;
    // this.stage.mask = null;
    // actor.scale.y *= -1;
    // const image_data = ctx.getImageData(actor.x + this.renderer.width / 2 - actor.width / 2, -actor.y + this.renderer.height / 2 - actor.height / 2, actor.width, actor.height);
    // console.timeEnd('time');
    // const patternCanvas = document.createElement("canvas");
    // const patternCtx = patternCanvas.getContext("2d") as CanvasRenderingContext2D;
    // patternCanvas.width = actor.width;
    // patternCanvas.height = actor.height;
    // patternCtx.putImageData(image_data, 0, 0);
    // const image = patternCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    // const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    // window.location.href = image;
    // window.open(image);
  }
}