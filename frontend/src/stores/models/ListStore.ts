import { action } from 'mobx';
import Store from './Store';

// store for handled data as array
abstract class ListStore<T extends { _id: string }> extends Store<T[]> {
  @action
  public push(newItem: T) {
    const newData = [...(this.data || []), newItem];

    this.data = newData;
  }

  public selectById(id: string): T {
    if (!this.isDataExist) return null;

    return this.data.find(el => el._id === id);
  }

  @action
  public put(target: T) {
    const index = this.isDataExist
      ? this.data.findIndex(el => el._id === target._id)
      : -1;

    if (index === -1) {
      return this.push(target);
    }

    const currentItem = this.data[index];

    const newItem = {
      ...currentItem,
      ...target
    };

    const newData = [...this.data];
    newData[index] = newItem;

    this.data = newData;

    return this.data;
  }

  @action
  public replace(target: T) {
    const index = this.isDataExist
      ? this.data.findIndex(el => el._id === target._id)
      : -1;

    if (index === -1) {
      return this.push(target);
    }

    const newData = [...this.data];
    newData[index] = target;

    this.data = newData;

    return target;
  }

  @action
  public removeById(id: string): void {
    if (!this.isDataExist) return null;

    const index = this.data.findIndex(el => el._id === id);
    if (index !== -1) {
      const newData = [...this.data];

      newData.splice(index, 1);

      this.data = newData;
    }
  }
}

export default ListStore;
