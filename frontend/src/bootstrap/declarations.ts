/* eslint-disable import/export, no-shadow, @typescript-eslint/no-explicit-any */

import { inject } from 'mobx-react';

declare module 'mobx-react' {
  export function inject<I>(
    ...args: string[]
  ): <P>(
    component: React.ComponentType<P>
  ) => React.FC<Omit<P, keyof I> & Partial<I>>;

  export function inject<I>(
    mapStateToProps: (store: any) => object
  ): <P>(
    component: React.ComponentType<P>
  ) => React.FC<Omit<P, keyof I> & Partial<I>>;
}
