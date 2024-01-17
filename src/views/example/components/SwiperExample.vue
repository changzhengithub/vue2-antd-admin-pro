<template>
  <div class="index-swiper">
    <div class="swiper-btn">
      <a-space>
        <a-button @click="nextClick">后退</a-button>
        <a-button type="primary" @click="prevClick">前进</a-button>
      </a-space>
    </div>
    <div class="swiper-main">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <div class="swiper-item">I'm Slide 1</div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiper-item">I'm Slide 2</div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiper-item">I'm Slide 3</div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiper-item">I'm Slide 4</div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
/**
 * @desc 轮播图
 * @author changz
 * */
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'SwiperExample',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      // 配置swiper所有参数
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true,
        observeParents: true
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log(this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    prevClick() {
      this.swiper?.slideNext()
    },
    nextClick() {
      this.swiper?.slidePrev()
    }
  }
}
</script>

<style lang="less" scoped>
.index-swiper {
  position: relative;
  width: 100%;
  padding: 20px;
  .swiper-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
  }
  .swiper-main {
    width: 100%;
    height: 420px;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>