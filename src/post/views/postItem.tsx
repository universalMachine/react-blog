import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { deletePost } from '../actions';

class PostItem extends Component<any,any>{

    constructor(props:any) {
        super(props);
        this.state ={
           contentHtml : {__html:this.props.content}
        }
    }
    createContentHtml=()=>{
        return {__html:this.props.content}
    }


    render(){
        const {title,content,createTime,itemOnClick,postId,deleteItem,item} = this.props
        //console.log(postId)
        return(
            <div className="card mb-3" onClick={itemOnClick}>
                <div className="card-header">
                    {`#${item.replyFloor}楼`}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={()=>deleteItem(postId)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="card-body d-flex flex-column align-items-start mb-3 bg-white" >
                    {/*<strong className="d-inline-block mb-2 text-primary">World</strong>*/}
                    {/* <h3 className="mb-0">
                        <a className="text-dark">{title}</a>
                    </h3>*/}
                    <div className="mb-1 text-muted">{createTime}</div>
                    <p className="card-text mb-auto" dangerouslySetInnerHTML={this.state.contentHtml}></p>
                    {/* <a href="#">Continue reading</a>*/}
                </div>
            </div>
        )
    }
}
const mapDispatchToProps= (dispatch:Dispatch<AnyAction>)=>({
    deleteTopic: (postId: number) => {
        dispatch(deletePost(postId))
    }
})


export default PostItem