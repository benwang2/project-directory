import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import Content from './components/Editor'
import NavMenu from './components/NavigationMenu';

class Window extends React.Component {
    render() {
        return (
            <div className="window">
                <NavMenu/>
                <Content/>
            </div>
        );
    }
}

ReactDOM.render(
    <Window />,
    document.getElementById('root')
);
