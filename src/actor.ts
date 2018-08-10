import { ActorEditor } from "./actor_editor";
import { State } from "./state";

export class Actor extends PIXI.Sprite {
  public id:string;
  private editor:ActorEditor;
  private is_dragging:boolean = false;
  private drag_data:any;
  private state:State;
  constructor(id:string, texture:PIXI.Texture) {
    super(texture);
    this.id = id;

    this.position.x = 0;
    this.position.y = 0;
    this.anchor.set(0.5);
    this.scale.set(1);
    this.interactive = true;
    this.editor = new ActorEditor(this);
    this.addChild(this.editor);
    this.texture.baseTexture.on('loaded', () => {
      this.editor.set_size(this.width, this.height);
    })
    this.state = State.get_instance();
    this.on('pointerdown', this.pointer_down)
    .on('pointermove', this.pointer_move)
    .on('pointerup', this.pointer_up);
  }
  public move_towards(steps:number) {
    const x = Math.cos(this.rotation) * steps;
    const y = Math.sin(this.rotation) * steps;
    this.move_x(x);
    this.move_y(y);
  }
  public move_x(steps:number) {
    this.position.x += steps;
  }
  public move_y(steps:number) {
    this.position.y += steps;
  }
  public rotate(angle:number) {
    const rotation_value = angle * Math.PI / 180;
    this.rotation = (this.rotation + rotation_value) % (2 * Math.PI);
  }
  private pointer_down(event:PIXI.interaction.InteractionEvent) {
    this.editor.show();
    this.is_dragging = true;
    this.drag_data = event.data;
    this.drag_data.alpha = this.alpha;
    this.drag_data.pointer_position = event.data.getLocalPosition(this.parent);
  }
  private pointer_move(event:PIXI.interaction.InteractionEvent) {
    if (this.is_dragging) {
      const new_pointer = this.drag_data.getLocalPosition(this.parent);
      this.position.x += new_pointer.x - this.drag_data.pointer_position.x;
      this.position.y += new_pointer.y - this.drag_data.pointer_position.y;
      this.drag_data.pointer_position = new_pointer;
      this.state.state_modify(this, 'all');
    }
  }
  private pointer_up() {
    this.is_dragging = false;
  }
}