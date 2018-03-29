import * as React from 'react'
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './BreadcrumbItem.scss'

interface Path{
    pathName: string,
    pathUrl?: string,
    pathLocation?: any
    isCurrentPage?: boolean
}

interface props{
    originPath:any
    addPath: any,
    getPath? : (any:any)=>any
}



class BreadcrumbItem extends Component<props,any>{
    constructor(props:any){
        super(props)
        this.state={
            pathList: this.props.originPath.map((path:Path)=>({...path,isCurrentPage:false})).concat(this.props.addPath)
        }

        if(this.props.getPath){

            this.props.getPath(this.state.pathList)
        }

    }



    render(){

        return(
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" ><Link to={"/"}>首页</Link></li>

                    {

                        this.state.pathList.map((path:any,index:any)=><li key={index} className={"breadcrumb-item "+ (path.isCurrentPage?"current":"")}><Link to={path.pathLocation?path.pathLocation:path.pathUrl}>{path.pathName}</Link></li>)
                    }
                </ol>
            </nav>
        )
    }
}

export default BreadcrumbItem