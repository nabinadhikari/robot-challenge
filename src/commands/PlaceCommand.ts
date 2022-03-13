import Robot from "../Robot";
import { Face } from "../types";
import BaseCommand from "./BaseCommand";

interface PlacePayload {
  x: number;
  y: number;
  face: Face;
}

export default class PlaceCommand extends BaseCommand<boolean, PlacePayload> {
  executeCommand(robot: Robot, payload: PlacePayload): boolean {
    const x = payload.x,
      y = payload.y;
    const face = payload.face;
    if (robot.isValidMove(x, y)) {
      robot.setCurrentPosition([x, y]);
      robot.setCurrentFace(face);
      robot.setIsRobotPlaced(true);
      return true;
    }
    return false;
  }
}
