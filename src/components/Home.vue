<template>
    <div class="home">
        <!-- <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        > -->
        <van-grid  :border="false" icon-size:49 :column-num="3">
          <van-grid-item v-for="item in newVideoList"  :key="item.id" :to='"/video/detail/" + item.id' info="电视剧">
            <van-image Lazyload :src="item.img_url" />
            <span class="video-title">{{item.title}}</span>
          </van-grid-item>
          </van-grid>
        <!-- </van-list> -->
    </div>
  </template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      newVideoList: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.getVideoList()
  },
  methods: {
    async getVideoList () {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      var _this = this
      try {
        // 定义参数对象
        let params = {
          per_page: 10000,
          page: 1
        }
        let res = await this.$api.Video.getVideoList(params)
        _this.newVideoList = res.data

        console.log('返回数据data', res.data)
        console.log('返回数据', res)
      } catch (e) {
        console.log('​catch -> e', e)
      }
    }
  }
}
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .video-detail {
      height: 31.25rem;
      width: 100%;
    }
  /** iframe样式 */
  #iframeContain{
      width: 100%;
      height: 18.75rem;
  }
  .series-num {
    float: left;
    background-color: #f6f8fa;
    margin: .0625rem .01875rem .3125rem .125rem;
  }
  .video-title {
      padding-top: .375rem;
  }
  .van-image {
    width: 11.25rem;
    height: 14.75rem;
  }
  </style>
