import React from 'react';
import { Modal, Button, Form, Input, Icon, message } from 'antd';
import { strToMD5UpperCase } from '../utils/tools';

import * as user from '../services/user';

const FormItem = Form.Item;

class LoginModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: true,
            loading: false,
            ...props
        }
    }

    showModal() {
        this.props.changeModalVisible(true)
    }

    hideModal() {
        this.props.changeModalVisible(false)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.loading)return;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                values.password = strToMD5UpperCase(values.password)
                user.login(values)
                    .then((res) => {
                        let { data } = res;
                        if( data.result === 'success'){
                            this.props.loginSuccess(res);
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
            <div style={{ padding: '20px 0 0 30px' }}>
                <Button onClick={this.showModal.bind(this)}>为董师傅之新工作日志添砖加瓦</Button>
                <Modal
                    title="权限狗入口"
                    visible={this.props.visible}
                    onCancel={this.hideModal.bind(this)}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '输入宇来菊苣给你的账号！' }],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '输入宇来菊苣给你的密码！' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                            登录
                        </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const LoginForm = Form.create()(LoginModal);

export default LoginForm;