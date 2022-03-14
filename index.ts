import Robot from "./src/Robot";
import PlaceCommand from "./src/commands/PlaceCommand";
import MoveCommand from "./src/commands/MoveCommand";
import TurnCommand from "./src/commands/TurnCommand";
import ReportCommand from "./src/commands/ReportCommand";

const robot = new Robot();
const placeCommand = new PlaceCommand();
const moveCommand = new MoveCommand();
const turnCommand = new TurnCommand();
const reportCommand = new ReportCommand();

process.stdin.on("data", (data) => {
  handleCommand(data.toString().trim());
  if (!robot.inPlay()) process.exit();
});

function handleCommand(command: string) {
  if (placeCommand.isValidCommand(command)) {
    placeCommand.executeCommand(robot, command);
  } else if (moveCommand.isValidCommand(command)) {
    moveCommand.executeCommand(robot, command);
  } else if (turnCommand.isValidCommand(command)) {
    turnCommand.executeCommand(robot, command);
  } else if (reportCommand.isValidCommand(command)) {
    console.log(reportCommand.executeCommand(robot));
  } else {
    console.log("=> Invalid command");
  }
}
process.stdout.write(`
=== Robot Challenge ===
Available commands are
    1. PLACE X,Y,<FACE> (FACE = NORTH,EAST,SOUTH,WEST)
    2. MOVE
    3. LEFT/RIGHT
    4. REPORT
`);
