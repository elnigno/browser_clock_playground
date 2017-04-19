// Plain text clock

function renderClockPlain(date) {
    return       date.getHours() + 
           ":" + date.getMinutes() +
           ":" + date.getSeconds();
}

// Roman clock

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

// Approximate clock

function renderClockApproximative(date) {
    var hour = date.getHours();
    var approximateMinutes = (Math.round(date.getMinutes() / 5) * 5) % 60;
    var isSharp = approximateMinutes == 0;

    var hourWord = numberToWord[hour];
    var minuteWord = numberToWord[approximateMinutes];

    if (isSharp) {
        return  "It's " + hourWord + " sharp"; 
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
    12: "twelve",
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

// Approximate clock, grid

function renderClockApproximativeGrid(date) {
    var hour = date.getHours();
    var approximateMinutes = (Math.round(date.getMinutes() / 5) * 5) % 60;
    var isSharp = approximateMinutes == 0;

    hourSpanId = "clock_approximative_grid_h" + hour;
    minutesSpanId = "clock_approximative_grid_m" + approximateMinutes;

    renderClockApproximativeGridResetBold();
    renderClockApproximativeGridMakeBold("clock_approximative_grid_its");

    if (!isSharp) {
        renderClockApproximativeGridMakeBold("clock_approximative_grid_about");
    }
    
    renderClockApproximativeGridMakeBold(hourSpanId);
    renderClockApproximativeGridMakeBold(minutesSpanId);
}

function renderClockApproximativeGridResetBold(id)
{
    var div = document.getElementById("clock_approximative_grid");
    for (var i = 0; i < div.children.length; ++i)
    {
        div.children[i].className = '';
    }
}

function renderClockApproximativeGridMakeBold(id)
{
    var its = document.getElementById(id);
    its.className = "clock_approximative_grid_emph";
}

// Basic Clock, SVG

var clockSize = 200;
var halfClockSize = clockSize / 2;
var secondsHandLength = 0.8 * halfClockSize;
var minutesHandLength = 0.6 * halfClockSize;
var hoursHandLength   = 0.4 * halfClockSize;

function renderClockBasicSVG(date)
{
    var secondsRatio = date.getSeconds()/60;
    renderClockBasicSVGDrawHand("clock_basic_svg_seconds", secondsRatio, secondsHandLength);

    var minutesRatio = date.getMinutes()/60;
    renderClockBasicSVGDrawHand("clock_basic_svg_minutes", minutesRatio, minutesHandLength);

    var hoursRatio = (date.getHours() % 12) / 12;
    renderClockBasicSVGDrawHand("clock_basic_svg_hours", hoursRatio, hoursHandLength);
}

function renderClockBasicSVGDrawHand(elementId, ratio, handLength)
{
    var element = document.getElementById(elementId);
    var x2 = handLength * Math.sin(ratio * 2 * Math.PI);
    var y2 = handLength * Math.cos(Math.PI - ratio * 2 * Math.PI);

    element.setAttribute("x1", halfClockSize  );
    element.setAttribute("y1", halfClockSize  );
    element.setAttribute("x2", halfClockSize + x2);
    element.setAttribute("y2", halfClockSize + y2);
}

// Run a few tests
function runTests() {
    {
        var date = new Date(2017, 03, 19, 12, 12, 12);
        var result = renderClockApproximative(date);
        if (result != "It's about twelve ten") {
            console.log("TEST FAILURE!!! Expected: 'It's about twelve ten', Actual: '" + result + "'");
        }
    }
}

// Render clocks

var plainClockDiv = document.getElementById("clock_plain");
var romanClockDiv = document.getElementById("clock_roman");
var approximativeClockDiv = document.getElementById("clock_approximative");

function updateClocks() {
    var date = new Date();
    romanClockDiv.textContent = renderClockRoman(date);
    plainClockDiv.textContent = renderClockPlain(date);
    approximativeClockDiv.textContent = renderClockApproximative(date);
    renderClockApproximativeGrid(date);
    renderClockBasicSVG(date);
}

runTests();
setInterval(updateClocks, 1000);
