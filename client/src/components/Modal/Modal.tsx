import { useTranslation } from 'react-i18next';
import { toggleActiveModal } from '../../reducers/modalReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authUser, ILogin } from '../../thunks/user';
import { setUserInfo } from '../../reducers/userReducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './modal.css';

export const Modal = () => {
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.userInfo.token.token);
  const navigate = useNavigate();
  const { activeModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<ILogin>({
    mode: 'onSubmit',
  });
  const { errorUser } = useAppSelector((state) => state.userInfo);

  const closingModal = () => {
    dispatch(toggleActiveModal());
  };

  const onSubmitForm: SubmitHandler<ILogin> = (data) => {
    const login = {
      username: data.username,
      password: data.password,
    };
    dispatch(authUser(login));
    dispatch(setUserInfo(login));
  };

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
      closingModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div onClick={() => closingModal()} className={activeModal ? 'modal-active' : 'modal'}>
      <div className="modal__content">
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal__title">{t('auth.authTitle')}</h2>
          <form id="signIn" className="form registration-form" method="post">
            <div>
              <div className="input-block__wrapper">
                <label htmlFor="user_login">{t('auth.login')}</label>
                <input id="user_login" {...register('username')} type="text" />
              </div>
              <div className="input-block__wrapper">
                <label htmlFor="user_password">{t('auth.password')}</label>
                <input id="user_password" {...register('password')} type="password" />
              </div>
            </div>
            <div className="error__text">{errorUser}</div>
            <button
              className="btn-block__signin btn"
              type="submit"
              onClick={handleSubmit(onSubmitForm)}
            >
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
