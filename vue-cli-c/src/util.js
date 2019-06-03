// 千位分隔
export const numFormat = (num) => {
  var res = num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  })
  return res;
};

// 大于两位小数的，保留两位小数
export const formatNum = (num) => {
  if (!(typeof num === 'number' && num % 1 === 0) && (num.toString().split(".")[1].length > 2)) {
    return num.toFixed(2);
  } else {
    return num;
  }
};

export const numberFormat = (number, decimals = 0, dec_point = '.', thousands_sep = ',') => {
  /*
   3     * 参数说明：
   4     * number：要格式化的数字
   5     * decimals：保留几位小数
   6     * dec_point：小数点符号
   7     * thousands_sep：千分位符号
   8     * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;

    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}