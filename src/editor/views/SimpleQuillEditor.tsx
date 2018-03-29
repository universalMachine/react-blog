import * as React from "react"
const ReactQuill = require('react-quill');
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
/*import 'react-quill/dist/quill.core.css';*/

import './SimpleQuillEditor.scss'
import { Component } from 'react';

import { deepEqual } from '../../constant/compare';
class SimpleQuillEditor extends Component<any,any>{
    constructor (props:any) {
        super(props)
        this.state = { editorHtml: '', theme: 'bubble' }
        this.handleChange = this.handleChange.bind(this)
        this.handleEventChange = this.handleEventChange.bind(this)
    }

    handleChange (html:any) {
        this.setState({ editorHtml: html });
    }

    handleThemeChange (newTheme:any) {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
    }

    /*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */


    modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] as any[]}],
            [{size: [] as any[]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]
    handleEventChange = (content:any, delta:any, source:any, editor:any)=>{
       // console.dir(this)
        this.props.handleChange({currentTarget:{name:this.props.name,value:content}})
    }

    componentWillReceiveProps(nextProps:any){
        //debugger
        if(nextProps.isClearContent){
            this.props.resetClearContent()
            this.setState({
                ...this.state,
                editorHtml: ""
            })
        }
    }

    shouldComponentUpdate(nextProps:any,nextState:any,nextContext:any){
        if(deepEqual(nextProps,this.props)&&deepEqual(nextState,this.state)){
            return false
        }else
            return true;
    }
    render () {
        return (
            <div className="my-editor">
                <ReactQuill
                    name={this.props.name}
                    theme={this.state.theme}
                    onChange={this.handleEventChange}
                    value={this.state.editorHtml}
                    modules={this.modules}
                    formats={this.formats}
                    bounds={".my-editor"}
                    placeholder={this.props.placeholder}

                />
                <div className="themeSwitcher">
                    <label className="mr-2">模式 </label>
                    <select className="pl-1 select" onChange={(e) =>
                        this.handleThemeChange(e.target.value)}>
                        <option value="bubble">简洁</option>
                        <option value="snow">更多功能</option>
                       {/* <option value="core">Core</option>*/}
                    </select>
                </div>
            </div>
        )
    }
}

export default SimpleQuillEditor


