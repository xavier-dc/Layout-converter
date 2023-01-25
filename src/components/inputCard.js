import React, {useState, useEffect} from 'react';
import PositionInput from './PositionInput';
import { ChakraProvider } from '@chakra-ui/react';  

const InputCard = (props) => {
    const {layer, setParentState, resolution} =  props;
    const [isHidden, setIsHidden] = useState(false);
    const defaultVals = {width:[960,resolution[0]], height:[540,resolution[1]], left:[480, resolution[0]], top:[270,resolution[1]]}
    
    useEffect(()=>{
        Object.keys(defaultVals).forEach(key=>{
            setParentState({field:key, value:defaultVals[key][0], index:layer})
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const [percentages, setPercentages] = useState([0,0,0,0]);

    function toggleIsHidden(){
        setIsHidden(!isHidden);
        setParentState({field:"hidden", value:!isHidden,index:layer});
    }

    // function seepercentages() {
    //     console.log(defaultVals);
    //     //setPercentages(width/resolution[0]*100, height/resolution[1]*100, left/resolution[0]*100, top/resolution[1]*100);
    //     //console.log(percentages);
    // }

    return(
        <ChakraProvider>
        <div className={`inputCard ${layer} card ${isHidden? "hidden" : ''}`}>
            <div className="mainCardButtons">
                <button className="activeButton" onClick={toggleIsHidden}><span role="img" aria-label="activated">✔</span></button>
                <div>Layer {layer}</div>
            </div>
            <div className="positionGroup" >
            {Object.entries(defaultVals).map(([field, [defaultVal, max]], index)=>{
                return <PositionInput index={layer} key={field} field={field} max={max} resolution={resolution} defaultVal={defaultVal} setParentState={setParentState}/>
            })}
            </div>
        </div>
        </ChakraProvider>
    );
}

export default InputCard;