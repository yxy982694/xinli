<template>
<div class="resource-container">
  <kt-buttons>
    <template slot="toolSearch">
      <el-input v-model="userName" placeholder="用户名"></el-input>
      <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary" @click="searchInfo"></kt-button>
      <!-- <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add" type="primary" @click="addInfo(false)"></kt-button> -->
    </template>
  </kt-buttons><!-- :ifShortCut="true" -->
  <kt-table :loading="loading" @loadData="loadData" @handleEdit="editInfo" @addInfo="addInfo" @handleDelete="deleteInfo" :columns="filterColumns" :data="tableData" :border="true" :showCheckBox="false" :showPage="false" rowKey="id" :treeProps="treeProps" :defaultExpandAll="false"></kt-table>
  <!--新增编辑界面-->
  <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
  	<el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size"
  		label-position="right">
  		<el-form-item label="id" prop="id" v-if="false">
  			<el-input v-model="dataForm.id" auto-complete="off"></el-input>
  		</el-form-item>
  		<el-form-item label="名称" prop="name">
  			<el-input v-model="dataForm.name" auto-complete="off"></el-input>
  		</el-form-item>
  		<el-form-item label="中文名称" prop="nameCn">
  			<el-input v-model="dataForm.nameCn" auto-complete="off"></el-input>
  		</el-form-item>
  		<el-form-item label="路径" prop="location">
  			<el-input v-model="dataForm.location" auto-complete="off"></el-input>
  		</el-form-item>
  		<el-form-item label="菜单类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择"
        	 style="width: 100%;">
        	<el-option v-for="item in typeArr" :key="item.id"
        		:label="item.value" :value="item.id">
        	</el-option>
        </el-select>
  			<!-- <el-input v-model="dataForm.type" auto-complete="off"></el-input> -->
  		</el-form-item>
      <el-form-item label="是否网页" prop="isWebpage">
        <el-select v-model="dataForm.isWebpage" placeholder="请选择"
        	 style="width: 100%;">
        	<el-option v-for="item in isWebpageArr" :key="item.id"
        		:label="item.value" :value="item.id">
        	</el-option>
        </el-select>
      	<!-- <el-input v-model="dataForm.isWebpage" auto-complete="off"></el-input> -->
      </el-form-item>
      <el-form-item label="排序序号" prop="orderby">
      	<el-input v-model="dataForm.orderby" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="dataForm.status" placeholder="请选择"
        	 style="width: 100%;">
        	<el-option v-for="item in statsArr" :key="item.id"
        		:label="item.value" :value="item.id">
        	</el-option>
        </el-select>
      	<!-- <el-input v-model="dataForm.status" auto-complete="off"></el-input> -->
      </el-form-item>
      <el-form-item label="菜单描述" prop="remark">
      	<el-input v-model="dataForm.remark" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标路径" prop="image">
      	<el-input v-model="dataForm.image" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
      	<el-input v-model="dataForm.createTime" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="creator">
      	<el-input v-model="dataForm.creator" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="父id" prop="parentId" v-if="false">
      	<el-input v-model="dataForm.parentId" auto-complete="off"></el-input>
      </el-form-item>
  	</el-form>
  	<div slot="footer" class="dialog-footer">
  		<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
  		<el-button :size="size" type="primary" @click.native="submitForm" >{{$t('action.submit')}}</el-button>
  	</div><!-- :loading="editLoading" -->
  </el-dialog>
  <div class="shortcut-container" v-show="showShortCut"><!--  v-if="ifShortCut" -->
    <kt-button icon="fa fa-plus" :label="$t('action.add')" @click="addInfo" />
    <kt-button icon="fa fa-edit" :label="$t('action.edit')" @click="editInfo" />
    <kt-button icon="fa fa-trash" :label="$t('action.delete')" @click="deleteInfo" />
  </div>
