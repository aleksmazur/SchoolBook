import { useTranslation } from 'react-i18next';
import { toggleActiveModal } from '../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './modal.css';

export const Modal = () => {
  const { t } = useTranslation();

  const { activeModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closingModal = () => {
    dispatch(toggleActiveModal());
  };

  return (
    <div onClick={() => closingModal()} className={activeModal ? 'modal-active' : 'modal'}>
      <div className="modal__content">
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal__title">{t('auth.authTitle')}</h2>
          <form id="signIn" className="form registration-form" method="post">
            <div>
              <div className="input-block__wrapper">
                <label htmlFor="user_login">{t('auth.login')}</label>
                <input name="login" id="user_login" />
              </div>
              <div className="input-block__wrapper">
                <label htmlFor="user_password">{t('auth.password')}</label>
                <input type="password" name="password" id="user_password" />
              </div>
            </div>
            <button className="btn-block__signin btn" type="submit">
              {t('auth.loginBtn')}
            </button>
            <div className="form__link-block">
              <p>{t('auth.p1')}</p>
              <p>{t('auth.p2')}</p>
            </div>
          </form>
          <span className="close__modal" onClick={() => closingModal()}></span>
        </div>
      </div>
    </div>
  );
};
