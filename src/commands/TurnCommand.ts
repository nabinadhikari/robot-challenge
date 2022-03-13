import Robot from "../Robot";
import { Rotation } from "../types";
import BaseCommand from "./BaseCommand";

export default class TurnCommand extends BaseCommand<boolean, Rotation> {
  executeCommand(robot: Robot, payload: Rotation): boolean {
    if (!robot.isRobotPlaced()) return false;
    const currentFaceNum: number = robot.currentFace();
    let nextFaceNum: number =
      payload === Rotation.LEFT ? currentFaceNum - 1 : currentFaceNum + 1;
    if (nextFaceNum > 3) nextFaceNum = 0;
    if (nextFaceNum < 0) nextFaceNum = 3;
    robot.setCurrentFace(nextFaceNum);
    return true;
  }
}
