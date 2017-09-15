#!/usr/bin/env node

require('dotenv').load();
const Telnet = require('telnet-client');
const connection = new Telnet();

const params = {
  host: '10.0.0.103',
  username: 'admin',
  password: process.env.password,
  shellPrompt: 'MF.v2.1.11# ',
  timeout: 2500
}

const relays = [1, 2, 3, 4, 5, 6, 7, 8];
const cmds = ['on', 'off']
let cmd = 'ls'

connection.on('ready', function(prompt) {
  connection.exec(cmd, function(err, response) {
    connection.end();
  })
})

connection.on('timeout', function() {
  // console.log('socket timeout!'); // for debug
  connection.end()
})

connection.on('close', function() {
  // console.log('connection closed'); // for debug
})

function usage() {
    console.log('Usage: app <relay> <cmd>');
    console.log('\t<relay> ' + relays);
    console.log('\t<cmd> ' + cmds);
    process.exit(-1);
}
main = () => {
  if (process.argv.length !== 4) usage();
  let relay;
  try { relay = parseInt(process.argv[2]) } catch (e) { usage() }
  if (!relays.includes(relay)) usage();
  if (!cmds.includes(process.argv[3])) usage();
  cmd = 'echo '
  cmd += process.argv[3] == 'on' ? '1' : '0';
  cmd += ' > /proc/power/relay' + process.argv[2];
  connection.connect(params)
}

main();
