import React, {useState,Fragment} from 'react';
import { Input, Button } from '@chakra-ui/react';

const PositionInput = (props)=>{
  const {setParentState, field, index, defaultVal, min=0, max, resolution} = props;
  const [value, setValue] = useState(defaultVal);
  let perc = false;

  function handleChange(event){
    const input = Math.max(Math.min(event.target.value, max), min);
    let stateObj = {};
    stateObj[field] = input;
    // input = 
    setValue(input);
    console.log(field,input,index, min, max);
    setParentState({field:field, value:input,index:index});
  }

  function convertPercentages(){
    console.log(field + "%");
    if (field === "width" || field === "left") {
      perc = false ? setValue(value/resolution[0]*100) : '';
    } else if (field === "top" || field === "height") {
      perc = false ? setValue(value/resolution[1]*100): '';
    }
  }

  return (<Fragment key={field}>
  <label htmlFor={field}>{field}: </label>
  <div>
      <Input size='sm' id={field} type="number" min={min} max={max} placeholder={`Enter ${field}`} value={value} onChange={handleChange}/>
      <Button size='s' id="percentageButton" onClick={convertPercentages}>%</Button>
  </div>
  </Fragment>)
}

export default PositionInput