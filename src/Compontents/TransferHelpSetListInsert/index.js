
import React, { Component } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    Form,
    Select,
    Switch,
    message,
    Modal
} from 'antd';

class TransferHelpSetListInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListData: []
        }

        this.handleHosList = this.handleHosList.bind(this);
    }
    componentDidMount = () => {
        this.handleHosList();
    }
    render() {

        return (

            <table>
                <tr>
                    <td>所属医院</td>
                    <td>
                        <select onChange={this.props.handleHOSNAME}  >
                            <option value="" disabled selected>输入搜索或下拉选择</option>
                            {this.state.ListData.map(item => (<option key={item.HOSPITALID} value={item.HOSPITALID}>{item.HOSNAME}</option>))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>用户使用类型</td>
                    <td>
                        <select onChange={this.props.handleTYPE} >
                            <option value="" disabled selected>输入搜索或下拉选择</option>
                            <option value="patient">病人端</option>
                            <option value="staff">医护端</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>应用编号</td>
                    <td>
                        <select onChange={this.props.handleAPPID} >
                            <option value="" disabled selected>输入搜索或下拉选择</option>
                            <option value="edition001">版本1</option>
                            <option value="edition002">版本2</option>
                            <option value="edition003">版本3</option>
                            <option value="edition004">版本4</option>
                            <option value="edition005">版本5</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>开/关</td>
                    {/* <td>
                        <input type='radio' value='1'>开</input>
                        <input type='radio' value='0'>关</input>
                    </td> */}
                </tr>
                <tr>
                    <td>指引帮助</td>
                    <td>
                        <textarea onChange={this.props.handleHELP} />
                    </td>
                </tr>
            </table>



        );
    }
    //医院列表
    handleHosList = () => {
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/Hospital/GetHospitalSelList', {

        }, { headers: { "Tick": window.localStorage.Tick } })
            .then((res) => {
                this.setState({
                    ListData: res.data.Data
                })
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

}


export default TransferHelpSetListInsert;