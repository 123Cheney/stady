<template>
  <div class="page">
    <div>{{renamePage2}}</div>
    <div>{{renameDoneList}}</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {},
  data() {
    return {

    }
  },
  props: [],
  mounted() {},
  methods: {},
  watch: {},
  computed: {
    ...mapState({
      renamePage2: 'page2',
    }),
    ...mapGetters({
      renameDoneList: 'doneList'  // this.$store.getters.doneList
    })
  }
}
</script>

<style scoped>
</style>
