import React from 'react'

const Files = {
    "src":{
        "README.md":"https://raw.githubusercontent.com/benwang2/Lotus/master/README.md"
    },
    "lotus.md":"https://raw.githubusercontent.com/benwang2/Lotus/master/README.md",
    "steganography.md":"https://raw.githubusercontent.com/benwang2/steganography/master/README.md"
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
        const classList = [
            "directory",
            (this.state.Collapsed ? "collapsed":"expanded"),
            (this.props.isRoot&&"root"),
            ("l"+this.props.level),
        ]

        return (
            <div className={classList.join(" ")}>
                <div class="directory tab" onClick={this.handleClick}>
                    <img className="collapseButton" src={process.env.PUBLIC_URL+"/img/svg/" + (this.state.Collapsed ? "collapsed.svg" : "expanded.svg")} alt=""/>
                    {this.props.name}
                </div>
                {(!this.state.Collapsed && this.props.directory) &&
                    Object.keys(this.props.directory).map((path)=>{
                        if (typeof(this.props.directory[path])==="string"){
                            return <File name={path} icon="/img/svg/readme.svg" level={this.props.level}/>
                        } else {
                            return <Directory name={path} directory={this.props.directory[path]} level={parseInt(this.props.level)+1}/>
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
    }

    render(){
        const classList = ["file","l"+(this.props.level||0),[null,"navSelected","editorSelected"][this.state.Open]]
        return (<div className={classList.join(" ")}>
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
    render(){
        return(
            <div>
                <Directory name="OPEN EDITORS" isRoot="true" path="open_editors" level="0"/>
                <Directory name="PROJECT-DIRECTORY" isRoot="true" directory={Files} level="0"/>
            </div>
        )
    }
}

export default FileSystem;