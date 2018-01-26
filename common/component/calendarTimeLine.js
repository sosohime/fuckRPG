import React from 'react';
import { Popover, Timeline, Button, Modal } from 'antd';
import { del } from '../services/calendar'

class CalendarTimeLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDeleteModal: false,
            deleteId: null,
            deleteLoading: false
        }
    }

    componentDidMount (){
        this.props.dispatch({
            type: 'app/loadAllCalendar'
        })
    }

    hideDeleteModal() {
        this.setState({
            showDeleteModal: false
        })
    }

    deleteCalendarById(id) {
        if(this.state.deleteLoading) return;
        this.setState({
            deleteLoading: true
        })
        del({id})
            .then((res) => {
                this.setState({
                    deleteLoading: false
                })
                this.hideDeleteModal()
                this.props.dispatch({
                    type: 'app/loadAllCalendar'
                })
            })
    }

    confirmDelete () {
        return (
            <Modal 
                title="确认删除？"
                visible={this.state.showDeleteModal}
                onCancel={this.hideDeleteModal.bind(this)}
                footer={null}
            >
                不可逆操作，是否确认删除第 {this.state.deleteId} 天？
                <div style={{paddingTop: '40px'}}>
                    <Button
                        type="primary" 
                        onClick={()=>{this.deleteCalendarById(this.state.deleteId)}} 
                        loading={this.state.deleteLoading}
                        style={{marginRight: '20px'}}
                    >删除</Button>
                    <Button onClick={this.hideDeleteModal.bind(this)}>取消</Button>
                </div>
            </Modal>
        )
    }

    handleDelete(id) {
        this.setState({
            showDeleteModal: true,
            deleteId: id
        })
    }

    render() {
        let rili = this.props.dongshifu;
        let admin = this.props.accessToken;
        return (
            <Timeline style={{ width: 400, padding: '28px 60px', marginLeft: '44px' }}>
                {
                    rili.map((item, i) => 
                        <Timeline.Item key={i} id={`Timeline-${item.day}`}>
                            <label>
                                第 <em style={{ color: '#108ee9' }}>{item.id}</em> 天
                            </label>
                            <p style={{ padding: '0 0 0 20px' }}>- {item.title}</p>
                            <Popover placement="right" content={item.description || item.work} title={`第 ${item.id} 天`} trigger="hover">
                                <p style={{textAlign: 'right'}}>
                                    <Button>> 详情</Button>
                                    { admin ?
                                        <Button onClick={() => this.handleDelete(item.id)}>删除</Button>:null
                                    }
                                </p>
                            </Popover>
                        </Timeline.Item>
                        )
                }
                {this.confirmDelete()}
            </Timeline>
        )
    }
}

export default CalendarTimeLine;