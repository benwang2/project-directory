import React from 'react'
import '../index.css'
import FileSystem from './FileSystem'

class ActivityBar extends React.Component {
    render(){
        return (
            <div className="activityBar column" style={{width:"5vw"}}>
                {this.props.children}
            </div>
        )
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
            <div className={"sideBar column"+(this.state.Collapsed?" collapsed":"")}  style={{width:"20vw"}}>
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
                    <FileSystem/>
                </SideBar>   
            </div>
        )
    }
}

export default NavMenu;
