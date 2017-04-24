const fs = require('fs');
const readline = require('readline');
const argv = require('minimist')(process.argv.slice(2));

const winResult = 'WIN';
const looseResult = 'LOOSE';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lineReader = readline.createInterface({
    input: fs.createReadStream(argv.path).on('error', err => {
        rl.write('\nТакого файла не существует\n');
        rl.close();
    })
});

let gamesAmount = 0,
    winnings = 0,
    tempMaxWinnings = 0,
    maxWinnings = 0,
    looses = 0,
    tempMaxLooses = 0,
    maxLooses = 0,
    prevGameResult = '',
    currentGameResult = '';

lineReader.on('line', (line) => {
    makeStatistics(line);
});

/**
 * Судя по всему, если запускать функцию саму по себе, то она выполняется параллельно с
 * предыдущим потоком, поэтому пришлось положить в setTimeout.
 */
setTimeout(function () {
    printStatistics();
}, 500);

function makeStatistics(data) {
    ++gamesAmount;

    let game = parseGameInfo(data);
    let selectedDigit = getSelectedDigit(game);
    let realDigit = getRealDigit(game);

    if (selectedDigit === realDigit) {
        currentGameResult = winResult;
        ++winnings;
    }
    else {
        currentGameResult = looseResult;
        ++looses;
    }

    switch (currentGameResult) {
        case winResult:
            ++tempMaxWinnings;
            if (tempMaxWinnings > maxWinnings) {
                maxWinnings = tempMaxWinnings;
            }
            break;
        case looseResult:
            ++tempMaxLooses;
            if (tempMaxLooses > maxLooses) {
                maxLooses = tempMaxLooses;
            }
            break;
    }

    if (currentGameResult !== prevGameResult) {
        switch (currentGameResult) {
            case winResult:
                tempMaxLooses = 0;
                break;
            case looseResult:
                tempMaxWinnings = 0;
                break;
            default:
                break;
        }
    }

    prevGameResult = currentGameResult;
}

/**
 * Строка должна быть в формате selected=<digit>;random=<digit>
 * @param game
 */
function parseGameInfo(game) {
    return game.split(';', 2);
}

function getSelectedDigit(data) {
    data = data[0].split('=');
    return data[1];
}

function getRealDigit(data) {
    data = data[1].split('=');
    return data[1];
}

function printStatistics() {
    rl.write('\nОбщее количество партий: ' + gamesAmount);
    rl.write('\nОбщее количество побед: ' + winnings + ', что составляет ' + winnings/gamesAmount * 100 + '%');
    rl.write('\nОбщее количество проигрышей: ' + looses + ', что составляет ' + looses/gamesAmount * 100 + '%');
    rl.write('\nМаксимальное число выигрышей подряд: ' + maxWinnings);
    rl.write('\nМаксимальное число проигрышей подряд: ' + maxLooses + '\n\n');
    rl.close();
}