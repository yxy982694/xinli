<template>
  <div id="main-container" class="main-container">
    <toggle-nav></toggle-nav>
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
       <transition name="fade" mode="out-in">
          <router-view></router-view>
       </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import ToggleNav from "./ToggleNav"
  import Intro from "../Intro/Intro"
  export default {
    name: 'MainContent',
    components:{
      ToggleNav,
      Intro
    },
  }
</script>
