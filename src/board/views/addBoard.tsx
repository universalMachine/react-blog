import * as React from "react"
import { Component, FormEvent } from 'react';
import { Board } from '../Board';
import { addBoard, resetBoardAddStatus } from '../actions';
import { connect } from 'react-redux';
import { BOARD_ADD_FAIL, BOARD_ADD_SUCCESS } from '../actionTypes';
import ModalItem from '../../component/ModalItem';
import FeedBackItem from '../../component/FeedBackItem';


class AddBoard extends Component<any,any>{

    constructor(props:any){
        super(props)
        console.dir(props)
        this.state = {
            board:{
                boardName: "",
                boardDesc: ""
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
        event.preventDefault()

        const {name,value} = event.currentTarget

        this.setState({
            board:{
                ...this.state.board,
                [name]: value
        }})



    }

    closeFailModal=()=>{
        this.setState({
            isFailModalShow: false
        })
    }

    componentWillReceiveProps(nextProps: any){
        console.debug("componentWillReceiveProps")
        if(nextProps.storeState.addStatus == BOARD_ADD_FAIL){
            //this.state.history.push("/login")
            this.setState({
                isFailModalShow: true,
                isTipVisable: true,
                addStatus: "fail",
                returnMessage: nextProps.storeState.addMessage
            })
        }
        if(nextProps.storeState.addStatus == BOARD_ADD_SUCCESS){
            this.setState({
                isFailModalShow: false,
                isTipVisable: true,
                addStatus: "success",
                returnMessage: nextProps.storeState.addMessage
            })
        }

    }


    render() {
        const {onSubmit} = this.props




        return (
            <div>
                <FeedBackItem isVisible={this.state.isTipVisable} failMessage={this.state.returnMessage} successMessage={this.state.returnMessage} status={this.state.addStatus} />
              {/*  <ModalItem isShow={this.state.isFailModalShow} content="添加失败，是否要登录？" onClose={this.closeFailModal}
                           leftBtnContent="是的"
                           rightBtnContent="不要" rightClick={this.closeFailModal} leftClick={this.navToLogin}/>*/}
                <div className="container mt-4 pb-3 ">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">版块名称</label>
                        <input className="form-control" id="exampleFormControlInput1" name="boardName"
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">版块描述</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}
                                  placeholder="这是一个有趣的版块哦！" name="boardDesc" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="text-center">
                        <button className="w-25-up-sm w-75-down-sm btn btn-success" onClick={() => onSubmit(this.state.board)}>增加版块
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

    const mapDispathToProps = (dispatch:any,ownProps:any)=>({
        onSubmit: (board:Board)=>{
            dispatch(addBoard(board))
        },
        resetAddStatus:()=>{
            dispatch(resetBoardAddStatus())
        },

    })

const mapStateToProps = (state:any,ownProps:any)=>({
    history: ownProps.history,
    storeState: state.board

})

export default connect(mapStateToProps,mapDispathToProps)(AddBoard)
