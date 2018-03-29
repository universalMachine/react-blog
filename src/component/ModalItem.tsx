import { Component } from 'react';
import * as React from 'react'
class ModalItem extends Component<any,any>{
    constructor(props:any){
        super(props)

    }

    render(){
        const {title,content,leftClick,rightClick,isShow,onClose,leftBtnContent="确认",rightBtnContent="取消"} = this.props
        let backdrop_classNames  = ["modal-backdrop"," fade"," d-none"]
        let  modal_classNames = ["modal"," fade"]
        if(isShow){
            backdrop_classNames = [...backdrop_classNames.slice(0,backdrop_classNames.length-1)," show"]
            modal_classNames = [...modal_classNames," show"," d-block"]
        }
        return (
            <div>
                <div className={backdrop_classNames.join("")}></div>
                <div className={modal_classNames.join("")} id="exampleModalCenter" role="dialog"
                     aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {content}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={leftClick}>{leftBtnContent}</button>
                                <button type="button" className="btn btn-secondary" onClick={rightClick}>{rightBtnContent}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                )
    }
}

export default ModalItem