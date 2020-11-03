import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000,
  })
  // 2.axios的拦截器
  // 2.1请求拦截的作用
  axios.interceptors.request.use(res => {

    return res;
  }, err => {
    console.log(err);
  })
  // 2.2响应拦截的作用
  axios.interceptors.response.use(res => {
    return res;
  }, err => {
    console.log(err);
  })

  return instance(config)

}
