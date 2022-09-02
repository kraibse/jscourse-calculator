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

    return newArr.map( x => parseFloat(x) ? parseFloat(x) : x);
}

// sendet Input an Funktionen und schreibt Ergebnis in Input
function subm() {
    event.preventDefault(); //veraltet aber funktioniert
    let inputField = document.getElementById('equation');
    let history = document.getElementById('results');
    let textStr = inputField.value;

    //hier wird gerechnet
    let result = calculate(splitTerm(textStr));
    console.log(result);
    
    inputField.value = result;
    history.appendChild(document.createElement('p')).textContent = textStr + ' = ' +result;
    history.scrollTop = history.scrollHeight;
}



//testing
//let str = '1.5-((-4*-3.5)+(1*2))';
//console.log(calculate(splitTerm(str)));



