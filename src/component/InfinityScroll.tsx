import { Component, SVGProps } from 'react';
import * as React from 'react'
import { Motion, spring } from 'react-motion';

interface props{
    children?:any;
    fetchNextPage: any;
    data: object,
    fetchStatus: any
    loadingFinishTip?:any
}
const loadingGif = require('../resources/imgs/loading.gif')

class InfinityScroll extends Component<props,any>{

    constructor(props:any){
        super(props);
        this.state={

            isLoadingEnd: false
        }

        this.isLoadingEndByContentLength.bind(this);
    }

    loadingEnd =  <Motion

        defaultStyle ={ {x: 100}}
            style={
                {x : spring(0, {stiffness: 50, damping: 80})}
        }>
        {value=> <div style={{opacity : value.x/100}}>{this.props.loadingFinishTip||"内容已经完全加载完毕哦!" } </div> }
        </Motion>
    loadingIng = <div><img src={loadingGif}/></div>
    loadingEdgeTrigger = false

    isLoadingEndByContentLength = (content:Array<any>,isLast: boolean)=>{
        if(content.length == 0 && isLast == true){
            return true;
        }else {
            return false;
        }
    }

    componentWillReceiveProps(nextProps:any){

        const isLoadingEndByContentLength = nextProps.data.content?this.isLoadingEndByContentLength(nextProps.data.content,nextProps.data.last):false
        this.setState({
            isLoadingEnd: isLoadingEndByContentLength
        })

        if(nextProps.fetchStatus == "start"){
            this.loadingEdgeTrigger = true
        }
    }

    render(){
        const {fetchNextPage,fetchStatus} = this.props


        return(
            <div className="infinityScorll">
                {this.props.children}
                <div className="text-center">
                    {(
                        ()=> {
                            if (this.state.isLoadingEnd && fetchStatus == "complete" && this.loadingEdgeTrigger) {
                                console.log(this.loadingEdgeTrigger)
                                this.loadingEdgeTrigger = false
                                return this.loadingEnd

                            } else if(fetchStatus=="start"){
                                return this.loadingIng
                            }
                        }
                    )()
                    }
                </div>
                <div className="text-right mb-3">
                    <button className="btn btn-success" onClick={fetchNextPage}>下一页</button>

                </div>


            </div>
        )
    }
}

export default InfinityScroll