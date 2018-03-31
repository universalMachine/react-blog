import * as React from "react"
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
/*import 'react-quill/dist/quill.core.css';*/
import './SimpleQuillEditor.scss'
import { Component } from 'react';
import { deepEqual } from '../../constant/compare';

const ReactQuill = require('react-quill');
class SimpleQuillEditor extends Component<any,any>{
    constructor (props:any) {
        super(props)
        this.state = {
            initialContent : `<p>&nbsp;&nbsp;${this.props.placeholder}</p>`,
            editorHtml:  `<p>&nbsp;&nbsp;${this.props.placeholder}</p>`,
            theme: 'bubble' }
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
        this.editor = editor
        this.handleChange(content)
        console.log(`content:${content}`)
        this.props.handleChange({currentTarget:{name:this.props.name,value:content}})
    }

    componentWillReceiveProps(nextProps:any){
        //debugger
        if(nextProps.isClearContent){
            this.props.resetClearContent()
            this.setState({
                ...this.state,
                editorHtml: this.state.initialContent
            })
        }
    }

    shouldComponentUpdate(nextProps:any,nextState:any,nextContext:any){
        //debugger
        if(deepEqual(nextProps,this.props)&&deepEqual(nextState,this.state)){
            return false
        }else
            return true;
    }

    editor:any



    isEmpty=()=>{
        const  emptyStrs=["","<p><br></p>","<br>","f","<p>&nbsp;&nbsp;</p>",this.state.initialContent]
        return emptyStrs.indexOf(this.state.editorHtml) != -1
    }

    consoleKeyup = (event:any)=>{
        console.dir(event.key )
        //event.preventDefault()

    }
    onkeyPress = (event:any)=>{


    }
    consoleKeyDown = (event:any)=>{
        //debugger


        //console.log(`editorHtml:${this.state.editorHtml}`)
        if(event.key === "Backspace"&&this.isEmpty()){
            event.preventDefault()
            this.setState({
                ...this.state,
                editorHtml: this.state.initialContent
            })
        }

        if(event.key !== "Backspace"&&this.isEmpty()){

           // debugger
           this.setState({
                ...this.state,
                editorHtml: "<p>&nbsp;&nbsp;</p>"
            })

        }
        //debugger

    }

    onFocus=(range, source, editor)=>{


        if(editor.getHTML() == this.state.initialContent){
            this.setState({
                ...this.state,
                editorHtml: "<p>&nbsp;&nbsp;</p>"
            })
        }
    }
    render () {
        return (
            <div className="my-editor ">
                <ReactQuill
                    name={this.props.name}
                    theme={this.state.theme}
                    onChange={this.handleEventChange}
                    value={this.state.editorHtml}
                    modules={this.modules}
                    formats={this.formats}
                    bounds={".my-editor"}
                    placeholder={this.props.placeholder}
                    style={{fontSize:"1.5rem"}}
                    onKeyUp={this.consoleKeyup}
                    onKeyDown={this.consoleKeyDown}
                    onKeyPress = {this.onkeyPress}
                    onFocus={this.onFocus}

                >
                    <div className="wo">

                    </div>
                </ReactQuill>
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


