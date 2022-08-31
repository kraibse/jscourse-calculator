
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
let str = '-3--3';
console.log(splitTerm(str));