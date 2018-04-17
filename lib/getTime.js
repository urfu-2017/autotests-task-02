// Функция zfill принимает два числа num и znum и преобразует num 
// к строке длины znum, дополняя лидирующими нулями
const zfill = (num, znum) => new Array(znum - String(num).length).fill('0').join('') + String(num);

const getTime = date => `${zfill(date.getUTCHours(), 2)}:${zfill(date.getUTCMinutes(), 2)}`;

module.exports = getTime;