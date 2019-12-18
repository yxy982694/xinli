<template>
	<div class="user-container" ref="userContainer">
		<div class="user-left" ref="userLeft">
			<div class="expand-container">
				<kt-button @click="openAll" icon="el-icon-folder-checked">展开所有节点</kt-button>
				<kt-button @click="closeAll" icon="el-icon-folder-delete">关闭所有节点</kt-button>
			</div>
			<div class="tree-container">
				<el-tree :data="treeData" node-key="id" ref="tree" @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		<div class="user-middle" ref="userMiddle"></div>
		<div class="user-right" ref="userRight">
			<div class="right-top">
				<p>111</p>
				<p>111</p>
				<p>111</p>
				<p>111</p>
				<p>111</p>
			</div>
			<div class="right-bottom">
				<el-table :data="tableData.content" :border="true">
					<el-table-column type="selection" width="40"></el-table-column>
					<el-table-column v-for="column in columns" header-align="center" align="center" :prop="column.prop" :label="column.label"
					 :min-width="column.minWidth" :key="column.prop" :sortable="true">
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
	</div>
</template>

<script>
	import '../../../../common/stylus/userManage.styl'
	import KtButton from "@/components/KtButton/index"
	export default {
		data: function() {
			return {
		        outData: [{
		          name: '',
		          age: ''
		        }],
				treeData: [{
					label: '一级 1右移',
					id: 1,
					children: [{
						label: '二级 1-1一级 1右',
						id: 11,
						children: [{
							label: '三级 1-1-1一级',
							id: 111
						}]
					}]
				}, {
					label: '一级 2一级 1右移一级',
					id: 2,
					children: [{
						label: '二级 2-1一级',
						id: 21,
						children: [{
							label: '三级 2-1-1一级2-1-1一级2-1-1一级',
							id: 211
						}]
					}, {
						label: '二级 2-2一级 1',
						id: 22,
						children: [{
							label: '三级 2-2-1一级',
							id: 221
						}]
					}]
				}, {
					label: '一级 3',
					id: 3,
					children: [{
						label: '二级 3-1',
						id: 31,
						children: [{
							label: '三级 3-1-1',
							id: 311
						}]
					}, {
						label: '二级 3-2',
						id: 32,
						children: [{
							label: '三级 3-2-1',
							id: 321
						}]
					}]
				}],
				tableData: {
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
					}, {
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
					}, {
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
					}, {
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
				}, {
					prop: 'nameCn',
					label: '中文名称'
				}, {
					prop: 'zhanghao',
					label: '账号类型'
				}, {
					prop: 'bumen',
					label: '部门'
				}, {
					prop: 'keyong',
					label: '是否可用'
				}, {
					prop: 'shemin',
					label: '是否涉敏'
				}, {
					prop: 'jibie',
					label: '用户级别'
				}, {
					prop: 'creator',
					label: '创建者'
				}, {
					prop: 'createTime',
					label: '创建时间'
				}, {
					prop: 'startTime',
					label: '账户有效期开始时间'
				}, {
					prop: 'endTime',
					label: '账户有效期结束时间'
				}]
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
			      	if(moveLen<180) moveLen = 180
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
		},
		components: {
			KtButton
		},
		methods: {
			openAll: function() {
				for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
				  this.$refs.tree.store._getAllNodes()[i].expanded=true
				}
			},
			closeAll: function() {
				for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
				  this.$refs.tree.store._getAllNodes()[i].expanded=false
				}
			},
			handleNodeClick: function() {
				console.log('点击')
			}
		}
	}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    .user-container
      display: flex
      border: 1px solid black
      overflow: hidden
      box-sizing: border-box
      height: 300px
      position: relative
    .user-left
      border: 1px solid red
      float: left
      box-sizing: border-box
      height: 100%
      background-color: #fff
      overflow-x: auto
      width: 180px
      .tree-container
        height: 253px
        width: 100%
        overflow: auto
    .user-middle
      float: left
      width: 5px
      height: 100%
      cursor: move
      box-sizing: border-box
      background-color: #ff0
    .user-right
      width: 70%
      flex: 1
      border: 1px solid red
      float: left
      box-sizing: border-box
      height: 100%
    .right-bottom
      height: 250px
      overflow: auto
      border: 1px solid green
</style>
