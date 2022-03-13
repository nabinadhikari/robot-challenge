import { Face } from "./types";

export default class Robot {
  private _maxX: number;
  private _maxY: number;

  constructor(boardSize: [number, number] = [5, 5]) {
    this._maxX = boardSize[0];
    this._maxY = boardSize[1];
  }

  private _currentX: number = -1;
  private _currentY: number = -1;
  private _currentFace: Face = Face.NORTH;
  private _isRobotPlaced: boolean = false;

  isRobotPlaced() {
    return this._isRobotPlaced;
  }
  setIsRobotPlaced(placed: boolean) {
    this._isRobotPlaced = placed;
  }
  setCurrentPosition(currentPosition: [number, number]) {
    this._currentX = currentPosition[0];
    this._currentY = currentPosition[1];
  }
  setCurrentFace(newFace: Face) {
    this._currentFace = newFace;
  }
  currentFace() {
    return this._currentFace;
  }
  currentPosition() {
    return [this._currentX, this._currentY];
  }
  isValidMove(x: number, y: number) {
    return x > -1 && y > -1 && x < this._maxX && y < this._maxY;
  }
}
