# 怪凡组件库

> 继承/扩展饿了么element组件，以及一些小方法。

``` shell
npm i -S @higuaifan/gf-component
```
即可。

## GfTable 表格

### 作用

主要是维护了分页模块，查询方法，提供快速的刷新列表功能。

### 后端相关

**分页必须从0开始，数据结构如下：**

``` json
{
  code:200,
  msg:'',
  data:{
    page:0,
    pageSize:10,
    total:1,
    datas:{}
  }
}
```

**请将列表参数放置于`datas`中。**

包含数组查询的实例路径如下:

`/global/products?categoryId=0&categoryId=3&categoryId=14&pageNum=0&pageSize=7`



### 参数列表

| 参数字段 | 类型    | 描述                        | 默认值                                    |
| -------- | ------- | --------------------------- | ----------------------------------------- |
| gfTable  | Object  | 表格内信息维护对象          |                                           |
| layout   | String  | 页号                        | 'total, sizes, prev, pager, next, jumper' |
| indices  | Boolean | 列表get方法查询信息是否重写 | true                                      |
| position  | String | 指定了分页栏的位置,目前只支持center,right | right                             |

### 冒泡函数

需在调用时绑定的函数

| 函数名称    | 作用     |
| ----------- | -------- |
| updateTable | 更新列表 |

### 示例

``` vue
<template>
    <gf-table :gf-table="gfTable" @updateTable="updateTable">
      <template slot="table" slot-scope="data">
        <el-table :data="data.table" fit show-overflow-tooltip
                  @row-click="tableRowClick">
          <el-table-column label="操作人" prop="operatorName" key="operatorName"/>
      </el-table>
    </template>
    </gf-table>
</template>
<script>
export default{
  data(){
    return {
      gfTable:{
        url:'',
        table: [],
        searchObj: {},
        updateFlag: 0
      }
    }
  }
}  
</script>
```

常见用法如上，使用**插槽**的方式将`el-table`插入到`gf-table`组件中，内部`table`的样式和参数以及相关方法可以自由维护，不受`gf-table`影响。

## GfSelectTable 商品选择表格

### 作用

主要用于SaaS系统中选择商品后添加参数的列表。

### 参数列表

| 参数字段 | 类型  | 描述 | 默认值 |
| -------- | ----- | ---- | ------ |
| data     | Array | 数组 | []     |

### 示例

``` vue
<template>
	<div>
    <gf-select-table :data="prods">
    	<template>
      	<gf-select-table-column prop="pno" label="商品编号" :disabled="true">
        	<template v-slot:button>
          	<el-button type="primary" @click="showProductDialog">选择</el-button>
					</template>
				</gf-select-table-column>
      	<gf-select-table-column prop="prodName" label="商品名称"/>
  	</template>
  </gf-select-table>
	<product-select-dialog :visible.sync="productDialogVisible"
                           v-if="productDialogVisible"
                           @close="closeProductDialog" @getGoods="getGoods"/>
  </div>
</template>
<script>
export default{
  data(){
    return {
      prods: [],
      productDialogVisible: false
    }
  },
  methods:{
    showProductDialog() {
      this.productDialogVisible = true;
    },
    closeProductDialog() {
      this.productDialogVisible = false;
    },
    getGoods(val) {
      // 具体看需求实现
      this.prods.push(val);
    },
  }
}  
</script>
```

常见用法如上，使用**插槽**的方式将`table-column`插入到`gf-select-table`中去，配合`gf-select-table-column`使用的时候可以直接注入`el-button`，其他需要可阅读源码自己考虑实现。

## GfSelectTableColumn

### 作用

对于选择商品表中`el-table-column`的简单封装，提供了如果需要输入的时候，`input`、`input-number`、`date-picker`的类型选择，如果参数中`row.isNew === true`的话，会接受注入button。常规情况有特殊逻辑的列，也可使用插槽注入。

### 参数列表

| 参数字段 | 类型    | 描述                 | 默认值                                  |
| -------- | ------- | -------------------- | --------------------------------------- |
| label    | String  | 同el-table-column    |                                         |
| prop     | String  | 同el-table-column    |                                         |
| fixed    | String  | 同el-table-column    |                                         |
| width    | String  | 同el-table-column    |                                         |
| item     | Object  | 参数输入类型         | 1: input、2:input-number、3:date-picker |
| isSlot   | isSlot  | 是否需要使用插槽注入 |                                         |
| disabled | Boolean | 是否可操作           |                                         |

### 示例

``` vue
<template>
    <gf-table :gf-table="gfTable" @updateTable="updateTable">
      <template slot="table" slot-scope="data">
        <el-table :data="data.table" fit show-overflow-tooltip
                  @row-click="tableRowClick">
          <gf-select-table-column prop="sampleDate" label="目标打色时间"
                                  :item="{attribute:3}"/>
          <el-table-column label="操作人" prop="operatorName" key="operatorName"/>
          <gf-select-table-column fixed="right" label="操作" :is-slot="true">
            <template v-slot="{scope}">
              <gf-icon icon="shanchu" @click="deleteProds(scope.$index)"/>
            </template>
          </gf-select-table-column>
      	</el-table>
</template>
    </gf-table>
</template>
```

如上，看看代码就知道了。

## GfImage 图片展示

### 作用

图片展示组件，默认提供一个统一的暂无图片展示，本组件存在较大拓展空间。

### 参数列表

| 参数字段 | 类型   | 描述           | 默认值 |
| -------- | ------ | -------------- | ------ |
| src      | String | 绑定的地址参数 |        |

### 示例

``` vue
<template>
	<gf-image :src="img.url"/>
</template>
```

## GfAutoComplete

### 作用

查询下拉框的扩展组件，所有内容基本与`el-auto-complete`，添加了部分公司业务相关的性质，主要是不可随意输入无法选择到的内容。

### 参数列表

新增一个参数，一般在修改单据的时候使用。

| 参数字段     | 类型   | 描述          | 默认值 |
| ------------ | ------ | ------------- | ------ |
| defaultValue | String | value的默认值 |        |

## math

### 作用

用于计算数据避免大数和部分为0情况的封装数学方法。

### 包含函数

```
1. sum
2. sub
3. multiply
4. divide
5. setPrecision
```

组件库源码中有详细注释，请直接阅读源码。

## utils

### 作用

封装了部分简易函数

### 包含函数

```
1. isEmpty
2. notEmptyArr
3. getSumNum
4. getListIdStr
```

都属于比较简单的方法，直接看代码即可。

