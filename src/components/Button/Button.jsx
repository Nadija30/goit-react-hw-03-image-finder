import css from './Button.module.css';
export const Button = ({ onClick }) => {
  return (
    <div className={css.wrapperButton}>
      <button className={css.loadButtom} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
