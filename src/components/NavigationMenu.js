import React from 'react'
import '../index.css'

class ActivityBar extends React.Component {
    render(){
        return (
            <div className="activityBar column">
                {this.props.children}
            </div>
        )
    }
}

class Directory extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            Collapsed: this.props.Collapsed?true:false,
            Directories: [],
            Files: [],
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        this.setState({"Collapsed": !this.state.Collapsed});
        this.props.setSelected(this);
    }

    render(){
        const classList = ["directory",(this.state.Collapsed ? "collapsed":""),(this.props.isRoot?"root":"l1")]
        return (
            <div className={classList.join(" ")}>
                <div class="directory tab" onClick={this.handleClick}>
                    <img className="collapseButton" src={process.env.PUBLIC_URL+"/img/svg/" + (this.state.Collapsed ? "collapsed.svg" : "expanded.svg")} alt=""/>
                    {this.props.name}
                </div>
                {!this.state.Collapsed&&this.props.children}
            </div>
        )
    }
}

class File extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            Open: 0,    // 1: Selected from navmenu, 2: Selected from editor
        }
    }

    render(){
        const classList = ["file","l"+(this.props.level||0),[null,"navSelected","editorSelected"][this.state.Open]]
        return (<div className={classList.join(" ")}>
            <img src={process.env.PUBLIC_URL+this.props.icon}/>
            {this.props.name}
        </div>)
    }
}

class SideBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Collapsed: false,
            Folders: [],
            Files: [],
        }
    }

    render(){
        return(
            <div className={"sideBar column"+(this.state.Collapsed?" collapsed":"")}>
                <div style={{padding:"0.75rem 2rem 0.75rem 2rem"}}>
                    <span style={{fontWeight: "400"}}>
                        EXPLORER
                    </span>
                    <img src={process.env.PUBLIC_URL+"/img/svg/ellipsis.svg"} style={{float:"right",top:"50%",position:"relative"}} alt="expand"/>
                </div>
                {this.props.children}
            </div>
        )
    }
}

class NavMenu extends React.Component {
    render(){
        return(
            <div style={{display:"flex"}}>
                <ActivityBar/>
                <SideBar>
                    <Directory name="OPEN EDITORS" isRoot="true" path="open_editors"/>
                    <Directory name="PROJECT-DIRECTORY" isRoot="true">
                        <Directory name="src">
                            <File name="README.md" level="1" icon="/img/svg/readme.svg"/>
                        </Directory>
                        <File name="README.md" icon="/img/svg/readme.svg"/>
                    </Directory>
                </SideBar>   
            </div>
        )
    }
}

export default NavMenu;
