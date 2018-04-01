import * as React from "react"
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
/*import 'react-quill/dist/quill.core.css';*/
import './SimpleQuillEditor.scss'
import { cloneElement, Component } from 'react';
import { deepEqual } from '../../constant/compare';
import { cloneDiff, deepCloneObject, shallowClone } from '../../constant/constant';

const ReactQuill = require('react-quill');
class SimpleQuillEditor extends Component<any,any>{
    constructor (props:any) {
        super(props)
        this.state = {
            initialContent : `<p>&nbsp;&nbsp;${this.props.placeholder}</p>`,
            emptyContent: `<p>&nbsp;&nbsp;</p>`,
            editorHtml:  `<p>&nbsp;&nbsp;${this.props.placeholder}</p>`,
            shouldRender: false,
            //initialContent :  `<p>&nbsp;&nbsp;</p>`,
            //editorHtml:  `<p>&nbsp;&nbsp;</p>`,
            theme: 'bubble' }
        this.handleChange = this.handleChange.bind(this)
        this.handleEventChange = this.handleEventChange.bind(this)
    }

    handleChange (html:any) {
        this.setState({ editorHtml: html,shouldRender:false });
    }

    handleThemeChange (newTheme:any) {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme,
            shouldRender: true

        })
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

                editorHtml: this.state.initialContent,
                shouldRender: true
            })
        }
    }



    editor:any



    isEmpty=()=>{
        const  emptyStrs=["","<p><br></p>","<br>","f","<p>&nbsp;&nbsp;</p>",this.state.initialContent]
        return emptyStrs.indexOf(this.state.editorHtml) != -1
    }

    consoleKeyup = (event:any)=>{
/*        if(event.key !== "Backspace"&&this.state.editorHtml == this.state.initialContent){

            // 防止首字母被渲染
            this.setState({
               shouldRender: false
            })




        }*/

        console.log("keyup")
        console.dir(event)
    }
    onkeyPress = (event:any)=>{

        console.log("keypress")
    }
    consoleKeyDown = (event:any)=>{


        if(event.key === "Backspace"&&this.isEmpty()){

            event.preventDefault()
            this.setState({
                shouldRender: true,
                editorHtml: this.state.emptyContent
            })
        }
/*

        console.log("keydown")


        if(event.key !== "Backspace"&&this.state.editorHtml == this.state.initialContent){

            if(!event.nativeEvent.isRedispatch) {
                const nativeEvent = event.nativeEvent
                let newKeyDownEvent: any = new KeyboardEvent(event.nativeEvent.type, event.nativeEvent);

                /!*newKeyDownEvent.initKeyboardEvent(
                    nativeEvent.type,
                    nativeEvent.bubbles,
                    nativeEvent.cancelable,
                    nativeEvent.view,
                    nativeEvent.key,
                    nativeEvent.key,
                    nativeEvent.key

                )*!/
                Object.defineProperty(newKeyDownEvent, 'keyCode', {
                    get: function () {
                        return this.keyCodeVal;
                    }
                });

                Object.defineProperty(newKeyDownEvent, 'which', {
                    get: function () {
                        return this.keyCodeVal;
                    }
                });

                var initMethod = typeof newKeyDownEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

                newKeyDownEvent[initMethod](
                    nativeEvent.type,// event type : keydown, keyup, keypress
                    nativeEvent.bubbles,// bubbles
                    nativeEvent.cancelable,// cancelable
                    nativeEvent.view,// viewArg: should be window
                    nativeEvent.ctrlKey, // ctrlKeyArg
                    nativeEvent.altKey, // altKeyArg
                    nativeEvent.shiftKey, // shiftKeyArg
                    nativeEvent.metaKey, // metaKeyArg
                    nativeEvent.keyCode, // keyCodeArg : unsigned long the virtual key code, else 0
                    nativeEvent.charCode // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
                );

                newKeyDownEvent.keyCodeVal = nativeEvent.keyCode;


                newKeyDownEvent.isRedispatch = true

                event.preventDefault()
                this.setState({
                    editorHtml: "<p>&nbsp;&nbsp;</p>",
                    shouldRender: true
                })

                event.persist()
                const currentTarget = event.currentTarget
                this.afterRender = () => {
                    // debugger
                    currentTarget.dispatchEvent(newKeyDownEvent)
                }

            }}
*/

    }

    onFocus=(range, source, editor)=>{

        if(editor.getHTML() == this.state.initialContent){
            this.setState({

                editorHtml: "<p>&nbsp;&nbsp;</p>",
                shouldRender: true
            })


        }


    }

    afterRender = undefined

    shouldComponentUpdate(nextProps:any,nextState:any,nextContext:any){
        console.dir(nextState)
        if(nextState.shouldRender){

            this.setState({
                shouldRender: false
            })
            console.log("shouldRender")
            return true
        }
        if(deepEqual(nextProps,this.props)){
            console.log("dont need render")
            return false
        }


        return true;
    }

    componentDidUpdate(prevProps:any){
        //debugger
        if(this.afterRender){
          //  debugger
            console.log("afterRender")
            this.afterRender()

            //只执行一次
            this.afterRender=null
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


