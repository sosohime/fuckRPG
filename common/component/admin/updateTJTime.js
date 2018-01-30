import React from 'react';
import { Button, Form, DatePicker, Modal, message } from 'antd';
import { update } from '../../services/bookUpdate';
import { datePattern } from '../../utils/tools';

const FormItem = Form.Item;

class UpdateTJTime extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            loading: false
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
            if(!err) {
                this.setState({
                    loading: true
                })
                values.updateTime = values.updateTime.format('YYYY-MM-DD HH:mm:ss')
                update(values)
                    .then((res) => {
                        let { data } = res;
                        if( data.result === 'success'){
                            this.hideModal();
                            this.props.dispatch({
                                type: 'app/loadBookUpdate'
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
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Button onClick={this.showModal.bind(this)}>更新董师傅的泰坚时间</Button>
                <Modal 
                    title="请选择董师傅的更新时间"
                    visible={this.state.modalVisible}
                    onCancel={this.hideModal.bind(this)}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="选择更新时间"
                        >
                        {getFieldDecorator('updateTime', {
                            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                            更新
                        </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const UpdateTJTimeForm = Form.create()(UpdateTJTime);

export default UpdateTJTimeForm;