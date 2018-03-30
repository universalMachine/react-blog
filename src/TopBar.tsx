import * as React from "react"
import { Component } from 'react';
import { Link } from 'react-router-dom';
import  Loadable from 'react-loadable';
class TopBar extends Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={
            isCollapse: false
        }
    }

    onToggleCollapse=()=>{
        this.setState({
            isCollapse:!this.state.isCollapse
        })
    }
    render(){
        return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <Link className="navbar-brand" to={"/"}>JavaWeb</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={this.onToggleCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            {/*<a className="nav-link" href="#">首页 <span className="sr-only">(current)</span></a>*/}
                            <Link className="text-white" to="/board">首页</Link>
                        </li>
                   {/*     <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>*/}
                    </ul>
                   {/* <form className="form-inline mt-2 mt-md-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>*/}
                </div>
            </nav>
        </header>
        )
    }
}

export default TopBar