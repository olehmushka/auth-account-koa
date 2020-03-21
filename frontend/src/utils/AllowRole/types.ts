import { ReactNode } from 'react';

export interface IRoleValidatorProps {
  role: IRole[] | IRole;
}

export interface IAllowRoleProps extends IRoleValidatorProps {
  children: () => ReactNode;
}

export type IRoleValidatedPageProps = IRoleValidatorProps;
