// utils/legsConfig.js
export const defaultLegsForTop = {
  rectangle: "single_leg02",
  round: "single_leg01",
  square: "single_leg01",
  ovaal: "single_leg02",
  round_rectangle: "single_leg02",
};

export const legsConfig = {
  single_leg01: {
    type: "single",
    allowedTopShapes: ["rectangle", "round", "square"],
    offsetY: 0,
  },
  single_leg02: {
    type: "single",
    allowedTopShapes: ["rectangle", "ovaal", "round_rectangle"],
    offsetY: 0,
  },
  single_leg03: {
    type: "single",
    allowedTopShapes: ["rectangle", "round_rectangle", "ovaal"],
    offsetY: 0,
  },
  quad_leg01: {
    type: "quad",
    allowedTopShapes: ["rectangle", "square"],
    offsetY: 0,
  },
  double_leg01: {
    type: "double",
    allowedTopShapes: ["rectangle"],
    offsetY: 0,
  },
  double_leg02: {
    type: "double",
    allowedTopShapes: ["rectangle"],
    offsetY: 0,
  },
};
