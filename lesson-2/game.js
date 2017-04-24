const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

let isBeginning = true;

rl.question(printGameInfo(), answer => {
    if (answer == 2) {
        rl.close();
    }
    else if (answer == 1) {
        rl.question('\nВыберите число 1 или 2: ', digit => {
            rl.write('\nВы выбрали: ' + digit);

            let randomSide = randomInteger(1, 2);

            rl.write('\nВыпавшее число: ' + randomSide);

            if (digit == randomSide) {
                rl.write('\nПрекрасно, Вы угадали!\n');
            } else {
                rl.write('\nУвы, Вы не угадали...\n');
            }

            isBeginning = false;

            logData('selected=' + digit + ';random=' + randomSide + ';\n');

            rl.close();
        });
    }
    else {
        rl.write('\nВы ввели что-то непонятное, попробуйте еще раз\n');
    }
});

function printGameInfo() {
    rl.write('Игра "Орел или Решка"');

    if (isBeginning === true)
        rl.write('\n[1] Начать игру');
    else
        rl.write('\n[1] Продолжить игру');

    rl.write('\n[2] Выход\n');

    return 'Выберите действие: ';
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function logData(data)
{
    fs.appendFile('./logs/game.txt', data, (err) => {
        if (err) throw err;
    });
}