<!-- 电影购票 -->
<template>
  <div class="movie-page">
    <wux-sticky :scrollTop="scrollTop">
      <wux-sticky-item class="sticky">
        <view slot="title">
          <div class="city" @click="onClickCity(index)">
            <span class="city-name">{{defaultCity}}</span>
            <wux-icon type="ios-arrow-down" />
          </div>
          <div class="text">正在热映</div>
        </view>
        <view slot="content">
          <div class="banner">
            <swiper :indicator-dots="true" :autoplay="true" :circular="true" interval="5000" duration="500" :indicator-active-color="pointColor">
              <div v-for="(item, index) in imgUrls" :key="index">
                <swiper-item>
                  <image :src="item" model="aspectFit" class="slide-image" @click="onClickBanner(index)"/>
                </swiper-item>
              </div>
            </swiper>
          </div>
        </view>
      </wux-sticky-item>
    </wux-sticky>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { CITY_GET_LOCATION } from '../../store/mutation-types'
export default {
  name: 'movie',
  components: {},
  data () {
    return {
      scrollTop: 0,
      imgUrls: [
        '/static/images/banner1.jpg',
        '/static/images/banner2.jpg',
        '/static/images/banner3.jpg',
        '/static/images/banner4.jpg'
      ],
      pointColor: '#01948C'
    }
  },
  methods: {
    ...mapActions('city', {
      'getLocation': CITY_GET_LOCATION
    }),
    onClickBanner (index) {
      wx.navigateTo({
        url: `/pages/cinema/main?id=${index}`
      })
    },
    onClickCity () {
      wx.navigateTo({
        url: `/pages/city/main`
      })
    }
  },
  computed: {
    ...mapGetters('deviceInfo', {
      deviceInfo: 'deviceInfo'
    }),
    ...mapGetters('city', {
      defaultCity: 'defaultCity',
      currentCityCode: 'currentCityCode'
    }),
    ...mapGetters('userInfo', {
      userInfo: 'userInfo'
    })
  },
  watch: {},
  created () {
    this.getLocation()
  },
  mounted () {
    console.log(this.deviceInfo.windowWidth)
  },
  onPageScroll (e) {
    this.scrollTop = e.scrollTop
  }
}
</script>
<style lang="less" scoped>
.movie-page {
  .sticky {
    position: relative;
  }
  .city {
    position: absolute;
    left: 10px;
    top: 0;
  
    .city-name {
      margin-right: 5px;
    }
  }
  .text {
    color: #01948C;
    text-align: center;
  }
  .banner {
    .slide-image {
      width: 100%;
    }
  }
}
</style>