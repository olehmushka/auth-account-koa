import React, { FC } from 'react';
import { Button, Spinner } from 'reactstrap';
import { ILoaderButtonProps } from './types';

const LoaderButton: FC<ILoaderButtonProps> = ({
  isLoading,
  text,
  spinnerColor,
  className = '',
  left,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={isLoading}
      className={`position-relative ${className}`}
    >
      {isLoading ? (
        <div>
          <Spinner
            size="sm"
            className="position-absolute"
            color={spinnerColor || 'dark'}
            style={{ top: '27%', left: left || '40%' }}
          />
          <span>{text}</span>
        </div>
      ) : (
        text
      )}
    </Button>
  );
};

export default LoaderButton;
