import { Face, Rotation } from "./types";
import { getKeyName } from "./common-methods";

export default class Robot {
  private _maxX: number;
  private _maxY: number;

  constructor(boardSize: number = 5) {
    this._maxX = boardSize;
    this._maxY = boardSize;
  }

  private _currentX: number = -1;
  private _currentY: number = -1;
  private _currentFace: Face = Face.NORTH;
  private _isRobotPlaced: boolean = false;

  isRobotPlaced() {
    return this._isRobotPlaced;
  }
  currentFace() {
    return this._currentFace;
  }
  currentPosition() {
    return [this._currentX, this._currentY];
  }
  report() {
    return `${this._currentX}, ${this._currentY}, ${getKeyName(
      this._currentFace
    )}`;
  }
  private _isValidMove(x: number, y: number) {
    return x > -1 && y > -1 && x < this._maxX && y < this._maxY;
  }
  move(): boolean {
    if (!this._isRobotPlaced) return false;
    let nextX = this._currentX;
    let nextY = this._currentY;
    switch (this._currentFace) {
      case Face.NORTH:
        nextY++;
        break;
      case Face.EAST:
        nextX++;
        break;
      case Face.SOUTH:
        nextY--;
        break;
      case Face.WEST:
        nextX--;
        break;
    }
    if (this._isValidMove(nextX, nextY)) {
      this._currentX = nextX;
      this._currentY = nextY;
      return true;
    }
    return false;
  }
  turn(rotation: Rotation): boolean {
    if (!this._isRobotPlaced) return false;
    const currentFaceNum: number = this._currentFace;
    let nextFaceNum: number =
      rotation === Rotation.LEFT ? currentFaceNum - 1 : currentFaceNum + 1;
    if (nextFaceNum > 3) nextFaceNum = 0;
    if (nextFaceNum < 0) nextFaceNum = 3;
    this._currentFace = nextFaceNum;
    return true;
  }
  place(x: number, y: number, face: Face): boolean {
    if (this._isValidMove(x, y)) {
      this._currentX = x;
      this._currentY = y;
      this._currentFace = face;
      this._isRobotPlaced = true;
      return true;
    }
    return false;
  }
}
