import axios, { type AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async get<T>(url: string, params: Object = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error(`Api error - GET - (${url}):`, error);
      throw error; 
    }
  }

  // async get(url: string, params: Object , config = {}) {
  //   return AXIOS({
  //     method: 'get',
  //     url: url,
  //     params: params,
  //     ...config
  //   })
  //     .then((res) => {
  //       if (typeof res === 'undefined') {
  //         throw {
  //           message: 'Something went wrong!'
  //         }
  //       }

  //       return res
  //     })
  //     .catch((err) => {
  //       return err
  //     })
  // }
}
