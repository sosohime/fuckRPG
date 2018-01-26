import React from 'react';

class TJTimer extends React.Component {
                // d: parseInt(leee / 1000 / 60 / 60 / 24),
                // h: parseInt(leee / 1000 / 60 / 60 % 24),
                // m: parseInt(leee / 1000 / 60 % 60 ),
                // s: parseInt(leee / 1000 % 60 ),
                // ss: parseInt(leee % 1000)
    constructor(props) {
        super(props);
        this.state = {
            taijianDate: new Date('2017-08-06 18:07:00'),
            // now: new Date(),
            // leee: new Date().getTime() - new Date('2017-08-06 18:07:00').getTime(),
            gezi:{
                d: '-',
                h: '-',
                m: '-',
                s: '-',
                ss: '-'
            },
        }
    }

    componentDidMount(next) {
        //控制数字的滚动
        if(!this.timer) {
            this.timer = setInterval(
                () => {
                    let now = new Date();
                    let leee = now.getTime() - this.state.taijianDate.getTime();

                    this.setState({
                        gezi: {
                            d: parseInt(leee / 1000 / 60 / 60 / 24),
                            h: parseInt(leee / 1000 / 60 / 60 % 24),
                            m: parseInt(leee / 1000 / 60 % 60 ),
                            s: parseInt(leee / 1000 % 60 ),
                            ss: parseInt(leee % 1000)
                        }
                    });
                },
                50
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        let gezi = this.state.gezi;
        return (
            <label 
                style={{ padding: '10px 0 4px 30px' }}
            >
                董师傅已经太监了 
                <span style={{ color: 'red' }}>
                    {`${gezi.d}天 ${gezi.h}小时 ${gezi.m}分 ${gezi.s}秒 ${gezi.ss}毫秒`}
                </span>
            </label>
        )
    }
}

export default TJTimer;