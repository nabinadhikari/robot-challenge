import Robot from "./src/Robot";
import PlaceCommand from "./src/commands/PlaceCommand";
import MoveCommand from "./src/commands/MoveCommand";
import TurnCommand from "./src/commands/TurnCommand";
import ReportCommand from "./src/commands/ReportCommand";
// import fs from "fs";

import readline from "readline";

const robot = new Robot();
const placeCommand = new PlaceCommand();
const moveCommand = new MoveCommand();
const turnCommand = new TurnCommand();
const reportCommand = new ReportCommand();

const rl = readline.createInterface({
  // To change to the source of commands to file, uncomment below
  // input: fs.createReadStream("./testdata/commands.txt"),
  input: process.stdin,
  crlfDelay: Infinity,
});

rl.on("line", (line) => {
  const command = line ? line.toString().trim() : "";
  if (command) handleCommand(command);
  if (!robot.inPlay()) rl.close();
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
