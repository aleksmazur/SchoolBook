import { Dispatch, SetStateAction } from 'react';
import './buttonBurger.css';

type IBurger = {
  isOpen: boolean;
  setActiveSideBar: Dispatch<SetStateAction<boolean>>;
};

const ButtonBurger = ({ isOpen, setActiveSideBar }: IBurger) => (
  <div
    className={isOpen ? 'nav-burger active-burger' : 'nav-burger'}
    onClick={() => setActiveSideBar(!isOpen)}
  >
    <span></span>
  </div>
);

export default ButtonBurger;
