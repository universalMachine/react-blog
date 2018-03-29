import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { deleteTopic } from '../actions';

class TopicItem extends Component<any,any>{

    constructor(props:any) {
        super(props);
        this.state ={
           contentHtml : {__html:this.props.content}
        }
    }
    createContentHtml=()=>{
        return {__html:this.props.content}
    }

     deleteItem =(e:any)=>{
        e.stopPropagation();
         this.props.deleteTopic(this.props.topicId)
    }
    render(){
        const {title,content,createTime,itemOnClick,topicId,deleteTopic} = this.props
        return(
            <div className="card mb-3" onClick={itemOnClick}>
                <div className="card-header">
                    {title}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={this.deleteItem}>
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
    deleteTopic: (topicId: number) => {
        dispatch(deleteTopic(topicId))
    }
})


export default TopicItem