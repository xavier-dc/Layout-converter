import React from 'react';

const NewInputCardButton = (props)=>{
  const {addNewInputCard} = props;
  return ( 
    <button className="inputCard card addButton" onClick={addNewInputCard}>
      <span role="img" aria-label="addbutton">➕</span>
    </button>
  )
}

export default NewInputCardButton