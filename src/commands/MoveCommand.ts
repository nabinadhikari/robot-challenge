import Robot from "../Robot";
import { Face } from "../types";
import BaseCommand from "./BaseCommand";

export default class MoveCommand extends BaseCommand<boolean> {
  isValidCommand(command: string): boolean {
    return command === "MOVE";
  }
  executeCommand(robot: Robot, command: string): boolean {
    if (!robot.isRobotPlaced()) return false;
    let [x, y] = robot.currentPosition();
    switch (robot.currentFace()) {
      case Face.NORTH:
        y++;
        break;
      case Face.EAST:
        x++;
        break;
      case Face.SOUTH:
        y--;
        break;
      case Face.WEST:
        x--;
        break;
    }
    if (robot.isValidMove(x, y)) {
      robot.setCurrentPosition([x, y]);
      return true;
    }
    return false;
  }
}
