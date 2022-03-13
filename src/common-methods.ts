import { Face, Rotation } from "./types";

export function getKeyName(face: Face) {
  return Object.entries(Face).find(([key, val]) => val === face)?.[0];
}

export function getFaceFromString(face: string): Face | null {
  switch (face) {
    case "NORTH":
      return Face.NORTH;
    case "SOUTH":
      return Face.SOUTH;
    case "EAST":
      return Face.EAST;
    case "WEST":
      return Face.WEST;
    default:
      return null;
  }
}

export function getRotationFromString(rotation: string): Rotation | null {
  switch (rotation) {
    case "LEFT":
      return Rotation.LEFT;
    case "RIGHT":
      return Rotation.RIGHT;
    default:
      return null;
  }
}
