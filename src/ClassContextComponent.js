import React, {Component} from 'react';
import { ThemeContext } from './App';

export default class ClassContextComponent extends Component {
    themeStyles(dark) {
        return {
            backgroundColor: dark ? '#333' : '#CCC',
            color: dark ? '#CCC' : '#333',
        };
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {darkTheme => {
                    return <div style={this.themeStyles(darkTheme)}>Dark Theme</div>
                }}
            </ThemeContext.Consumer>
        )
    }
}