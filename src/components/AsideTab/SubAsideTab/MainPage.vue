<template>
  <!-- <img src="../../../common/image/gray.svg" alt=""> -->
  <div class="myhome-container"></div>
</template>

<script>
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .myhome-container
    padding-top: 10px
    background: url('../../../common/image/newWelcome.jpg') no-repeat
    background-position: -10px -3px
    background-size: cover
    height: 100%
    -webkit-filter: grayscale(100%)
    -moz-filter: grayscale(100%)
    -ms-filter: grayscale(100%)
    -o-filter: grayscale(100%)
    filter: grayscale(100%)
    // filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\' x=\'0\' y=\'0\' width=\'100%\' height=\'100%\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")
    // filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    // filter: url(../../../common/image/gray.svg#grayscale)
    filter: gray
    opacity: 1
</style>
