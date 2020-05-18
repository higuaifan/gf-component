import {mount, createLocalVue} from '@vue/test-utils'
import element from 'element-ui'
import autoComplete from '../src/pages/CompletePage'

const localVue = createLocalVue();
localVue.use(element);
describe('输入建议组件', () => {
  const wrapper = mount(autoComplete, {localVue});

  jest.useFakeTimers();

  test('确认渲染了input组件', () => {
    expect(wrapper.contains('input')).toBe(true)
  });

  test('输入可筛选字符串并筛选', () => {
    wrapper.vm.$children[0].getData('菩萨');
    expect(wrapper.vm.$children[0].$data.suggestions).toEqual(expect.arrayContaining([{value: "菩萨蛮"}]));
    expect(wrapper.vm.$children[0].$data.suggestions).toEqual(expect.not.arrayContaining([{value: "临江仙"}]));
  });

  test('查询不查询到的数据', () => {
    wrapper.vm.$children[0].getData('江城子');
    expect(wrapper.vm.$children[0].$data.suggestions.length).toBe(0);
  });

  test('选择可选择字段', () => {
    wrapper.vm.$children[0].getData('菩萨');
    wrapper.vm.$children[0].select(wrapper.vm.$children[0].$data.suggestions[0]);
    expect(wrapper.vm.$data.completeValue).toBe('菩萨蛮');
    expect(wrapper.vm.$data.emitValue).toBe('菩萨蛮');
  });

  test('选择后修改为不存在的值', () => {
    wrapper.vm.$children[0].getData('菩萨');
    wrapper.vm.$children[0].select(wrapper.vm.$children[0].$data.suggestions[0]);
    expect(wrapper.vm.$data.completeValue).toBe('菩萨蛮');
    expect(wrapper.vm.$data.emitValue).toBe('菩萨蛮');
    wrapper.vm.$data.completeValue = '江城子';
    wrapper.vm.$children[0].close(null);
    expect(wrapper.vm.$data.completeValue).toBe('菩萨蛮');
    expect(wrapper.vm.$data.emitValue).toBe('菩萨蛮');
  });

  test('选择后修改为存在的值', async () => {
    wrapper.vm.$children[0].getData('菩萨');
    wrapper.vm.$children[0].select(wrapper.vm.$children[0].$data.suggestions[0]);
    expect(wrapper.vm.$data.completeValue).toBe('菩萨蛮');
    expect(wrapper.vm.$data.emitValue).toBe('菩萨蛮');
    wrapper.vm.$children[0].handleChange('临江仙');
    jest.runAllTimers();
    wrapper.vm.$children[0].select(wrapper.vm.$children[0].$data.suggestions[0]);
    expect(wrapper.vm.$data.emitValue).toBe('临江仙');
  });

  test('选择后修改为空值', () => {
    wrapper.vm.$children[0].getData('菩萨');
    wrapper.vm.$children[0].select(wrapper.vm.$children[0].$data.suggestions[0]);
    expect(wrapper.vm.$data.completeValue).toBe('菩萨蛮');
    expect(wrapper.vm.$data.emitValue).toBe('菩萨蛮');
    wrapper.vm.$data.completeValue = '';
    wrapper.vm.$children[0].close(null);
    expect(wrapper.vm.$data.completeValue).toBe('');
    expect(wrapper.vm.$data.emitValue).toBe('');
  });

  test('清空值', () => {
    wrapper.vm.$children[0].getData('菩萨');
    wrapper.vm.$children[0].select(wrapper.vm.$children[0].$data.suggestions[0]);
    expect(wrapper.vm.$data.completeValue).toBe('菩萨蛮');
    expect(wrapper.vm.$data.emitValue).toBe('菩萨蛮');
    wrapper.vm.$children[0].handleClear();
    expect(wrapper.vm.$children[0].$data.defaultValue).toBe('');
  });

  test('设置disabled', () => {
    wrapper.vm.$children[0].getData('菩萨');
    wrapper.vm.$children[0].select(wrapper.vm.$children[0].$data.suggestions[0]);
    expect(wrapper.vm.$data.completeValue).toBe('菩萨蛮');
    expect(wrapper.vm.$data.emitValue).toBe('菩萨蛮');
    wrapper.find('button').trigger('click');
    expect(wrapper.find('input').attributes('disabled')).toBe("disabled");
  });
});
