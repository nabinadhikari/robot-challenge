# Welcome to Robot Challenge

This is a solution to a challenge to create a console application that will allow you to place, move, turn and get report of a toy robot in 5x5 (configurable) unit surface of a table. This application will accept series of commands to interact with the toy robot.

## Build & Run

The application is written in NodeJs using Typescript. To build and run this program, please follow the followings steps

- Clone the project
- Install the dependencies `npm install`
- Build the project `npm run build`
- Test project in watch mode `npm run test`
- Start the application `npm start`

## Changes

The application is currently expecting commands from console input (stdin). This can be changed easily by swapping `createInterface.inpu` to `fs.createReadStream("./testdata/commands.txt")`.

## Program Rules

This application has rules to accept valid commands and ignore invalid commands. Commands are case sensitive and some require specific structure. Available commands are:

- PLACE X,Y,F (X = x coordinates, Y = y coordinates, F = Face or direction namely NORTH, EAST, SOUTH, WEST)
- LEFT/RIGHT
- MOVE
- REPORT

The basic flow of the application would be:

- User will be prompted to place commands
- First command should be `PLACE` command that will place the toy robot in the table if valid x,y coordinates are provided. For eg. for a 5x5 table surface [0,0],[4,4] are valid coordinates and [-1,-1],[4,5] are invalid coordinates. An example of command will be `PLACE 0,0,NORTH` that will place the toy robot at 0,0 coordinates facing north. Program will ignore any invalid coordinates or any invalid face (direction).
- After first command user can provide any of the remaining commands to either move the toy (`MOVE`) or turn the toy left (`LEFT`) or turn the toy right (`RIGHT`) or end the program and report the current position and face (`REPORT`).
