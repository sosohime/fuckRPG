import React from 'react';
import { connect } from 'dva';
import { Card, Popover, Timeline, Button, Anchor, notification, Icon } from 'antd';
import LoginModal from '../component/loginModal';
import AdminButtonGroup from '../component/adminButtonGroup';
import TJTimer from '../component/tjTimer';
import Calendar from '../component/calendar';
import Ads from '../component/ads';

import styles from './App.css';

const { Link } = Anchor;

function app ({ location, dispatch, app }) {
    const loginModalProps = {
        ...app,
        visible: app.showLoginModal,
        changeModalVisible: function(visible) {
            dispatch({
                type: 'app/changeLoginModalVisible',
                payload: {
                    showLoginModal: visible
                }
            })
        },
        loginSuccess: function(data) {
            dispatch({
                type: 'app/loginSuccess',
                payload: data
            })
        }
    }
    const adminProps = {
        dispatch,
        ...app
    }
    const calendarProps = {
        dispatch,
        ...app
    }
    const tjTimerProps = {
        dispatch,
        ...app
    }
    const adsProps = {
        dispatch,
        ...app
    }

    return (
        <div className={styles.body}>
            <h1 id="top-title" style={{ padding: '20px 0 0 20px' }}>著名作家董师傅之新工作日志 v0.22alpha</h1>
            <TJTimer {...tjTimerProps}></TJTimer>
            <Ads {...adsProps}></Ads>
            <div>
                {
                    app.accessToken ?
                        <AdminButtonGroup {...adminProps}></AdminButtonGroup>
                        :
                        <LoginModal {...loginModalProps}></LoginModal>
                }
            </div>
            <Calendar {...calendarProps}></Calendar>
        </div>
    )
}

function mapStateToProps({ app }) {
    return { app }
}

export default connect(mapStateToProps)(app);