import React from 'react';
import { connect } from 'dva';
import { Card, Popover, Timeline, Button, Anchor, notification, Icon } from 'antd';
import LoginModal from '../component/loginModal';
import TJTimer from '../component/tjTimer';
import styles from './App.css';

const { Link } = Anchor;


class App extends React.Component {
    
                
    constructor({ app }){
        super();
        this.state = {
            collapsed: false,
            dongshifu: app,
            showLoginPanel: false,
            ...app
        }
        console.log(app)
        this.handleLogin = this.handleLogin.bind(this);
    }

    openNotification(){
      const args = {
        message: '广告广告广告！',
        description: '深圳牛逼公司招Java，联系QQ：124119241，注明From董师傅工作日志',
        icon: <Icon type="smile-circle" style={{ color: 'green' }} />,
        duration: 0,
      };
      notification.open(args);
    };

    componentDidMount(next){
        // 广告
        if(!this.ad) {
            this.openNotification();
        }
    }

    componentWillUnmount() {
        
    }

    handleLogin(userInfo) {
        this.props.dispatch({
            type: 'app/login',
            payload: userInfo
        })
    }

    getAnchor(){
        let rili = this.state.dongshifu;
        let link = [];
        let ll = {};
        rili.map((item, i) => {
            let week = Math.ceil(item.day/7);
            let day;
            if(link[week - 1] && link[week - 1].day){
                return
            }
            link[week - 1] = {day: item.day, week: week};
        })
        return link.reverse();
    }

    render() {
        let rili = this.state.dongshifu;
        let link = this.getAnchor();
        let isLogin = !!this.state.accessToken;
        return (
            <div className={styles.body}>
                <h1 id="top-title" style={{ padding: '20px 0 0 20px' }}>著名作家董师傅之新工作日志 v0.15alpha</h1>
                <TJTimer></TJTimer>
                <div>
                    { isLogin ? '登陆成功' : '没登录' }
                    <LoginModal 
                        visible={this.state.showLoginPanel}
                        loginMethod={this.handleLogin}
                    ></LoginModal>
                </div>
                <Anchor offsetTop={0} bounds={10} style={{ position: 'fixed', display: 'inline-block', padding: '20px' }}>
                    <Link href="#top-title" title="顶部" />
                    {
                        link.map((item, i) => {
                            return <Link href={`#Timeline-${item.day}`} title={`第${item.week}周`} key={i} />
                        })
                    }
                </Anchor>
                <div>
                    <Timeline style={{ width: 400, padding: '28px 60px', marginLeft: '44px' }}>
                        {
                            rili.map((item, i) => 
                                <Timeline.Item key={i} id={`Timeline-${item.day}`}>
                                    <label>
                                        第 <em style={{ color: '#108ee9' }}>{item.day}</em> 天
                                    </label>
                                    <p style={{ padding: '0 0 0 20px' }}>- {item.work}</p>
                                    <Popover placement="right" content={item.description || item.work} title={`第 ${item.day} 天`} trigger="hover">
                                        <p style={{textAlign: 'right'}}>
                                            <Button>> 详情</Button>
                                        </p>
                                    </Popover>

                                </Timeline.Item>
                                )
                        }
                    </Timeline>
                </div>
            </div>
        )
    }
}

function mapStateToProps({app}) {
    return {app};
}
  
export default connect(mapStateToProps)(App);
