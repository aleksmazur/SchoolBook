import { Dispatch, SetStateAction } from 'react';
import './buttonBurger.css';

type IBurger = {
  isOpen: boolean;
  setActiveSideBar: Dispatch<SetStateAction<boolean>>;
};

const ButtonBurger = ({ isOpen, setActiveSideBar }: IBurger) => {
  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    const currentEl = e.currentTarget as HTMLLIElement;
    const contentArea = currentEl.parentElement?.lastChild as HTMLLIElement;
    console.log(contentArea);
    if (isOpen) {
      contentArea.classList.remove('content-area-none');
    } else {
      contentArea.classList.add('content-area-none');
    }
    setActiveSideBar(!isOpen);
  };

  return (
    <div className={isOpen ? 'nav-burger active-burger' : 'nav-burger'} onClick={openMenu}>
      <span></span>
    </div>
  );
};

export default ButtonBurger;
