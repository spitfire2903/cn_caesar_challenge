const request = require('request');
const fs = require('fs');

const API_TOKEN = 'ef280094a394afc5b1250dd873e417138a1a1773';

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

const file = fs.createReadStream('answer.json');

decryptingText = () => {

}

solveRequest = (res, rej, response, error, body) => {

}

sendDecryptedText = async (file) => {
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





// req.post(URL_SUBMIT_SOLUTION, { 'Content/type': 'multipart/form-data' }, (error, res, body) => {
//     if (error) {
//         console.error(error);
//         return;
//     }

//     console.info('Body ' + JSON.stringify(body))
//     console.info('Response ' + JSON.stringify(res));
// });

main = async () => {
    let cryptoJson = await getCryptoText();
}

main()

