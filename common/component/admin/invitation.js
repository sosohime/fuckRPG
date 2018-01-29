import React from 'react';
import { Button, Modal, message } from 'antd';
import { invitation } from '../../services/user';

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
        if(this.state.loading)return;
        this.setState({
            loading: true
        })
        invitation()
            .then((res) => {
                let { data } = res;
                if( data.result == 'success' ){
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
        // let invitationHtml = this.props.invitationHtml;
        let invitationHtml = '<div style="color: red;">success</div>'
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
                    <div dangerouslySetInnerHTML={{__html: invitationHtml}}></div>
                </Modal>
            </div>
        )
        
    }
}

export default InvitationUser;