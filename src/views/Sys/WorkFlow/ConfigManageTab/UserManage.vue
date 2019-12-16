<template>
  <div class="user-container">
    <table>
      <tr>
        <td style="width: 30%;">
          <div class="user-left">
            <el-tree accordion :data="treeData" :props="defaultProps"></el-tree>
          </div>
        </td>
        <td style="width: 70%;">
          <div class="user-right">
            <div class="right-top">
              <p>111</p>
              <p>111</p>
              <p>111</p>
              <p>111</p>
              <p>111</p>
            </div>
            <div class="right-bottom">
              <el-table :data="data.content" :border="true">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column v-for="column in columns" header-align="center" align="center"
                  :prop="column.prop" :label="column.label" :min-width="column.minWidth"
                  :key="column.prop" :sortable="true">
                </el-table-column>
                <el-table-column :label="$t('action.operation')" width="185" fixed="right" header-align="center" align="center">
                  <template slot-scope="scope">
                    <kt-button icon="fa fa-edit" :label="$t('action.edit')"></kt-button>
                    <kt-button icon="fa fa-trash" :label="$t('action.delete')" type="danger"></kt-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <!-- <div class="user-left">
      <el-tree accordion :data="treeData" :props="defaultProps"></el-tree>
    </div>
    <div class="user-right">
      <div class="right-top">
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
      </div>
      <div class="right-bottom">
        <el-table :data="data.content" :border="true">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column v-for="column in columns" header-align="center" align="center"
            :prop="column.prop" :label="column.label" :min-width="column.minWidth"
            :key="column.prop" :sortable="true">
          </el-table-column>
          <el-table-column :label="$t('action.operation')" width="185" fixed="right" header-align="center" align="center">
            <template slot-scope="scope">
              <kt-button icon="fa fa-edit" :label="$t('action.edit')"></kt-button>
              <kt-button icon="fa fa-trash" :label="$t('action.delete')" type="danger"></kt-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
    
  </div>
</template>

<script>
import KtButton from "@/components/KtButton/index"
export default {
  data: function () {
    return {
      treeData: [{
          label1: '一级 1右移',
          children1: [{
            label1: '二级 1-1一级 1右移一级 1右移',
            children1: [{
              label1: '三级 1-1-1一级 1右移一级 1右移'
            }]
          }]
        }, {
          label1: '一级 2一级 1右移一级 1右移',
          children1: [{
            label1: '二级 2-1一级 1右移一级 1右移',
            children1: [{
              label1: '三级 2-1-1一级 1右移一级 1右移'
            }]
          }, {
            label1: '二级 2-2一级 1右移一级 1右移一级 1右移',
            children1: [{
              label1: '三级 2-2-1一级 1右移一级 1右移一级 1右移'
            }]
          }]
        }, {
          label1: '一级 3',
          children1: [{
            label1: '二级 3-1',
            children1: [{
              label1: '三级 3-1-1'
            }]
          }, {
            label1: '二级 3-2',
            children1: [{
              label1: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children1',
          label: 'label1'
        },
      data: {
        content: [{
          name: "yxy",
          nameCn: '袁晓宇',
          zhanghao: 'yxy90',
          bumen: '技术部',
          keyong: '可用',
          shemin: '是',
          jibie: '一般',
          creator: '创建者',
          createTime: '2015-12-29 15:17:51',
          startTime: '2017-09-28 00:00:00',
          endTime: '2019-09-28 00:00:00'
        },{
          name: "yxy",
          nameCn: '袁晓宇',
          zhanghao: 'yxy90',
          bumen: '技术部',
          keyong: '可用',
          shemin: '是',
          jibie: '一般',
          creator: '创建者',
          createTime: '2015-12-29 15:17:51',
          startTime: '2017-09-28 00:00:00',
          endTime: '2019-09-28 00:00:00'
        },{
          name: "yxy",
          nameCn: '袁晓宇',
          zhanghao: 'yxy90',
          bumen: '技术部',
          keyong: '可用',
          shemin: '是',
          jibie: '一般',
          creator: '创建者',
          createTime: '2015-12-29 15:17:51',
          startTime: '2017-09-28 00:00:00',
          endTime: '2019-09-28 00:00:00'
        },{
          name: "yxy",
          nameCn: '袁晓宇',
          zhanghao: 'yxy90',
          bumen: '技术部',
          keyong: '可用',
          shemin: '是',
          jibie: '一般',
          creator: '创建者',
          createTime: '2015-12-29 15:17:51',
          startTime: '2017-09-28 00:00:00',
          endTime: '2019-09-28 00:00:00'
        }]
      },
      columns: [{
        prop: 'name',
        label: '用户名'
      },{
        prop: 'nameCn',
        label: '中文名称'
      },{
        prop: 'zhanghao',
        label: '账号类型'
      },{
        prop: 'bumen',
        label: '部门'
      },{
        prop: 'keyong',
        label: '是否可用'
      },{
        prop: 'shemin',
        label: '是否涉敏'
      },{
        prop: 'jibie',
        label: '用户级别'
      },{
        prop: 'creator',
        label: '创建者'
      },{
        prop: 'createTime',
        label: '创建时间'
      },{
        prop: 'startTime',
        label: '账户有效期开始时间'
      },{
        prop: 'endTime',
        label: '账户有效期结束时间'
      }]
    }
  },
  components: {
    KtButton
  },
  handleNodeClick: function () {
    console.log('点击')
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  table
  tr
    border: 1px solid yellow
    width: 100%
  .user-container
    border: 1px solid black
    overflow: overflow
    box-sizing: border-box
    height: 250px
  .user-left
    border: 1px solid red
    float: left
    box-sizing: border-box
    height: 100%
  .user-right
    width: 70%
    border: 1px solid red
    float: left
    box-sizing: border-box
    height: 100%
  .right-bottom
    height: 150px
    overflow: auto
    border: 1px solid green
</style>
