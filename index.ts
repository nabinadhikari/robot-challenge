import inquirer from "inquirer";
import Robot, { Face, Rotation } from "./src/Robot";

console.log(`
=== Robot Challenge ===
Available commands are
    1. PLACE X,Y,<FACE> (FACE = NORTH,EAST,SOUTH,WEST)
    2. MOVE
    3. LEFT/RIGHT
    4. REPORT
    `);

function getFace(face: string): Face | null {
  switch (face) {
    case "NORTH":
      return Face.NORTH;
    case "SOUTH":
      return Face.SOUTH;
    case "EAST":
      return Face.EAST;
    case "WEST":
      return Face.WEST;
  }
  return null;
}

function getRotation(rotation: string): Rotation | null {
  switch (rotation) {
    case "LEFT":
      return Rotation.LEFT;
    case "RIGHT":
      return Rotation.RIGHT;
    default:
      return null;
  }
}

async function startProgram() {
  let inPlay = true;
  const robot = new Robot();
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
        face = getFace(xyf[2]);
        if (face === null) {
          console.log("=> Invalid Face");
          continue;
        }
      } catch (e) {
        console.log("=> Error getting x,y,face");
        continue;
      }
      const placed = robot.place(x, y, face);
      if (!placed) {
        console.log("=> Ignore placing");
      } else {
        console.log("=> Placed");
      }
      continue;
    }
    switch (answer.command) {
      case "MOVE":
        if (!robot.move()) {
          console.log("=> Ignoring MOVE");
        } else {
          console.log("=> Moved");
        }
        break;
      case "LEFT":
        const leftRotation = getRotation(answer.command);
        if (leftRotation !== null) {
          if (robot.turn(leftRotation)) console.log("=> Turned left");
          else console.log("=> Ignoring");
        } else {
          console.log(`=> Ignoring ${answer.command}`);
        }
        break;
      case "RIGHT":
        const rightRotation = getRotation(answer.command);
        if (rightRotation !== null) {
          if (robot.turn(rightRotation)) console.log("=> Turned right");
          else console.log("=> Ignoring");
        } else {
          console.log(`=> Ignoring ${answer.command}`);
        }
        break;
      case "REPORT":
        if (robot.isRobotPlaced()) {
          console.log(`=> ${robot.report()}`);
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
