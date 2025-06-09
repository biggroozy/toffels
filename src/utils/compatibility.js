// utils/compatibility.js
import { legsConfig } from "./legsConfig.js";

export function isLegCompatibleWithTop(topShape, legType) {
  const config = legsConfig[legType];
  if (!config) return false;
  return config.allowedTopShapes.includes(topShape);
}

export function getCompatibleLegs(topShape) {
  return Object.entries(legsConfig)
    .filter(([_, config]) => config.allowedTopShapes.includes(topShape))
    .map(([key]) => key);
}

export function getLegConfig(legType) {
  return legsConfig[legType] || null;
}
