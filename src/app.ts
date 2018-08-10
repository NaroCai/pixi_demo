import * as PIXI from 'pixi.js';
import { style } from './data';
import { Actor } from './actor';
import { State } from './state';
export class PIXIApp extends PIXI.Application {
  public textures:any = {};
  private actors:{[id:string]:Actor} = {};
  private static app:PIXIApp;
  private state:State;
  constructor(width:number, height:number, options?:PIXI.ApplicationOptions) {
    super(width, height, options);
    this.stage.pivot.set(-width/2, -height/2);
    this.stage.hitArea = new PIXI.Rectangle(-width / 2, -height / 2, width, height);
    this.state = State.get_instance();

    this.load_textures('actor', style.url);
    const texture = this.textures['actor'];
    this.add_actor('actor', texture);
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
  public add_actor(actor_id:string, texture:PIXI.Texture) {
    const actor = new Actor(actor_id, texture);
    this.actors[actor_id] = actor;
    this.stage.addChild(actor);
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
}