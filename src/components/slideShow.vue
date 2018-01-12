<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[curIdx].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[curIdx].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[curIdx].src">
        </transition>
      </a>
    </div>
    <h2>{{slides[curIdx].title}}</h2>

    <ul class="slide-pages">
      <li @click="goto(prev)">&lt;</li>
      <li v-for="(item,index) in slides" @click="goto(index)">
        <a :class="{on: index===curIdx}">{{index+1}}</a>
      </li>
      <li @click="goto(next)">&gt;</li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: "slide-show",
    data(){
      return {
        curIdx:0,
        isShow:true
      }
    },
    props: {
      slides: {
        //数据类型
        type: Array,
        //默认值
        default: []
      },
      inv:{
        type:Number,
        default:200
      }
    },
    //渲染完之后运行
    mounted() {
      this.runInv();
      //console.log(this.slides);
    },
    //处理计算
    computed:{
      prev(){
        if(this.curIdx===0)
          return this.slides.length-1;
        else
         return this.curIdx-1;
      },
      next(){
        if(this.curIdx===this.slides.length-1)
          return 0;
        else
          return this.curIdx+1;
      }
    },
    methods:{
      goto(index){
        this.isShow=false;
        setTimeout(()=>{
          this.isShow=true;
          this.curIdx=index;
          //向父标签传值
          this.$emit('onchange',index);
        },10);

      },
      runInv(){
        this.invId=setInterval(()=>{
          this.goto(this.next)
        },this.inv)
      },
      clearInv(){
        clearInterval(this.invId);
      }
    }

  }
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }
  .slide-pages li .on {
    text-decoration: underline;
  }
</style>
