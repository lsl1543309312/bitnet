import React, { Component } from 'react';

import {
    Input,
    Form,
    Modal,
    Spin,
} from 'antd';
const { TextArea } = Input

class ModeAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            insertVisible: false,
            loading: false,
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    render() {
        console.log(this.props.recode)
        return (
            <div>
                <Modal
                    title={this.props.title}
                    okText="确认"
                    cancelText="取消"
                    okType="primary"
                    maskClosable={false}
                    visible={this.state.insertVisible}
                    onOk={(e)=>this.handlebtnok(e)}
                    onCancel={() => this.actionclose(false)}
                >
                    <Spin tip="Loading..." spinning={this.state.loading}>
                        <Form>
                           
                            
                            {
                                this.props.data.map((item, i) => {
                                    if (item.type == "TextArea") {
                                        return (
                                            // <Form.Item name={item.id} label={item.label} rules={[{ required: item.required, message: "请输入项为必输项目" }]}  >
                                            <>
                                                {item.label}:<TextArea value={item.value} onChange={(e) => item.onchange(item.id, e)} />
                                                </>
                                            // </Form.Item>
                                        )
                                    }
                                    return null
                                })
                            }

                        </Form>
                    </Spin>
                </Modal>
            </div>
        );
    }

    handlebtnok = (e) => { 
        let { loading } = this.state
        if (!loading) {
            this.props.handleOK(e, this.props.recode)
        }
    }

    actionShow = () => {
        this.setState({
            insertVisible: true,
        })
    }
    actionclose = () => {
        let { loading } = this.state
        if (!loading) {
            this.setState({
                insertVisible: false,
                loading: false,
            })
        }
    }
    //提交中
    
    actionLoading = (load) => {
        this.setState({
            loading: load,
        })
    }



}

export default ModeAdd;