const patternEmail = /^[\w!#$%&'*+\-=?^_`{|}~]+(\.[\w!#$%&'*+\-=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))/;

export const lengthCheck = (value = '', min = 0, max = 1000, type = '.') => {
    const regEx = new RegExp(`^${type}{${min},${max}}$`)
    return regEx.test(value)
}

export const emailValidation = (email) => {
    return patternEmail.test(email);
};


// const patternUrl = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/g);


// export function actionType(type) {
//     return type.toUpperCase().replace(/ /g, '_');
// }

// export function checkLength(min = 0, max = 1000, length = 0) {
//     return (min <= length) && (length <= max);
// }

// export function updateObject(obj = {}, props = {}) {
//     return { ...obj, ...props };
// }

// export function isEqual(a, b) {
//     return a === b;
// }

// export function isValidURL(string = '') {
//     return patternUrl.test(string);
// }