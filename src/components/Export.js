import React from 'react';
import {download} from '../utils';
const Export = (props) => {
    let { rawPositions, resolution } = props;
    let fileName;
    let matrixes = []; //Create empty array to store all the matrixes

    const exportTovMix = () => {
      fileName = prompt("Choose a filename");
      if(!fileName || fileName.length < 3) return alert("file name must be at least three characters");
      
      // for (let i=0; i < 10; i++){ //Loop through all 10 possible Layers, fill in the matrixes array
      //   matrixes.push( buildMatrix( buildMatrixObj(rawPositions[i], resolution) ) )
      // }
      // let targetXML = combineMatrixes(matrixes)
      
      // download(fileName, targetXML)
      download(fileName, combineMatrixes([...Array(10)].map((x,i)=>{
        return buildMatrix(buildMatrixObj(rawPositions[i], resolution))
      })))
    }

    return (
        <div>
            <input id="exportButton" type="button" value="Export" style={{fontSize: '2em'}} onClick={exportTovMix} />
        </div>
    )
}

function buildMatrixObj(positions, resolution){
  if(!positions) return {zoomX:0,zoomY:0,cropLeft:0,cropRight:1, panX:0, panY:0,hidden:true};
  
  const {left:x, top:y, height:h, width:w, hidden=false} = positions;
  const [frameWidth, frameHeight] = resolution;

  const zoomX = (h/frameHeight)
  const zoomY = zoomX

  const cropLeft = ((((frameWidth*zoomX) - w) / (frameWidth*zoomX))/2);
  const cropRight = (1-cropLeft);
  const panX = ((x+(w/2))-(frameWidth/2))/(frameWidth/2);
  const panY = -((y+(h/2))-(frameHeight/2))/(frameHeight/2);

  return {hidden:hidden,cropLeft:cropLeft, cropRight:cropRight, panX:panX, panY:panY, zoomX:zoomX, zoomY:zoomY}

}

function buildMatrix(matrixObj){
  console.log(matrixObj);
  const {hidden, cropLeft, cropRight, zoomX, zoomY, panX, panY} = matrixObj;
  let matrix = 
`  <MatrixPosition>
    <Hidden>${hidden}</Hidden>
    <Clipping>
      <float>${cropLeft.toFixed(4)}</float>
      <float>0</float>
      <float>${cropRight.toFixed(4)}</float>
      <float>1</float>
    </Clipping>
    <Border>
      <Enabled>false</Enabled>
      <Thickness>0</Thickness>
      <Radius>0</Radius>
      <ColourHTML>White</ColourHTML>
    </Border>
    <Mirror>false</Mirror>
    <ZoomX>${zoomX.toFixed(4)}</ZoomX>
    <ZoomY>${zoomY.toFixed(4)}</ZoomY>
    <PostZoomX>1</PostZoomX>
    <PostZoomY>1</PostZoomY>
    <RotateOrigin>
      <X>0</X>
      <Y>0</Y>
      <Z>0</Z>
    </RotateOrigin>
    <Rotate>
      <X>0</X>
      <Y>0</Y>
      <Z>0</Z>
    </Rotate>
    <PanX>${panX.toFixed(4)}</PanX>
    <PanY>${panY.toFixed(4)}</PanY>
  </MatrixPosition>`     
  return matrix;
}

function combineMatrixes(matrixes){
  let targetXML = 
`<?xml version="1.0" encoding="utf-16"?>
  <ArrayOfMatrixPosition xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
${matrixes.join('\n')}
</ArrayOfMatrixPosition>`
  return new DOMParser().parseFromString(targetXML,"text/xml").children[0].outerHTML;
}

export default Export;