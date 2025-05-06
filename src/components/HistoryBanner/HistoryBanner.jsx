import { Link } from "react-router-dom";
import "./style.css";
const HistoryBanner = () => {
  return (
    <div className="history-banner-container">
      <div className="history-banner-content">
        <h2 className="history-banner-title">
          <i className="bi bi-newspaper me-2 iconHistory"></i> Aprende más sobre nosotros
        </h2>
        <p className="history-banner-text">
          ¿Queres saber cómo nació nuestra pasión? Sumérgete en nuestra
          trayectoria.
        </p>
        <Link to="/historia" className="history-banner-link">
          Descubrir nuestra historia
        </Link>
      </div>
    </div>
  );
};


export default HistoryBanner