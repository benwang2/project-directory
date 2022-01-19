import React from 'react'
import CloseButton from './CloseButton';

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
    }

    render(){
        const classList = [
            "directory",
            (this.state.Collapsed ? "collapsed":"expanded"),
            (this.props.isRoot&&"root"),
            ("l"+this.props.level),
        ]

        return (
            <div className={classList.join(" ")} id={"dir/"+this.props.name}>
                <div className="directory tab" onClick={this.handleClick}>
                    <img className="collapseButton" src={process.env.PUBLIC_URL+"/img/svg/" + (this.state.Collapsed ? "collapsed.svg" : "expanded.svg")} alt=""/>
                    {this.props.name}
                </div>
                {(!this.state.Collapsed && this.props.directory) &&
                    Object.keys(this.props.directory).map((name)=>{
                        if (typeof(this.props.directory[name])==="string"){
                            let icon = name === "README.md" ? "/img/svg/readme.svg" : "/img/svg/markdown.svg"
                            return <File
                                        key={"f/"+name}
                                        name={name}
                                        icon={icon}
                                        level={this.props.level}
                                        setActiveEditor={this.props.setActiveEditor}
                                        closeEditor={this.props.closeEditor}
                                        path={this.props.path}/>
                        } else {
                            if (name !== "__PADDING__")
                                return <Directory
                                        key={"d/"+name}
                                        name={name}
                                        directory={this.props.directory[name]}
                                        level={parseInt(this.props.level)+1}
                                        setActiveEditor={this.props.setActiveEditor}/>
                        }
                    })
                }
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

        this.handleClick = this.handleClick.bind(this)
        this.closeEditor = this.closeEditor.bind(this)
    }

    handleClick(e){
        this.props.setActiveEditor(this.props.name)
    }

    closeEditor(e){
        this.props.closeEditor(this.props.name)
    }

    render(){
        const classList = ["file","l"+(this.props.level||0),[null,"navSelected","editorSelected"][this.state.Open]]
        return (<div className={classList.join(" ")} id={"file/"+this.props.name} onClick={this.handleClick}>
            {this.props.path=="open_editors"&&<CloseButton onClick={this.closeEditor} strokeWidth="1.5"/>}
            <img src={process.env.PUBLIC_URL+this.props.icon}/>
            {this.props.name}
        </div>)
    }
}

class FileSystem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ActiveEditor: "README.md",
        }
    }

    componentDidMount(){
        this.forceUpdate()
    }

    render(){
        let openEditors = {}
        this.props.openEditors.forEach(e => {openEditors[e] = this.props.files[e]})
        return(
            <div>
                <Directory name="OPEN EDITORS"
                            isRoot="true"
                            path="open_editors"
                            level="0"
                            setActiveEditor={this.props.setActiveEditor}
                            directory={openEditors}
                            closeEditor={this.props.closeEditor}
                            />
                <Directory name="PROJECT-DIRECTORY"
                            isRoot="true"
                            directory={this.props.files}
                            level="0"
                            setActiveEditor={this.props.setActiveEditor}
                            closeEditor={this.props.closeEditor}
                            />
            </div>
        )
    }
}

export default FileSystem;