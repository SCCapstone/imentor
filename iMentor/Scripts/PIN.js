/* 
Functions for working with randomly generating PINs
*/


// List to keep track of generated PINs

List < String > pinLog;

// Function to verify PIN uniqueness

function uniquePIN(pin) {
    for(i = 0; i < pinLog.length; ++i){
        if (pinLog[i] == pin)
            return false;
    }
    return true;
}

// Function for generating a randomized pin of characters/numerals

function generatePIN(length, charSet) {
    var result = "";
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * charSet.length)];
    pinLog.add(result);
    return result;
}

// Call to generation, omitting 0,1,i,l,o,I,L,O for minimal ambiguity

var pin = generatePIN(8, '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ');