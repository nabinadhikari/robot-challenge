import { Face } from "./types";
import { getKeyName } from "./common-methods";

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
