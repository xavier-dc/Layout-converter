import React, { useState } from 'react';
import Form from './components/form';
import PreviewWindow from './components/previewWindow';
import ScalingButtons from './components/ScalingButtons';
import Export from './components/Export.js'
import './App.css';
import ClassContextComponent from './ClassContextComponent';
import FunctionContextComponent from './FunctionContextComponent';
import ParseExcel from './components/ParseExcel';

//import Google Sheets implementation

export const ThemeContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkTheme: true,
      layers: 1,
      rawPositions:[],
      scale: 0.15,
      resolution: [1920, 1080]
    };
    this.setRawPositions = this.setRawPositions.bind(this);
    this.addNewLayer = this.addNewLayer.bind(this);
    this.setScale = this.setScale.bind(this);
    this.removeLayer = this.removeLayer.bind(this);
    this.setResolution = this.setResolution.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  addNewLayer(props){
    this.setState({layers:this.state.layers+1});
  }

  removeLayer(props){
    this.state.rawPositions.pop(this.state.rawPositions.length);
    this.setState({layers:this.state.layers-1});
  }

  setResolution(props) {
    this.setState({resolution: props});
  }

  setScale(increase){
    const scaleStep = 1.1;
    if(increase){
      this.setState({scale:this.state.scale*scaleStep})
      return;
    }
    this.setState({scale:this.state.scale/scaleStep})
  }

  setRawPositions(props){
    let {field, value, index} = props;
    index = index-1;
    let newPositions = {};
    newPositions[field] = value;
    this.setState((prevState)=>{
      let tempPositions = [...prevState.rawPositions];
      tempPositions[index] = {...tempPositions[index],...newPositions};
      // tempPositions.splice(index, 1);

      return {...prevState, rawPositions: tempPositions}
    })
  }

  toggleTheme() {
    this.setState({darkTheme: !this.state.darkTheme});
  }
  
  render() {
    return (
      <>
          <ThemeContext.Provider value={this.state.darkTheme}>
            <div className="App">
              <h2 style={{fontSize: '2.5em'}}>LAYOUT BUILDER</h2>
              <ScalingButtons scale={this.state.scale} setScale={this.setScale}/>
              <PreviewWindow positions={this.state.rawPositions} scale={this.state.scale} resolution={this.state.resolution}></PreviewWindow>
              {this.state.rawPositions.length===0 ? <p style={{opacity: '50%'}}>Enter element dimensions of below...</p> : null}
              <Form layers={this.state.layers} addNewLayer={this.addNewLayer} setParentState={this.setRawPositions} removeLayer={this.removeLayer} setResolution={this.setResolution} resolution={this.state.resolution}></Form>
              {/* <button className="submitButton" onClick={applyStyleToPreviewElement}>Submit</button> */}
              <br></br>
              <Export rawPositions={this.state.rawPositions} resolution={this.state.resolution}></Export>
              <button onClick={this.toggleTheme}>Toggle Theme</button>
            </div>
            <FunctionContextComponent />
            <ClassContextComponent />
          </ThemeContext.Provider>
          <br></br>
          <br></br>
        <ParseExcel />
      </>
    );
  }
}

export default App;