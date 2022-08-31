//Berechnet eine Rechenaufgabe im Format [a, 'Operator', b]
function calculate (splitTerm) {

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