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
            Collapsed: false,
            Directories: [],
            Files: [],
        }
    }

    render(){
        const classList = ["directory","collapsed",(this.props.isRoot?"root":"l1")]
        return (
            <div className={classList.join(" ")}>
                <div class="directory tab">
                    <img className="collapseButton" src={"/img/svg/" + (this.state.Collapsed ? "collapsed.svg" : "expanded.svg")} alt=""/>
                    {this.props.name}
                </div>
                {this.state.Directories.map((name,i)=>{
                    return (<Directory name={name.split("/").pop()}/>)
                })}
                <File name="asdf" level="0"/>
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
        const classList = ["file",["l0","l1","l2"][this.props.level],[null,"navSelected","editorSelected"][this.state.Open]]
        return (<div className={classList.join(" ")}>
            <img src={this.props.icon}/>
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
                    <img src="./img/svg/ellipsis.svg" style={{float:"right",top:"50%",position:"relative"}} alt="expand"/>
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
                    <Directory name="PROJECT-DIRECTORY" isRoot="true" path="/src/directory">

                    </Directory>
                </SideBar>   
            </div>
        )
    }
}

export default NavMenu;
