import { ButtonProps } from 'reactstrap';

export interface ILoaderButtonProps extends ButtonProps {
  isLoading: boolean;
  text: string;
  spinnerColor?: string;
  left?: string;
}
