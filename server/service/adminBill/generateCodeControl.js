//
//Importamos variables de entorno
require('dotenv').config({ path : '../../const.env'});

const funciones = require('./velfohFunction');
const funcAlleged = require('./allegedFunction');
const funcBase64 = require('./base64.Function');

const functionRound = require('./function');

const generateCodeControl = (authorizationNumber, invoiceNumber, nitci, dateOfTransaction, transactionAmount, dosageKey) => {        
        //
        transactionAmount = functionRound.roundUp(transactionAmount);
        //
        invoiceNumber = funciones.addVerhoeffDigit(invoiceNumber, 2);
        nitci = funciones.addVerhoeffDigit(nitci,2);
        dateOfTransaction = funciones.addVerhoeffDigit(dateOfTransaction,2);
        transactionAmount = funciones.addVerhoeffDigit(transactionAmount,2);
        
        const sumOfVariables = Number(invoiceNumber) + Number(nitci)+Number(dateOfTransaction)+Number(transactionAmount);
        //A la suma total se añade 5 digitos Verhoeff
        const sumOfVariables5Verhoeff = funciones.addVerhoeffDigit(sumOfVariables,5); 
        //****************************************************************
        //
        const fiveDigitsVerhoeff = sumOfVariables5Verhoeff.substr(sumOfVariables5Verhoeff.length-5,5);
        let numbers = fiveDigitsVerhoeff.split("");
        for(i=0;i<5;i++){
            numbers[i] = parseInt(numbers[i]) + 1;             
        }
         const string1 = dosageKey.substr(0, numbers[0] );
         const string2 = dosageKey.substr(numbers[0], numbers[1] );
         const string3 = dosageKey.substr(numbers[0]+ numbers[1], numbers[2] );
         const string4 = dosageKey.substr(numbers[0]+ numbers[1]+ numbers[2], numbers[3] );
         const string5 = dosageKey.substr(numbers[0]+ numbers[1]+ numbers[2]+ numbers[3], numbers[4] );
        //-----------------------------------------------------------------
        //
        const authorizationNumberDKey = authorizationNumber + string1;
        const invoiceNumberdKey = invoiceNumber + string2;
        const NITCIDKey = nitci + string3;
        const dateOfTransactionDKey = dateOfTransaction + string4;        
        const transactionAmountDKey = transactionAmount + string5;
        //****************************************************************
        // 
        //se concatena cadenas de paso 2
        var stringDKey = authorizationNumberDKey.toString() + invoiceNumberdKey.toString() + NITCIDKey.toString() + dateOfTransactionDKey.toString() + transactionAmountDKey.toString();         
        //Llave para cifrado + 5 digitos Verhoeff generado en paso 2
        var keyForEncryption = dosageKey.toString() + fiveDigitsVerhoeff.toString();   

        const allegedRC4String = funcAlleged.encryptMessageRC4(stringDKey, keyForEncryption,true); 
        //****************************************************************
    
        //================================================================
        //Paso 4
        //================================================================
        //cadena encriptada en paso 3 se convierte a un Array         
        var chars = allegedRC4String.split("");
        //se suman valores ascii
        var totalAmount=0;
        var sp1=0;
        var sp2=0;
        var sp3=0;
        var sp4=0;
        var sp5=0;
            
        var tmp = 1;
        for(i=0; i<allegedRC4String.length;i++){
            totalAmount += chars[i].charCodeAt();//se extrae ascii y se suma
            switch(tmp){
                case 1: sp1 += chars[i].charCodeAt(); break;
                case 2: sp2 += chars[i].charCodeAt(); break;
                case 3: sp3 += chars[i].charCodeAt(); break;
                case 4: sp4 += chars[i].charCodeAt(); break;
                case 5: sp5 += chars[i].charCodeAt(); break;
            }            
            tmp = (tmp<5)?tmp+1:1;
        }
        //================================================================
        //PASO 5 
        //================================================================
        //suma total * sumas parciales dividido entre resultados obtenidos 
        //entre el dígito Verhoeff correspondiente más 1 (paso 2)
        var tmp1 = Math.floor(totalAmount*sp1/numbers[0]);
        var tmp2 = Math.floor(totalAmount*sp2/numbers[1]);
        var tmp3 = Math.floor(totalAmount*sp3/numbers[2]);
        var tmp4 = Math.floor(totalAmount*sp4/numbers[3]);
        var tmp5 = Math.floor(totalAmount*sp5/numbers[4]);
        //se suman todos los resultados
        var sumProduct = tmp1 + tmp2 + tmp3 + tmp4 + tmp5;        
        //se obtiene base64
        var base64SIN =funcBase64.convertBase64(sumProduct);
        //-----------------------------------------------------------------
        //================================================================
        //PASO 6
        //================================================================
        const codigoFinal =funcAlleged.encryptMessageRC4(base64SIN, dosageKey + fiveDigitsVerhoeff);

        return codigoFinal;
    
}

module.exports.generateCodeControl = generateCodeControl;