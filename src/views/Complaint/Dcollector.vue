<template>
  <el-container>
    <el-aside width="180px">
      <div v-for="v in jkCchList" :key="v.id" class="text item" @click="addSubTab(v.value)">
        <a>{{ v.value }}</a>
        <el-divider content-position="left"></el-divider>
      </div>
    </el-aside>
    <el-main>
      <sub-tabs ref="subTabs"></sub-tabs>
    </el-main>
  </el-container>
</template>

<script>
// import KtButton from "@/views/Core/KtButton"
// import TableTreeColumn from '@/views/Core/TableTreeColumn'
// import PopupTreeInput from "@/components/PopupTreeInput"
// import FaIconTooltip from "@/components/FaIconTooltip"
// import { format } from "@/utils/datetime"
import { mapState } from 'vuex'
import SubTabs from "@/Components/AsideTab/subAsideTab/SubTabs";
export default {
	components:{
      SubTabs
	},
  computed: {
      ...mapState({
          // needTagsView: state => state.settings.tagsView,
          // fixedHeader: state => state.settings.fixedHeader,
          // needTagsView: state => state.settings.tagsView,
      })
  },
	data() {
		  return {
          jkCchList:[
              {
                  id: 1,
                  value: '个人投诉处理工单'
              },
              {
                  id: 2,
                  value: '个人投诉质检'
              },
              {
                  id: 3,
                  value: '督办遗留库'
              }
          ],
          dynamicTags: ['首页', '标签二', '标签三'],
          inputVisible: false,
          inputValue: ''
		  }
	},
	methods: {
      handleClose(tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      addSubTab(targetName){
          this.$refs.subTabs.addTab(targetName)
      }
	}
}
</script>

<style scoped lang="scss">
  .el-container {
    /*margin-bottom: 40px;*/
    height: 100%;
    width: 100%;
  }
/*  ============*/
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    // background-color: rgb(20, 136, 154);
    color: #fff;
    text-align: center;
    margin-right: 6px;
    height: 100%;
    font-size: 12px;
    padding-top: 20px
  }
  .el-main {
    /*background-color: #E9EEF3;*/
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-divider--horizontal{
    margin: 15px 0px!important;
  }

</style>
