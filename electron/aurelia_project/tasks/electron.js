// import gulp from 'gulp';
// import {CLIOptions} from 'aurelia-cli';
export let electron = require('electron-connect').server.create();

export function startElectron() {
  // Start browser process
  electron.start();

  // function restart() {
  //   return new Promise((resolve) => setTimeout(() => { electron.restart(); resolve();}, 1000));
  // }

  // if (CLIOptions.hasFlag('watch')) {
  //   gulp.watch('electron-main.js', restart);
  // }
}
