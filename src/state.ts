import { Actor } from "./actor";
import { update_input } from "./properties";
import { PIXIApp } from "./app";

export interface ActorState {
  x:number,
  y:number,
  rotation:number,
  scale:any,
}
export class State {
  private static instance:State;
  private actors:{[id:string]:ActorState} = {};
  public static get_instance() {
    if (!this.instance) {
      this.instance = new State();
    }
    return this.instance;
  }
  public add_actor(actor:Actor) {
    const actor_state:ActorState = {
      x: actor.x,
      y: actor.y,
      rotation: actor.rotation,
      scale: actor.scale,
    };
    this.actors[actor.id] = actor_state;
  }
  public state_modify(actor:Actor, property:string, value?:any) {
    const actor_id = actor.id;
    const state = this.actors[actor_id];
    if (state) {
      if (property === 'all') {
        this.add_actor(actor);
      } else {
        (state as any)[property] = value;
      }
      update_input(state);
    } else {
      console.warn('no actor state exists');
    }
  }
  public read_state(actor_id:string) {
    return this.actors[actor_id];
  }
  public record_state() {
    const app = PIXIApp.get_instance();
    const actors = app.get_actors();
    for(let actor_id in actors) {
      const actor_state:ActorState = {
        x: actors[actor_id].x,
        y: actors[actor_id].y,
        rotation: actors[actor_id].rotation,
        scale: actors[actor_id].scale,
      }
      this.actors[actor_id] = actor_state;
    }
  }
}