import axios from './axios';

// 导出EXCEL
export const exportExcel = (params: any) => {
  return axios({
    method: 'GET',
    url: 'https://cloud-tptest.qmessage.cn/qm/kongfu-bond-service/market/export',
    params,
    headers: {
      // 是否跳过axios响应拦截结果检查
      noCheckResult: true,
    },
    responseType: 'blob',
  });
};
