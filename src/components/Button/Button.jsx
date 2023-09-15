import css from './Button.module.css';
export const Button = ({ onClickRender }) => {
  return (
    <div className={css.wrapperButton}>
      <button className={css.loadButtom} type="button" onClick={onClickRender}>
        Load more
      </button>
    </div>
  );
};
