//Berechnet eine Rechenaufgabe im Format [a, 'Operator', b]
function calculate (splitTerm) {
    
    console.log(splitTerm);

    let erg = splitTerm[0];

    for(let i = 1; i <= splitTerm.length; i+=2) {

        switch (splitTerm[i]) {

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
        return "Nur Chuck Norris kann durch Null teilen.";
    };
    return a / b;
}

// String wird rechenbar gemacht
// str -> arr
function splitTerm(str){

    let validOp = '+-/*'; //['+', '-', '/', '*'];

    let arr = str.split(/([-+*\/()])/).filter(y => y !== '');
    
    console.log(arr);
 
    let newArr = [];

    for(let i = 0; i < arr.length; i++) {
        //erstes Element negativ
        if ( (i === 0) && (arr[i] === '-')) {
            newArr.push(0-arr[1]);
            i++;
        }
        //negativ nach Klammer
        else if ( arr[i] === '(' && arr[i+1] === '-') {
            newArr.push('(', 0-arr[i+2]);
            i+=2;
        }
        //Minus Minus = Plus
        else if ( (i > 0) && (arr[i] === '-') && (arr[i+1] === '-')) {
            newArr.push('+');
            i++;
        }
        //negaives Vorzeichen vor Klammer --> -(
        else if ( (i > 0) && arr[i] === '-' && arr[i+1] === '(') {
            newArr.push('-','(');
            i++;
        }
        //negative Zahl --> *-4
        else if ( (i > 0) && arr[i].indexOf(validOp) && (arr[i+1] === '-')) {
            newArr.push(arr[i], 0-arr[i+2]);
            i+=2;
        }

        else {
            newArr.push(arr[i]);
        }
    }

    console.log(newArr);

    return newArr.map( x => parseFloat(x) ? Number(x) : x);
}


function calcLogic (splitTerm) {

    let mainArr = structuredClone(splitTerm);

    // Iteriere durch alle Elemente zur Klammeraufloesung
    for (let i = 0; i < mainArr.length; i++) {
        
         // Berechnet die Rechenaufgabe in der Klammer.]]]
        if (mainArr[i] == '(') {

            // Erstellt Sekundaeres Array **Tested**
            let splitArr = structuredClone(mainArr);

            // Loescht bis zur Klammer den Inhalt des Array **Tested**
            for (let j = 0; j < (i + 1); j++) {
                splitArr.shift();
            };

            //Rekursiver Aufruf und Speicherung **Tested**
            let result = [calcLogic(splitArr)];

            //Zwischenspeichern des Teils vor der Klammer **Tested**
            let ersterTeil = [];
            for (let j = 0; j < (mainArr.length); j++) {

                if (mainArr[j] == '(' && j == 0){
                    break;
                } else if (mainArr[j] == '(') {
                    ersterTeil = mainArr.splice(0, j);
                    break;
                };
            };

            //Zwischenspeichern des Teils nach der Klammer **TESTED**
            let zweiterTeil = [];
            for (let j = (mainArr.length - 1); j >= 0; j--){

                if (mainArr[j] == ')' && j == (mainArr.length - 1)){
                    break;
                } else if (mainArr[j] == ')') {
                    zweiterTeil = mainArr.splice((j+1), mainArr.length);
                    break;
                };
            };
            // Ersetzt Ergebnis im urspruenglichen Array **TESTED**
            mainArr = ersterTeil.concat(result.concat(zweiterTeil));
            // Rekursiver Aufruf des Arrays ein Index nach gefundener oeffnender Klammer 

            // Gibt Inhalt in der Klammer in rek. Aufruf **TESTED** 
        } else if (mainArr[i] == ')') { 

            let splitArr = structuredClone(mainArr);
            splitArr = splitArr.slice(0, i); 

            return calcLogic(splitArr); 
        };   
    };

    // 2. Iteration fuer mal und geteilt **TESTED**
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
//testArray = [1, '*', 2, '+', '(', 3, '/', 3, ')'];
//document.body.innerHTML = calcLogic(testArray);

//testing
let str = '-4--3';
// console.log(calculate(splitTerm(str)));

// sendet Input an Funktionen und schreibt Ergebnis in Input
function subm() {
    event.preventDefault(); //veraltet aber funktioniert
    let inputField = document.getElementById('equation');
    let history = document.getElementById('results');
    let textStr = inputField.value;

    //hier wird gerechnet
    let result = calcLogic(splitTerm(textStr));
    console.log(result);
    inputField.placeholder = result;
    inputField.value = '';

    history.appendChild(document.createElement('p')).textContent = textStr + ' = ' +result;
    history.scrollTop = history.scrollHeight;
}



//testing
//let str = '1.5-((-4*-3.5)+(1*2))';
//console.log(calculate(splitTerm(str)));




