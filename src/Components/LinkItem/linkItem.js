import {  useState } from "react";
import "./linkItem.css";
import {
  ArrowUpward,
  ArrowDownward,
  Delete,
  Close
} from "@material-ui/icons";
import {useSelector, useDispatch} from 'react-redux';
import {upVote, downVote, removeLink} from '../../Redux/AddLinkPage/addLinkPage-api';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    padding: 0
  },
};

const LinkItem = ({item}) => {
  const dispatch = useDispatch();
  const addLinkPageState = useSelector((state) => state.addLinkPage);

  const notify = () => toast(`${item.linkName} removed.`);

  const [isHovered, setIsHovered] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

 const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div 
    className="link-container" 
    style={{ backgroundColor: isHovered ? "rgb(216, 216, 216)" : "white" }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div className="points-container">
        <h1>{item.points}</h1> 
        <text className="points">POINTS</text>
      </div>
      <div className="right-container">
        <div className="info-container">
          <text className="title-text">{item.linkName}</text> 
          <text className="url-text">{item.linkUrl}</text>
        </div>
        <div className="bottom-container">
          <div className="vote-container">
            <ArrowUpward 
              style={{ fontSize: 20, color: "gray" }} 
              onClick={() => {
                dispatch(upVote(item))
                }}/>
            <text className="vote-text">Up Vote</text>
          </div>
          <div className="vote-container">
            <ArrowDownward 
              style={{ fontSize: 20, color: "gray" }} 
              onClick={() => {
                {item.points !== 1 ? (
                  dispatch(downVote(item))
                ):(
                  alert("This link cannot be downvoted!")
                )}
                }}/>
            <text className="vote-text">Down Vote</text>
          </div>
        </div>
      </div>

      {isHovered &&
      <Delete style={{ fontSize: 20, position: "relative", top:-10, right:-10 }} onClick={() => {openModal()}}/>
      }

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-title-container">
          <text className="modal-remove-link-text">Remove Link</text>
          <Close style={{ fontSize: 20, color: "white", marginRight: 10, marginTop: 5}} onClick={closeModal}/>
        </div>
        <div className="modal-text-container">
          <text className="modal-text">Do you want to remove:</text>
          <text className="modal-item-next">{item.linkName}</text>
        </div>
        <div className="modal-button-container">
          <button className="modal-button" onClick={closeModal}>CANCEL</button>
          <button className="modal-button" 
          onClick={() => {
            dispatch(removeLink(item, notify));
            closeModal()
            }}>
              OK
            </button>
        </div>
      </Modal>

      <ToastContainer
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={true} 
        type="success" 
        theme="colored" 
        toastStyle={{backgroundColor: "rgb(227, 247, 199)", color:"green", fontSize: 20, fontWeight: 700 }}
      />
    </div>
  );
}

export default LinkItem