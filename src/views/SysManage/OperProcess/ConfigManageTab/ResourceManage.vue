<template>
<div class="resource-container">
  <div class="children-container">
    <kt-buttons>
      <template slot="toolSearch">
        <el-input v-model="userName" placeholder="用户名"></el-input>
        <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary" @click="searchInfo(userName)"></kt-button>
        <!-- <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:add" type="primary" @click="addInfo(false)"></kt-button> -->
      </template>
    </kt-buttons>
    <kt-table ref="ktTable"
      @changeShortCutInfo="changeShortCutInfo"
      :loading="loading"
      @findPage="findPage"
      @handleEdit="editInfo"
      @addInfo="addInfo"
      @handleDelete="deleteInfo"
      :columns="filterColumns"
      :dataArr="tableData"
      :border="true"
      :showCheckBox="false"
      :showPage="false"
      rowKey="id"
      :treeProps="treeProps"
      :showOperate="true"
      :defaultExpandAll="false"></kt-table>
    <!-- <div class="table-seat"></div> -->
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
        </el-form-item>
        <el-form-item label="是否网页" prop="isWebpage">
          <el-select v-model="dataForm.isWebpage" placeholder="请选择"
             style="width: 100%;">
            <el-option v-for="item in isWebpageArr" :key="item.id"
              :label="item.value" :value="item.id">
            </el-option>
          </el-select>
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
        </el-form-item>
        <el-form-item label="菜单描述" prop="remark">
          <el-input v-model="dataForm.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标路径" prop="image" class="menu-location">
          <!-- <el-input type="file"></el-input> -->
          <input ref="menuInput" type="file" @change="selectMenuImg" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
          <img ref="menuImg" class="menu-location-img" src="../../../../common/image/default.png" alt="">
          <!-- <el-input v-model="dataForm.image" auto-complete="off"></el-input> -->
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
  </div><!-- v-show="showShortCut" -->
  <div class="shortcut-container" :style="{position: 'absolute',top: resourceTop,left: resourceLeft,display: resourceDisplay}"><!--  v-if="ifShortCut" -->
    <kt-button icon="fa fa-plus" :label="$t('action.add')" @click="addInfo" />
    <kt-button icon="fa fa-edit" :label="$t('action.edit')" @click="editInfoShortCut()" />
    <kt-button icon="fa fa-trash" :label="$t('action.delete')" @click="deleteShortCutInfo(currentId)" />
  </div>
</div>

