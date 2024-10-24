function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

function isDecimal(n) {
    if (!isNaN(n) && n.toString().indexOf('.') != -1) {
        return true;
    }

    return false;
}

/**
 * Convert string to date string formated.
 *
 * @param   {string} date   The valid date string.
 * @returns {string} date   string format 2024-08-17.
 */
function dateToYYMMDD(date) {
    let objDate = new Date(date);
    if (!isNaN(objDate)) {
        var d = objDate.getDate();
        var m = objDate.getMonth() + 1; //Month from 0 to 11
        var y = objDate.getFullYear();

        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    return ""
}

/**
 * Convert string to date string formated.
 *
 * @param   {string} date   The valid date string.
 * @returns {string} date   string format 2024-Jan-17.
 */
function dateToYYmDD(date) {
    let objDate = new Date(date);
    if (!isNaN(objDate)) {
        var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = objDate.getDate();
        var m = strArray[objDate.getMonth()];
        var y = objDate.getFullYear();

        return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
    }

    return ""
}
