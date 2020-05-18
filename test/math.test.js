/**
 * @description
 * @author: 菩萨蛮
 * @date: 2019-09-12 10:31
 * @version: V1.0.0
 */
import m from '../src/plugin/math';


describe('math方法测试', () => {
    test('设置全局保留位数方法测试', () => {
        expect(m.sum(0.113, 0.213)).toBe(0.33);
        m.setPrecision(3);
        expect(m.sum(0.113, 0.213)).toBe(0.326);
    });
    test('求和方法测试', () => {
        m.setPrecision(2);
        expect(m.sum(0.1, 0.2)).toBe(0.3);
        expect(m.sum(0.11, 0.21)).toBe(0.32);
        expect(m.sum(0.1, 0.2, 0.3, 0.4)).toBe(1);
        expect(m.sum(0.1, 0.2, undefined, null, '', 0.3, 0.4)).toBe(1);
    });
    test('求大数和方法测试', () => {
        m.setPrecision(2);
        expect(m.sum('11111111111111111', '11111111111111111')).toBe('22222222222222222');
        expect(m.sum('11111111111111111.1', '11111111111111111.2')).toBe('22222222222222222.3');
        expect(m.sum('11111111111111111.11', '11111111111111111.22')).toBe('22222222222222222.33');
        expect(m.sum('11111111111111111.111', '11111111111111111.222')).toBe('22222222222222222.33');
        expect(m.sum('11111111111111111.115', '11111111111111111.222')).toBe('22222222222222222.34');
        expect(m.sum('1.1111111111111111115', '1.1111111111111111222')).toBe('2.22');
    });
    test('相减方法测试', () => {
        m.setPrecision(2);
        expect(m.sub('', 0.3)).toBe('');
        expect(m.sub(0.2, undefined)).toBe('');
        expect(m.sub(0.2, 0.3)).toBe(-0.1);
        expect(m.sub(0.3, 0.2)).toBe(0.1);
    });
    test('大数相减方法测试', () => {
        m.setPrecision(2);
        expect(m.sub('1111111111111111111.2', '1111111111111111111.1')).toBe('0.1');
        expect(m.sub('111111111111111111.11', '111111111111111111.12')).toBe('-0.01');
        expect(m.sub('11111111111111111.112', '11111111111111111.111')).toBe('0');
        m.setPrecision(3);
        expect(m.sub('11111111111111111.112', '11111111111111111.111')).toBe('0.001');
    });
    test('相乘方法测试', () => {
        m.setPrecision(2);
        expect(m.multiply('', 0.1)).toBe('');
        expect(m.multiply(0.2, undefined)).toBe('');
        expect(m.multiply(0.2, 0.1)).toBe(0.02);
        expect(m.multiply(0, 2)).toBe(0);
    });
    test('相乘方法数组测试', () => {
        m.setPrecision(2);
        expect(m.multiply(['', 0.1])).toBe('');
        expect(m.multiply([0.2, 0.1])).toBe(0.02);
        expect(m.multiply([1, 2, 3, 4, 5])).toBe(120);
    });
    test('大数相乘方法测试', () => {
        m.setPrecision(2);
        expect(m.multiply(11111111111111111, 11111111111111111))
            .toBe(1.2345679012345682e+32);
        expect(m.multiply('11111111111111111', '11111111111111111'))
            .toBe('123456790123456787654320987654321');
        expect(m.multiply('111111111111111.11', '111111111111111.11'))
            .toBe('12345679012345678765432098765.43');
        expect(m.multiply('11111111111111111', '0'))
            .toBe('0');
    });
    test('相除方法测试', () => {
        m.setPrecision(2);
        expect(m.divide(0.1, 0.3)).toBe(0.33);
        expect(m.divide(0, 2)).toBe(0);
        expect(m.divide(12, 0)).toBe(0);
        expect(m.divide(12, '0')).toBe('0');
        expect(m.divide(12, undefined)).toBe('');
        expect(m.divide(null, undefined)).toBe('');
    });
    test('大数相除方法测试', () => {
        m.setPrecision(2);
        expect(m.divide('222222222222222222222222', '2')).toBe('111111111111111111111111');
        expect(m.divide('2222222222222222222222.22', '2')).toBe('1111111111111111111111.11');
    });
});
