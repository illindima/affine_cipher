const Utils = require('./utils')
const MathE = require('./mathe')

let _alphabet = ''
let _biGramDictionary = {}
let _encodedAlphabet = {}

module.exports = class Аffinity{
    static get alphabet(){ return _alphabet }
    static set alphabet(alphabet){ _alphabet = alphabet}
    static get encodedAlphabet() { return _encodedAlphabet }
    static get biGramDictionary() { return _biGramDictionary }

    static encodeAlphabet(){
        Аffinity.alphabet
            .split('')
            .forEach(
                (letter, number) => Аffinity.encodedAlphabet[letter] = number
            )
    }

    static encodeBiGramDictionary(){
        for(let i in Аffinity.encodedAlphabet){
            for(let j in Аffinity.encodedAlphabet){
                Аffinity.biGramDictionary[i + j] = (Аffinity.encodedAlphabet[i] * Аffinity.alphabet.length) + Аffinity.encodedAlphabet[j]
            }
        }

    }

    static encryptBiGram(a,b,x,m){
        return (a * x + b) % m
    }

    static decryptBigram(a,b,y,m){
        let decryptedBigram = (MathE.reverse(a,m).s * ( y - b ) ) % m
        return decryptedBigram  < 0 ? decryptedBigram += m : decryptedBigram
    }

}