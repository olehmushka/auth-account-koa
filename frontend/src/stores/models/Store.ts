import { observable, action, computed } from 'mobx';

abstract class Store<T> {
  @observable public data: T = null;

  protected constructor() {}

  @action
  public setData(data: T) {
    this.data = data;
  }

  @action
  public removeData() {
    this.data = null;
  }

  @computed
  public get isDataExist() {
    return Boolean(this.data);
  }
}

export default Store;
