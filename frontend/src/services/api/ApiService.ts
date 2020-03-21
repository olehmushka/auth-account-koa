import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import merge from 'deepmerge';
import TokenStorage from '../../utils/TokenStorage';
import { AUTH_BASE_URL } from '../../config';

abstract class ApiService {
  protected static tokenStorage = new TokenStorage();

  private static readonly getApi = (serviceName: string): { api: AxiosInstance } => {
    switch (serviceName) {
      case 'auth-service':
        return { api: Axios.create({ baseURL: AUTH_BASE_URL }) };
      default:
        return { api: Axios.create() };
    }
  };

  protected request<ResponseType = any>(
    serviceName: string,
    inputConfig: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> {
    let outputConfig = inputConfig;

    const token = ApiService.tokenStorage.getToken();
    if (token) {
      outputConfig = merge(outputConfig, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    return ApiService.getApi(serviceName).api(outputConfig);
  }
}

export default ApiService;
