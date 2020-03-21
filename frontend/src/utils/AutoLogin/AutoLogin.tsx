import { Component } from 'react';
import { inject } from 'mobx-react';
import { IAutoLoginProps } from './types';

class AutoLogin extends Component<IAutoLoginProps> {
  state = {
    isLoaded: false,
  };

  async componentDidMount() {
    const { userStore } = this.props;

    try {
      await userStore.loadUser();
    } catch {
    } finally {
      this.setState({
        isLoaded: true,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return null;
    }

    return children();
  }
}

export default inject('userStore')(AutoLogin);
