//make an array of disable dates
const dates = JSON.parse(document.getElementById('date').textContent);
console.log(dates)
function disableDates(date) {
    const string = $.datepicker.formatDate('yy-mm-dd', date);
    return [dates.indexOf(string) === -1];
}

$("#datepicker").datepicker({
    beforeShowDay: disableDates,
    minDate: 0 //restrict user to choose previous date
});