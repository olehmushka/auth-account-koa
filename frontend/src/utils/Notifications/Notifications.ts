import { toast, ToastOptions } from 'react-toastify';

import { IToastType } from './types';

class Notifications {
  private static defaultConfig: ToastOptions = {
    position: 'top-right',
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
  };

  public static show(
    message: string,
    type: IToastType = 'info',
    config: Partial<ToastOptions> = {},
  ) {
    toast[type](message, {
      ...this.defaultConfig,
      ...config
    });
  }
}

export default Notifications;
