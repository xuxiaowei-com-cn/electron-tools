import request from '../utils/request'

/**
 * baidu
 */
export const baidu = function () {
  return request.get('https://www.baidu.com', {
    baseURL: undefined, // 为空：可使用代理，不为空：不能使用代理
    withCredentials: false
  }).then((response: any) => {
    return response.data
  })
}

export default {
  baidu
}
