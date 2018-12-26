const Affinity = require('./affinity')
const Utils    = require('./utils')
const MathE    = require('./mathe')
const fs       = require('fs')

class App{
    static run(){
        console.log('[...] App started.')

        Affinity.alphabet = 'абвгдежзийклмнопрстуфхцчшщьыэюя'

        Affinity.encodeAlphabet()

        let text = Utils.cleanTextFile(
                Utils.openFile('../text/sample.txt'),
                Affinity.alphabet
        )
       
       
        let transpiledText = Utils.transpile(text,Affinity.encodedAlphabet)
        
        Affinity.encodeBiGramDictionary()
        
        let sortedBiGram = Utils.calculateBiGramFrequency(text,Affinity.biGramDictionary)
       

        sortedBiGram = Object
            .keys(sortedBiGram)
            .sort(function(a,b){return sortedBiGram[b] - sortedBiGram[a]})
      
        let mostFrequentBigramsInText = [],
            mostFrequentBigramsInLanguage = []

        console.log(sortedBiGram)
        for(let i = 0; i < 5; i++){
            mostFrequentBigramsInText.push(Affinity.biGramDictionary[sortedBiGram[i]])
        }
        
        for(let i of ['ст','но','то','на','ен']){
            mostFrequentBigramsInLanguage.push(Affinity.biGramDictionary[i])
        }
        
        
       
        let transpiledBiGram = []
        for(let i = 0; i < transpiledText.length;i+=2){
            transpiledBiGram.push(transpiledText[i] * Affinity.alphabet.length + transpiledText[i + 1])
        }

        for(let i = 0; i < mostFrequentBigramsInLanguage.length - 1; i++){
                for(let j = 0; j < mostFrequentBigramsInText.length - 1; j++){
                    for(let ii = 0; ii < mostFrequentBigramsInLanguage.length; ii++){
                        for(let jj = 0; jj < mostFrequentBigramsInText.length; jj++){
                 
        
                            if(jj !== j && ii !== i){
                    
        
        let [x0,y0] = [mostFrequentBigramsInLanguage[i],mostFrequentBigramsInText[j]]
        let [x1,y1] = [mostFrequentBigramsInLanguage[ii],mostFrequentBigramsInText[jj]]

        let a = MathE.linearСomparison(x0 - x1, y0 - y1,Affinity.alphabet.length ** 2)
        if(a == undefined) continue
           
        let bs  = [],b

        if(a instanceof Array){
            for(let i = 0; i < a.length; i++){
                let curB = MathE.getBValue(y0,x0,a[i],Affinity.alphabet.length ** 2)
                console.log(`Key: ${a[i]} - ${curB}`)
                bs.push(curB)
            }
        }
        
        if(!(a instanceof Array)){
            b = MathE.getBValue(y0,x0,a,Affinity.alphabet.length ** 2)
            console.log(`Key: ${a} - ${b}`)
        }

        
        if(a instanceof Array){
            for(let x = 0; x < a.length; x++){
                let openBiGram = []
              
                for(let i = 0; i < transpiledBiGram.length; i++){
                    openBiGram.push(Affinity.decryptBigram(a[x],bs[x],transpiledBiGram[i],Affinity.alphabet.length ** 2))
                }
                

                let openText = []
                for(let i = 0; i < openBiGram.length; i++){
                    openText.push(
                        Object.keys(Affinity.biGramDictionary).find(key => Affinity.biGramDictionary[key] === openBiGram[i])
                    )
                }
                let c = Utils.getComplianceIndex(openText.join(''),Affinity.alphabet)
                console.log(`ComplianceIndex: ${c}`)
                if(c >= 0.05){
                    fs.writeFileSync(`../text/sampleInner${j}-${x}.txt`,openText.join(''),'utf-8')
                    return
                }
            }
        }

        if(!(a instanceof Array)){
            let openBiGram = []
               
            for(let i = 0; i < transpiledBiGram.length; i++){
                openBiGram.push(Affinity.decryptBigram(a,b,transpiledBiGram[i],Affinity.alphabet.length ** 2))
            }
            

            let openText = []
            for(let i = 0; i < openBiGram.length; i++){
                openText.push(
                    Object.keys(Affinity.biGramDictionary).find(key => Affinity.biGramDictionary[key] === openBiGram[i])
                )
            }
            let c = Utils.getComplianceIndex(openText.join(''),Affinity.alphabet)
            console.log(`ComplianceIndex: ${c}`)
            if(c >= 0.05){
                fs.writeFileSync(`../text/sampleMain${i}-${j}.txt`,openText.join(''),'utf-8')
                return
            }
        }
        }
    }
}
}}

        console.log('[...] App finished.')
    }
}


App.run()