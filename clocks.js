function renderClockPlain(date) {
    return       date.getHours() + 
           ":" + date.getMinutes() +
           ":" + date.getSeconds();
}

function renderClockRoman(date) {
    return         integerToRoman(date.getHours())
           + ":" + integerToRoman(date.getMinutes())
           + ":" + integerToRoman(date.getSeconds());
}

function integerToRoman(number)
{
    romanNumber = "";

    if (number < 0 || number > 61) {
        console.log("integerToRoman, input number out of range: " + number);
        return "";
    }

    if (number == 0) {
        return "O";
    }

    remainder = number;
    if (number >= 50) {
        romanNumber = "L";
        remainder -= 50;
    }
    else if (number >= 40) {
        romanNumber = "XL";
        remainder -= 40;
    }
    else if (number >= 10) {
        romanNumber = "X";
        remainder -= 10;
    }
    else if (number >= 5) {
        romanNumber = "V";
        remainder -= 5;
    }
    else if (number >= 4) {
        romanNumber = "IV";
        remainder -= 4;
    }
    else {
        romanNumber = "I";
        remainder -= 1;
    }

    if (remainder > 0)
        return romanNumber + integerToRoman(remainder);
    else
        return romanNumber;
}

var date = new Date();
var plainClockDiv = document.getElementById("clock_plain");
plainClockDiv.textContent = renderClockPlain(date);

var romanClockDiv = document.getElementById("clock_roman");
romanClockDiv.textContent = renderClockRoman(date);