import React from "react";

class Content extends React.Component {
    render(){
        return (
        <div>
            <h1>bugs</h1>
            <ul>
                <li>closing all editors will cause the window to crash</li>
            </ul>
            <h1>todo</h1>
            <ol>
                <li><strike>create icon for .md files, (different from README.md)</strike></li>
                <li>implement functionality for opening/closing files from side</li>
                <li>make open editors directory display properly</li>
                <li>close button should be diminished on non-selected editors</li>
            </ol>
        </div>
        )
    }
}

export default Content;