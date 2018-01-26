import React from 'react';
import { Button } from 'antd';
import AddCalendar from './admin/addCalendar';

const buttonGroup = (adminProps) => {

    const addProps = {
        ...adminProps
    }
    return (
        <div style={{ padding: '20px 0 0 30px' }}>
            <span>权限狗你好，开始吧！</span>
            <AddCalendar {...addProps}></AddCalendar>
            <Button>广告管理(没做)</Button>
            <Button>更新董师傅太监时间(没做)</Button>
        </div>
    )
}

// class buttonGroup extends React.Component{
//     constructor(props){
//         super(props);
//     }

//     render() {
        
//     }
// }

export default buttonGroup;