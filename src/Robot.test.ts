import Robot, { Face, Rotation } from "./Robot";

let robot: Robot;
beforeEach(() => {
  robot = new Robot();
});
describe("Robot Placement", () => {
  it("should allow placing at valid places", () => {
    const testData = [
      { x: 0, y: 0, expected: true },
      { x: 4, y: 0, expected: true },
      { x: 0, y: 4, expected: true },
      { x: 4, y: 4, expected: true },
    ];
    testData.forEach((td) => {
      const placed = robot.place(td.x, td.y, Face.NORTH);
      expect(placed).toBe(td.expected);
    });
  });
  it("shouldn't allow placing at invalid places", () => {
    const testData = [
      { x: -1, y: -1, expected: false },
      { x: 4, y: 5, expected: false },
      { x: 5, y: 5, expected: false },
      { x: Number.MAX_VALUE, y: Number.MAX_VALUE, expected: false },
    ];
    testData.forEach((td) => {
      const placed = robot.place(td.x, td.y, Face.NORTH);
      expect(placed).toBe(td.expected);
    });
  });
});

describe("Robot Turn", () => {
  it("should turn appropriately", () => {
    const placed = robot.place(0, 0, Face.NORTH);
    robot.turn(Rotation.LEFT);
    expect(robot.currentFace()).toBe(Face.WEST);
    robot.turn(Rotation.LEFT);
    expect(robot.currentFace()).toBe(Face.SOUTH);
    robot.turn(Rotation.LEFT);
    expect(robot.currentFace()).toBe(Face.EAST);
    robot.turn(Rotation.LEFT);
    expect(robot.currentFace()).toBe(Face.NORTH);
    robot.turn(Rotation.LEFT);
    expect(robot.currentFace()).toBe(Face.WEST);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.NORTH);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.EAST);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.SOUTH);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.WEST);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.NORTH);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.EAST);
    robot.turn(Rotation.LEFT);
    expect(robot.currentFace()).toBe(Face.NORTH);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.EAST);
    robot.turn(Rotation.RIGHT);
    expect(robot.currentFace()).toBe(Face.SOUTH);
  });
});
describe("Robot Move", () => {
  it("should move appropriately", () => {
    const placed = robot.place(0, 0, Face.NORTH);
    robot.move();
    expect(robot.currentPosition()).toEqual([0, 1]);
    robot.move();
    expect(robot.currentPosition()).toEqual([0, 2]);
    robot.move();
    expect(robot.currentPosition()).toEqual([0, 3]);
    robot.move();
    expect(robot.currentPosition()).toEqual([0, 4]);
    robot.move();
    expect(robot.currentPosition()).toEqual([0, 4]);
    robot.turn(Rotation.LEFT);
    robot.move();
    expect(robot.currentPosition()).toEqual([0, 4]);
    robot.turn(Rotation.LEFT);
    robot.move();
    expect(robot.currentPosition()).toEqual([0, 3]);
    robot.turn(Rotation.LEFT);
    robot.move();
    expect(robot.currentPosition()).toEqual([1, 3]);
  });
});
