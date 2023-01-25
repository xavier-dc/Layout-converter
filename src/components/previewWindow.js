import '../App.css'
import React from 'react';

const px = "px"

function PreviewWindow(props){
    const {positions, scale, resolution} = props;

    return(
        <div>

        <div className="previewWindowWrapper" style={{width:resolution[0]*scale+px, height:resolution[1]*scale+px}}>
            {positions.map(element=>{
                let layer = positions.indexOf(element);
                let elementPositions = {};
                Object.entries(element).forEach(([key,val], i)=>{
                    if(key === "hidden"){
                        elementPositions[key] = val; 
                        return
                    };
                    elementPositions[key] = val * scale + px
                })
                return <PreviewElement key={layer} layer={layer} {...elementPositions}/>
            })}
        </div>
    </div>
    );
}

const layerColors = ["red","orange","yellow","green","blue","indigo","violet", "pink", "gray"]
    
function PreviewElement(props){
    const {layer, width, height, top, left, hidden} = props;
    
    return (<div id={`element${layer}`} className="previewElement" style={{marginLeft:left, marginTop:top, width:width, height:height, borderStyle:hidden?"dashed":"solid", background:layerColors[layer], opacity:hidden?0.4:0.8}}>{layer+1}</div>)
}

export default PreviewWindow;