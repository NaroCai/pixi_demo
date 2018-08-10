import { PIXIApp } from "./app";
import { get_functions } from "./blocks";
export interface Task {
  function_name:string,
  args:any,
  entity_id:string,
}

export class RuntimeManager {
  private static instance:RuntimeManager;
  private tasks:Task[] = [];
  private fns:any;
  constructor() {
    this.fns = get_functions();
  }
  public static get_instance() {
    if(!this.instance) {
      this.instance = new RuntimeManager();
    }
    return this.instance;
  }
  public add_task(task:Task) {
    this.tasks.push(task);
  }
  public run() {
    this.tasks.forEach(task => {
      this.fns[task.function_name](task.args, task.entity_id);
    });
  }
  public stop() {
    
  }
  public clear() {
    this.tasks = [];
  }
}