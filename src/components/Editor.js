import React from 'react';
import CloseButton from './CloseButton'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'

const WebContent = {
    "about.js":        require("../pages/about"),
    "bugs.js":       require("../pages/bugs"),
}

class Content extends React.Component {
    constructor(props){
        super(props)

        this.setActiveEditor = this.props.setActiveEditor
        this.closeEditor = this.props.closeEditor
        this.reorderTabs = this.props.reorderTabs
    }

    render(){
        return (
            <div className="column">
                <EditorGroup>
                    {this.props.openEditors.map((name,i)=>{
                        let status = this.props.activeEditor === name ? "active" : "inactive"
                        return (
                            <EditorTab
                                icon="/img/svg/javascript.svg"
                                setActiveEditor={this.setActiveEditor}
                                closeEditor={this.closeEditor}
                                reorderTabs={this.reorderTabs}
                                status={status} key={i} src={name} position={i}
                            />
                        )
                    })}
                </EditorGroup>
                <FileViewer src={this.props.activeEditor} files={this.props.files}/>
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
                {!isPadding && <img src={process.env.PUBLIC_URL+this.props.icon} alt="file extension"/>}
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

class FileViewer extends React.Component {
    render(){        
        return (
            <div className="fileViewer" style={{background:"#19181A"}}>
                <ReactMarkdown children={this.props.files[this.props.src]}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw,rehypeSanitize]}
                />
            </div>
        )
    }
}

export default Content;