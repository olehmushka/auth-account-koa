import React from 'react';
import { Redirect } from 'react-router-dom';
import { withProps } from 'recompose';
import { observer } from 'mobx-react';
import UserStore from '../../stores/UserStore';
import RoleValidator from './RoleValidator';
import { IRoleValidatedPageProps } from './types';
import { IS_DEV } from '../../config';

const withAllowedRole = (role: IRole[] | IRole) => <P extends object>(
  Component: React.ComponentType<P>
) => {
  @observer
  class RoleValidatedPage extends RoleValidator<P & IRoleValidatedPageProps> {
    private debug() {
      if (!IS_DEV) {
        return;
      }
      const { role: currentRole } = UserStore.getInstance().data;

      console.error(`
        Redirected by role validation on ${Component.name} component.
        Allowed roles: ${JSON.stringify(role)},
        Current role: ${currentRole}
        `);
    }

    public render() {
      const { role, ...props } = this.props;

      if (this.isAllowed()) {
        return <Component {...(props as P)} />;
      }

      this.debug();
      return <Redirect to="/error1" />;
    }
  }

  return withProps<IRoleValidatedPageProps, P>({ role })(RoleValidatedPage);
};

export default withAllowedRole;
