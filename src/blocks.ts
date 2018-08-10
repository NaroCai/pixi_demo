import { PIXIApp } from './app';
import { RuntimeManager, Task } from './runtime_manager';
import { State } from './state';

export function init_blocks() {
  const actor_id = 'actor';
  const run_manager = RuntimeManager.get_instance();
  const state = State.get_instance();
  const move_towards = document.getElementById('move_towards');
  const block_list = document.getElementById('content');
  const app = PIXIApp.get_instance();
  if (move_towards) {
    move_towards.onclick = function() {
      const args = {
        steps: 10,
      }
      add_task(block_list, run_manager, 'move_towards', args, actor_id);
    }
  }
  const rotate = document.getElementById('rotate');
  if (rotate) {
    rotate.onclick = function() {
      const args = {
        angle: 10,
      }
      add_task(block_list, run_manager, 'rotate', args, actor_id);
    }
  }
  const run_button = document.getElementById('run');
  if (run_button) {
    run_button.onclick = function() {
      run_manager.run();
      state.record_state();
    }
  }
  const clear_button = document.getElementById('clear');
  if (clear_button) {
    clear_button.onclick = function() {
      if (block_list) {
        block_list.innerHTML = '';
      }
      run_manager.clear();
      app.reset_states();
    }
  }
}

function add_task(dom:HTMLElement|null, run_manager:RuntimeManager, function_name:string, args:any, entity_id:string) {
  const task:Task = {
    function_name,
    args,
    entity_id,
  }
  run_manager.add_task(task);
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(function_name));
  if (dom) {
    dom.appendChild(div);
  }
}

export function get_functions() {
  const app = PIXIApp.get_instance();
  const f = {
    move_towards: function move_towards(args:any, entity_id:string) {
      app.move_towards(entity_id, args.steps);
    },
    rotate: function rotate(args:any, entity_id:string) {
      app.rotate(entity_id, args.angle);
    }
  }
  return f;
}