import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

async function sendRequest<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  urlReq: string,
  data?: object,
) {
  let url: string = urlReq;
  if (data && method === 'get') {
    Object.keys(data).forEach((key) => {
      if (!data[key as keyof typeof data]) {
        delete data[key as keyof typeof data];
      }
    });
    url = urlReq + `?${qs.stringify(data)}`;
  }

  const config: AxiosRequestConfig = {
    url,
    method,
  };

  if (method !== 'get') {
    config.data = data;
  }

  try {
    // Искусственную задержка перед выполнением запроса
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const res = await axios.request<T>(config);
    if (res?.data) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const requestGet = async <T>(urlReq: string, data?: object) => {
  return await sendRequest<T>('get', urlReq, data);
};
export const requestPost = async <T>(urlReq: string, data?: object) => {
  return await sendRequest<T>('post', urlReq, data);
};
export const requestPut = async <T>(urlReq: string, data?: object) => {
  return await sendRequest<T>('put', urlReq, data);
};
