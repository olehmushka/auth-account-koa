import { observer } from 'mobx-react';
import RoleValidator from './RoleValidator';
import { IAllowRoleProps } from './types';

@observer
class AllowRole extends RoleValidator<IAllowRoleProps> {
  public render() {
    const { children } = this.props;

    if (this.isAllowed()) {
      return children() || null;
    }

    return null;
  }
}

export default AllowRole;
