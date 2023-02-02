import './mainPage.css';

const MainPage = () => {
  return (
    <>
      <div className="main__info">
        <h2>Электронный дневник</h2>
        <p>
          Платформа электронных сервисов для образования. Электронный дневник помогает учащимся
          улучшать показатели в учебе. Родителям - быть в курсе того, как обстоят дела у ребенка в
          школе, а учителям, школам и администрации - сократить бумажную работу и упростить
          образовательный процесс.
        </p>
        <div className="main__percents">
          <div className="main__percents-item">
            <div className="main__percents-20"></div>
            <div className="main__percents-20-text">Свободное время учителя</div>
          </div>
          <div className="main__percents-item">
            <div className="main__percents-80"></div>
            <div className="main__percents-80-text">Пропуски без уважительной причины</div>
          </div>
          <div className="main__percents-item">
            <div className="main__percents-15"></div>
            <div className="main__percents-15-text">Средняя успеваемость</div>
          </div>
        </div>
        <p>
          Мы работаем над созданием инфраструктуры обучения — от электронного дневника и классного
          журнала до системы электронного документооборота, связывающей всех участников
          образовательного процесса. Платформа совершенствуется благодаря совместной работе с
          учреждениями образования и внедряется с разрешения Главного информационно-аналитического
          центра Министерства образования.
        </p>
        <h3>Теперь дневник нельзя забыть дома!</h3>
      </div>
    </>
  );
};

export default MainPage;
