import { getKeyName } from "../common-methods";
import Robot from "../Robot";
import BaseCommand from "./BaseCommand";

export default class ReportCommand extends BaseCommand<string, null> {
  executeCommand(robot: Robot): string {
    if (!robot.isRobotPlaced()) {
      return "Robot not placed";
    }
    const [x, y] = robot.currentPosition();
    const report = `${x}, ${y}, ${getKeyName(robot.currentFace())}`;
    return report;
  }
}
