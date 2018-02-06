import React from 'react';
import { notification, Icon, Button, Form, Input, Modal, message } from 'antd';
import * as adsApi from '../services/ad';
import styles from '../routes/App.css'

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadAds: 0,
            adsHasLoaded: false,
            adsList: [],
            modalVisible: false,
            addLoading: false,
            showEditModal: false,
            editLoading: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.loadAds > this.state.loadAds){
            this.setState({
                loadAds: nextProps.loadAds
            })
            this.openNotification()
        }
    }

    componentDidMount() {
        this.openNotification()
    }

    openNotification(){
        notification.destroy();
        adsApi.getList()
            .then((res) => {
                let adsList = res.data.data.list;
                this.setState({
                    adsHasLoaded: true,
                    adsList,
                })
                for(let i = 0; i < 3 && i < adsList.length; i++){
                    let { title, description, id } = adsList[i];
                    let args = {
                        style: {
                            zIndex: 990
                        },
                        message: title,
                        description: (
                            <div>
                                <span dangerouslySetInnerHTML={{__html: description}}></span>
                                { this.props.accessToken ? 
                                    <div className={styles.adsBtnBox}>
                                        <Button onClick={()=>{this.delAd(id)}}>删除</Button>
                                        <Button onClick={()=>{this.showEditModal(adsList[i])}}>修改</Button>
                                    </div> : null
                                }
                            </div>
                        ),
                        duration: 0
                    }
                    notification.open(args)
                }
            })
            .catch(e => {

            })

        if(this.props.accessToken){
            notification.open({
                message: '权限狗添加新广告',
                description: (
                    <div>
                        <h4>最多同时三条，不然狗皮膏药太多要死了</h4>
                        <Button onClick={this.showModal.bind(this)}>添加新广告</Button>
                    </div>
                ),
                icon: <Icon type="tool" style={{ color: 'black' }} />,
                duration: 0
            })
        }
    }

    delAd(id) {
        adsApi.del({
            id: id
        }).then((res) => {
            const { data } = res;
            if(data.result == 'success') {
                this.openNotification()
            } else {
                message.error(data.message)
            }
        }).catch(err => {

        })
    }

    showEditModal(item) {
        this.setState({
            showEditModal: true,
            editItem: item
        })
        this.props.form.setFieldsValue(item)
    }

    hideEditModal () {
        this.setState({
            showEditModal: false
        })
    }

    handelEditSubmit = (e) => {
        e.preventDefault();
        if(this.state.editLoading)return;
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.setState({
                    editLoading: true
                })
                adsApi.modify(values)
                    .then((res) => {
                        let { data } = res;
                        if( data.result === 'success'){
                            this.hideEditModal();
                            this.openNotification();
                        } else {
                            message.error(data.message)
                        }
                        this.setState({
                            editLoading: false
                        })
                    })
                    .catch(e => {

                    })
            }
        })
    }

    modifyAd(ad) {
        const { getFieldDecorator } = this.props.form;
        let item = this.state.editItem;
        return (
            <Modal
                title = "修改广告"
                visible = {this.state.showEditModal}
                onCancel = {this.hideEditModal.bind(this)}
                footer = {null}
            >
                <Form onSubmit={this.handelEditSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: 'id获取异常！' }],
                        })(
                        <Input type="hidden" placeholder="id" />
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
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '输入详情！' }],
                        })(
                        <TextArea placeholder="详情" />
                    )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.editLoading}>
                        提交
                    </Button>
                </Form>
            </Modal>
        )
    }

    showModal() {
        if(this.state.adsList.length >= 3){
            message.error('如欲添加请先删除，或者给宇来转账5袁')
            return
        }
        this.setState({
            modalVisible: true
        })
    }

    hideModal() {
        this.setState({
            modalVisible: false
        })
    }

    addAd(e) {
        e.preventDefault();
        if(this.state.addLoading)return;
        this.props.form.validateFields((err, values) => {
            if (!err || Object.keys(err).length <= 1) {
                this.setState({
                    addLoading: true
                })
                adsApi.add(values)
                    .then((res) => {
                        let { data } = res;
                        if( data.result === 'success'){
                            this.hideModal();
                            this.openNotification();
                        } else {
                            message.error(data.message)
                        }
                        this.setState({
                            addLoading: false
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
                <Modal
                    title = "新增广告"
                    visible = {this.state.modalVisible}
                    onCancel = {this.hideModal.bind(this)}
                    footer = {null}
                >
                    <Form onSubmit={this.addAd.bind(this)} className="login-form">
                        <FormItem>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '输入标题！' }],
                            })(
                            <Input placeholder="标题" />
                        )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: '输入详情！' }],
                            })(
                            <TextArea placeholder="详情" />
                        )}
                        </FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.addLoading}>
                            提交
                        </Button>
                    </Form>
                </Modal>
                {this.modifyAd()}
            </div>
        )
    }
}

const AdsForm = Form.create()(Ads);

export default AdsForm;