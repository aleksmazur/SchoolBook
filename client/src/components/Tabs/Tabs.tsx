import { ITabsList } from '../../pages/ClassPage/ClassPage';
import './tabs.css';

const TabContent = ({ title, content }: ITabsList) => (
  <div className="tabcontent">
    <h3>{title}</h3>
    <div>{content}</div>
  </div>
);

export default TabContent;
