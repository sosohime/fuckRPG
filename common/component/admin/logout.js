import React from 'react';
import { Button, message } from 'antd';
import { logout as logoutApi } from '../../services/user'

class Logout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    loginout() {
        if(this.state.loading)return;
        this.setState({
            loading: true
        })
        logoutApi()
            .then((res) => {
                let { data } = res;
                if(data.result === 'success') {
                    this.props.dispatch({
                        type: 'app/logout'
                    })
                } else {
                    message.error(data.message)
                }
                this.setState({
                    loading: false
                })
            })
            .catch(err => {

            })
    }

    render() {
        return (
            <div>
                <Button 
                    onClick={this.loginout.bind(this)} 
                    loading={this.state.loading}
                >
                    登出
                </Button>
            </div>
        )
    }
}

export default Logout;