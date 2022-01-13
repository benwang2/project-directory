import React from 'react'

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
                <div class="directory tab" onClick={this.handleClick}>
                    <img className="collapseButton" src={process.env.PUBLIC_URL+"/img/svg/" + (this.state.Collapsed ? "collapsed.svg" : "expanded.svg")} alt=""/>
                    {this.props.name}
                </div>
                {(!this.state.Collapsed && this.props.directory) &&
                    Object.keys(this.props.directory).map((name)=>{
                        if (typeof(this.props.directory[name])==="string"){
                            let icon = name == "README.md" ? "/img/svg/readme.svg" : "/img/svg/markdown.svg"
                            return <File name={name} icon={icon} level={this.props.level} setActiveEditor={this.props.setActiveEditor}/>
                        } else {
                            return <Directory name={name} directory={this.props.directory[name]} level={parseInt(this.props.level)+1} setActiveEditor={this.props.setActiveEditor}/>
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
    }

    handleClick(e){
        this.props.setActiveEditor(this.props.name)
    }

    render(){
        const classList = ["file","l"+(this.props.level||0),[null,"navSelected","editorSelected"][this.state.Open]]
        // const style = (this.props.name==="README.md"?{"padding":"2px"}:{})
        return (<div className={classList.join(" ")} id={"file/"+this.props.name} onClick={this.handleClick} >
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
        return(
            <div>
                <Directory name="OPEN EDITORS" isRoot="true" path="open_editors" directory={this.props.openEditors} level="0" setActiveEditor={this.props.setActiveEditor}/>
                <Directory name="PROJECT-DIRECTORY" isRoot="true" directory={this.props.files} level="0" setActiveEditor={this.props.setActiveEditor}/>
            </div>
        )
    }
}

export default FileSystem;