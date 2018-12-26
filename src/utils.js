const fs = require('fs')
const Аffinity = require('./affinity')

module.exports = class Utils{

    static openFile(path){
        return fs.readFileSync(path,'utf-8')
    }

    static cleanTextFile(text,alphabet){
        return text.toLowerCase().split('').filter( letter => alphabet.includes(letter)).join('')
    }

    static transpile(text,encodedAlphabet){
        let result = [];

        text.split('').forEach((item) => {
            result.push(encodedAlphabet[item])
        })

       return result;
    }


    static calculateBiGramFrequency(text,biGramDictionary){
        let y = {}

        for(let i in biGramDictionary){
            y[i] = 0
        }

        for(let i = 0; i < text.length; i += 2){
            y[text[i] + text[i + 1]] += 1 
        }

        return y
    }
    static getComplianceIndex(text,alphabet){
        let n = text.length;
        let y = {};
        let m = {};

        alphabet.split('').forEach((item) => y[item] = 0)

        
        text.split('').forEach((item) => {
            y[item] = y[item] + 1 
        })

        for (let i in y){
            m[i] = ( y[i] * ( y[i] - 1 ) ) / ( n * ( n - 1) )
        }
        
        let x = 0;

        for (let i in m){
            x += m[i];
        }

        return x;
    }
}