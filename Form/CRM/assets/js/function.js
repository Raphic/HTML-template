function ConvertStringToFloat(num) {
    if (Number.isNaN(Number.parseFloat(num))) {
        return 0;
    }
    return parseFloat(num);
}

function ConvertStringToInt(num) {
    if (Number.isNaN(Number.parseInt(num))) {
        return 0;
    }
    return parseInt(num);
}

function addCommas(nStr, numDecimal) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    if (numDecimal > 0)
        return x1 + x2.substr(0, numDecimal );
    else
        return x1;
}

function mathRound(num, numDecimal) {
    if (numDecimal > 0) {
        if (numDecimal == 1)
            return Math.round(num * 10) / 10;
        else if (numDecimal == 2)
            return Math.round(num * 100) / 100;
        else if (numDecimal == 3)
            return Math.round(num * 1000) / 1000;
        else if (numDecimal == 4)
            return Math.round(num * 10000) / 10000;
        else if (numDecimal == 5)
            return Math.round(num * 100000) / 100000;
    }

    return Math.round(num);
}

function ChuyenSoSangLaMa(number)
{
    if ((number < 0) || (number > 3999)) return "";
    if (number < 1) return "";
    if (number >= 1000) return "M" + ChuyenSoSangLaMa(number - 1000);
    if (number >= 900) return "CM" + ChuyenSoSangLaMa(number - 900);
    if (number >= 500) return "D" + ChuyenSoSangLaMa(number - 500);
    if (number >= 400) return "CD" + ChuyenSoSangLaMa(number - 400);
    if (number >= 100) return "C" + ChuyenSoSangLaMa(number - 100);
    if (number >= 90) return "XC" + ChuyenSoSangLaMa(number - 90);
    if (number >= 50) return "L" + ChuyenSoSangLaMa(number - 50);
    if (number >= 40) return "XL" + ChuyenSoSangLaMa(number - 40);
    if (number >= 10) return "X" + ChuyenSoSangLaMa(number - 10);
    if (number >= 9) return "IX" + ChuyenSoSangLaMa(number - 9);
    if (number >= 5) return "V" + ChuyenSoSangLaMa(number - 5);
    if (number >= 4) return "IV" + ChuyenSoSangLaMa(number - 4);
    if (number >= 1) return "I" + ChuyenSoSangLaMa(number - 1);
    return "";
}

