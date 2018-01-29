import React from 'react';
import { Modal, Button, Form, Input, Icon, message } from 'antd';

import * as calendarApi from '../../services/calendar';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class addCalendar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            loading: false,
        }
    }

    showModal() {
        this.setState({
            modalVisible: true
        })
    }

    hideModal() {
        this.setState({
            modalVisible: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.loading)return;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                calendarApi.add(values)
                    .then((res) => {
                        let { data } = res;
                        if( data.result === 'success'){
                            this.hideModal();
                            this.props.dispatch({
                                type: 'app/loadAllCalendar'
                            })
                        } else {
                            message.error(data.message)
                        }
                        this.setState({
                            loading: false
                        })
                    })
                    .catch(e => {

                    })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button onClick={this.showModal.bind(this)}>新增日历</Button>
                <Modal
                    title = "新增日历"
                    visible = {this.state.modalVisible}
                    onCancel = {this.hideModal.bind(this)}
                    footer = {null}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('days', {
                                rules: [{ required: true, message: '输入天数！' }],
                            })(
                            <Input placeholder="天数(不能重复，地王还没做查重)" />
                        )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '输入标题！' }],
                            })(
                            <Input placeholder="标题" />
                        )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remark', {
                                rules: [{ required: true, message: '输入备注！' }],
                            })(
                            <Input placeholder="备注" />
                        )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: '输入详情！' }],
                            })(
                            <TextArea placeholder="详情" />
                        )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                            提交
                        </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const addClendarForm = Form.create()(addCalendar);

export default addClendarForm;