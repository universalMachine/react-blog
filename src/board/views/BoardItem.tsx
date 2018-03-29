import { Component } from 'react';
import * as React from "react"


class BoardItem extends Component<any,any>{
    constructor(props:any){
        super(props)
    }
    render(){
        const {title,content,createTime,itemOnClick,deleteBoard,boardId} = this.props
        return(
            <div className="card mb-3" onClick={itemOnClick}>
                <div className="card-header">
                    {title}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={(event)=>{event.stopPropagation();deleteBoard(boardId)}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="card-body d-flex flex-column align-items-start mb-3 bg-white" >
                    {/*<strong className="d-inline-block mb-2 text-primary">World</strong>*/}
                   {/* <h3 className="mb-0">
                        <a className="text-dark">{title}</a>
                    </h3>*/}
                    <div className="mb-1 text-muted">{createTime}</div>
                    <p className="card-text mb-auto">{content}</p>
                   {/* <a href="#">Continue reading</a>*/}
                </div>
            </div>
        )
    }

}


export default BoardItem