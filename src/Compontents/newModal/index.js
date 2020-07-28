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
        this.props.handleHosList()
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
                                                    {item.label}:<Select value={item.value} placeholder={item.placeholder} onChange={(e) => item.onChange(item.id, e)} disabled={item.disabled} style={{width:300}}>
                                                        {item.data.map(i => (<Option key={i.HOSPITALID} value={i.HOSPITALID}>{i.HOSNAME}</Option>))}

                                                    </Select>
                                                    <br />
                                                    {/* </div> */}
                                                    </>
                                            )
                                        
                                    } else if (item.type == "TextArea") {
                                        return (
                                            <>
                                                {item.label}:<TextArea value={item.value} onChange={(e) => item.onChange(item.id, e)} style={{width:300}} />
                                                <br />
                                            </>
                                        )
                                    } else if (item.type == "Checked") {
                                        return (
                                            <>
                                                {item.label}:<Switch checkedChildren="开" unCheckedChildren="关" checked={item.value == 1 ? 'defaultValue' : ''} onChange={(e) => item.onChange(item.id, e)}></Switch>
                                                <br />
                                            </>
                                        )
                                    } else if (item.type == "del") {
                                        return (
                                            <>
                                                {item.text}
                                            </>)
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
    //提交
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
    // //下拉框的绑定
    // handleHosList = () => {
    //     axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/Hospital/GetHospitalSelList', {

    //     }, { headers: { "Tick": window.localStorage.Tick } })
    //         .then((res) => {
    //             if (res.data.ResultCode == 0) {
    //                 this.setState({
    //                     ListData: res.data.Data
    //                 })
    //             }

    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }
}

export default newModal;