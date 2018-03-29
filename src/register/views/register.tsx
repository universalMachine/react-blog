import * as React from   "react"
import {
    FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Button, Radio, Grid, Row,
    Col
} from "react-bootstrap";
import { Component, FormEvent, SyntheticEvent } from 'react';
import "./register.scss"
import { Action, Dispatch } from 'redux';
import { addRegister } from '../actions';
import { User } from '../User';
import { connect } from 'react-redux';



function FieldGroup({ id , label , help, ...props }:any) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

interface Props{
    onRegister: (user:User)=>void;
}

interface State{user:User}

class RegisterForm extends Component<Props,State>{
     handlechange = (event:FormEvent<HTMLInputElement>)=>{
        const {name,value} = event.currentTarget
         const {user} = this.state
         this.setState({
             user: {
                 ...user,
                 [name]:value
             }
         })

         this.handlechange = this.handlechange.bind(this)
    }


    constructor(props:Props){
        super(props)
        this.state = {
            user:{
                userName: "",
                password: "",
                email: ""
            }
        }
    }
    render(){
        const {onRegister} = this.props
    return(
        <div className="h-100">
            <Grid className="h-100 d-flex align-items-center  ">
                <Row className="justify-content-center flex-grow-1">

                    <Col sm={8} md={8} lg={6}>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="用户名"
                        placeholder="请输入用户名"
                        name="userName"
                        onChange={this.handlechange}
                    />
                    <FieldGroup id="formControlsPassword" label="密码" name="password" type="password" placeholder="请输入密码" onChange={this.handlechange}/>
                    <FieldGroup id="formControlsPassword" label="密码" type="password" placeholder="请确认密码"/>
                        <div className="text-center" >
                            <button onClick={(e)=>onRegister(this.state.user)} className="w-50 p-3 btn btn-success" type="button" >注册</button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>

    );}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        onRegister: (user:User) => {
            dispatch(addRegister(user));
        }
    }
};

const mapStateToProps = (state: any)=>{

}
export default connect(null,mapDispatchToProps)(RegisterForm)