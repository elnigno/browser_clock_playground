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

var romanLiterals =
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

function renderClockApproximative(date) {
    var hourWord = numberToWord[date.getHours()];

    var approximateMinutes = Math.round(date.getMinutes() / 5) * 5;
    var minuteWord = numberToWord[approximateMinutes];

    var isSharp = date.getMinutes() % 5 == 0;

    if (isSharp) {
        return  "It's " + hourWord + " " + minuteWord + " sharp"; 
    } else {
        return  "It's about " + hourWord + " " + minuteWord; 
    }
}

var numberToWord =
{
     0: "midnight",
     1: "one",
     2: "two",
     3: "three",
     4: "four",
     5: "five",
     6: "six",
     7: "seven",
     8: "eight",
     9: "nine",
    10: "ten",
    11: "eleven",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "fourteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    21: "twenty-one",
    22: "twenty-two",
    23: "twenty-three",
    25: "twenty-five",
    30: "thirty",
    35: "thirty-five",
    40: "fourty",
    45: "fourty-five",
    50: "fifty",
    55: "fifty-five",
};

// Render clocks

var date = new Date();
var plainClockDiv = document.getElementById("clock_plain");
plainClockDiv.textContent = renderClockPlain(date);

var romanClockDiv = document.getElementById("clock_roman");
romanClockDiv.textContent = renderClockRoman(date);

var approximativeClockDiv = document.getElementById("clock_approximative");
approximativeClockDiv.textContent = renderClockApproximative(date);