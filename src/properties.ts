import { ActorState } from './state';
import { PIXIApp } from './app';
export function init_property_panel() {
  const app = PIXIApp.get_instance();
  const actor_id = 'actor';
  const input_x = document.getElementById('input_x') as HTMLInputElement;
  if (input_x) {
    input_x.onchange = function() {
      const actor = app.get_actor_by_id(actor_id);
      actor.set_x(Number(input_x.value));
    }
  }

  const input_y = document.getElementById('input_y') as HTMLInputElement;
  if (input_y) {
    input_y.onchange = function() {
      const actor = app.get_actor_by_id(actor_id);
      actor.set_y(Number(input_y.value));
    }
  }
}

export function update_input(actor_state:ActorState) {
  const input_list = document.getElementsByTagName('input');
  for (let i = 0; i < input_list.length; i++) {
    const input = input_list[i];
    input.value = Number((actor_state as any)[input.name]).toFixed(0);
  }
}