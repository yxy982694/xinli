<template>
	<div class="user-container" ref="userContainer">
		<div class="user-left" ref="userLeft">
			<!-- <div class="expand-container">
				<kt-button label="展开节点" @click="openAll" icon="fa fa-angle-double-down"></kt-button>
				<kt-button label="关闭节点" @click="closeAll" icon="fa fa-angle-double-up"></kt-button>
			</div> -->
      <div class="user-depit">部门</div>
			<div class="tree-container">
				<el-tree v-loading="loadingTree" :expand-on-click-node="false" :props="defaultProps" :data="treeData" node-key="Id" ref="tree" @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		<div class="user-middle" ref="userMiddle"></div>
		<div class="user-right" ref="userRight">
			<div class="right-top">
				<!-- <div class="date-container">
					<p>创建时间:</p>
					<el-date-picker
			            v-model="dateValue"
			            type="datetimerange"
			            start-placeholder="开始日期"
			            end-placeholder="结束日期"
			            :default-time="['12:00:00','12:00:00']">
			        </el-date-picker>
				    <kt-button icon="fa fa-calendar" class="user-search-btn" :label="$t('action.search')" @click="searchDate"></kt-button>
				    <kt-button icon="fa fa-calendar" :label="$t('action.reset')" @click="resetDate"></kt-button>
				</div> -->
				<div class="search-container">
					<!-- <p class="input-left input-name">用户名:</p> -->
	                <el-input type="text" v-model="usernameVal"  placeholder="用户名"></el-input>
	                <kt-button icon="fa fa-search" type="primary" class="user-search-btn" :label="$t('action.search')" @click="searchUserName"></kt-button>
		          <!-- <div class="checkbox-more">
		            <el-checkbox v-model="checkedBox" @change="changeBox">查询更多条件</el-checkbox>
		          </div> -->
                <!-- <div class="more-line"></div> -->
		          <!-- <div class="search-container-border">  --><!-- v-show="checkedBox" -->
	               <!--  <div class="search-container-input">
	                  <p class="input-left input-name">用户名:</p>
	                  <el-input type="text" placeholder="请输入..."></el-input>
	                  <kt-button icon="fa fa-calendar" class="user-search-btn" :label="$t('action.search')" @click="searchDate"></kt-button>
	                </div> -->
	                <!-- <div class="search-container-input search-container-middle">
	                  <p class="input-left">账号类型:</p>
	                  <el-select placeholder="请选择" v-model="selectedVal">
	                    <el-option value="全选" label="全选"></el-option>
	                    <el-option value="PC" label="PC"></el-option>
	                    <el-option value="APP" label="APP"></el-option>
	                    <el-option value="PC+APP" label="PC+APP"></el-option>
	                  </el-select>
	                </div>
	                <div class="search-container-input">
	                  <p class="input-left">是否授权:</p>
	                  <el-radio v-model="radioVal" label="all">全部</el-radio>
	                  <el-radio v-model="radioVal" label="yes">是</el-radio>
	                  <el-radio v-model="radioVal" label="no">否</el-radio>
	                </div> -->
		          <!-- </div> -->
				</div>
			</div>
			<div class="right-center">
				<!-- <div class="bread-crumb">部门>杭州东方通信软件技术有限公司</div> -->
				<div class="btn-container">
				  <el-button-group>
            <kt-button type="primary" icon="fa fa-calendar" :label="$t('action.add')" @click="addInfo"></kt-button>
            <kt-button type="primary" icon="fa fa-calendar" :disabled="editAble" label="详情"></kt-button>
            <kt-button type="primary" icon="fa fa-calendar" :disabled="editAble" label="授权"></kt-button>
            <kt-button type="primary" icon="fa fa-calendar" :disabled="editAble" label="批量授权"></kt-button>
            <kt-button type="primary" icon="fa fa-calendar" :disabled="editAble" label="启用"></kt-button>
            <kt-button type="primary" icon="fa fa-calendar" :disabled="editAble" label="停用"></kt-button>
            <kt-button type="primary" icon="fa fa-edit" :disabled="editAble" :label="$t('action.edit')" @click="editInfo"></kt-button>
            <kt-button type="primary" icon="fa fa-trash" :disabled="editAble" :label="$t('action.delete')" @click="deleteInfo"></kt-button>
          </el-button-group>
				</div>
			</div>
			<div class="right-bottom">
        <input type="checkbox" ref="boxAll" @change="changeBoxAll" class="box-all" v-model="boxAllVal">
				<el-table ref="elTable" v-loading="loadingTable" :data="tableData.content" :border="true" height="100%" @cell-click="clickCell">
					<!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column label="" width="40" header-align="center" align="center">
          	<template slot-scope="scope">
              <div class="userbox-div">

                <input ref="inputBox" @change="selectChange" v-model="checkedBoxArr" :value="'ck'+scope.row.ROW_ID" name="userTable" type="checkbox" class="user-ck" :id="'ck'+scope.row.ROW_ID">
              </div>
          	</template>
          </el-table-column>
					<el-table-column v-for="column in columns" header-align="center" align="center" :prop="column.prop" :label="column.label"
					 :min-width="column.minWidth" :key="column.prop" :sortable="true">
					</el-table-column>
					<!-- <el-table-column :label="$t('action.operation')" width="185" fixed="right" header-align="center" align="center">
						<template slot-scope="scope">
							<kt-button icon="fa fa-edit" :label="$t('action.edit')"></kt-button>
							<kt-button icon="fa fa-trash" :label="$t('action.delete')" type="danger"></kt-button>
						</template>
					</el-table-column> -->
				</el-table>
			</div>
      <div class="user-toolbar">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-sizes="[30, 100, 150, 200]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="totalNum">
		    </el-pagination>
        <!-- <el-pagination layout="total, prev, pager, next, jumper"
          :current-page="1" :page-size="10" :total="87">
        </el-pagination> -->
      </div>
		</div>
	  <!--新增编辑界面-->
	  <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
	    <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size"
	      label-position="right">
	      <el-form-item label="organid" prop="organid" v-if="false">
	        <el-input v-model="dataForm.organid" auto-complete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="用户名" prop="username">
	        <el-input v-model="dataForm.username" auto-complete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="中文名称" prop="name">
	        <el-input v-model="dataForm.name" auto-complete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="是否可用" prop="valid">
	        <el-select v-model="dataForm.valid" placeholder="请选择"
	           style="width: 100%;">
	          <el-option v-for="item in validArr" :key="item.id"
	            :label="item.value" :value="item.id">
	          </el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="创建者" prop="createUser">
	        <el-input v-model="dataForm.createUser" auto-complete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="创建时间" prop="createTime">
	        <el-input v-model="dataForm.createTime" auto-complete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="账号生效时间" prop="accountEffectTime">
	        <el-input v-model="dataForm.accountEffectTime" auto-complete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="账号过期时间" prop="accountExpireTime">
	        <el-input v-model="dataForm.accountExpireTime" auto-complete="off"></el-input>
	      </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
	      <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
	    </div><!-- :loading="editLoading" -->
	  </el-dialog>
  </div>
