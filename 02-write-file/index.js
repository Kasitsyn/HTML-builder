const fs = require('fs');
const path = require('path');
const readline = require('readline')
const { stdin: input, stdout: output } = require('process')

const rl = readline.createInterface({ input, output });

fs.writeFile(
    path.join(__dirname, 'count.txt'),
    'Count from 1 to 5:\n',
    (err) => {
        if (err) throw err;
        console.log('Count from 1 to 5:')
    }
)

rl.on('line', input => {
    if (input.toLowerCase() === 'exit') {
        rl.close()
        return
    }
    fs.appendFile(
        path.join(__dirname, 'count.txt'),
        `${input}\n`,
        (err) => {
            if (err) throw err;
            
        }
    );
})

