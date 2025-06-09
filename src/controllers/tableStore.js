import { allShapes, allLegs } from "./tablesTable";

const tableProps = {
  shapeId: 0,
  legId: 5,
  material: "dab",
  color: "#ffffff",
  length: 200,
  width: 100,
  thick: 4,
  height: 75,
};

const subscribers = [];

function getTableProps() {
  return { ...tableProps }; // Zwraca kopię, nie referencję
}

function updateProp(key, value) {
  tableProps[key] = value;

  if (key === "shapeId") {
    const newShape = allShapes.find((s) => s.id === value);
    if (newShape) {
      tableProps.legId = newShape.defaultLegId;
    }
  }

  notifySubscribers();
}

function onChange(callback) {
  subscribers.push(callback);
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb(getTableProps()));
}

function getCurrentShape() {
  return allShapes.find((s) => s.id === tableProps.shapeId);
}

function getCurrentLeg() {
  return allLegs.find((l) => l.id === tableProps.legId);
}

export { getTableProps, updateProp, onChange, getCurrentShape, getCurrentLeg };
