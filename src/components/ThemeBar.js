import React from 'react';
import ThemeContext from '../theme-context';

class ThemeBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ThemeContext.Consumer>
                {(theme) => {
                    console.log(theme)
                }}
            </ThemeContext.Consumer>
        )
    }
}
export default ThemeBar;