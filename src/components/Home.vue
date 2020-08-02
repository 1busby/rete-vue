<template>
  <div class="home">
    <ChartEditor />
  </div>
</template>

<script>
import ChartEditor from './diagram/ChartEditor.vue';
export default {
  name: 'Home',
  components: { 
    ChartEditor
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
