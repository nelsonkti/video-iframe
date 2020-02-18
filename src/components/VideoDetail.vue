<template>
    <div class="video-detail">
      <van-icon name="arrow-left" @click="routerback" />
      <iframe
          id="iframeContain"
          name="iframeContain"
          seamless
          scrolling="yes"
          :src = play_url
        >
       </iframe>
       <div class="header">
        <h2>{{videoInfo.title}}</h2>
        <span>{{videoInfo.desc}}</span>
       </div>

       <van-divider />
       <van-dropdown-menu>
        <van-dropdown-item v-model="parsing_url" :options="lineData" :click="onSwitchLine()" />
      </van-dropdown-menu>
       <div class="series-content">
         <p>剧集</p>
         <div class="series-list" >
          <div v-for="item in videoSeriesList" v-bind:key="item.series_id">
            <van-button class="series-num" @click=onSwitch(item.url)>{{item.series_id}}</van-button>
          </div>
         </div>
       </div>
    </div>
  </template>

<script>
export default {
  name: 'VideoDetail',
  data () {
    return {
      videoInfo: [],
      videoSeriesList: [],
      parsing_url: '',
      url: '',
      play_url: null,
      lineData: [
      ]
    }
  },
  created () {
    this.getVideoInfo()
    this.getAnalysisLine()
    this.getSeriesList()
  },
  methods: {
    routerback: function () {
      this.$router.back(-1)
    },
    onSwitch: function (url) {
      this.play_url = this.parsing_url + url
      this.url = url
    },
    onSwitchLine: function () {
      this.play_url = this.parsing_url + this.url
    },
    async getVideoInfo () {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      var _this = this
      var id = this.$route.params.id
      try {
        // 定义参数对象
        let params = {
          id: id
        }
        let res = await this.$api.Video.getVideoInfo(params)
        _this.videoInfo = res.data

        console.log('返回详情数据data', res.data)
        console.log('返回数据', res)
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    async getSeriesList () {
      // 这里用try catch包裹，请求失败的时候就执行catch里的
      var _this = this
      var id = this.$route.params.id
      try {
        // 定义参数对象
        let params = {
          per_page: 10000,
          page: 1,
          id: id
        }
        let res = await this.$api.Video.getSeriesList(params)
        _this.videoSeriesList = res.data

        console.log('返回数据data', res.data)
        if (res.data) {
          this.url = res.data[0].url
        }
        console.log('返回数据data', res.data[0].url)
        console.log('返回数据', res)
      } catch (e) {
        console.log('​catch -> e', e)
      }
    },
    async getAnalysisLine () {
      var _this = this
      var id = this.$route.params.id
      try {
        // 定义参数对象
        let params = {
          per_page: 10000,
          page: 1,
          id: id
        }
        let res = await this.$api.Video.getAnalysisLineList(params)
        var lineList = []
        res.data.forEach(function (item, index) {
          var lineArr = []
          lineArr['text'] = item.name
          lineArr['value'] = item.url
          console.log(lineArr)
          lineList.push(lineArr)
        })
        _this.lineData = lineList

        if (res.data) {
          this.parsing_url = res.data[0].url
        }
        console.log('返回数据', res)
        console.log('返回数据', res)
      } catch (e) {
        console.log('​catch -> e', e)
      }
    }
  }
}
</script>

  <style scoped>
    .video-detail {
      height: 50rem;
      width: 100%;
    }
  /** iframe样式 */
  #iframeContain{
      width: 100%;
      height: 50%;
  }
  .series-num {
    float: left;
    background-color: #f6f8fa;
    margin: .0625rem .01875rem .3125rem .125rem;
  }
  .series-content {
    height: 18.75rem;
    width: 100%;
  }
  .van-icon-arrow-left {
    float: left;
    line-height: 2.375rem;
    background: rgb(255,255,255);
    padding: 0 3px 0 10px;
  }
  </style>
