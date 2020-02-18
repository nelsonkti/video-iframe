import api from '../index'
import urls from './urls'

const header = {}

export default {
  getVideoList (params) {
    console.log('url:' + urls.getVideoList)
    // return出去了一个promise
    return api.get(urls.getVideoList, params, header)
  },
  getSeriesList (params) {
    var url = urls.getSeriesList + '/video/' + params.id + '/series/list'
    return api.get(url, params, header)
  },
  getAnalysisLineList (params) {
    return api.get(urls.getAnalysisLineList, params, header)
  },
  getVideoInfo (params) {
    return api.get(urls.getVideoInfo, params, header)
  }
}
