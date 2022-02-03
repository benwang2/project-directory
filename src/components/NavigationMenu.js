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

        this.toggleCollapse = this.toggleCollapse.bind(this)
    }

    toggleCollapse(e){
        this.setState({"Collapsed":!this.state.Collapsed})
    }

    render(){
        return(
            <div style={{position:"relative",transition:"margin-left 0.2s",marginLeft:this.state.Collapsed?" -277px":""}}>
                <div style={{position:"absolute", left:"100%", background:"#252526",padding:".5rem"}} className="button" onClick={this.toggleCollapse}>
                    {this.state.Collapsed ? ">" : "<"}
                </div>
                <div className={"sideBar column"}  style={{width:"20vw"}}>
                    <div style={{padding:"0.75rem 2rem 0.75rem 2rem"}}>
                        <span style={{fontWeight: "400"}}>
                            EXPLORER
                        </span>
                        {/* <img src={process.env.PUBLIC_URL+"/img/svg/ellipsis.svg"} style={{float:"right",top:"50%",position:"relative"}} alt="expand"/> */}
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class NavMenu extends React.Component {
    render(){
        return(
            <div style={{display:"flex"}}>
                {/* <ActivityBar/> */}
                <SideBar>
                    <FileSystem files={this.props.files}
                        setActiveEditor={this.props.setActiveEditor}
                        openEditors={this.props.openEditors}
                        closeEditor={this.props.closeEditor}/>
                </SideBar>   
            </div>
        )
    }
}

export default NavMenu;
