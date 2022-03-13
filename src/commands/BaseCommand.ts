import Robot from "../Robot";

export default abstract class BaseCommand<T> {
  abstract isValidCommand(command: string): boolean;
  abstract executeCommand(robot: Robot, command: string): T;
}
