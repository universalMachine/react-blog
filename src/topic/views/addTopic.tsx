import * as React from "react"
import { Component, FormEvent } from 'react';

import { addTopic } from '../actions';
import { connect } from 'react-redux';
import { TOPIC_FETCH_FAIL, TOPIC_FETCH_SUCCESS, TOPIC_FETCH, TOPIC_ADD_FAIL, TOPIC_ADD_SUCCESS } from '../actionTypes';
import ModalItem from '../../component/ModalItem';
import FeedBackItem from '../../component/FeedBackItem';
import SimpleQuillEditor from '../../editor/views/SimpleQuillEditor';
import { tryCatch } from 'rxjs/util/tryCatch';


class AddTopic extends Component<any,any>{

    constructor(props:any){
        super(props)
        console.dir(props)
        this.state = {
            topic:{
                mainPost:{
                    postTitle: "",
                    postText: ""
                },
                boardId: this.props.boardId
            },
            history: this.props.history,
            isFailModalShow: false,
            isTipVisable: false,
            returnMessage: "",
            addStatus: "default"
        }
        this.props.resetAddStatus()

        //console.error("new addBoard")
        this.handleChange.bind(this)
        this.closeFailModal.bind(this)
        this.navToLogin.bind(this)
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
            topic:{
                ...this.state.topic,
                mainPost:{
                    ...this.state.topic.mainPost,
                    [name]: value
                }

        }})



    }

    closeFailModal=()=>{
        this.setState({
            isFailModalShow: false
        })
    }

    componentWillReceiveProps(nextProps: any){
        console.debug("componentWillReceiveProps")
        if(nextProps.storeState.addStatus == TOPIC_ADD_FAIL){
            //this.state.history.push("/login")
            this.setState({
                isFailModalShow: true,
                isTipVisable: true,
                addStatus: "fail",
                returnMessage: nextProps.storeState.addMessage
            })
        }
        if(nextProps.storeState.addStatus == TOPIC_ADD_SUCCESS){
            this.setState({
                isFailModalShow: false,
                isTipVisable: true,
                addStatus: "success",
                returnMessage: nextProps.storeState.addMessage
            })
        }

    }

    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
        //console.dir(nextProps)
        //console.dir(nextState)
        return false;

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
                <div className="container mt-4 ">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">帖子名称</label>
                        <input className="form-control" id="exampleFormControlInput1" name="postTitle"
                               onChange={this.handleChange}/>
                    </div>
                 {/*   <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">帖子内容</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}
                                  placeholder="分享有趣的发现啦！" name="postText" onChange={this.handleChange}></textarea>
                    </div>*/}
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">帖子内容</label>
                        <SimpleQuillEditor name="postText" placeholder="分享有趣的发现啦" handleChange={this.handleChange}/>
                    </div>
                    <div className="text-center">
                        <button className="w-25 btn btn-success" onClick={() => onSubmit(this.state.topic)}>发布帖子
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

    const mapDispathToProps = (dispatch:any,ownProps:any)=>({
        onSubmit: (topic:any)=>{
            dispatch(addTopic(topic))
        },
        resetAddStatus:()=>{
            //dispatch(resetTopicAddStatus())
        },

    })

const mapStateToProps = (state:any,ownProps:any)=>({
    history: ownProps.history,
    storeState: state,
    boardId : ownProps.boardId

})

export default connect(mapStateToProps,mapDispathToProps)(AddTopic)
