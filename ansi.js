var ansi = require("ansi"),
    cursor = ansi(process.stdout);

cursor
    .red()                 // Set font color to red 
    .bg.grey()             // Set background color to grey 
    .write("Hello World!") // Write 'Hello World!' to stdout
    .bg.reset()            // Reset the bgcolor before writing the trailing \n, 
    .write("\n") ;


// Rendering modes are persistent:
cursor.hex('#660000').bold().underline();

// You can use the regular logging functions, text will be green:
console.log('This is blood red, bold text');

// To reset just the foreground color:
cursor.fg.reset();

console.log('This will still be bold, but not red');

// to go to a location (x,y) on the console
// note: 1-indexed, not 0-indexed:
cursor.goto(10, 5).write('Five down, ten over');

// to clear the current line:
cursor.horizontalAbsolute(0).eraseLine().write('Starting again');
//
// to go to a different column on the current line:
cursor.horizontalAbsolute(10).red().write('column five');

// Clean up after yourself!
cursor.reset();


var input =