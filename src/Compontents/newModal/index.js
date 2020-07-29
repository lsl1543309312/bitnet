import React, { Component } from 'react';
import {
    Input,
    Form,
    Select,
    Modal,
    Switch,
    Spin,
} from 'antd';

const { Option } = Select
const { TextArea } = Input
class newModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loading: false,
            ListData: []
        }
    }
    componentDidMount() {
        this.props.onRef(this);
    
    }
    render() {
        return (
            <div>
                <Modal
                    title={this.props.title}
                    okText="确认"
                    cancelText="取消"
                    okType="primary"
                    maskClosable={false}
                    visible={this.state.visible}
                    onOk={(e) => this.handleBtnOk(e)}
                    onCancel={() => this.handleBtnCancel(false)}

                >
                    <Spin tip="Loading..." spinning={this.state.loading}>
                        <Form >
                            {
                                this.props.data.map((item, i) => {
                                    if (item.type == "Select") {
                                        return (
                                            // <div style={{dispabel:item.hidden?"none":''}}>
                                            <>
                                                {item.label}:  {this.props.type == 'edit' ?
                                                    <Select key={item.id} value={item.value} placeholder={item.placeholder} onChange={(e) => item.onChange(item.id, e)} disabled={item.disabled} >
                                                        {item.data.map(i => (<Option key={i.HOSPITALID} value={i.HOSPITALID}>{i.HOSNAME}</Option>))}

                                                    </Select> : <Select placeholder={item.placeholder} onChange={(e) => item.onChange(item.id, e)} disabled={item.disabled}>
                                                        {item.data.map(i => (<Option key={i.HOSPITALID} value={i.HOSPITALID}>{i.HOSNAME}</Option>))}

                                                    </Select>}

                                                <br />
                                                {/* </div> */}
                                            </>
                                        )

                                    } else if (item.type == "TextArea") {
                                        return (
                                            <>
                                                {item.label}:< TextArea value={item.value}  key={item.id} onChange={(e) => item.onChange(item.id, e)} style={{ width: 300 }} />
                                                <br />
                                            </>
                                        )
                                    } else if (item.type == "Checked") {
                                        return (
                                            <>
                                                {item.label}:<Switch checkedChildren="开"  key={item.id} unCheckedChildren="关" checked={item.value == 1 ? 'defaultValue' : ''} onChange={(e) => item.onChange(item.id, e)}></Switch>
                                                <br />
                                            </>
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
    //确认按钮
    handleBtnOk = (e) => {
        let { loading } = this.state
        if (!loading) {
            this.props.handleOk(e, this.props.record)
        }
    }
    //取消按钮
    handleBtnCancel = () => {
        let { loading } = this.state
        if (!loading) {
            this.setState({
                visible: false,
                loading: false
            })
        }
    }
    //提交事件 要控制
    handleActionLoad = (load) => {
        this.setState({
            loading: load
        })
    }
    //点击新增或修改改变visible为true
    actionShow = () => {
        this.setState({
            visible: true,
        })
    }
  
}

export default newModal;