</div>
</template>
<script>
  import KtButton from "@/components/KtButton/index"
  import KtTable from "@/components/KtTable/KtTable"
  import KtButtons from "@/components/KtButtons/KtButtons"
  export default {
    data() {
      return {
        userName: '',
        columnArr: [],
        filterColumns: [],
        showCheckBox: false,
        showPage: false,
        operation: false,
        dialogVisible: false,
        size: 'small',
        editLoading: false,
        isShortCut: false,
        currentId: null,
        showShortCut: false,
        loading: true,
        statsArr: [{
          id: 0,
          value: '失效'
        },{
          id: 1,
          value: '有效'
        },{
          id: 2,
          value: '隐藏'
        }],
        isWebpageArr: [{
          id: 0,
          value: '否'
        },{
          id: 1,
          value: '是'
        }],
        typeArr: [{
          id: 1,
          value: '顶部菜单'
        },{
          id: 2,
          value: '左侧菜单'
        },{
          id: 3,
          value: '功能菜单'
        }],
        dataFormRules: {
        	name: [
        		{ required: true, message: '请输入用户名', trigger: 'blur' }
        	]
        },
        dataForm: {
          id: 1,
          nameCn: '中文名称',
          name: '名称',
          location: '路径',
          type: '',
          isWebpage: '',
          orderby: '11',
          status: '',
          remark: '菜单描述',
          image: '菜单图标路径',
          createTime: '创建时间',
          creator: '创建人',
          parentId: ''
        },
        treeProps: {children: 'children', hasChildren: 'hasChildren'},
        tableData: {
          content: null
        },
      }
    },
    components:{
    	KtButton,
      KtTable,
      KtButtons
    },
    mounted: function () {
      let _this = this
      this.initColumns()
      window.onclick = function () {
        _this.showShortCut = false
      }
      // this.$nextTick(function () {
      //   let doms = document.querySelectorAll('.resource-container .cell')
      //   Array.prototype.forEach.call(doms,function (item) {
      //     if (item.innerHTML.trim() == '启用' || item.innerHTML.trim() == '是') {
      //       item.style.color = 'green'
      //     } else if (item.innerHTML.trim() == '弃用' || item.innerHTML.trim() == '否') {
      //       item.style.color = 'red'
      //     }
      //   })
      // })
    },
    methods: {
      handleArr: function (arr) {

      },
      initColumns: function () {
        this.columnArr = [
          // {prop:"id", label:"id",sortable: false},
          {prop:"nameCn", label:"中文名称",sortable: false,minWidth: "200px"},
          {prop:"name", label:"名称",sortable: false},
          {prop:"location", label:"路径",sortable: false},
          {prop:"type", label:"菜单类型",sortable: false},
          {prop:"isWebpage", label:"是否网页",sortable: false},
          {prop:"order", label:"排序序号",sortable: false},
          {prop:"status", label:"状态",sortable: false},
          {prop:"remark", label:"菜单描述",sortable: false},
          {prop:"image", label:"菜单图标路径",sortable: false},
          {prop:"createTime", label:"创建时间",sortable: false},
          {prop:"creator", label:"创建人",sortable: false},
          // {prop:"parentId", label:"父id",sortable: false},
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columnArr));
      },
      loadData: function () {
      	this.$api.menu.loadData().then((res) => {
      		this.tableData.content = res.data
          this.loading = false
          this.getCellRow()
      	})
      },
      getCellRow: function () {
        let _this = this
        this.$nextTick(function () {
          let doms = document.querySelectorAll('.el-table__row')
          // console.log(doms)
          let domsCell = document.querySelectorAll('.resource-container .cell')
          Array.prototype.forEach.call(domsCell,function (item) {
            if (item.innerHTML.trim() == '有效' || item.innerHTML.trim() == '是') {
              item.style.color = 'green'
            } else if (item.innerHTML.trim() == '无效' || item.innerHTML.trim() == '否') {
              item.style.color = 'red'
            }
          })
          Array.prototype.forEach.call(doms,function (item,index) {
            item.oncontextmenu = null
            item.oncontextmenu = function (e) {
              e.stopPropagation()
              e.preventDefault()
              // console.log(item.className)
              let classArr = item.className.split(" ")
              console.log(classArr)
              for (let i=0;i<classArr.length;i++) {
                if (classArr[i].indexOf('clrow') > -1) {
                  _this.currentId = classArr[i].substr(5)
                  break
                }
              }
              // console.log(_this.currentId)
              // console.log(document.documentElement.scrollTop)
              _this.showShortCut = true
              let scrollTop = document.documentElement.scrollTop
              // console.log(document.querySelector('.el-con'))
              let offsetTopmain = document.querySelector('.main-content').scrollTop
              let offsetTopresource = document.querySelector('.el-tabs-container').scrollTop
              let offsetTopElMain = document.querySelector('.el-main').scrollTop  // 滚动条
              let offsetTopCon2 = document.querySelector('.el-con2').scrollTop
              let offsetTopCon = document.querySelector('.el-con').scrollTop
              console.log(offsetTopmain)
              console.log(offsetTopresource)
              console.log(offsetTopElMain)
              console.log(offsetTopCon2)
              console.log(offsetTopCon)
              let x = e.clientX-180
              let y = e.clientY+scrollTop+offsetTopElMain-140
              // console.log(offsetTop)
              // console.log('index:'+index)
              document.querySelector('.shortcut-container').style.left = x + 'px'
              document.querySelector('.shortcut-container').style.top = y + 'px'
            }
          })
        })
      },
      submitForm: function () {
        let _this = this
      	this.$refs.dataForm.validate((valid) => {
      		if (valid) {
      			_this.$confirm('确认提交吗？', '提示', {}).then(() => {
      				_this.editLoading = true
      				// let Resources = {}
              let Resources = Object.assign({}, _this.dataForm)
              let intOrder = parseInt(Resources.orderby)
              Resources.orderby = intOrder
              // console.log(_this.dataForm)
              console.log(_this.currentId)
              // Resources = _this.dataForm
              // console.log(params)
              // params.prop = _this.dataForm
              if (_this.operation) { // 处理添加
                // alert('添加')
                 if (_this.isShortCut) { // 处理右键的添加按钮
                    // 带parentId字段
                    alert('右键')
                    alert(_this.currentId)
                    Resources.parentId = _this.currentId
                    console.log(Resources)
                 } else { // 处理上方添加
                    // 不带parentId字段

                 }
                Resources = JSON.stringify(Resources)
                console.log(Resources)
                 _this.$api.menu.addResource(Resources).then((res) => {
                  // _this.$api.user.save(ss).then((res) => {
                    _this.dialogVisible = false
                    _this.editLoading = false
                    console.log(res)
                      if(res.code == 200) {
                        _this.$message({ message: '操作成功', type: 'success' })
                        _this.dialogVisible = false
                        this.$refs['dataForm'].resetFields()
                      } else {
                        _this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                      }
                      _this.loadData()
                    }).catch(function () {
                      _this.dialogVisible = false
                    })
              } else { // 处理编辑
                // 需要知道自己的id
              }
      			})
      		}
      	})
      },
      searchInfo: function () {
        console.log('开始搜索')
      },
      addInfo: function (flag) {
        console.log('开始添加')
        this.operation = true
        this.dialogVisible = true
        // console.log(flag)
        // console.log(typeof flag)
        this.isShortCut = flag
      },
      deleteInfo: function () {
        console.log('开始删除')
      },
      editInfo: function () {
        console.log('开始编辑')
        this.operation = false
        this.dialogVisible = true
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .resource-container
    position: relative
  .shortcut-container
      position: absolute
      left: 0
      top: 0
      width: 65px
      text-align: center
      line-height: 30px
      background: #fff
      border: 1px solid #dfdfdf
      padding:2px 0 4px 0
      cursor: pointer
      .el-button
        margin-left: 0
        width: 65px
        border: none
</style>
