import MoveCommand from "./commands/MoveCommand";
import PlaceCommand from "./commands/PlaceCommand";
import TurnCommand from "./commands/TurnCommand";
import { getKeyName } from "./common-methods";
import Robot from "./Robot";
import { Face, Rotation } from "./types";

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
      const placeCommand = new PlaceCommand();
      const placed = placeCommand.executeCommand(
        robot,
        `PLACE ${td.x},${td.y},NORTH`
      );
      expect(placed).toBe(td.expected);
    });
  });
  it("shouldn't allow placing at invalid places", () => {
    const testData = [
      { x: -1, y: -1, expected: false },
      { x: 4, y: 5, expected: false },
      { x: 5, y: 5, expected: false },
      { x: 1000, y: 1000, expected: false },
    ];
    testData.forEach((td) => {
      const placeCommand = new PlaceCommand();
      const placed = placeCommand.executeCommand(
        robot,
        `PLACE ${td.x},${td.y},NORTH`
      );
      expect(placed).toBe(td.expected);
    });
  });
});

describe("Robot Turn", () => {
  it("should turn appropriately", () => {
    const placeCommand = new PlaceCommand();
    const placed = placeCommand.executeCommand(robot, "PLACE 0,0,NORTH");
    const turnCommand = new TurnCommand();

    turnCommand.executeCommand(robot, "LEFT");
    expect(robot.currentFace()).toBe(Face.WEST);
    turnCommand.executeCommand(robot, "LEFT");
    expect(robot.currentFace()).toBe(Face.SOUTH);
    turnCommand.executeCommand(robot, "LEFT");
    expect(robot.currentFace()).toBe(Face.EAST);
    turnCommand.executeCommand(robot, "LEFT");
    expect(robot.currentFace()).toBe(Face.NORTH);
    turnCommand.executeCommand(robot, "LEFT");
    expect(robot.currentFace()).toBe(Face.WEST);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.NORTH);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.EAST);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.SOUTH);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.WEST);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.NORTH);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.EAST);
    turnCommand.executeCommand(robot, "LEFT");
    expect(robot.currentFace()).toBe(Face.NORTH);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.EAST);
    turnCommand.executeCommand(robot, "RIGHT");
    expect(robot.currentFace()).toBe(Face.SOUTH);
  });
});
describe("Robot Move", () => {
  it("should move appropriately", () => {
    const placeCommand = new PlaceCommand();
    const placed = placeCommand.executeCommand(robot, "PLACE 0,0,NORTH");
    const moveCommand = new MoveCommand();
    const turnCommand = new TurnCommand();
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([0, 1]);
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([0, 2]);
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([0, 3]);
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([0, 4]);
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([0, 4]);
    turnCommand.executeCommand(robot, "LEFT");
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([0, 4]);
    turnCommand.executeCommand(robot, "LEFT");
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([0, 3]);
    turnCommand.executeCommand(robot, "LEFT");
    moveCommand.executeCommand(robot, "MOVE");
    expect(robot.currentPosition()).toEqual([1, 3]);
  });
});
