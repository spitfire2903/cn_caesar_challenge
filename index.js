const request = require('request');
const fs = require('fs');
const sha1 = require('sha1');

const API_TOKEN = 'ef280094a394afc5b1250dd873e417138a1a1773';
const FILENAME = 'answer.json';

const URL_GENERATE_DATA = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${API_TOKEN}`;
const URL_SUBMIT_SOLUTION = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${API_TOKEN}`;

let crypto = null;

getCryptoText = async () => {
    let jsonText = await new Promise((res, rej) => {
        request.get(URL_GENERATE_DATA, (error, response, body) => {
            if (error) {
                console.error(error);
                rej(error);
            }

            res(body);
        });
    });

    return JSON.parse(jsonText);
}

isCharacter = (string) => {
    return (/[a-z]/i).test(string);
}

decryptText = (text, diff) => {
    return text.split('').map((char) => {
        return decryptChar(char, diff);
    }).join('');
}

decryptChar = (char, diff) => {
    const INDEX_FIRST_CHAR = 97;
    const INDEX_LAST_CHAR = 122;
    const MAX_SIZE = 1 + (INDEX_LAST_CHAR - INDEX_FIRST_CHAR);

    if (!isCharacter(char)) {
        return char;
    }

    let charCode = char.charCodeAt(0);
    let position = charCode - diff;

    if (position < INDEX_FIRST_CHAR) {
        position = INDEX_FIRST_CHAR - position;
        position = position % MAX_SIZE;
        position = (INDEX_LAST_CHAR - position) + 1;
    }

    return String.fromCharCode(position);
}

sendDecryptedText = async (text, file) => {
    let score = await new Promise((res, rej) => {
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            formData: {
                answer: file
            }
        }

        request.post(URL_SUBMIT_SOLUTION, options, (error, response, body) => {
            if (error) {
                rej(error);
            }

            res(body);
        });
    });

    return JSON.parse(score);
}

writeData = (data) => {
    const file = fs.writeFileSync(FILENAME, data);

    return file;
}

main = async () => {
    let cryptoJson = await getCryptoText();
    let decryptedText = decryptText(cryptoJson.cifrado, cryptoJson.numero_casas);

    console.warn('*** ' + decryptedText);

    cryptoJson.decifrado = decryptedText;
    cryptoJson.resumo_criptografico = sha1(decryptedText);

    writeData(JSON.stringify(cryptoJson));

    let score = await sendDecryptedText(decryptedText, fs.createReadStream(FILENAME));

    console.log(' > Score: ' + score.score);
}

main()

