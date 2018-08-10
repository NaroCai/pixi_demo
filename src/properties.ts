import { State } from './state';
export function update_property_panel() {
  const state = State.get_instance();
  const input_list = document.getElementsByTagName('input');
  const actor_id = 'actor';
  for (let i = 0; i < input_list.length; i++) {
    update_input(input_list[i] as any, state, actor_id);
  }
  // if (input_x) {
  //   update_input(input_x as any, state, actor_id);
  // }

  // const input_y = document.getElementById('input_y');
  // if (input_y) {
  //   update_input(input_y as any, state, actor_id);
  // }
}

function update_input(input:HTMLInputElement, state:State, actor_id:string) {
  const actor_state = state.read_state(actor_id);
  input.value = Number((actor_state as any)[input.name]).toFixed(0);
}