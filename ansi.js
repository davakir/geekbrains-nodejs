const ansi = require('ansi');
const cursor = ansi(process.stdout);

cursor
    .red()                 // Set font color to red 
    .bg.grey()             // Set background color to grey 
    .write('Hello World!') // Write 'Hello World!' to stdout
    .bg.reset()            // Reset the bgcolor before writing the trailing \n, 
    .write('\n');


cursor.hex('#660000').bold().underline();
console.log('This is blood red, bold text');

cursor.fg.reset();

console.log('This will still be bold, but not red');
cursor.goto(10, 5).write('Five down, ten over');

cursor.horizontalAbsolute(0).eraseLine().write('Starting again');
cursor.horizontalAbsolute(10).red().write('column five' + '\n');

cursor.reset();