import React, { useState, useEffect } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./fromstyle.scss";

const Form = ({ id, title, content, onDelete,onContentChange  }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleContentChange = (event) => {
    onContentChange(id, event.target.value);
  };

  // console.log(id);

  return (
    <div className="wpnts-form">
      <div className="wpnts-form-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>{content}</h2>
        <button className="wpnts-delete-form" onClick={() => onDelete(id)}><DeleteForeverIcon className="wpnts-delete-button"/></button>
      </div>
      {isOpen && <div className={`wpnts-form-content ${isOpen ? 'is-open' : 'close'}`}>
        <input type="text" placeholder="add plugin name " id={id} name=" pluginname" onChange={handleContentChange} value={content}/>  
      </div>}
    </div>
  )
}

export default Form
