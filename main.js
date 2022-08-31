//Berechnet eine Rechenaufgabe im Format [a, 'Operator', b]
function calculate (splitTerm) {
    
    console.log(splitTerm);

    switch (splitTerm[1]){

        case '+':
            return add(splitTerm[0], splitTerm[2]);
            
        case '-':
            return substract(splitTerm[0], splitTerm[2]);

        case '*':
            return multiply(splitTerm[0], splitTerm[2]);

        case '/':
            return divide(splitTerm[0], splitTerm[2]);
    }
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

//testing
let str = '-4--3';
console.log(calculate(splitTerm(str)));
