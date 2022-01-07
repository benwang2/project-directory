import React from 'react';
import CloseButton from './CloseButton'

const WebContent = {
    "about.js":        require("../pages/about"),
    "skills.js":       require("../pages/skills"),
    "experiences.js":   require("../pages/experiences"),
    "projects.js":     require("../pages/projects"),
    "contact.js":      require("../pages/contact")
}

class Content extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            OpenEditors: ["about.js","skills.js","experiences.js","projects.js","contact.js","__PADDING__"],
            TempEditor: [null,0],
            ActiveEditor: "about.js"
        }

        this.setActiveEditor = this.setActiveEditor.bind(this)
        this.closeEditor = this.closeEditor.bind(this)
        this.reorderTabs = this.reorderTabs.bind(this)
    }

    editorTab(src){
        if (this.state.OpenEditors.indexOf(src)) return this.setState({"ActiveEditor":src})
        if (this.state.TempEditor[0] != null)
            if ((Date().now() / 1000) - this.state.TempEditor[1] < 1){
                this.state.OpenEditors.push(src)
                this.setState({
                    "TempEditor":[null,0],
                    "ActiveEditor":src
                })
                return
            }

        this.setState({"TempEditor":[src,Date().now()/1000]})
        
    }

    closeEditor(src){
        let Index = this.state.OpenEditors.indexOf(src)

        let Editors = [...this.state.OpenEditors].filter(function(e) { return e !== src })

        this.setState({
            "OpenEditors":Editors,
            "ActiveEditor":(src === this.state.ActiveEditor) ? Editors[Math.max(0,Index-1)] : this.state.ActiveEditor,
        })
    }

    setActiveEditor(src){
        if (!this.state.OpenEditors.includes(src)) return;
        this.setState({"ActiveEditor":src})
    }

    reorderTabs(tab1, tab2){
        let tmp = [...this.state.OpenEditors]
        let [i, j] = [tmp.indexOf(tab1), tmp.indexOf(tab2)]

        console.log(tab1, tab2)
        if (tab2 === "__PADDING__"){
            tmp.splice(i,1)
            tmp.pop()
            tmp.push(tab1)
            tmp.push(tab2)
        } else {
            tmp[i] = tab2
            tmp[j] = tab1
        }

        
        this.setState({"OpenEditors":tmp})
    }

    render(){
          return (
            <div className="column">
                <EditorGroup>
                    {this.state.OpenEditors.map((name,i)=>{
                        let status = this.state.ActiveEditor === name ? "active" : "inactive"
                        return (
                            <EditorTab
                                icon="./img/svg/javascript.svg"
                                setActiveEditor={this.setActiveEditor}
                                closeEditor={this.closeEditor}
                                reorderTabs={this.reorderTabs}
                                status={status} key={i} src={name} position={i}
                            />
                        )
                    })}
                </EditorGroup>
                <Breadcrumbs/>
                <FileViewer src={this.state.ActiveEditor}/>
            </div>
        )
    }
}

class EditorGroup extends React.Component {
    render(){
        return (
            <div style={{display:"flex", minHeight:"maxContent", overflowX:"scroll", scrollbarWidth:"thin", gap:"1px"}}>
                {this.props.children}
            </div>
        )
    }
}

class EditorTab extends React.Component {
    constructor(props){
        super(props);

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);

        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)

        this.handleClick = this.handleClick.bind(this);
        this.closeTab = this.closeTab.bind(this);

        this.state = {
            "dragging":false,
            "hovering":false,
        }
    }

    handleMouseOver(e){
        this.setState({"hovering":true})
    }

    handleMouseOut(e){
        this.setState({"hovering":false})
    }

    handleDragStart(e){
        e.dataTransfer.setData("editor",this.props.src)
        e.dataTransfer.setData("position",this.props.position)
        this.handleClick(e)
        this.setState({"dragging":true})
    }

    handleDragEnd(e){
        this.setState({"dragging":false})
    }

    handleDragEnter(e){

        let editor = e.target
        if (editor.getAttribute("value")==="__PADDING__" && e.dataTransfer.getData("position") == editor.getAttribute("position")-1) return

        if ((editor.classList.contains("editorTab") && editor.classList.contains("inactive")) || editor.classList.contains("editorPadding")){
            editor.classList.toggle("inactive",false)
            editor.classList.toggle("highlighted",true)
        }
    }

    handleDragLeave(e){
        let editor = e.target
        
        if ((editor.classList.contains("editorTab") && editor.classList.contains("highlighted")) || editor.classList.contains("editorPadding")){
            editor.classList.toggle("inactive",true)
            editor.classList.toggle("highlighted",false)
        }
    }

    handleDrop(e){ 
        let editor = e.target
        if ((editor.classList.contains("editorTab") && editor.classList.contains("highlighted")) || editor.classList.contains("editorPadding")){
            this.handleDragLeave(e);
            this.props.reorderTabs(e.dataTransfer.getData("editor"),this.props.src);
        }
    }

    handleClick(e){
        this.props.setActiveEditor(this.props.src)
    }

    closeTab(e){
        this.props.closeEditor(this.props.src)
    }

    render(){
        let isPadding = this.props.src === "__PADDING__"
        let className = !isPadding ? ("editorTab " + this.props.status) : "editorPadding"
        let isDraggable = !isPadding
        let events = {}
        if (!isPadding){
            events["onClick"] = this.handleClick
            events["onDragStart"] = this.handleDragStart
            events["onDragEnd" ] = this.handleDragEnd
            events["onMouseOver"] = this.handleMouseOver
            events["onMouseOut"] = this.handleMouseOut
        }
        events["onDragEnter"] = this.handleDragEnter
        events["onDragLeave"] = this.handleDragLeave
        events["onDragOver"] = (e)=>{e.stopPropagation();e.preventDefault()}
        events["onDrop"] = this.handleDrop
        
        return (
            <div draggable={isDraggable} className={className} value={this.props.src} position={this.props.position}
                {...events}
                >
                {!isPadding && <img src={this.props.icon} alt="file extension"/>}
                {!isPadding && this.props.src}
                {!isPadding && 
                    <CloseButton onClick={this.closeTab}
                                status={(this.props.status==="active" || this.state.hovering) ? "active" : "inactive"}
                                />
                }
            </div>
        )
    }
}

class Breadcrumbs extends React.Component {
    render(){
        return (
            <div className="breadcrumbs">
                <div style={{flex:"1"}}></div>
            </div>
        )
    }
}

class FileViewer extends React.Component {
    render(){
        var Template = WebContent[this.props.src].default
        return (
            <div className="fileViewer" style={{background:"#19181A"}}>
                <Template/>
            </div>
        )
    }
}

export default Content;