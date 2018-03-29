import * as React from 'react'
import { Component } from 'react';

interface props{
    isVisible?:boolean,
    status: any,
    successMessage: string,
    failMessage: string
}

class FeedBackItem extends Component<props,any>{
    constructor(props:any){
        super(props)
        this.state={
            isVisible: false
        }
        this.isVisable.bind(this)
    }

    isVisable = (status:any)=>{

        if(status=="none"){
            return  false;
        }else {
            return true;
        }
    }
    render(){

        const{status,successMessage,failMessage} = this.props
        let className= ["text-center "]

        if(! this.isVisable(status)){
            className= [...className," invisible"]
        }
        if(status == "success"){
            className= [...className," text-success"]
        }
        if(status == "fail"){
            className= [...className," invalid-feedback "," d-block"]
        }
        return (
            <div className={className.join("")}>
                {status == "success"?successMessage:failMessage}
            </div>
        )
    }
}
export default FeedBackItem