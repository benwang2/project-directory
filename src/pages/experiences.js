import React from "react";

class Content extends React.Component {
    render(){
        return (
        <div >
            <h1>experiences</h1>
            <p>
                <u><a href="https://www.linkedin.com/company/sohq/" class="work-title">SOHQ</a></u> | Web Development Intern | March 2021 - August 2021<br/>
                Developed a static website for a small business.
            </p>
            <p>
                <u><a href="https://www.linkedin.com/company/puddleinc/" class="work-title">Puddle</a></u> | Backend Engineer | April 2021 - Present<br/>
                Developed the backend for a data analytics service using Flask, AWS S3, and MongoDB. Implemented logins, sessions, and multithreading to optimize data processing.
            </p>
        </div>
        )
    }
}

export default Content;