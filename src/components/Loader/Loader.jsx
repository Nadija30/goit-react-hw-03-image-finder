import css from './Loader.module.css';
import { RotatingLines } from 'react-loader-spinner';

export const Loader = () => (
  <div className={css.wrapperSpiner}>
    <RotatingLines
      strokeColor="blue"
      strokeWidth="5"
      animationDuration="0.75"
      width="150"
      visible={true}
    />
  </div>
);
