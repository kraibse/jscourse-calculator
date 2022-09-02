/*
Author: Leon Horn
Timestamp: 02/09/2022 - 15:04
*/

function checkSyntax() {
    /*
    Function gets called on text input update.
    Checks the input string for any faulty characters and syntax
    
    - Remove unnecessary whitespace
    - Check for invalid operator chains
    - Check for correct parantheses placement
    - Remove trailing operators
    - Check correct floating point number syntax
    
    */
    event.preventDefault(); // Prevents form activation and enables onInput call on deletion

    let inputString = document.getElementById("equation").value.replaceAll(" ", "");    // equation in text form

    document.querySelector(".error").classList.add("invisible");

    // Defines the two elements that show an error if it occurs
    let invalidCharatersRow = document.getElementById("invalidCharactersRow");
    invalidCharatersRow.classList.add("invisible");

    let invalidOperatorsRow = document.getElementById("invalidOperatorsRow");
    invalidOperatorsRow.classList.add("invisible");

    let invalidFloatingPointRow = document.getElementById("invalidFloatingPointRow");
    invalidFloatingPointRow.classList.add("invisible");

    let invalidTrailingOperatorRow = document.getElementById("invalidTrailingOperatorRow");
    invalidTrailingOperatorRow.classList.add("invisible");

    let hasFailed = false;

    // Defines regex combinations for invalid character and operator cases
    let invalidOperators = new RegExp(/([+\-/*][*/+]){3,}|([*/][+]){3,}|([+\-]{3,})|([+\-][+])+/g);
    let invalidCharacters = new RegExp(/([^0-9+\-\./*\s*])+/g);

    let openingParantheses = new RegExp(/\(/g); 
    let closingParantheses = new RegExp(/\)/g);

    let floatingPointNumber = new RegExp(/(\.[+\-/*\.])|([+\-/*]\.)|^(\.)|((\.)$)+/g);
    
    let trailingOperator = new RegExp(/^([+/*])|([+\-/*])$/gm);


    if (invalidCharacters.test(inputString)) {
        /*
        - Enable error previews (index, invalidCharatersRow)
        - Set syntaxInformation to regex match
        - Disable calculate button
        */
        console.log("Found some invalid characters: " + inputString.match(invalidCharacters));

        document.querySelector(".invalidCharactersRow").classList.remove("invisible");
        document.querySelector(".invalidCharactersRow").classList.add("visible");
        document.getElementById("invalidCharactersInformation").textContent = inputString.match(invalidCharacters);

        hasFailed = true;
    }

    if (invalidOperators.test(inputString)) {
        /*
        
        */
        console.log("Found invalid operator chains: " + inputString.match(invalidOperators));

        document.querySelector(".invalidOperatorsRow").classList.remove("invisible");
        document.querySelector(".invalidOperatorsRow").classList.add("visible");
        document.getElementById("invalidOperatorsInformation").textContent = inputString.match(invalidOperators);

        hasFailed = true;
    }

    // Checks if there as many opening parantheses as closing ones
    if (openingParantheses.test(inputString) && closingParantheses.test(inputString))
    {
        if (inputString.match(openingParantheses || []).length != inputString.match(closingParantheses || []).length) {
            hasFailed = true;
        }
    }

    if (trailingOperator.test(inputString)) {
        console.log("Found trailing operators: " + inputString.match(trailingOperator));

        document.querySelector(".invalidTrailingOperatorRow").classList.remove("invisible");
        document.querySelector(".invalidTrailingOperatorRow").classList.add("visible");
        document.getElementById("invalidTrailingOperatorInformation").textContent = inputString.match(trailingOperator);

        hasFailed = true;
    }

    if (floatingPointNumber.test(inputString)) {
        console.log("Found badly formatted floating point number: " + inputString.match(floatingPointNumber));
        document.querySelector(".invalidFloatingPointRow").classList.remove("invisible");
        document.querySelector(".invalidFloatingPointRow").classList.add("visible");

        document.getElementById("invalidFloatingPointInformation").textContent = inputString.match(floatingPointNumber);
        
        hasFailed = true;
    }
    

    if (hasFailed) {
        /*
        Sets the error message visibility to true;
        */ 
        document.querySelector(".error").classList.remove("invisible");
        document.querySelector(".error").classList.add("visible");

        // Disable button and change color properties
        document.querySelector(".calculateButton").classList.remove("bg-primary");
        document.querySelector(".calculateButton").classList.add("bg-secondary");
    }
    else {
        // Disable button and change color properties
        document.querySelector(".calculateButton").classList.remove("bg-secondary");
        document.querySelector(".calculateButton").classList.add("bg-primary");
    }
    
    if (inputString == "") {
        hasFailed = true;
    }

    document.getElementById("calculateButton").disabled = hasFailed;
    return hasFailed;
}
