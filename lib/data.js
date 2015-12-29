/**
 * Created by apizzimenti on 12/29/15.
 */

var clc = require('cli-color');

function collectDates(data) {
    var dates = [];

    data.forEach(function (obj) {
        var date = new Date(obj.time * 1000);
        dates.push(date.toDateString());
    });

    return dates;
}

function collectHighs(data) {
    var highs = [];

    data.forEach(function (obj) {
        highs.push('high: ' + Math.floor(obj.temperatureMax).toString() + '˚');
    });

    return highs;
}

function collectLows(data) {
    var lows = [];

    data.forEach(function (obj) {
        lows.push('low: ' + Math.floor(obj.temperatureMin).toString() + '˚');
    });

    return lows;
}

function collectSummary(data) {
    var summaries = [];

    data.forEach(function (obj) {
        summaries.push(obj.summary.toLowerCase());
    });

    return summaries;
}

function display(now, dates, max, min, summaries, icons) {

    var current = '\nCurrent Conditions:\n------------------\n';

    current += (now.temperature >= 32 ? clc.red(Math.floor(now.temperature)) : clc.blue(Math.floor(now.temperature)) + clc.blue('˚')) +
            ' - ' + (now.windSpeed % 1 ? Math.floor(now.windSpeed) : Math.ceil(now.windSpeed)) + 'mph wind - ' +
            now.summary.toLowerCase() + '\n\n';

    var extended = '3-day forecast:\n';

    for(var i = 0; i < 3; i++) {
        extended += '---------------\n' + dates[i] + '\n' +
                (max[i] >= 32 ? clc.red(max[i]) : clc.blue(max[i])) + '\n' +
                (min[i] >= 32 ? clc.red(min[i]) : clc.blue(min[i])) + '\n' +
                summaries[i] + '\n' +
                icons[i] + '\n---------------\n\n';
    }

    return current + extended;

}

function icon(array) {
    var icons = [];

    array.forEach(function (name) {
        switch (name) {
            case 'clear-day':case 'clear-night':
            icons.push('☀ clear');
            break;
            case 'rain':
                icons.push('☂ rain');
                break;
            case 'snow':
                icons.push('❄ snow');
                break;
            case 'sleet':
                icons.push('☂❄ sleet');
                break;
            case 'wind':
                icons.push(name);
                break;
            default:
                icons.push('☁ clouds');
                break;
        }
    });

    return icons;
}

module.exports = {
    collectDates: collectDates,
    collectHighs: collectHighs,
    collectLows: collectLows,
    collectSummary: collectSummary,
    display: display,
    icon: icon
};