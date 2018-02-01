import React from 'react';
import { Button, Form, Input, Icon, message } from 'antd';

import * as adApi from '../../services/ad';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class adManagement extends React.Component {
    constructor(props) {
        super(props)
        this.setState({

        })
    }

    

    render() {
        return (
            <div>

            </div>
        )
    }
}

const adManagementForm = Form.create()(adManagement);

export default adManagementForm;