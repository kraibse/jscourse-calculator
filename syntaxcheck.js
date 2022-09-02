var errorBoxes = document.querySelectorAll(".error");

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
    let inputString = document.getElementById("equation").value;    // equation in text form

    let validationResult = document.getElementById("errorIndex");

    // Defines the two elements that show an error if it occurs
    let invalidCharatersRow = document.getElementById("invalidCharactersRow");
    let invalidOperatorsRow = document.getElementById("invalidOperatorsRow");

    let hasFailed = false;

    // Defines regex combinations for invalid character and operator cases
    let invalidCharacters = new RegExp(/([^0-9+\-\./*\s*])+/g);
    let invalidOperators = new RegExp(/([+\-/*][*/])+/g);

    if (invalidCharacters.test(inputString)) {
        /*
        - Enable error previews (index, invalidCharatersRow)
        - Set syntaxInformation to regex match
        - Disable calculate button
        */
        console.log("Found some invalid characters: " + inputString.match(invalidCharacters));
        errorBoxes.forEach(box => {
            box.style.display = "block";
        });

        invalidCharatersRow.style.display = 'block';
        document.getElementById("invalidCharactersInformation").textContent = inputString.match(invalidCharacters);

        let pos = invalidCharacters.exec(inputString).index;
        console.log(pos);

        validationResult.textContent = pos;
        hasFailed = true;
        // return;
    }

    if (invalidOperators.test(inputString)) {
        /*
        
        */
        console.log("Found invalid operator chains: " + inputString.match(invalidOperators));

        invalidOperatorsRow.style.display = "block";
        document.getElementById("invalidOperatorsInformation").textContent = inputString.match(invalidOperators);
        
        hasFailed = true;
        // return;
    }

    if ("+-/*.".indexOf(inputString[0]) || "+-/*.".indexOf(inputString[-1])) {
        // Trailing operators
    }

    
    inputString = inputString.replaceAll(" ", "");
    return inputString;
}
