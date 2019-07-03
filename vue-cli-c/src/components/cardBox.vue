<template>
  <div class="card-box" ref="cardBox">
    <div class="card-item" v-for="(item,index) in cardData" 
      :key="index" 
      :style="itemSty">
      <slot :data="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    itemSty: {
      type: Object,
      default() {
        return {
          width:'250px',
          height:'280px',
          background: '#aaa',
          marginBottom: '20px',
        }
      },
    },
    cardData:{
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted() {
    let _this = this;
    window.onresize=function(){
      _this.boxGrid();
    }
    this.boxGrid()
  },
  methods: {
    boxGrid() {
      let cardBox = this.$refs.cardBox;
      let cardItem = document.getElementsByClassName("card-item");
      let [boxWidth, cardWidth, num, marginRight] = ["", "", "", ""];

      if (cardItem[0] && cardBox != undefined) {
        boxWidth = cardBox.clientWidth;
        cardWidth = cardItem[0].clientWidth;
        
        num = parseInt(boxWidth/cardWidth);
        marginRight = (boxWidth - (cardWidth * num)) / (num-1);
        if(marginRight<=10){
          num = num-1;
          marginRight = (boxWidth - (cardWidth * num)) / (num-1);
        }

        for (let i = 0; i < cardItem.length; i++) {
          if ((i + 1) % num != 0) {
            cardItem[i].style.marginRight = parseInt(marginRight - 1) + 'px';
          } else {
            cardItem[i].style.marginRight = '0px';
          }
        }
      }
    },
    childMethod(i) {
      console.log('父组件调用子组件的方法')
      console.log(i)
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.card-box{
  display: flex;
  flex-flow: row wrap;
  .card-item{
    box-sizing: border-box;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.15);
  }
}

</style>
