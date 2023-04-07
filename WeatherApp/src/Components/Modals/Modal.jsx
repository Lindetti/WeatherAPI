import "./Modal.css";

const Modal = ({show, handleClose, children}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal">
        <div className="modal-content">
          <div className="closeDiv">
            <div className="close-icon" onClick={handleClose}>
              <span className="close-x">&times;</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;