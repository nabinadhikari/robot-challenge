import { Face, Rotation } from "./types";
import {
  getKeyName,
  getFaceFromString,
  getRotationFromString,
} from "./common-methods";

describe("getKeyName", () => {
  it("should return correct value", () => {
    const north = getKeyName(Face.NORTH);
    expect(north).toBe("NORTH");

    const east = getKeyName(Face.EAST);
    expect(east).toBe("EAST");

    const south = getKeyName(Face.SOUTH);
    expect(south).toBe("SOUTH");

    const west = getKeyName(Face.WEST);
    expect(west).toBe("WEST");
  });
});

describe("getFaceFromString", () => {
  it("should return correct Face for correct string", () => {
    const north = getFaceFromString("NORTH");
    expect(north).toBe(Face.NORTH);

    const east = getFaceFromString("EAST");
    expect(east).toBe(Face.EAST);

    const south = getFaceFromString("SOUTH");
    expect(south).toBe(Face.SOUTH);

    const west = getFaceFromString("WEST");
    expect(west).toBe(Face.WEST);
  });

  it("shouldn't return correct Face if case doesn't match", () => {
    const north = getFaceFromString("north");
    expect(north).toBe(null);

    const east = getFaceFromString("East");
    expect(east).toBe(null);

    const south = getFaceFromString("sOUTH");
    expect(south).toBe(null);

    const west = getFaceFromString("wesT");
    expect(west).toBe(null);
  });

  it("shouldn't return correct Face for any other string", () => {
    const fire = getFaceFromString("fire");
    expect(fire).toBe(null);

    const empty = getFaceFromString("");
    expect(empty).toBe(null);

    const paddedString = getFaceFromString("     ");
    expect(paddedString).toBe(null);
  });
});

describe("getRotationFromString", () => {
  it("should return correct Rotation for correct string", () => {
    const left = getRotationFromString("LEFT");
    expect(left).toBe(Rotation.LEFT);

    const right = getRotationFromString("RIGHT");
    expect(right).toBe(Rotation.RIGHT);
  });

  it("shouldn't return correct Rotation if case doesn't match", () => {
    const left = getRotationFromString("Left");
    expect(left).toBe(null);

    const right = getRotationFromString("righT");
    expect(right).toBe(null);
  });

  it("shouldn't return correct Face for any other string", () => {
    const fire = getRotationFromString("fire");
    expect(fire).toBe(null);

    const empty = getRotationFromString("");
    expect(empty).toBe(null);

    const paddedString = getRotationFromString("     ");
    expect(paddedString).toBe(null);
  });
});
