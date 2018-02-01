import React from 'react';
import { Button } from 'antd';
import AddCalendar from './admin/addCalendar';
import UpdateTJTime from './admin/updateTJTime';
import InvitationUser from './admin/invitation';
import styles from './Calendar.css';

const buttonGroup = (adminProps) => {
    const { dispatch } = adminProps;

    const addProps = {
        ...adminProps
    }
    const updateTJTimeProps = {
        ...adminProps
    }

    const showAds = () => {
        dispatch({
            type: 'app/showAllAds'
        })
    }

    return (
        <div className={styles.adminBtnGroup}>
            <h4>权限狗你好，开始吧！</h4>
            <AddCalendar {...addProps}></AddCalendar>
            <Button onClick={showAds}>广告管理(没做)</Button>
            <UpdateTJTime {...updateTJTimeProps}></UpdateTJTime>
            <InvitationUser></InvitationUser>
        </div>
    )
}

export default buttonGroup;