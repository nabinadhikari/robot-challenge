import { getKeyName } from "../common-methods";
import Robot from "../Robot";
import BaseCommand from "./BaseCommand";

export default class ReportCommand extends BaseCommand<string> {
  isValidCommand(command: string): boolean {
    return command === "REPORT";
  }
  executeCommand(robot: Robot): string {
    robot.setInPlay(false);
    if (!robot.isRobotPlaced()) {
      return "Robot not placed";
    }
    const [x, y] = robot.currentPosition();
    const report = `${x}, ${y}, ${getKeyName(robot.currentFace())}`;
    return report;
  }
}
