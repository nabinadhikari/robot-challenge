import { getFaceFromString } from "../common-methods";
import Robot from "../Robot";
import { Face } from "../types";
import BaseCommand from "./BaseCommand";

export default class PlaceCommand extends BaseCommand<boolean> {
  private _getXYFFromString(input: string): null | [number, number, Face] {
    const xyf = input.replace("PLACE", "").trim().split(",");
    if (xyf.length !== 3) {
      return null;
    }
    let x: number, y: number, face: Face | null;
    try {
      x = Number.parseInt(xyf[0]);
      y = Number.parseInt(xyf[1]);
      face = getFaceFromString(xyf[2]);
      if (face === null) {
        return null;
      }
      return [x, y, face];
    } catch (e) {
      console.log("=> Error getting x,y,face");
      return null;
    }
  }
  isValidCommand(command: string): boolean {
    return !!this._getXYFFromString(command);
  }
  executeCommand(robot: Robot, command: string): boolean {
    const validCommand = this._getXYFFromString(command);
    if (!validCommand) return false;
    const [x, y, face] = validCommand;
    if (robot.isValidMove(x, y)) {
      robot.setCurrentPosition([x, y]);
      robot.setCurrentFace(face);
      robot.setIsRobotPlaced(true);
      return true;
    }
    return false;
  }
}
