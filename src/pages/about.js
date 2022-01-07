import React from "react";

class Content extends React.Component {
    render(){
        return (
            <div className='foo'>
                <h1>about me</h1>
                <p> 
                    Hey, I'm <span style={{color:"#cebc81"}}>Ben Wang</span>, a sophomore at Rutgers University studying <span style={{color:"#cebc81"}}>Computer Science</span>.
                    I'm a well-rounded amateur developer with lots of informal experience. I enjoy realizing whatever whimsical and novel ideas I can come up with.
                    <br/><br/>

                    My goal is to use my unique skill set to create tools, software, and devices to make our everyday lives easier, more organized, and more enjoyable.
                    I am a passionate individual constantly in the pursuit of knowledge and new experiences.
                    <br/><br/>

                    Currently, I am making web apps and learning about Android application development as an accelerator at <a href="https://rumad.club/" style={{color:"#f22c50"}}>RUMAD</a>.
                    However, in the past, I have dabbled in game development and creating software using Java and Golang.

                    <br/><br/>
                    See me on <a style={{color:"#cebc81", fontWeight: "500"}} href="https://github.com/benwang2" aria-label="See me on GitHub">GitHub</a> and <a aria-label="See me on LinkedIn" style={{color:"#cebc81", fontWeight: "500"}} href="https://www.linkedin.com/in/benjamin-wang-5240001b0/">LinkedIn</a>.
                    <br/><br/>
                </p>
            </div>
        )
    }
}

export default Content;