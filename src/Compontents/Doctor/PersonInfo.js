import React, { Component } from 'react';
import {
    Form,
    Input
}
    from 'antd'

class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // information:this.props.information,
        }
    }
    // componentWillReceiveProps=(nextProps) =>{
    //     this.setState({
    //        information:nextProps.information
    //    })
       
    // }
    render() {
       const information=this.props.Information
        console.log(information.UserCode)
        return (
           
            <Form layout="horizontal" labelCol={{ span: 5, }}//设置文本
                wrapperCol={{ span: 14, }}                  //设置控件
            >
                <Form.Item name="accord" label="登录账号" initialValue={this.props.Information.UserCode}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="username" label="姓名" initialValue={information.UserName}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="手机号" initialValue={information.UserPhone} >
                    <Input />
                </Form.Item>
                <Form.Item name="userRole" label="当前登录角色" initialValue={information.UserCode}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="status" label="当前状态" initialValue={information.UserStatus==0?"在职":"离职"}>
                    <Input disabled />
                </Form.Item>
            </Form>
        );
    }
}

export default PersonInfo;