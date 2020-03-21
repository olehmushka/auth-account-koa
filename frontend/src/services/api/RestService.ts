import ApiService from './ApiService';
import { _ } from '../../utils';

abstract class RestService<T> extends ApiService {
  protected abstract anchor: string;

  public async getAll(serviceName: string, params?: { [key: string]: any }): Promise<T[]> {
    const response = await this.request<T[]>(serviceName, {
      url: this.anchor,
      params
    });

    return response.data;
  }

  public async get(serviceName: string, id: string): Promise<T> {
    const response = await this.request<T>(serviceName, {
      url: `${this.anchor}/${id}`
    });

    return response.data;
  }

  public async delete(serviceName: string, id: string): Promise<''> {
    const response = await this.request<''>(serviceName, {
      url: `${this.anchor}/${id}`,
      method: 'delete'
    });

    return response.data;
  }

  public async update(serviceName: string, id: string, data: Partial<T>): Promise<T> {
    const response = await this.request<T>(serviceName, {
      url: `${this.anchor}/${id}`,
      method: 'patch',
      data
    });

    return response.data;
  }

  public async create(serviceName: string, data: Partial<T>): Promise<T> {
    const response = await this.request<T>(serviceName, {
      url: this.anchor,
      method: 'post',
      data
    });

    return response.data;
  }

  public async populate<T extends object>(
    serviceName: string,
    data: T | T[],
    mapToDocument: { [key: string]: RestService<any> }
  ) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(el => this.populate(serviceName, el, mapToDocument)));
    }

    const result = _.cloneDeep(data);

    await Promise.all(
      _.map(mapToDocument, async (service, key) => {
        const id = result[key];
        if (!id) return;

        try {
          result[key] = await service.get(serviceName, id);
        } catch {
          result[key] = id;
        }
      })
    );

    return result;
  }

  public depopulate<T extends object>(data: T, ...keys: string[]): T {
    if (Array.isArray(data)) {
      return data.map(el => this.depopulate(el, ...keys)) as T;
    }

    const newData = _.cloneDeep(data);

    keys.forEach(key => {
      if (typeof newData[key] === 'object') {
        const populatedObject = newData[key];
        const id = populatedObject._id;

        newData[key] = id;
      }
    });

    return newData;
  }
}

export default RestService;
