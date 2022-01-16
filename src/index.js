import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import Content from './components/Editor'
import NavMenu from './components/NavigationMenu';

const Files = {
    "README.md":"https://raw.githubusercontent.com/benwang2/project-directory/master/README.md",
    "lotus.md":"https://raw.githubusercontent.com/benwang2/Lotus/master/README.md",
    "steganography.md":"https://raw.githubusercontent.com/benwang2/steganography/master/README.md",
    "ProblemSetGenerator.md":"https://raw.githubusercontent.com/benwang2/ProblemSetGenerator/main/README.md"
}

class Window extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            "OpenEditors":["__PADDING__"],
            "TempEditor": [null,0],
            "ActiveEditor": null,
            "SelectedFile": "",
        }

        this.setActiveEditor = this.setActiveEditor.bind(this)
        this.closeEditor = this.closeEditor.bind(this)
        this.reorderTabs = this.reorderTabs.bind(this)
    }

    componentDidMount(){
        function load(dir){
            let keys = Object.keys(dir);
            for (let i = 0; i < keys.length; i++){
                let key = keys[i]
                if (typeof(key) === 'object'){load(dir[key])}
                else {
                    fetch(dir[key]).then(response => response.text()).then((text) => {
                        dir[key] = text
                    });
                }
            }
        }
        load(Files);
    }

    closeEditor(src){
        let Editors = [...this.state.OpenEditors].filter(function(e) { return e !== src })

        this.setState({"OpenEditors":Editors})

        if (src === this.state.ActiveEditor)
            this.setState({"ActiveEditor": Editors[Math.max(0,this.state.OpenEditors.indexOf(src))]})
        
        if (src === this.state.TempEditor[0])
            this.setState({"TempEditor": [null, 0]}) 
    }

    setActiveEditor(src){
        if (this.state.TempEditor[0] === src && (Date.now()/1000)-this.state.TempEditor[1] < 1){
            return this.setState({
                "TempEditor":[null,0],
                "ActiveEditor":src,
            })
        }

        if (this.state.OpenEditors.includes(src))
            return this.setState({"ActiveEditor":src});

        if (this.state.TempEditor[0] == null){
            return this.setState({
                "TempEditor":[src,Date.now()/1000],
                "ActiveEditor":src,
                "OpenEditors":[...this.state.OpenEditors.slice(0,-1), src, "__PADDING__"] //  
            })
        }

        if (this.state.TempEditor[0] !== src){
            let newEditors = [...this.state.OpenEditors]
            newEditors[newEditors.indexOf(this.state.TempEditor[0])] = src
            return this.setState({
                "TempEditor":[src,Date.now()/1000],
                "ActiveEditor":src,
                "OpenEditors":newEditors
            })
        }

    }

    reorderTabs(tab1, tab2){
        let tmp = [...this.state.OpenEditors]
        let [i, j] = [tmp.indexOf(tab1), tmp.indexOf(tab2)]

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

    render() {
        return (
            <div className="window">
                <NavMenu files={Files}
                    setActiveEditor={this.setActiveEditor}
                    activeEditor={this.state.ActiveEditor}
                    openEditors={this.state.OpenEditors}
                />
                <Content files={Files}
                            setActiveEditor={this.setActiveEditor}
                            closeEditor={this.closeEditor}
                            reorderTabs={this.reorderTabs}
                            activeEditor={this.state.ActiveEditor}
                            tempEditor={this.state.TempEditor[0]}
                            openEditors={this.state.OpenEditors}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Window />,
    document.getElementById('root')
);
