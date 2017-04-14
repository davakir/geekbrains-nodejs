const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.write('Утилита работы с профилем на github...');

rl.question('What do you think of Node.js? ', answer => {
    console.log('Thank you for your valuable feedback: ' + answer);
    rl.close();
});
