export function phonePrettier(val: string): string {
  if (!val) return val;
  var r = /([0-9])+/g, 
        arr = val.match(r) || [], 
        res, 
        str = arr?.join('');
    if (val.substr(0, 1) === '+') {
            res = "+" + str;
    } else if (str?.substr(0, 1) === '8') {
            res = "+7" + str.substr(1);
    } else {
            res = str;
    }
    return res;
}