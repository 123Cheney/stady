<template>
  <div class="page">
    <TopNav/>
    <Page :total="100" show-sizer show-elevator/>
  </div>
</template>

<script>
import TopNav from '../components/TopNav'
export default {
  components: {TopNav},
  data() {
    return {

    }
  },
  props: [],
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
}
</script>

<style scoped>
</style>
