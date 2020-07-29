import React, { Component } from 'react';
import {
    Form,
    Modal,
    Select,
    Spin,
    Switch,
    Input
} from 'antd'
import 'antd/dist/antd.css'
const { Option } = Modal
const { TextArea } = Input

class formCRUD extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loading: false
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    render() {
        return (
            <Modal
                title={this.props.title}
                okText="确认"
                cancelText="取消"
                onOk={(e)=>this.handleBtnOk(e)}
                onCancel={()=>this.handleBtnCancel()}
                visible={this.state.visible}
            >
                <Spin tip='loading...' spinning={this.state.loading}>
                    <Form labelCol={{span: 6,}}wrapperCol={{span: 14,}}>
                        {this.props.data.map(item => {
                            if (item.type === 'Select') {
                                return (
                                    <Form.Item key={item.id} label={item.label} required={item.required}>
                                      {this.props.type=='edit'?  <Select placeholder={item.placeholder} value={item.value} disabled={item.disabled}>
                                        {/* {item.data.map(i => (<Option key={i.HOSPITALID} value={i.HOSPITALID}>{i.HOSNAME}</Option>))} */}
                                        </Select>:  <Select placeholder={item.placeholder} disabled={item.disabled}>
                                        {/* {item.data.map(i => (<Option key={i.HOSPITALID} value={i.HOSPITALID}>{i.HOSNAME}</Option>))} */}
                                        </Select>}
                                     </Form.Item>
                                )
                            } else if (item.type === 'Checked') {
                               return ( <Form.Item key={item.id} label={item.label}>
                                   <Switch checkedChildren={item.checked} unCheckedChildren={item.unchecked} checked={item.value} />
                                </Form.Item>)
                            } else if (item.type === 'TextArea') {
                                return (<Form.Item label={item.label}>
                                    <TextArea />
                                </Form.Item>)
                            } return null
                        })}
                    </Form>
                </Spin>
            </Modal>
        );
    }
    handleBtnOk = (e) => {
        let { loading } = this.state
        if (!loading) {
            this.props.handleOk(e, this.props.record)
        }
    }
    handleBtnCancel = () => {
        let { loading } = this.state
        if (!loading) {
            this.setState({
                visible: false,
                loading: false
            })
        }
    }
    handleActionShow = () => {
        this.setState({
            visible: true,
        })
    }
    handleActionLoad = (load) => {
        this.setState({
            loading:load
        })
    }
}

export default formCRUD;