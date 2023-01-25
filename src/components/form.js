import React from 'react';
import InputCard from './inputCard';
import NewInputCardButton from './NewInputCardButton';

const Form = (props) => {
    const {setParentState, addNewLayer, removeLayer, setResolution, resolution} = props;
    let {layers} = props;

    const changeResolution = (e) => {
        const resolutionOptions = [[1920,1080],[1280,720]]

        setResolution(resolutionOptions[e.target.value]);
    }

    return(
        <div style={{margin: '0 auto', maxWidth: "99%"}}>
            <select onChange={changeResolution}>
                <option value={0}>1080p</option>
                <option value={1}>720p</option>
            </select>
            <div className="formsContainer">
                {[...Array(layers)].map((x,layer)=>{
                    layer = layer+1
                    // console.log(x,layer,layers);
                    return <InputCard layer={layer} key={layer} resolution={resolution} setParentState={setParentState} />
                })}
                {layers<10?<NewInputCardButton addNewInputCard={addNewLayer}/>:null}
                {layers>0?<input type="button" className="removeLayer card addButton" value="-" style={{fontSize: '3rem'}} onClick={removeLayer}/>:null}
            </div>
        </div>
    );
}

export default Form;