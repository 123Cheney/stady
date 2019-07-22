<template>
  <div class="lay-out">
    <div class="left-box">
      <Menu>
        <Submenu v-for='item in menuList' :name='item.title' :key="item.title">
          <template slot="title">
            <Icon :type="item.icon"/>{{item.title}}
          </template>
          <MenuItem v-for='sunMenu in item.menuItem' :key="sunMenu.name" :name="sunMenu.name" :to='sunMenu.to'>{{sunMenu.title}}</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class="right-box">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuList:[
        {
          title:'动漫',
          icon:'ios-paper',
          menuItem:[
            {name:'1-1',title:'犬夜叉',to:'/page1'},
            {name:'1-2',title:'火影忍者',to:'/page2'},
          ]
        },
        {
          title:'电影',
          icon:'ios-people',
          menuItem:[
            {name:'2-1',title:'寻龙诀',to:'/page3'},
            {name:'2-2',title:'驯龙高手',to:'/page4'},
          ]
        },
        {
          title:'电视剧',
          icon:'ios-people',
          menuItem:[
            {name:'3-1',title:'寻龙诀',to:'/page5'},
            {name:'3-2',title:'驯龙高手',to:'/page6'},
          ]
        },
        {
          title:'舞台剧',
          icon:'ios-people',
          menuItem:[
            {name:'4-1',title:'寻龙诀',to:'/page7'},
            {name:'4-2',title:'驯龙高手',to:'/page8'},
          ]
        },
      ],
    };
  },
  props: [],
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style scoped>
.lay-out{
  display: flex;
  height: 100%;
  width: 100%;
  /* min-height: 500px; */
}
.ivu-menu{
  height: 100%;
}
.right-box{
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
