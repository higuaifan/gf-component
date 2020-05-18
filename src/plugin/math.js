/**
 * @description 计算整合方法
 * 由于返回值是数字，因此数字精度最高16位
 * @author: 菩萨蛮
 * @date: 2019-09-12 10:25
 * @version: V1.1.0
 *
 * V1.1.0 乘法方法添加数组相乘功能，后续可以优化成...value的形式
 */


import * as math from 'mathjs';

let PRECISION = 2;
let NOTATION = 'fixed';

/**
 * 设置保留位数
 * @param precision
 * @private
 */
const _setPrecision = precision => {
    PRECISION = precision;
};

/**
 * 格式化数值方法
 * @param value 数值
 * @param option 相关参数
 * @returns {number} 返回格式化后的数值
 * @private
 */
const _format = (value, option) => {
    const _option = {
        precision: PRECISION,
        notation: NOTATION
    };
    return math.format(value, Object.assign(_option, option));
};

const isStr = str => typeof str === 'string';
const isEmpty = str => str === undefined || str === '' || str === null;

const removeZero = str => str.replace(/(?:\.0*|(\.\d+?)0+)$/g, '$1');

const no0Format = str => removeZero(_format(str));

const m = {
    setPrecision: precision => _setPrecision(precision),
    /**
     * 求和，如果参数中有string则判断为大数
     * @param values 需要求和的数组
     * @returns {string |number} 求和结果 参数为string的时候返回string
     */
    sum: (...values) => {
        // 过滤数据
        values = values.filter(v => !isEmpty(v));
        if (values.some(v => isStr(v))) {
            return no0Format(math.sum(values.map(v => math.bignumber(v))));
        }
        return Number(_format(math.sum(values)));
    },
    /**
     * 减法，如果参数中有string则判断为大数
     * @param {number | string} x 被减数
     * @param {number | string} y 减数
     * @returns {number | string} 减法结果 参数为string的时候返回string
     */
    sub: (x, y) => {
        if (isEmpty(x) || isEmpty(y)) {
            return '';
        }
        if (isStr(x) || isStr(y)) {
            return no0Format(math.subtract(math.bignumber(x), math.bignumber(y)));
        }
        return Number(_format(math.subtract(x, y)));
    },
    /**
     * 乘法，如果参数中有string则判断为大数
     * @param {number | string | Array} x 乘数
     * @param {number | string} y 乘数
     * @returns {number | string} 乘法结果 参数为string的时候返回string
     */
    multiply: (x, y = undefined) => {
        // 如果传入了一个数组
        if (x instanceof Array) {
            let sum = 1;
            x.map(v => {
                sum = m.multiply(sum, v);
            });
            return sum;
        }
        if (isEmpty(x) || isEmpty(y)) {
            return '';
        }
        if (isStr(x) || isStr(y)) {
            return no0Format(math.multiply(math.bignumber(x), math.bignumber(y)));
        }
        return Number(_format(math.multiply(x, y)));
    },
    /**
     * 除法，如果参数中有string则判断为大数
     * @param {number | string} x 被除数
     * @param {number | string} y 除数
     * @returns {number | string} 除法结果 参数为string的时候返回string
     */
    divide: (x, y) => {
        if (isEmpty(x) || isEmpty(y)) {
            return '';
        }
        if (y === '0') {
            return '0';
        }
        if (y === 0) {
            return 0;
        }
        if (isStr(x) || isStr(y)) {
            return no0Format(math.divide(math.bignumber(x), math.bignumber(y)));
        }
        return Number(_format(math.divide(x, y)));
    }
};
export default m;
