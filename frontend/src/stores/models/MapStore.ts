import { action } from 'mobx';
import Store from './Store';

// store for handled data as object
abstract class MapStore<T> extends Store<T> {
  @action public updateData(data: Partial<T>) {
    const currentData = this.data || ({} as T);

    this.data = {
      ...currentData,
      ...data
    };
  }
}

export default MapStore;
