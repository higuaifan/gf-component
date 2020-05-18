/**
 * @description 公共方法
 * @author: 菩萨蛮
 * @date: 2019-11-04 15:14
 * @version: V1.0.1
 *
 * V1.0.1 添加一个copy方法
 */
import math from './math';

const getListIdStr = (list, item = 'pno') => (Array
    .isArray(list) ? [...new Set(list.map(e => e[item]))].join('、') : '');
const isEmpty = str => str === '' || str === undefined || str === null;
const notEmptyArr = arr => arr && arr.length > 0;
const copy = obj => JSON.parse(JSON.stringify(obj));
/**
 * 计算获取总数方法
 * @param list
 * @param key 默认值num 如果key不一致，请务必指定清楚
 * @returns {string} 如果单位一致则返回计算总和，如果不一致返回无法计算，list不是 array返回为空
 */
const getSumNum = (list, key = 'num') => {
    if (Array.isArray(list)) {
        const unitList = list.map(e => e.unit).filter(e => !isEmpty(e));
        if (unitList.length === 0) {
            throw new Error('缺少unit字段');
        }
        return [...new Set(unitList)].length > 1 ? '无法计算' : `${math.sum(...list
            .map(e => e[key]))}${list[0].unit}`;
    }
    return '';
};

const u = {
    getListIdStr,
    isEmpty,
    getSumNum,
    notEmptyArr,
    copy
};

export default u;
