import React from 'react';
import { Button, Modal, message, Dropdown, Input } from 'antd';
import { invitation } from '../../services/user';
import { getUrlFromString } from '../../utils/tools';

const Search = Input.Search;

class InvitationUser extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            loading: false,
            invitationHtml: '',
        }
    }

    showModal() {
        this.setState({
            modalVisible: true,
            invitationHtml: ''
        })
    }

    invitationNewUser(user = '') {
        if(this.state.loading)return;
        this.setState({
            loading: true
        })
        invitation({remark: user})
            .then((res) => {
                let { data } = res;
                if( data.result == 'success' ){
                    message.success('生成邀请链接成功！')
                    this.setState({
                        modalVisible: true,
                        invitationHtml: data.data
                    })
                } else {
                    message.error(data.message)
                }
                this.setState({
                    loading: false
                })
            })
            .catch(e => {
                this.setState({
                    loading: false
                })
            })
    }

    hideModal() {
        this.setState({
            modalVisible: false
        })
    }

    

    render() {
        // let invitationHtml = getUrlFromString(this.state.invitationHtml);
        let invitationHtml = this.state.invitationHtml;
        return (
            <div>
                <Button 
                    onClick={this.showModal.bind(this)} 
                    loading={this.state.loading}
                    >
                    邀请注册
                </Button>
                <Modal
                    title="邀请注册"
                    visible={this.state.modalVisible}
                    onCancel={this.hideModal.bind(this)}
                    footer={null}
                    >
                    <Search 
                        placeholder="输入邀请的人的名字（可以为空）" 
                        enterButton="获取" 
                        size="default"
                        onSearch={value => { this.invitationNewUser(value) } }
                    />
                    <div dangerouslySetInnerHTML={{__html: invitationHtml}}></div>
                </Modal>
            </div>
        )
        
    }
}

export default InvitationUser;