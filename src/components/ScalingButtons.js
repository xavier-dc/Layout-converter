import React from 'react';

const ScalingButtons = (props) =>{
  const {scale, setScale} = props;
  return(
    <div className="scalingButtons">
      <button className="decreaseSize" disabled={scale<=0.1}onClick={()=>setScale(false)}><span role="img" aria-label="decrease">➖</span></button>
      <button className="increaseSize" disabled={scale>=1} onClick={()=>setScale(true)}><span role="img" aria-label="increase">➕</span></button>
    </div>
  )
}

export default ScalingButtons;