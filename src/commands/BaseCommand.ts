import Robot from "../Robot";

export default abstract class BaseCommand<T, U> {
  // abstract isValidCommand(command: string): boolean;
  abstract executeCommand(robot: Robot, payload: U): T;
}
