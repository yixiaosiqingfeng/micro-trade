<template>
  <mt-header :title="title" class='bar-header'>
    <span class="bar-r" slot='left'><slot name='left'><mt-button v-show='!hideBack' icon="back" @click.native='goback()' slot='left'></mt-button></slot></span>
    <span class="bar-r" slot='right'><slot name='right'></slot></span>
  </mt-header>
</template>


<script>
export default {
  name: 'VHeader',
  props: ['title', 'hideBack'],
  data() {
    return {}
  },
  methods: {
    goback() {
      this.$router.back();
    }
  },
}
</script>


<style lang='less'>

</style>
