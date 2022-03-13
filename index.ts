import inquirer from "inquirer";
import Robot from "./src/Robot";
import { Face } from "./src/types";
import { getFaceFromString, getRotationFromString } from "./src/common-methods";
import PlaceCommand from "./src/commands/PlaceCommand";
import MoveCommand from "./src/commands/MoveCommand";
import TurnCommand from "./src/commands/TurnCommand";
import ReportCommand from "./src/commands/ReportCommand";

process.stdout.write(`
=== Robot Challenge ===
Available commands are
    1. PLACE X,Y,<FACE> (FACE = NORTH,EAST,SOUTH,WEST)
    2. MOVE
    3. LEFT/RIGHT
    4. REPORT
    `);

async function startProgram() {
  const robot = new Robot();
  robot.setInPlay(true);
  const placeCommand = new PlaceCommand();
  const moveCommand = new MoveCommand();
  const turnCommand = new TurnCommand();
  const reportCommand = new ReportCommand();
  do {
    const answer = await inquirer.prompt<{ command: string }>({
      type: "input",
      name: "command",
      message: "Your command: ",
    });
    if (placeCommand.isValidCommand(answer.command)) {
      placeCommand.executeCommand(robot, answer.command);
    } else if (moveCommand.isValidCommand(answer.command)) {
      moveCommand.executeCommand(robot);
    } else if (turnCommand.isValidCommand(answer.command)) {
      turnCommand.executeCommand(robot, answer.command);
    } else if (reportCommand.isValidCommand(answer.command)) {
      console.log(reportCommand.executeCommand(robot));
    } else {
      console.log("=> Invalid command");
    }
  } while (robot.inPlay());
}
startProgram();
