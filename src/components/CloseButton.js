import React from 'react';

class CloseButton extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this)
        this.handleDragStart = this.handleDragStart.bind(this)
    }

    handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();

        this.props.onClick(this);
    }

    handleDragStart(e){
        e.preventDefault()
        e.stopPropagation()
    }

    render(){
        const buttonStyle = {
            active:{},
            inactive:{visibility:"hidden",zindex:1},
        }[this.props.status]
        return (
            <img src="/img/svg/close.svg" alt="" className="closeButton" style={buttonStyle} onClick={this.handleClick} onDragStart={this.handleDragStart}/>
        )
    }
}

export default CloseButton;