import { UserStore } from '../../stores';

const userStore = UserStore.getInstance();

export const isRole = (role: IRole | IRole[]): boolean => {
  const userRole = userStore.data.role;

  return typeof role === 'string' ? role === userRole : role.includes(userRole);
};

export const onlyForRole = (role: IRole | IRole[], value: any) => {
  if (isRole(role)) return typeof value === 'function' ? value() : value;
};
