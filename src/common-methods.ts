import { Face } from "./types";

export function getKeyName(face: Face) {
  return Object.entries(Face).find(([key, val]) => val === face)?.[0];
}
