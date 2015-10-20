'use strict';

var phoneBook = [
    ["Имя"],
    ["phone"],
    ["email"]
] // Здесь вы храните записи как хотите
var validPhoneRegExp = /^(\+?\d{1,4})?\s?(\(\d{3}\)|\d{3})\s?\d{3}(\-\d\-|\s\d\s|\d)\d{3}$/;
var validEmailRegExp = /^([a-z0-9._-])*@([a-zа-я0-9_-]+\.)+([a-zа-я]+)$/;

function normalizeNumber(phone) {
    //var newNum = Number(toString(phone).replace(/\D+/g, ""));
    var newNum = phone
    return '+' + (newNum.toString()).slice(0, -10) + " (" + (newNum.toString()).slice(-10, -7) + ") " + (newNum.toString()).slice(-7, -4) + "-" + (newNum.toString()).slice(-4, -2) + "-" + (newNum.toString()).slice(-2);
}

function denormalizeNumber(phone) {
    var num = Number(phone.replace(/\D+/g, ""));
    return num;
}

function isValidPhone(phone) {
    return validPhoneRegExp.test(phone)
}

function isValidEmail(email) {
    var newEmail = email.toLocaleLowerCase();
    return validEmailRegExp.test(newEmail)
}

function isValidName(name) {
    return (name != '')
}

function transformValidPhone(phone) {
    var newNum = denormalizeNumber(phone);
    if (newNum.toString().length === 10) newNum = '7' + newNum;
    //return '+'+(newNum.toString()).slice(0,-10)+"("+(newNum.toString()).slice(-10,-7)+")"+(newNum.toString()).slice(-7,-4)+"-"+(newNum.toString()).slice(-4,-2)+"-"+(newNum.toString()).slice(-2);
    return '' + newNum;
}

function transformValidEmail(email) {
    var newEmail = email.toLocaleLowerCase();
    return newEmail;
}

function notEmptyObject(obj) {
    for (var i in obj) {
        return true;
    }
    return false;
}

function printContact(name, phone, email){
    return name + ', ' + normalizeNumber(79997777777) + ', ' + email;
}
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/

module.exports.add = function add(name, phone, email) {
    // Ваша невероятная магия здесь
    if (isValidEmail(email) && isValidPhone(phone) && isValidName(name)) {
        phoneBook[0].push(name);
        phoneBook[1].push(transformValidPhone(phone));
        phoneBook[2].push(transformValidEmail(email));
        return console.log('Контакт ' + name + ' добавлен!')
    }
    if (!isValidName(name)) console.log('Контакт ' + phone + ',' + email + ' не добавлен! (имя не указано)');
    if (!isValidPhone(phone)) console.log('Контакт ' + name + ' не добавлен! (неверный номер)');
    if (!isValidName(email)) console.log('Контакт ' + name + ' не добавлен! (неверный Email)');
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    // Ваша удивительная магия здесь
    var nums = /[0-9]{2}/;
    var mails = /@/;
    var search = []
    if (query === undefined) {
        query = '';
    }
    if (isValidPhone){
        query = denormalizeNumber(query)
    }
    if (nums.test(query)) {
        console.log('Ищем по номеру')
        for (var g = 1; g < phoneBook[0].length; g++) {
            if (phoneBook[1][g].indexOf(query) + 1) {
                console.log(printContact(phoneBook[0][g], phoneBook[1][g], phoneBook[2][g]))
            }
        }
    } else if (mails.test(query)) {
        console.log('Ищем по почте')
        for (var g = 1; g < phoneBook[0].length; g++) {
            if (phoneBook[2][g].indexOf(query) + 1) {
                console.log(printContact(phoneBook[0][g], phoneBook[1][g], phoneBook[2][g]))
            }
        }
    } else {
        for (var i = 0; i < 3; i++) {
            for (var g = 1; g < phoneBook[0].length; g++) {
                if (phoneBook[i][g].indexOf(query) + 1) {
                    //console.log(phoneBook[0][g] + ', ' + phoneBook[1][g] + ', ' + phoneBook[2][g])
                    search[g] = g;
                }
            };
        }
        for (var g = 1; g < search.length; g++) {
            if (typeof (search[g]) === 'number') {
                console.log(printContact(phoneBook[0][g], phoneBook[1][g], phoneBook[2][g]))
            };
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var counter = 0;
    var check = '';
    if (query === undefined) {
        query = '';
        check = ' (все удалено)'
    }
    if (isValidPhone){
        query = denormalizeNumber(query)
    }
    var counter = 0;
    // Ваша необьяснимая магия здесь
    for (var i = 0; i < 3; i++) {
        for (var g = phoneBook[0].length - 1; g > 0; g--) {
            if (phoneBook[i][g].indexOf(query) + 1) {
                phoneBook[0].splice(g, 1);
                phoneBook[1].splice(g, 1);
                phoneBook[2].splice(g, 1);
                counter += 1;

            }
        }
    }
    console.log(counter + ' контакт(ов) удалено!' + check)
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    //console.log(typeof(data))
    var profile = data.split('\n')
    for (var i = profile.length - 1; i >= 0; i--) {
        if (notEmptyObject(profile[i])) {
            profile[i] = profile[i].split(';')
            phoneBook[0].push(profile[i][0]);
            phoneBook[1].push(transformValidPhone(profile[i][1]));
            phoneBook[2].push(transformValidEmail(profile[i][2]));
        }
    };
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу

};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var newNum = ''
    var onlyNum = '';
    var border = '';
    var maxLength = 0;
    var maxNameLength = 0;
    var maxPhoneLength = 0;
    var maxMailLength = 0;
    var spaceAfterName = '';
    var spaceAfterPhone = '';
    var spaceAfterMail = '';
    for (var i = 0; i < 3; i++) {
        for (var g = phoneBook[0].length - 1; g > 0; g--) {
            if (phoneBook[0][g].length > maxNameLength) maxNameLength = phoneBook[0][g].length;
            if (phoneBook[1][g].length > maxPhoneLength) maxPhoneLength = phoneBook[1][g].length;
            if (phoneBook[2][g].length > maxMailLength) maxMailLength = phoneBook[2][g].length;
        }
    }
    maxLength = maxMailLength + maxPhoneLength + maxNameLength;
    for (var i = 0; i < maxLength + 16; i++) border += '='
    console.log(border);
    for (var g = phoneBook[1].length - 1; g > 0; g--) {
        for (var a = maxNameLength - phoneBook[0][g].length; a > 0; a--) spaceAfterName += ' ';
        for (var b = maxPhoneLength - phoneBook[1][g].length; b > 0; b--) spaceAfterPhone += ' ';
        for (var c = maxMailLength - phoneBook[2][g].length; c > 0; c--) spaceAfterMail += ' ';
        newNum = normalizeNumber(phoneBook[1][g])
        console.log('|' + phoneBook[0][g] + spaceAfterName + ' | ' + newNum + spaceAfterPhone + ' | ' + phoneBook[2][g] + spaceAfterMail + ' |');
        spaceAfterName = '';
        spaceAfterMail = '';
        spaceAfterPhone = '';
    }
    console.log(border);
    //console.log(phoneBook);
    // Ваша чёрная магия здесь
};
