import { toggleActiveModal } from '../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './modal.css';

export const Modal = () => {
  const { activeModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closingModal = () => {
    dispatch(toggleActiveModal());
  };

  return (
    <div onClick={() => closingModal()} className={activeModal ? 'modal-active' : 'modal'}>
      <div className="modal__content">
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal__title">Авторизация</h2>
          <form id="signIn" className="form registration-form" method="post">
            <div>
              <div className="input-block__wrapper">
                <label htmlFor="user_email">Email</label>
                <input type="email" name="email" id="user_email" autoComplete="off" required />
              </div>
              <div className="input-block__wrapper">
                <label htmlFor="user_password">Пароль</label>
                <input
                  type="password"
                  name="password"
                  id="user_password"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <button className="btn-block__signin" type="submit">
              Войти
            </button>
            <div className="form__link-block">
              <p>У вас нет профиля?</p>
              <p>Попросите Логин и пароль у классного руководителя</p>
            </div>
          </form>
          <span className="close__modal" onClick={() => closingModal()}></span>
        </div>
      </div>
    </div>
  );
};
