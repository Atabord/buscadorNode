const { exec } = require('child_process');
const { platform } = process;

if(platform === 'win32') {
  exec('npm run start-windows');
} else {
  exec('npm run start-linux');
}