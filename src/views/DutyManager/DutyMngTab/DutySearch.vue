<template>
    <div class="user-container" ref="userContainer">
        <div class="user-right" ref="userRight">
			<div class="right-top">
				<div class="search-container">
					<el-select v-model="form.dutyType" placeholder="值班类型">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
					</el-select>
					<el-select v-model="form.dutyName" multiple placeholder="值班名称">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
					</el-select>
					<el-date-picker v-model="form.startDate" type="date" placeholder="开始时间"/>
					<el-date-picker v-model="form.endDate" type="date" placeholder="结束时间"/>
	                <el-input v-model="form.watchmanName" type="text" placeholder="值班人名称"></el-input>
	                <kt-button icon="fa fa-search" type="primary" class="user-search-btn" :label="$t('action.search')" @click="searchDate"></kt-button>
				</div>
			</div>
			<div class="right-center">
				<div class="btn-container">
					<el-button-group>
						<kt-button type="primary" icon="fa fa-calendar" label="替班"/>
					</el-button-group>
				</div>
			</div>
			<div class="right-bottom">
				<el-table :data="tableData.content" :border="true" height="100%">
					<el-table-column type="selection" width="40"></el-table-column>
					<el-table-column v-for="column in columns" header-align="center" align="center" :prop="column.prop" :label="column.label"
					 :min-width="column.minWidth" :key="column.prop" :sortable="true">
					</el-table-column>
				</el-table>
			</div>
			<div class="user-toolbar">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="1"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="4000">
				</el-pagination>
			</div>
		</div>
    </div>
</template>
<script>
import '../../../common/stylus/userManage.styl'
import KtButton from "@/components/KtButton/index"
export default {
    data(){
        return {
            form: {
                dutyType:'',
                dutyName:'',
                startDate:'',
                endDate:'',
                watchmanName:''
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, 
                {
                    value: '选项2',
                    label: '双皮奶'
                }
            ],
            tableData: {
                content: [
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }, 
                    {
                        name: "2017-09-28",
                        nameCn: '袁晓宇',
                        bumen: '技术部',
                        keyong: '可用',
                        startTime: '00:00:00',
                        endTime: '00:00:00'
                    }
                ]
            },
            columns: [
                {
                    prop: 'name',
                    label: '值班日期'
                }, 
                {
                    prop: 'startTime',
                    label: '开始时间'
                }, 
                {
                    prop: 'endTime',
                    label: '结束时间'
                }, 
                {
                    prop: 'nameCn',
                    label: '值班人'
                }, 
                {
                    prop: 'bumen',
                    label: '替班发起人'
                }, 
                {
                    prop: 'keyong',
                    label: '值班名称'
                }, 
                {
                    prop: 'keyong',
                    label: '值班类型'
                }
            ]
        }
    },
    components: {
        KtButton
    },
    methods: {
      searchDate(){

      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
}
</script>