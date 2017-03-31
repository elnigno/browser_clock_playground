function renderClockPlain(date)
{
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

var date = new Date();
var plainClockDiv = document.getElementById("clock_plain");
plainClockDiv.textContent = renderClockPlain(date);