</template>

<script>
	import '../../../../common/stylus/userManage.styl'
	import KtButton from "@/components/KtButton/index"
	export default {
		data: function() {
			return {
            dateValue: '',
            checkedBoxArr: [],
            boxAllVal: false,
            editAble: true,
        		checkedBox: false,
            selectedVal: '',
            radioVal: '',
            currentDepId: '0',
            // loadingTable: true,
            // loadingTree: true,
            loadingTable: false,
            loadingTree: false,
            usernameVal: '',
            totalNum: 0,
            pageSize: 10,
            currentPage: 1,
            size: 'small',
            dialogVisible: false,
            operation: false,
            editLoading: false,
            userId: null,
		        outData: [{
		          name: '',
		          age: ''
		        }],
				treeData: [
          {
            name: '一级 1',
            id: 1,
            children: [{
              name: '二级',
              id: 11,
              children: [{
                label: '三级',
                id: 111
              }]
            }]
          }, {
            name: '一级 2',
            id: 2,
            children: [{
              name: '二级 2-1一级',
              id: 21,
              children: [{
                name: '三级 2-1-1一级2-1-1',
                id: 211
              }]
            }, {
              name: '二级 2-2一级 1',
              id: 22,
              children: [{
                name: '三级 2-2-1一级',
                id: 221
              }]
            }]
          }, {
            name: '一级 3',
            id: 3,
            children: [{
              name: '二级 3-1',
              id: 31,
              children: [{
                name: '三级 3-1-1',
                id: 311
              }]
            }, {
              name: '二级 3-2',
              id: 32,
              children: [{
                name: '三级 3-2-1',
                id: 321
              }]
            }]
				},
        ],
        defaultProps: {
          // children: 'children',
          // label: 'name',
          children: 'Children',
          label: 'Name'
        },
        validArr: [{
          id: 1,
          value: '可用'
        },{
          id: 2,
          value: '不可用'
        }],
        dataForm: {
          organid: '',
          username: '',
          name: '',
          valid: '',
          createUser: sessionStorage.getItem('user'),
          createTime: '',
          accountEffectTime: '',
          accountExpireTime: '',
          // rowid: ''
          // id: '',
          // USERNAME: '',
          // NAME: '',
          // PHONE: '',
          // ID: '',
          // MANIN_ACCOUNT: '',
          // ORGANID: '',
          // ROW_ID: '',
          // VALID: '',
        },
        dataFormRules: {
        	username: [
        		{ required: true, message: '请输入用户名', trigger: 'blur' }
        	],
          name: [
          	{ required: true, message: '请输入中文名称', trigger: 'blur' }
          ],
          valid: [
          	{ required: true, message: '请选择有效性', trigger: 'blur' }
          ],
        },
				tableData: {
					content: [{
            USERNAME: 'yxy1',
            NAME: '袁晓宇',
            VALID: '可用',
            CREATEUSER: 'yxy',
            CREATETIME: '2019/12/27',
            ACCOUNTEFFECTTIME: '2019/12/27',
            ACCOUNTEXPIRETIME: '2019/12/31',
            ROW_ID: 1
					}, {
						USERNAME: 'yxy2',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 2
					}, {
						USERNAME: 'yxy3',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 3
					}, {
						USERNAME: 'yxy4',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 4
					}, {
						USERNAME: 'yxy5',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 5
					}, {
						USERNAME: 'yxy6',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 6
					}, {
						USERNAME: 'yxy7',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 7
					}, {
						USERNAME: 'yxy8',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 8
					}, {
						USERNAME: 'yxy9',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 9
					}, {
						USERNAME: 'yxy10',
						NAME: '袁晓宇',
						VALID: '可用',
						CREATEUSER: 'yxy',
						CREATETIME: '2019/12/27',
						ACCOUNTEFFECTTIME: '2019/12/27',
						ACCOUNTEXPIRETIME: '2019/12/31',
						ROW_ID: 10
					}]
				},
        columns: [{
            prop: 'USERNAME',
            label: '用户名'
          }, {
            prop: 'NAME',
            label: '中文名称'
          }, {
            prop: 'VALID',
            label: '是否可用'
          }, {
            prop: 'CREATEUSER',
            label: '创建者'
          }, {
            prop: 'CREATETIME',
            label: '创建时间'
          }, {
            prop: 'ACCOUNTEFFECTTIME',
            label: '账号生效时间'
          }, {
            prop: 'ACCOUNTEXPIRETIME',
            label: '账号过期时间'
          }]
				// columns: [{
    //         prop: 'name',
    //         label: '用户名'
    //       }, {
    //         prop: 'nameCn',
    //         label: '中文名称'
    //       }, {
    //         prop: 'bumen',
    //         label: '部门'
    //       }, {
    //         prop: 'keyong',
    //         label: '是否可用'
    //       }, {
    //         prop: 'creator',
    //         label: '创建者'
    //       }, {
    //         prop: 'createTime',
    //         label: '创建时间'
    //       }, {
    //         prop: 'startTime',
    //         label: '账户有效期开始时间'
    //       }, {
    //         prop: 'endTime',
    //         label: '账户有效期结束时间'
    //       }]
			}
		},
		mounted: function () {
			let _this = this
			this.$refs.userMiddle.addEventListener('mousedown',function (e) {
				let startX = e.clientX
				let middleLeft = _this.$refs.userMiddle.offsetLeft
				console.log( _this.$refs.userMiddle.offsetLeft)
				document.onmousemove = function (e) {
					let endX = e.clientX
					let moveLen = middleLeft + (endX - startX)
					// let maxT = _this.$refs.userContainer.clientWidth - _this.$refs.userMiddle.offsetWidth
					// console.log(maxT)
			      	if(moveLen<160) moveLen = 160
			      	// if(moveLen>maxT-180) moveLen = maxT-180
			      	// _this.$refs.userMiddle.style.left = moveLen;
			      	_this.$refs.userLeft.style.width = moveLen + "px";
			      	// _this.$refs.userRight.style.width = (_this.$refs.userContainer.clientWidth - moveLen - 10) + "px";
				}
				document.onmouseup = function (e) {
					document.onmousemove = null
					document.onmouseup = null
					_this.$refs.userMiddle.setCapture && _this.$refs.userMiddle.setCapture()
				}
				_this.$refs.userMiddle.setCapture && _this.$refs.userMiddle.setCapture()
				return false
			})
      this.$api.user.findAllOrgan().then((res) => {
        console.log(res.data)
        this.treeData = res.data
        this.loadingTree = false
      })
      // this.currentPage = 1
      let jsonObj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      // 不传部门默认是所有数据
      // 不传页码默认是第1页
      // 不传当前页显示条数默认是10条
      // 不传输入值默认为空
      let jsonStr = JSON.stringify(jsonObj)
      // 第一次什么都不传
      // 后台默认返回全部数据的前10条数据和所有数据总条数（无参数）0
      // jsonStr
      this.getUserInfo(jsonStr)
		},
		components: {
			KtButton
		},
		methods: {
      changeBoxAll: function () { // 点击选中全部复选框时
        this.editAble = true
        if (this.boxAllVal) {
          let inputBoxDoms = document.querySelectorAll('.user-ck')
          for (var i=0;i<inputBoxDoms.length;i++) {
            this.checkedBoxArr.push(inputBoxDoms[i].value)
          }
        } else {
          this.checkedBoxArr = []
        }
      },
      selectChange: function () { // 点击input复选框时
        this.editAble = true
        this.boxAllVal = false
        this.$refs.boxAll.indeterminate = true
        if (this.checkedBoxArr.length>0) {
          if (this.checkedBoxArr.length == 1) {
            this.editAble = false
          } else if (this.checkedBoxArr.length == this.pageSize) {
            this.$refs.boxAll.indeterminate = false
            this.boxAllVal = true
          }
        } else {
          this.$refs.boxAll.indeterminate = false
        }
      },
      clickCell: function (row,column) { // 点击table中的单元格
        if (column.label) {
          this.checkedBoxArr = []
          this.checkedBoxArr.push('ck'+row.ROW_ID)
          this.editAble = false
          this.$refs.boxAll.indeterminate = true
          this.userId = row.ROW_ID
        }
      },
      addInfo: function () {
        let date1 = new Date()
        let date2 = new Date(date1)
        // this.$set(this.dataForm,'createTime',date1.toLocaleString())
        // this.$set(this.dataForm,'accountEffectTime',date1.toLocaleString())
        date2.setDate(date1.getDate()+90)
        // this.$set(this.dataForm,'accountExpireTime',date2.toLocaleString())
        this.dialogVisible = true
        this.operation = true
      },
      editInfo: function () {
        let date1 = new Date()
        let date2 = new Date(date1)
        // this.$set(this.dataForm,'createTime',date1.toLocaleString())
        // this.$set(this.dataForm,'accountEffectTime',date1.toLocaleString())
        date2.setDate(date1.getDate()+90)
        // this.$set(this.dataForm,'accountExpireTime',date2.toLocaleString())
        this.dialogVisible = true
        this.operation = false
      },
      deleteInfo: function () {
         let jsonObj = {
           organId: _this.currentDepId,
           userId: _this.userId
         }
         let jsonStr = JSON.stringify(jsonObj)
         _this.$api.user.deleteUser(User).then((res) => {
           console.log(res)
           if(res.code == 200) {
             _this.$message({ message: '删除成功', type: 'success' })
             let jsonObj = {
               organId: _this.currentDepId,
               pageSize: _this.pageSize
             }
             let jsonStr = JSON.stringify(jsonObj)
             _this.getUserInfo()
           } else {
             _this.$message({message: '操作失败, ' + res.msg, type: 'error'})
           }
         })
      },
      submitForm: function () {
          let _this = this
          this.$refs.dataForm.validate((valid) => {
          	if (valid) {
          		_this.$confirm('确认提交吗？', '提示', {}).then(() => {
          			_this.editLoading = true
                let User = Object.assign({}, _this.dataForm)
                User.organid = _this.currentDepId
                if (_this.operation) { // 处理添加
                  User = JSON.stringify(User)
                  _this.$api.user.addUser(User).then((res) => {
                    console.log(res)
                    if(res.code == 200) {
                      _this.$message({ message: '添加成功', type: 'success' })
                      _this.dialogVisible = false
                      this.$refs['dataForm'].resetFields()
                      let jsonObj = {
                        organId: _this.currentDepId,
                        pageSize: _this.pageSize
                      }
                      let jsonStr = JSON.stringify(jsonObj)
                      _this.getUserInfo()
                    } else {
                      _this.$message({message: '添加失败, ' + res.msg, type: 'error'})
                    }
                  })
                } else { // 处理编辑
                  User.userId = _this.userId // 通过ROW_ID获取的userId
                  User = JSON.stringify(User)
                  _this.$api.user.editUser(User).then((res) => {
                    console.log(res)
                    if(res.code == 200) {
                      _this.$message({ message: '编辑成功', type: 'success' })
                      _this.dialogVisible = false
                      this.$refs['dataForm'].resetFields()
                      let jsonObj = {
                        organId: _this.currentDepId,
                        pageSize: _this.pageSize
                      }
                      let jsonStr = JSON.stringify(jsonObj)
                      _this.getUserInfo()
                    } else {
                      _this.$message({message: '编辑失败, ' + res.msg, type: 'error'})
                    }
                  })
                }
          		})
          	}
          })
      },
      getUserInfo: function (jsonStr) {
        // this.loadingTable = true
        this.$refs.boxAll.indeterminate = false
        this.checkedBoxArr = []
        this.boxAllVal = false
        this.editAble = true
        this.$api.user.getPageList(jsonStr).then((res) => {
          console.log(res.data)
          this.tableData.content = res.data
          this.loadingTable = false
          this.totalNum = parseInt(res.total)
        })
        // if (jsonStr) {
        //   this.$api.user.getPageList(jsonStr).then((res) => {
        //     console.log(res.data)
        //     this.tableData.content = res.data
        //     this.loadingTable = false
        //     this.totalNum = parseInt(res.total)
        //   })
        // } else {
        //   this.$api.user.getPageList().then((res) => {
        //     console.log(res.data)
        //     this.tableData.content = res.data
        //     this.loadingTable = false
        //     this.totalNum = parseInt(res.total)
        //   })
        // }
      },
			openAll: function() {
        // this.$nextTick(function () {
          // console.log(document.querySelectorAll('.el-tree-node__content'))
          console.log(this.$refs.tree.store._getAllNodes())
          for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
            this.$refs.tree.store._getAllNodes()[i].expanded=true
          }
        // })
			},
			closeAll: function() {
				for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
				  this.$refs.tree.store._getAllNodes()[i].expanded=false
				}
			},
			handleNodeClick: function(data) {
				console.log(data)
        this.currentDepId = data.Id
        console.log(data.Id)
        console.log(this.pageSize)
        this.usernameVal = ''
        // 点击某个部门,把当前部门id传到后台（部门id）2  每页显示条数
        // 后台默认返回当前部门的前‘每页显示条数’数据和该部门总条数
        let jsonObj = {
          organId: this.currentDepId,
          pageSize: this.pageSize
        }
        let jsonStr = JSON.stringify(jsonObj)
        this.getUserInfo(jsonStr)
			},
	      changeBox: function () {
	      },
	      searchUserName: function () {
	        // console.log(this.dateValue)
          // 当输入用户名,点击查询时
          // 把当前部门id,每页显示条数,输入的字段值（3个参数）
          // 返回前‘每页显示条数’条数据和总条数
          let jsonObj = {
            username: this.usernameVal,
            organId: this.currentDepId,
            pageSize: this.pageSize
          }
          let jsonStr = JSON.stringify(jsonObj)
          this.getUserInfo(jsonStr)
          this.currentPage = 1
          // this.usernameVal = ''
	      },
	      handleSizeChange: function (pageSize) {
          // 当每页显示条数变化时,
          // 把当前部门id和条数传至后台（部门id和条数），当前输入的字段值3（不传输入值默认为空）
          // 返回当前部门的前"刚传的条数"的数据和当前部门的总条数
          console.log(pageSize)
          this.pageSize = pageSize
          let jsonObj = {
            username: this.usernameVal,
            organId: this.currentDepId,
            pageSize: this.pageSize
          }
          let jsonStr = JSON.stringify(jsonObj)
          this.getUserInfo(jsonStr)
          this.currentPage = 1
	      },
        handleCurrentChange: function (currentPage) {
          // 当页数变化时，把当前页数传到后台
          // 还要把当前部门id传至后台(不传id默认是全部数据)（部门id和页数），当前输入的字段值（不传输入值默认为空）
          // 每页显示多少条数据  传4个参数
          // 返回该部门当前页的数据和当前部门的总条数
          console.log(currentPage)
          this.currentPage = currentPage
          let jsonObj = {
            username: this.usernameVal,
            organId: this.currentDepId,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
          let jsonStr = JSON.stringify(jsonObj)
          this.getUserInfo(jsonStr)
        },
		}
	}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    .user-container
      display: flex
      border: 1px solid #dfdfdf
      overflow: hidden
      box-sizing: border-box
      height: 100%
      position: relative
    .user-left
      box-sizing: border-box
      height: 100%
      background-color: #fff
      overflow: hidden
      width: 160px
      display: flex
      flex-direction: column
      .user-depit
        text-align: left
        font-size: 14px
        font-weight: bold
        background-color: #f9f9f9
        padding: 5px 10px
      .expand-container
         display: flex
         justify-content: center
      .tree-container
        width: 100%
        overflow: auto
        flex: 1
    .user-middle
      // float: left
      width: 5px
      height: 100%
      cursor: move
      box-sizing: border-box
      background-color: #f9f9f9
      overflow: hidden
    .user-right
      width: 70%
      flex: 1
      display: flex
      flex-direction: column
      // border: 1px solid red
      // float: left
      box-sizing: border-box
      height: 100%
      // padding-top: 15px
      position: relative
      overflow: hidden
    .date-container
      display: flex
      justify-content: center
      align-items: center
    .user-search-btn
      margin-right: 15px
    .search-container
        padding: 5px 20px
        display: flex
       // margin: 15px
       // position: relative
       // min-height: 10px
    .checkbox-more
      position: absolute
      left: 20px
      top: -15px
      background-color: #ddd
      width: 130px
      height: 30px
      display: flex
      justify-content: center
      align-items: center
      z-index: 22
      input
        margin-right: 10px
    .more-line
      position: absolute
      left: 0
      top: 0
      height: 1px
      width: 100%
      background-color: #999
      z-index: 11
    .search-container-border
       border: 1px solid #999
       border-top: none
       display: flex
       padding: 0 20px
       justify-content: center
    .search-container-input
       display: flex
       align-items: center
       margin: 23px 0 10px 0
    .search-container-middle
       margin: 23px 30px 10px 30px
    .input-name
       width: 54px
    .right-center
      border-top: 1px solid #999
    .right-bottom
      overflow: auto
      flex: 1
      position: relative
      // border: 1px solid green
      .box-all
        position: absolute
        left: 13px
        top: 6px
        z-index: 9999999
    .bread-crumb
	    height: 30px
	    line-height: 30px
	    background-color: #abcdef
	    // border: 1px solid blue
     font-size: 13px
	    box-sizing: border-box
	    text-align: left
	    padding: 0 10px
	.btn-container
	   display: flex
	   // border: 1px solid green
	   border-top: none
	.btn-container .el-button+.el-button
	  margin-left: 0
	.input-left
	  margin-right: 10px
  .user-toolbar
  	background-color: #2761de
  	// padding: 5px 0
  	// color: #fff
    // position: absolute
    // bottom: 7px
    // left: 0
    // width: 100%
  .userbox-div
    position: relative
</style>

