import axios, { AxiosRequestConfig } from 'axios';
const CancelToken = axios.CancelToken;

interface AxiosReqConfig extends AxiosRequestConfig {
  funcName?: string;
}

const instance = axios.create();

instance.defaults.headers['Authorization'] =
  'Bearer Y29tLnN1bXNjb3BlLnFtLmtvbmdmdS5ib25kLnNlcnZpY2UuN3dYeHhtbWdUN3czRTRxMVZTOXpnb2xRSjNmazJ2THY=';

instance.interceptors.request.use((config: AxiosReqConfig) => {
  return config;
});

// 响应拦截
const errMsg = '系统错误，请重试';
instance.interceptors.response.use(
  (response: any) => {
    const config: AxiosReqConfig = response.config;
    const headers = config?.headers || {};
    if (headers.noCheckResult) {
      // 跳过结果检查
      return response.data;
    }
    if (response.status === 200) {
      if (response.data.code === 200) {
        // 成功
        return response.data.result;
      }
      // 读取错误消息------需要根据后端返回结果改动！！！！！！！！
      const content = response.data?.msg || errMsg;
      return Promise.reject(response.data.msg);
    }
    return Promise.reject(response.statusText);
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default instance;