</template>
<script>
  import { mapMutations } from 'vuex'
  import axios from 'axios'
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
        showShortCutPlay: 'none',
        // isShortCut: false,
        // currentId: null,
        parentIdd: null,
        showShortCut: false,
        currentObj: null,
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
        	],
          orderby: [
          	{ required: true, message: '请输入排序序号', trigger: 'blur' }
          ],
        },
        dataForm: {
          id: '',
          nameCn: '',
          name: '',
          location: '',
          type: '',
          isWebpage: '',
          orderby: '',
          status: '',
          remark: '菜单描述',
          image: '菜单图标路径',
          createTime:'创建时间', // (new Date()).toLocaleString()
          creator: sessionStorage.getItem('user'),
          parentId: ''
        },
        treeProps: {children: 'children', hasChildren: 'hasChildren'},
        tableData: [],
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
      this.findPage()
      window.onclick = function () {
        // _this.showShortCut = false
        _this.setResourceDisplay('none')
      }
    },
    computed: {
      resourceLeft: {
        get: function () {
          return this.$store.state.resourceLeftTop.resourceLeft
        },
        set: function () {}
      },
      resourceTop: {
        get: function () {
          return this.$store.state.resourceLeftTop.resourceTop
        },
        set: function () {}
      },
      currentId: {
        get: function () {
          return this.$store.state.tableCurrentId.currentId
        },
        set: function () {}
      },
      resourceDisplay: {
        get: function () {
          return this.$store.state.resourceLeftTop.resourceDisplay
        },
        set: function () {}
      },
      resourceFlag: {
        get: function () {
          return this.$store.state.loadData.resourceFlag
        },
        set: function () {}
      },
      resourceArr: {
        get: function () {
          return this.$store.state.loadData.resourceArr
        },
        set: function () {}
      },
    },
    methods: {
      ...mapMutations({
        'setResourceLeft': 'setResourceLeft',
        'setResourceTop': 'setResourceTop',
        'setCurrentId': 'setCurrentId',
        'setResourceDisplay': 'setResourceDisplay',
        'setResourceFlag': 'setResourceFlag',
        'setResourceArr': 'setResourceArr'
      }),
      // 选择菜单图标图片
      selectMenuImg: function () {
        let file = this.$refs.menuInput.files[0]
        let formData = new FormData()
        formData.append('fileImg', file)
        formData.append('id', this.currentId)
        this.$refs.menuImg.src = window.URL.createObjectURL(file)
        axios.post('/addImage',
        // axios.post('http://10.89.138.133:9091/addImage',
        // axios.post('http://10.89.138.147:9091/addImage',
          formData,
          {
            headers: {"Content-Type": "multipart/form-data"}
          }
        ).then(function (res) {
          console.log(res)
        })
        // axios.get('comments/hotflow',{
        //   params: {
        //     id: '4457825889709441',
        //     mid: '4457825889709441',
        //     max_id_type: 0
        //   }
        // }).then(function (res) {
        //   console.log(res)
        // })
      },
      changeShortCutInfo: function (obj) {
        // console.log(obj)
        // this.showShortCut = obj.showShortCut
        this.setResourceDisplay(obj.showShortCut)
        this.setCurrentId(obj.id)
        this.setResourceLeft(obj.x)
        this.setResourceTop(obj.y)
      },
      searchInfo: function (name) {
        this.$api.menu.findByName(name).then(res => {
          console.log(res)
          this.tableData = res.data
          // this.$set(this.tableData,'content',res.data)
        })
      },
      deleteShortCutInfo: function (id) {
        let _this = this
        if (this.parentIdd) {
          this.$confirm('确认删除选中记录吗？', '提示', {
          	type: 'warning'
          }).then(function () {
            _this.deleteInfo(id)
          })
        } else {
          this.$alert('根节点不可删除')
        }
      },
      initColumns: function () {
        this.columnArr = [
          // {prop:"id", label:"id",sortable: false},
          {prop:"nameCn", label:"中文名称",sortable: true,minWidth: "80px",align: "left"},
          {prop:"name", label:"名称",sortable: true},
          {prop:"location", label:"路径",sortable: true},
          // {prop:"type", label:"菜单类型",sortable: false},
          {prop:"isWebpage", label:"是否网页",sortable: true},
          {prop:"orderby", label:"排序序号",sortable: true},
          {prop:"status", label:"状态",sortable: true},
          {prop:"remark", label:"菜单描述",sortable: true},
          // {prop:"image", label:"菜单图标路径",sortable: false},
          {prop:"createTime", label:"创建时间",sortable: true},
          {prop:"creator", label:"创建人",sortable: true},
          // {prop:"parentId", label:"父id",sortable: false},
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columnArr));
      },
      findPage: function () {
        let _this = this
        console.log('findPage')
        if (this.resourceFlag) {
          console.log('true')
          this.loading = false
          this.tableData = this.resourceArr
          console.log(this.tableData)
          this.$refs.ktTable.getCellRow()
        } else {
          console.log('false')
          this.loading = true
          this.$api.menu.loadResource().then((res) => {
            _this.tableData = res.data
            // _this.$set(_this.tableData,'content',res.data)
            console.log(res)
            _this.loading = false
            _this.setResourceFlag(true)
            _this.setResourceArr(res.data)
            _this.$refs.ktTable.getCellRow()
          })
        }
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
              if (_this.operation) { // 处理添加
                Resources.parentId = _this.currentId
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
                      _this.setResourceFlag(false)
                      _this.findPage()
                    }).catch(function () {
                      _this.dialogVisible = false
                    })
              } else { // 处理编辑
                // 需要知道自己的id
                console.log('编辑')
                Resources.id = _this.currentId
                Resources.parentId = _this.currentObj.parentId
                console.log(_this.currentId)
                Resources = JSON.stringify(Resources)
                console.log(Resources)
                _this.$api.menu.editResource(Resources).then((res) => {
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
                     _this.setResourceFlag(false)
                     _this.findPage()
                   }).catch(function () {
                     _this.dialogVisible = false
                   })
              }
      			})
      		}
      	})
      },
      addInfo: function (flag) {
        console.log('开始添加')
        this.operation = true
        this.dialogVisible = true
      },
      deleteInfo: function (id) {
        this.$api.menu.deleteResource(id).then(res => {
          this.findPage()
          // if(res.code == 200) {
          //   this.$message({message: '删除成功', type: 'success'})
          //   this.findPage()
          // } else {
          //   this.$message({message: '操作失败, ' + res.msg, type: 'error'})
          // }
        })
      },
      gainSource: function (id) { // 在点击编辑时，获取某一行的数据
        this.$api.menu.findResourceById(id).then((res) => {
          if(res.code == 200) {
            this.currentObj = res.data
            this.dataForm = this.currentObj
            this.parentIdd = this.currentObj.parentId?this.currentObj.parentId:null
            this.$set(this.dataForm,'createTime',(new Date()).toLocaleString())
            this.$set(this.dataForm,'creator',sessionStorage.getItem('user'))
            // this.$message({ message: '操作成功', type: 'success' })
          } else {
            this.$message({message: '操作失败, ' + res.msg, type: 'error'})
          }
          console.log(this.currentObj)
        })
      },
      editInfo: function (id) {
        console.log('点击了操作中的编辑')
        this.operation = false
        this.dialogVisible = true
        // this.currentId = id
        this.setCurrentId(id)
        this.gainSource(id)
      },
      editInfoShortCut: function () {
        console.log('点击了右键编辑')
        this.operation = false
        this.dialogVisible = true
        this.gainSource(this.currentId)
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .resource-container
     position: relative
     height: 100%
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
  .table-seat
    height: 10px
    width: 100%
  .menu-location-img
    width: 40px
    height: 40px
    border: 1px solid red
</style>
