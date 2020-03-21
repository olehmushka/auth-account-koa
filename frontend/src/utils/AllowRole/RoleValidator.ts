import { Component } from 'react';
import { IRoleValidatorProps } from './types';
import { isRole } from './helpers';

abstract class RoleValidator<P extends IRoleValidatorProps> extends Component<
  P
> {
  protected isAllowed() {
    return isRole(this.props.role);
  }
}

export default RoleValidator;
