<template>
  <div class="homebox">
    <el-container>
      <el-aside>
        <div class="bumeng">
            <span><a>部门</a></span>
        </div>
        <div style="background: rgba(197, 229, 254, 1)">
          <a ><el-button @click="openall" icon="el-icon-folder-checked" size="mini" style="margin-left: -50px ;background: rgba(197, 229, 254, 1)">展开所有节点</el-button></a>
          <a ><el-button @click="closeall" icon="el-icon-folder-delete" size="mini" style="background: rgba(197, 229, 254, 1)">收起所有节点</el-button></a>
        </div>
        <div class="tree">
          <div class="block">
            <el-tree
              :data="data"
              node-key="id"
              ref="tree"
              @node-click="handleNodeClick"
              :expand-on-click-node="false"
              :render-content="renderContent">
            </el-tree>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <table>
              <tbody>
              <tr>
                <td>
                  <label>创建时间:</label>
                </td>
                <td>
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                </td>
                <td>
                  <a>-</a>
                </td>
                <td>
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-header>
        <el-main>
          <div>
            <div>
              <a>
                <span>
                  <el-button type="text" @click="centerDialogVisible = true">新增</el-button>
                  <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="50%"
                    center>
                    <div class="dialog">
                    <el-form label-position="top"  :model="formLabelAlign" size="mini" :rules="rules" ref="formLabelAlign">
                      <el-col span="12" style="width: 250px ; margin-top: -20px">
                        <el-form-item   prop="username" >
                          <div><span><span style="color: red">*</span>用户名:</span></div>
                          <el-input v-model="formLabelAlign.username">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="12" style="width: 250px; margin-top: -20px ;margin-left: 60px" >
                      <el-form-item  prop="code">
                        <div><span><span style="color: red">*</span>密码:</span></div>
                        <el-input v-model="formLabelAlign.code"></el-input>
                      </el-form-item>
                      </el-col>
                       <el-col span="12" style="width: 250px ;margin-top: -10px">
                        <el-form-item  prop="cname" >
                          <div><span><span style="color: red">*</span>中文名:</span></div>
                          <el-input v-model="formLabelAlign.cname">
                        </el-input>
                      </el-form-item>
                      </el-col>
                      <el-col style="width: 250px ;margin-top: -10px;margin-left: 60px" span="12">
                      <el-form-item   prop="phonenumber">
                        <div><span><span style="color: red">*</span>手机号码:</span></div>
                        <el-input v-model="formLabelAlign.phonenumber"></el-input>
                      </el-form-item>
                      </el-col>
                      <el-col style="width: 250px;margin-top: -10px" span="12">
                        <el-form-item   >
                          <div><span><span style="color: red">*</span>性别:</span></div>
                         <el-select v-model="formLabelAlign.sex" clearable placeholder="请选择" style="width: 250px">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                      <el-col style="width: 250px;margin-top: -10px; margin-left: 60px" span="12">
                      <el-form-item   >
                        <div><span><span style="color: red">*</span>密码有效天数:</span></div>
                       <el-input-number v-model="formLabelAlign.codevalidity" controls-position="right"  :min="1" style="width: 250px;"></el-input-number>
                      </el-form-item>
                      </el-col>
                      <el-col span="12" style="width: 250px;margin-top: -10px">
                        <el-form-item>
                          <div><span><span style="color: red">*</span>用户级别:</span></div>
                         <el-select v-model="formLabelAlign.userlevel" clearable placeholder="请选择" style="width: 250px">
                          <el-option
                            v-for="item in useroptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                      <el-col style="width: 250px;margin-top: -10px;margin-left: 60px" span="12">
                      <el-form-item >
                        <div><span><span style="color: red">*</span>部门:</span></div>
                        <el-input v-model="formLabelAlign.dept" @focus="chooseDeptDialog=true"></el-input>
                        <el-dialog
                          title="部门"
                          :visible.sync="chooseDeptDialog"
                          append-to-body>

                        </el-dialog>
                      </el-form-item>
                      </el-col>
                      <el-col span="12" style="margin-top: -10px">
                        <el-form-item >
                          <div><span><span style="color: red">*</span>账号类型:</span></div>
                         <el-select v-model="formLabelAlign.counttype" clearable placeholder="请选择" style="width: 250px">
                          <el-option
                            v-for="item in countoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      </el-col>
                      <el-col>
                         <el-divider content-position="left">详细信息:</el-divider>
                      </el-col>
                      <el-col span="8" style="margin-top: -20px">
                        <el-form-item  style="width: 180px" >
                          <div><span>Email:</span></div>
                          <el-input v-model="formLabelAlign.email">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="8" style="margin-top: -20px">
                        <el-form-item  style="width: 180px" >
                          <div><span>上级主管:</span></div>
                          <el-input v-model="formLabelAlign.email">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="8" style="margin-top: -20px">
                        <el-form-item  style="width: 180px" >
                          <div><span>电话号码:</span></div>
                          <el-input v-model="formLabelAlign.email">
                          </el-input>
                        </el-form-item>
                      </el-col>
                       <el-col span="8" style="margin-top: -20px">
                        <el-form-item  style="width: 180px" >
                          <div><span>账户有效开始时间:</span></div>
                          <el-input v-model="formLabelAlign.email">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="8" style="margin-top: -20px">
                        <el-form-item  style="width: 180px" >
                          <div><span>账户有效结束时间:</span></div>
                          <el-input v-model="formLabelAlign.email">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="8" style="margin-top: -20px">
                        <el-form-item  style="width: 180px" >
                          <div><span>所属地市:</span></div>
                          <el-input v-model="formLabelAlign.email">
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm(formLabelAlign)">确 定</el-button>
                    <el-button @click="resetForm(formLabelAlign)">取 消</el-button>
                  </span>
                </el-dialog>
                </span>
              </a>
            </div>
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            stripe="true"
            @selection-change="handleSelectionChange"
            height="450"
            class="elTable">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="cname"
              label="中文名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="acountType"
              label="账号类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="dept"
              label="部门"
              width="120">
            </el-table-column>
            <el-table-column
              prop="isAvailable"
              label="是否可用"
              width="100">
            </el-table-column>
            <el-table-column
              prop="isSensitive"
              label="是否涉敏"
              width="120">
            </el-table-column>
            <el-table-column
              prop="userLevel"
              label="用户级别"
              width="110">
            </el-table-column>
            <el-table-column
              prop="creater"
              label="创建者"
              width="100">
            </el-table-column>
            <el-table-column
              prop="cterteTime"
              label="创建时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="acountStartUseTime"
              label="账户有效期开始时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="acountStopUseTime"
              label="账户有效期结束时间"
              width="180">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="40">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    const data = [{
      id: 1,
      label: '部门',
      children: [{
        id: 4,
        label: '杭州东方通信软件技术有限公司',
        children: [{
          id: 9,
          label: '杭州东方通信软件技术有限公司root账户'
        }, {
          id: 10,
          label: '东方通信'
        }]
      }]
    }]
    return {
      data: JSON.parse(JSON.stringify(data)),
      tableData: [],
      multipleSelection: [],
      currentPage4: 4,
      isexpand:true,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: '',
      formLabelAlign: {
        username: '',
        code: '',
        cname: '',
        phonenumber: '',
        sex: '男',
        codevalidity: '90',
        userlevel: '一般操作人员',
        dept: '',
        counttype: 'PC'
      },
      options: [{
        value: '选项1',
        label: '男'
      }, {
        value: '选项2',
        label: '女'
      }],
      useroptions: [
        {
        value: '选项1',
        label: '一般操作人员'
        },
        {
          value: '选项1',
          label: '普通管理员'
        },
        {
        value: '选项2',
        label: '超级管理员'
        }
      ],
      countoptions: [
        {
          value: '选项1',
          label: 'PC'
        },
        {
          value: '选项1',
          label: 'APP'
        },
        {
          value: '选项2',
          label: 'PC+APP'
        }
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        cname: [
          { required: true, message: '请输入中文名', trigger: 'blur' },
        ],
        phonenumber: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
      },
      centerDialogVisible: false,
      chooseDeptDialog:false
    }
  },
  methods: {
    changecenterDialogVisible(){
      this.centerDialogVisible=false
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    test () {
      console.log(data[0].id)
    },
    handleNodeClick (data, node, vuecomponent) {
      alert(data.id)
      // console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent);
      if (data.id == 10) {
        this.$http
          .get('/posts')
          .then(res => {
            this.tableData=res.data.posts
            console.log(res.data.posts)
          })
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    openall(){
      this.isexpand=true;
      for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
        this.$refs.tree.store._getAllNodes()[i].expanded=this.isexpand;
      }

    },
    closeall(){
      this.isexpand=false;
      for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
        this.$refs.tree.store._getAllNodes()[i].expanded=this.isexpand;
      }

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  html,
  body,
  #app,
  .homebox,
  .el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
  }
  .bumeng{
    margin-left:4px;
    text-align: left;
    font-size: 16px;
    border-bottom: solid rgb(39, 108, 161) 1px;
    color: rgb(39, 108, 161);
    background: rgba(197, 229, 254, 1);
  }
  .tree{
    font-size: 14px;
    border-top: solid rgb(39, 108, 161) 1px;
  }
  .el-header{
    border: solid  rgb(39, 108, 161) 1px;
  }

  .el-aside {
    border-bottom: solid rgb(39, 108, 161) 1px;
    border-top: solid rgb(39, 108, 161) 1px;
    border-left: solid rgb(39, 108, 161) 1px;
  }

  .el-main {
    border-bottom: solid rgb(39, 108, 161) 1px;
    border-left: solid rgb(39, 108, 161) 1px;
    border-right: solid rgb(39, 108, 161) 1px;
  }
  .dialog{
    height: 60vh;
  }
</style>
