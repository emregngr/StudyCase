import { useState } from "react";
import "./addLinkPage.css";
import { Header } from "../../Components";
import {
  ArrowBack,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {addLink} from '../../Redux/AddLinkPage/addLinkPage-api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddLinkPage = () => {
  const dispatch = useDispatch();
  const addLinkPageState = useSelector((state) => state.addLinkPage);

  const notify = () => toast(`${linkName} added.`);

  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const filteredName = addLinkPageState?.addLinkResult?.filter(element => 
    element.linkName === linkName
  )

  return (
    <div className="add-link-page-container">
      <Header />
      <form className="form">
        <div className="back-title-container">
          <Link to="/">
            <ArrowBack style={{ fontSize: 15 }}/>
          </Link>
          <text className="back-title-text">Return to List</text>
        </div>
        <text className="add-new-title-text">Add New Link</text>
          <label className="input-container">
            Link Name:
            <input className="input" type="text"  placeholder="e.g. Alphabet" value={linkName} onChange={(e) => setLinkName(e.target.value)} />
          </label>
          <label className="input-container">
            Link URL:
            <input className="input" type="text"  placeholder="e.g. http://abc.xyz" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
          </label>
          <button className="add-button" type="button" 
          onClick={() => {
            if(linkName.length > 0 && linkUrl.length > 0){
              if(filteredName.length === 0){
                dispatch(addLink({linkName, linkUrl}, notify));
                setLinkName("");
                setLinkUrl("")
              }else{
                alert("The Link Name you wrote already exists!")
              }
            }else{
              alert("Please fill in the blanks!")
            }
        }}>
            ADD
          </button>
          
          <ToastContainer
            position="top-center" 
            autoClose={3000} 
            hideProgressBar={true} 
            type="success" 
            theme="colored" 
            toastStyle={{backgroundColor: "rgb(227, 247, 199)", color:"green", fontSize: 20, fontWeight: 700 }}
          />
      </form>
    </div>
  );
}

export default AddLinkPage