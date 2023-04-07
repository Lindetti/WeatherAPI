import Modal from "../Modals/Modal";
import { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalFunc = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer>
      <a onClick={showModalFunc}>About</a>
      <a href="https://github.com/Lindetti" target="_blank">My Github</a>
      <Modal show={isModalOpen} handleClose={closeModal}>
        <div className="modalDiv">
          <h3>This App was made by Alexander Lind</h3>
          <p>API that is used is a REST API from <a href="https://github.com/robertoduessmann/weather-api" target="_blank">Github</a></p>
          <p>Weather Icons is from <a href="https://www.amcharts.com/free-animated-svg-weather-icons/" target="_blank">Amcharts.com</a></p>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
  
  
  
  
  
  