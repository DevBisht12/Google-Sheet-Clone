import React from 'react';
import '../Style/colorPicker.css';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
    state = {
        background: '#fff',
      };
    
      handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
        console.log(this.state.background);
      };
      

  render() {
    return <SketchPicker/>;
  }
}


export default ColorPicker;