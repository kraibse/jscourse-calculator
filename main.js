//Berechnet eine Rechenaufgabe im Format [a, 'Operator', b]
function calculate (splitTerm) {
    
    console.log(splitTerm);

    let erg = splitTerm[0];

    for(let i = 1; i <= splitTerm.length; i+=2){

        switch (splitTerm[i]){

            case '+':
                erg = add(erg, splitTerm[i+1]);
                break;

            case '-':
                erg = substract(erg, splitTerm[i+1]);
                break;

            case '*':
                erg = multiply(erg, splitTerm[i+1]);
                break;

            case '/':
                erg = divide(erg, splitTerm[i+1]);
                break;

        }
    }

    return erg;
}

// Grundlegende Rechenfunktionen, gibt ggf. Divide by Zero Error als String aus.
function add (a, b) {

    return a + b;
}

function substract (a, b) {

    return a - b;
}

function multiply (a, b) {

    return a * b;
}

function divide (a, b) {

    if (b == 0) {
        return "Chuck Norris kann durch Null teilen.";
    };
    return a / b;
}

// String wird rechenbar gemacht
function splitTerm(str){

    let validOp = '+-/*'; //['+', '-', '/', '*'];

    let arr = str.split(/([-+*\/])/).filter(y => y !== '');
    
    console.log(arr);
 
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        if(i === 0 && arr[i] === '-'){
            newArr.push(0-arr[1]);
            i++;
        }
        else if((i > 0 && (arr[i+1] === '-') && (arr[i] === '-'))){
            newArr.push('+');
            i++;
        }
        else if(i > 0 && arr[i-1].indexOf(validOp) && arr[i] === '-'){
            newArr.push(0-arr[i+1]);
            i++;
        }
        else{
            newArr.push(arr[i]);
        }
    }
    console.log(newArr);
    return newArr.map( x => parseInt(x) ? parseInt(x) : x);
}


function calcLogic (splitTerm) {

    let mainArr = structuredClone(splitTerm);

    // Iteriere durch alle Elemente zur Klammeraufloesung
    for (let i = 0; i < mainArr.length; i++) {
        
         // Berechnet die Rechenaufgabe in der Klammer.]]]
        if (mainArr[i] == '(') {

            let splitArr = structuredClone(mainArr);

            for (let j = 0; j < (i + 1); j++) {
                splitArr.shift();
            };

            let result = calcLogic(splitArr);

            //Zwischenspeichern des vorherigen Rechenarrays
            let ersterTeil = [];
            for (let j = 0; j > mainArr.length; j++) {

                if (mainArr[j] == '(') {
                    ersterTeil = mainArr.splice[0, j];
                    break;
                };
            };

            // Ersetzt Ergebnis im urspruenglichen Array
            for (let j = 0; j < (i + 1); j++) {

                if (mainArr[j] == ')') {
                    mainArr[j] = result;
                    mainArr = ersterTeil.concat(mainArr);
                } else {
                    splitArr.shift();
                };
            };
            // Rekursiver Aufruf des Arrays ein Index nach gefundener oeffnender Klammer 
        } else if (mainArr[i] == ')') {

            let splitArr = structuredClone(mainArr);
        
            for (let j = splitArr.length; j > (i - 1); j--) {
                splitArr.pop();
            };
        };   
    };

    // 2. Iteration fuer mal und geteilt
    for (let i = 0; i < mainArr.length; i++) {

        if (mainArr[i] == '*' || mainArr[i] == '/') {

            mainArr[i+1] = calculate([mainArr[i-1], mainArr[i], mainArr[i+1]]);
            mainArr[i] = '+';
            mainArr[i-1] = 0;
        };
    };

    // 3. Berechnung der restlichen addition und substraktion
    return calculate(mainArr);
}
//testing: Mal/Geteilt funktioniert, Klammersetzung muss noch gefixed werden
testArray = [1, '*', 2, '+', '(', 3, '/', 3, ')'];
document.body.innerHTML = calcLogic(testArray);

//testing
let str = '-4--3';
console.log(calculate(splitTerm(str)));
