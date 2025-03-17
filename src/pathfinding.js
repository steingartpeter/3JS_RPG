import { Vector2 } from "three";
import { World } from "./world";

export function search(start, end, world) {
  //<SF>
  // CREATED ON: 2025-03-17 <br>
  // CREATED BY: AX07057<br>
  // Search for a short path from start to end on world.<br>
  // PARAMETERS:
  //×-
  // @-- start(Vector2) = the start grid coordinates on world -@
  // @-- end(Vector2) = the end grid coordinates on world -@
  // @-- world(Wrold) = the world, or whole map, on which we need a path -@
  //-×
  //CHANGES:
  //×-
  // @-- ... -@
  //-×
  //</SF>
  const o = world.getObject(start);
  console.log(o);
}
