import {  useState } from "react";
import "./submitLink.css";
import {
    Add,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const SubmitLink = () => {
  return (
    <div className="submit-link-container">
      <div className="add-container">
      <Link to="/addlinkpage">
       <Add style={{ fontSize: 50 }}/>
       </Link>
      </div>
     <h2>SUBMIT A LINK</h2>
    </div>
  );
}

export default SubmitLink