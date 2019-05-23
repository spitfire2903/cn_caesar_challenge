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
        request.get(URL_GENERATE_DATA, (response, error, body) => {
            if (error) {
                console.error(error);
                rej(error);
            }

            console.info(body);
            res(body);
        });
    });

    return JSON.parse(jsonText);
}

decryptText = (text, diff) => {
    return text;
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

        request.post(URL_SUBMIT_SOLUTION, options, (response, error, body) => {
            if (error) {
                console.error(error);
                rej(error);
            }

            console.info(body);
            res(body);
        });
    });

    return JSON.parse(jsonText);
}

writeFile = (data) => {
    const file = fs.writeFileSync(FILENAME, data);

    return file;
}


main = async () => {
    let cryptoJson = await getCryptoText();
    let decryptedText = decryptText(cryptoJson.cifrado, cryptoJson.numero_casas);

    cryptoJson.decifrado = decryptedText;
    cryptoJson.resumo_criptografico = sha1(decryptedText);

    writeData(JSON.stringify(cryptoJson));

    // let score = await sendDecryptedText(decryptedText, fs.createReadStream(FILENAME));
}

main()

