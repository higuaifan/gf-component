/**
 * @description
 * @author: 菩萨蛮
 * @date: 2019-09-12 10:31
 * @version: V1.0.0
 */
import u from '../src/plugin/utils';


describe('utils方法测试', () => {
  describe('是否空值方法测试', () => {
    test('str为空字符串', () => {
      expect(u.isEmpty('')).toBe(true);
    });
    test('str为undefined', () => {
      expect(u.isEmpty(undefined)).toBe(true);
    });
    test('str为null', () => {
      expect(u.isEmpty(null)).toBe(true);
    });
    test('str为正常字符串', () => {
      expect(u.isEmpty('null')).toBe(false);
    });
  });
  describe('计算获取总数方法测试', () => {
    test('参数不完全测试', () => {
      expect(() => {u.getSumNum([{ num: 1 }], 'num');}).toThrowError('缺少unit字段');
    });
    test('默认key、单条数据、实际key为num测试', () => {
      expect(u.getSumNum([{ num: 1, unit: '元' }])).toBe('1元');
    });
    test('默认key、单条数据、实际key不为num求和测试', () => {
      expect(u.getSumNum([{ otherNum: 1, unit: '元' }])).toBe('0元');
    });
    test('指定key、单条数据测试', () => {
      expect(u.getSumNum([{ otherNum: 1, unit: '元' }], 'otherNum')).toBe('1元');
    });
    test('指定key、多条数据测试', () => {
      expect(u.getSumNum([{ otherNum: 1, unit: '元' },
        { otherNum: 0.1, unit: '元' },
        { otherNum: 99999, unit: '元' }], 'otherNum')).toBe('100000.1元');
    });
    test('多条数据，单位不一致测试', () => {
      expect(u.getSumNum([{ otherNum: 1, unit: '元' },
        { otherNum: 0.1, unit: '千克' },
        { otherNum: 1, unit: '元' }], 'otherNum')).toBe('无法计算');
    });
  });
});
