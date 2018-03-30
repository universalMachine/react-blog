import * as React from "react"
import { Component, FormEvent } from 'react';
import { addPost } from '../actions';
import { connect } from 'react-redux';
import { POST_FETCH_FAIL, POST_FETCH_SUCCESS, POST_FETCH, POST_ADD_FAIL, POST_ADD_SUCCESS } from '../actionTypes';
import ModalItem from '../../component/ModalItem';
import FeedBackItem from '../../component/FeedBackItem';
import SimpleQuillEditor from '../../editor/views/SimpleQuillEditor';
import { tryCatch } from 'rxjs/util/tryCatch';


class AddPost extends Component<any,any>{

    constructor(props:any){
        super(props)
        console.dir(props)
        this.state = {
            post:{
                postTitle:"",
                postText:"",
                topicId: this.props.addId
            },
            history: this.props.history,
            isFailModalShow: false,
            isTipVisable: false,
            returnMessage: "",
            addStatus: "default",
            isClearContent: false
        }
        this.props.resetAddStatus()

        //console.error("new addBoard")

        this.closeFailModal.bind(this)

    }



    closeFailModal=()=>{
        this.setState({
            isFailModalShow: false
        })
    }

    componentWillReceiveProps(nextProps: any){

        console.debug("componentWillReceiveProps")
        if(nextProps.postState.addStatus == POST_ADD_FAIL){
            //this.state.history.push("/login")
            this.setState({
                isFailModalShow: true,
                isTipVisable: true,
                addStatus: "fail",
                returnMessage: nextProps.postState.addMessage
            })
        }
        if(nextProps.postState.addStatus == POST_ADD_SUCCESS){

            this.setState({
                isFailModalShow: false,
                isTipVisable: true,
                addStatus: "success",
                returnMessage: nextProps.postState.addMessage,
                isClearContent:true
            })

        }

    }

    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
        //console.dir(nextProps)
        //console.dir(nextState)
      return true;

    }


    resetClearContent = ()=>{
        this.setState({
            ...this.state,
            isClearContent: false
        })
    }

    navToLogin = ()=>{
        this.state.history.push("/login")
    }

     handleChange=(event:any)=>{
        //console.dir(this)

        if(event && event.preventDefault)
            event.preventDefault()
        // console.dir(event)
        const {name,value} = event.currentTarget

        this.setState({
            post:{
                ...this.state.post,
                [name]: value
            }})



    }



    render() {
        console.log("render")
        const {onSubmit} = this.props

        return (
            <div>
                <FeedBackItem isVisible={this.state.isTipVisable} failMessage={this.state.returnMessage} successMessage={this.state.returnMessage} status={this.state.addStatus} />
              {/*  <ModalItem isShow={this.state.isFailModalShow} content="添加失败，是否要登录？" onClose={this.closeFailModal}
                           leftBtnContent="是的"
                           rightBtnContent="不要" rightClick={this.closeFailModal} leftClick={this.navToLogin}/>*/}
                <div className="container mt-4 pb-3 ">
                  {/*  <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">帖子名称</label>
                        <input className="form-control" id="exampleFormControlInput1" name="postTitle"
                               onChange={this.handleChange}/>
                    </div>*/}
                 {/*   <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">帖子内容</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}
                                  placeholder="分享有趣的发现啦！" name="postText" onChange={this.handleChange}></textarea>
                    </div>*/}
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">评论内容</label>
                        <SimpleQuillEditor name="postText" placeholder="分享有趣的评论哦" handleChange={(event:any)=>this.props.handleChange(event,this)} isClearContent={this.state.isClearContent} resetClearContent={this.resetClearContent.bind(this)}/>
                    </div>
                    <div className="text-center">
                        <button className="w-25-up-sm w-75-down-sm btn btn-success" onClick={() => onSubmit(this.state.post)}>发布评论
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


    const mapDispathToProps = (dispatch:any,ownProps:any)=>{


       const handleChange=(event:any,_this:any)=>{
            console.dir(this)

            if(event && event.preventDefault)
                event.preventDefault()
            // console.dir(event)
            const {name,value} = event.currentTarget

            _this.setState({
                post:{
                    ..._this.state.post,
                    [name]: value


                }})



        }

    return {
        onSubmit: (post:any)=>{
            dispatch(addPost(post))
        },
        resetAddStatus:()=>{
            //dispatch(resetPostAddStatus())
        },
        handleChange: handleChange

    }}

const mapStateToProps = (state:any,ownProps:any)=>({
    history: ownProps.history,
    postState: state.post,
    boardId : ownProps.addId

})

export default connect(mapStateToProps,mapDispathToProps)(AddPost)
