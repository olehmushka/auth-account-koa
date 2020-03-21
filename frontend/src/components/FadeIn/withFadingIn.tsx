import React, { FC } from 'react';
import FadeIn from './FadeIn';

const withFadingIn = <P extends object>(
  Component: React.ComponentType<P>
): FC<P> => props => (
  <FadeIn>
    <Component {...props} />
  </FadeIn>
);

export default withFadingIn;
