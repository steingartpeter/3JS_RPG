import { Vector2 } from "three";
import { World } from "./world";

const getKey = (coords) => {
  return `${coords.x}-${coords.y}`;
};
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

  // handle the click on itself
  if ((start.x === end.x) & (start.y === end.y)) {
    return [];
  }

  const maxSearchDistance = 20;
  const visited = new Set();
  const frontier = [start];
  console.log(`path from ${getKey(start)} to ${getKey(end)}`);
  while (frontier.length > 0) {
    // Get the grid element with the shortest disatance metric
    // DIjkstra distance to origin
    // A* distance to origin + esimated distance to destination
    frontier.sort((v1, v2) => {
      const d1 = start.manhattanDistanceTo(v1);
      const d2 = start.manhattanDistanceTo(v2);
      return d1 - d2;
    });

    const candidate = frontier.shift();
    console.log(candidate);
    // Check if we found the end
    if (candidate.x == end.x && candidate.y == end.y) {
      console.log("Found the end...");
      break;
    }

    visited.add(getKey(candidate));
    // Get the neighbors list

    // Check max steps to avoid infinte loop
    if (candidate.manhattanDistanceTo(start) > maxSearchDistance) {
      continue;
    }

    const neighbors = getNeighbours(candidate, world, visited);
    frontier.push(...neighbors);
  }
}

function getNeighbours(coords, world, visited) {
  //<SF>
  // CREATED ON: 2025-03-17 <br>
  // CREATED BY: AX07057<br>
  // Return the neighbouring fields to on coordinat.<br>
  // PARAMETERS:
  //×-
  // @-- coords(Vector2) = the current field for which we looking fot the neighbours -@
  // @-- world(World) = the world in which the cpprds, and the neighbours exist -@
  // @-- visited(Set) = the world in which the cpprds, and the neighbours exist -@
  //-×
  //CHANGES:
  //×-
  // @-- ... -@
  //-×
  //</SF>

  let neighbors = [];
  // Left
  if (coords.x > 0) {
    neighbors.push(new Vector2(coords.x - 1, coords.y));
  }
  // Right
  if (coords.x < world.width - 1) {
    neighbors.push(new Vector2(coords.x + 1, coords.y));
  }
  // Up
  if (coords.y > 0) {
    neighbors.push(new Vector2(coords.x, coords.y - 1));
  }

  // Down
  if (coords.y < world.height - 1) {
    neighbors.push(new Vector2(coords.x, coords.y + 1));
  }
  // Exclude VISITED squares
  neighbors = neighbors.filter((coords) => !visited.has(getKey(coords)));
  return neighbors;
}
