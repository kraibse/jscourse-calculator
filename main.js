function checkSyntax() {
    /*
    Function gets called on text input update.
    Checks the input string for any faulty characters and syntax
    
    Check for spaces
    */
    let inputString = document.getElementById("equation").value;
    
    let errorIndex = document.getElementById("errorIndex");
    let errorBox = document.getElementById("errorBox");

    let allowedChars = "0123456789*/+-.";
    
    for (let i = 0; i < inputString.length; i++) {
        let char = inputString[i];
        if (char == " ")
            continue;

        if (!allowedChars.includes(char)) {
            errorIndex.innerHTML = i + 1;
            // errorBox.style.display = "block";
            break;
        }
    }
    inputString = inputString.replaceAll(" ", "");
    
    // errorBox.style.display = "none";

    return inputString;
}