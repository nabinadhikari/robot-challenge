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
  let inPlay = true;
  const robot = new Robot([6, 6]);
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
    if (answer.command.startsWith("PLACE")) {
      const xyf = answer.command.replace("PLACE", "").trim().split(",");
      if (xyf.length !== 3) {
        console.log("=> Please enter valid PLACE command (PLACE X,Y,FACE)");
        continue;
      }
      let x: number, y: number, face: Face | null;
      try {
        x = Number.parseInt(xyf[0]);
        y = Number.parseInt(xyf[1]);
        face = getFaceFromString(xyf[2]);
        if (face === null) {
          console.log("=> Invalid Face");
          continue;
        }
      } catch (e) {
        console.log("=> Error getting x,y,face");
        continue;
      }
      const placed = placeCommand.executeCommand(robot, { x, y, face });
      if (!placed) {
        console.log("=> Ignore placing");
      } else {
        console.log("=> Placed");
      }
      continue;
    }
    switch (answer.command) {
      case "MOVE":
        if (!moveCommand.executeCommand(robot)) {
          console.log("=> Ignoring MOVE");
        } else {
          console.log("=> Moved");
        }
        break;
      case "LEFT":
        const leftRotation = getRotationFromString(answer.command);
        if (leftRotation !== null) {
          if (turnCommand.executeCommand(robot, leftRotation))
            console.log("=> Turned left");
          else console.log("=> Ignoring");
        } else {
          console.log(`=> Ignoring ${answer.command}`);
        }
        break;
      case "RIGHT":
        const rightRotation = getRotationFromString(answer.command);
        if (rightRotation !== null) {
          if (turnCommand.executeCommand(robot, rightRotation))
            console.log("=> Turned right");
          else console.log("=> Ignoring");
        } else {
          console.log(`=> Ignoring ${answer.command}`);
        }
        break;
      case "REPORT":
        if (robot.isRobotPlaced()) {
          console.log(`=> ${reportCommand.executeCommand(robot)}`);
        } else {
          console.log(`=> Robot not placed`);
        }
        inPlay = false;
        break;
      default:
        console.log("=> Unknown command");
    }
  } while (inPlay);
}
startProgram();
