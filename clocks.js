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

romanLiterals =
[
    [ "L", 50],
    ["XL", 40],
    [ "X", 10],
    ["IX",  9],
    [ "V",  5],
    ["IV",  4],
    [ "I",  1],
];

function integerToRoman(number)
{
    if (number < 0 || number > 60) {
        console.log("integerToRoman, input number out of range: " + number);
        return "";
    }
    
    if (number == 0) {
        return "O";
    }

    var romanNumber;
    for (var i = 0; i < romanLiterals.length; ++i)
    {
        var romanLetter = romanLiterals[i][0];
        var threshold = romanLiterals[i][1];

        if (number >= threshold) {
            romanNumber = romanLetter;
            number -= threshold;
            break;
        }
    }

    if (number > 0) {
        romanNumber += integerToRoman(number);
    }

    return romanNumber;
}

// Render clocks

var date = new Date();
var plainClockDiv = document.getElementById("clock_plain");
plainClockDiv.textContent = renderClockPlain(date);

var romanClockDiv = document.getElementById("clock_roman");
romanClockDiv.textContent = renderClockRoman(date);