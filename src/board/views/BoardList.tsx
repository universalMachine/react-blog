import * as React from "react"
import { Component } from 'react';
import * as ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import * as ListGroup from 'react-bootstrap/lib/ListGroup';
import BoardItem from './BoardItem';
import { connect, Dispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { deleteBoard, fetchBoard, initPageInfo } from '../actions';
import PageInfo from '../../constant/PageInfo';
import InfinityScroll from '../../component/InfinityScroll';
import { navToUrl, navWithLocation } from '../../constant/nav';
import { formatDate } from '../../constant/time';
import BreadcrumbItem from '../../component/BreadcrumbItem';



class BoardList extends Component<any,any>{

    constructor(props:any){
        super(props)
        this.state={
            pageInfo :{
                pageNum: 0,
                pageSize: 5

            }
        }

        this.fetchNextPage.bind(this)

    }

     fetchNextPage=()=>{
        const {store} = this.props
        this.props.fetchBoards({pageNum:store.pageInfo.pageNum+1,
            pageSize:store.pageInfo.pageSize})
    }

    componentDidMount(){
        console.log("didmount")
        if(this.isBoardEmpty()){
            this.props.initPageInfo(this.state.pageInfo)
            this.props.fetchBoards({...this.state.pageInfo,pageNum:this.state.pageInfo.pageNum+1})
        }

    }

     isBoardEmpty(){
        console.log("is Board Empty?")
        return this.props.store.boards.length == 0
    }
    render(){
        const {store,history,deleteBoard}= this.props

        return(
           <div>
               <BreadcrumbItem originPath={[]} addPath={[{pathName:"版块",pathUrl:"/board",isCurrentPage:true}]} />
               <InfinityScroll fetchNextPage={this.fetchNextPage} data={store.fetchResult} fetchStatus={store.fetchStatus}>
               {

                   store.boards.map(
                       (board: any)=> {return <BoardItem key={board.boardId} boardId={board.boardId} deleteBoard={deleteBoard} title={board.boardName} content={board.boardDesc} creatTime={board.createTime} itemOnClick={()=>navWithLocation(history,{pathname:`/board/topic`,search:`boardId=${board.boardId}`,state:{boardName:board.boardName}})}></BoardItem>}
                   )

               }
               {/*<button className="btn btn-success" onClick={this.fetchNextPage}>下一页</button>*/}
               </InfinityScroll>
           </div>
        )
    }
}


const mapDispathToProps= (dispatch:Dispatch<AnyAction>)=>({
    fetchBoards:(pageInfo:PageInfo)=>{
        dispatch(fetchBoard(pageInfo))
    },
    initPageInfo:(pageInfo:PageInfo)=>{
        dispatch(initPageInfo(pageInfo))
    },
    deleteBoard: (boardId:number)=>{
        dispatch(deleteBoard(boardId))
    }
})


const mapStateToProps = (state:any,ownProps:any)=>({
    store: state.board,
    history: ownProps.history
})
export default connect(mapStateToProps,mapDispathToProps)(BoardList)