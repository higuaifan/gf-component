<template>
    <el-table-column :prop="prop" :label="label" :fixed="fixed"
                     :width="width||(item.attribute===3?'160px':'')">
        <template slot-scope="scope">
            <slot v-bind:scope="scope" name="default" v-if="scope.row.isNew!==true"/>
            <slot :scope="scope" name="button" v-if="scope.row.isNew===true"/>
            <div v-if="scope.row.isNew!==true&&!$slots.default&&!isSlot">
                <el-input v-model="scope.row[prop]" :placeholder="`请输入${label}`"
                          :disabled="disabled"
                          @change="changeHandler(scope.row,scope.$index)"
                          v-if="item.attribute!==2&&item.attribute!==3"/>
                <gf-input-number v-model="scope.row[prop]" :placeholder="`请输入${label}`" :controls="false"
                                 :disabled="disabled"
                                 @change="changeHandler(scope.row,scope.$index)"
                                 v-if="item.attribute===2"/>
                <el-date-picker v-model="scope.row[prop]" :placeholder="`请输入${label}`"
                                class="date-input"
                                :disabled="disabled"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                @change="changeHandler(scope.row,scope.$index)"
                                v-if="item.attribute===3"/>
            </div>
        </template>
    </el-table-column>
</template>

<script>
    /**
     * @description table column封装组件
     * @author: 菩萨蛮
     * @date 2019/11/14 9:56 上午
     * @version V1.0.1
     *
     * 公司的业务千篇一律，复杂的代码好几百行
     * TODO 为了节约时间暂时用字段判断是否有template,后续使用渲染函数进行优化
     *
     * V1.0.1 添加change事件冒泡
     */

    export default {
        name: 'GfSelectTableColumn',
        props: {
            label: String,
            prop: String,
            value: String,
            fixed: String,
            width: String,
            item: { type: Object, default: () => ({ attribute: 1 }) },
            isSlot: { type: Boolean, default: false },
            disabled: { type: Boolean, default: false }
        },
        methods: {
            changeHandler(row, index) {
                this.$emit('change', { row, index });
            }
        }
    };
</script>

<style lang="scss" scoped>

    .date-input {
        width: 150px;
    }

</style>
