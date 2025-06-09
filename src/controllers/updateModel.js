import scene from "../core/scene";
import { getTableProps } from "./tableStore";
import Table from "../objects/table";
import Legs from "../objects/legs";
import * as THREE from "three";

let currentTableGroup = null;

export async function updateModel() {
  const props = getTableProps();

  if (currentTableGroup) {
    scene.remove(currentTableGroup);
  }

  const table = new Table({
    topShape: props.shapeId,
    length: props.length,
    width: props.width,
    thick: props.thick,
    material: props.material,
    color: props.color,
  });

  const tableGroup = await table.load();
  if (!tableGroup) {
    console.warn("Nie udało się utworzyć blatu.");
    return;
  }

  const group = new THREE.Group();
  group.add(tableGroup);

  const legs = new Legs({
    tableSize: { width: props.width, length: props.length },
    topThickness: props.thick,
  });

  const legGroup = await legs.load();
  group.add(legGroup);

  scene.add(group);
  currentTableGroup = group;
}
