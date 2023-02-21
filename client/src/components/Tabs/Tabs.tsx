import { ITabsList } from '../../pages/ClassPage/ClassPage';
import './tabs.css';

const TabContent = ({ content }: ITabsList) => (
  <div className="tabcontent">
    <div>{content}</div>
  </div>
);

export default TabContent;
