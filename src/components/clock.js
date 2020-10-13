import React from 'react';

import ReactMomentCountDown from 'react-moment-countdown'

export default class ClockComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { endCountDown: false };
        this.onCountDownTick = this.onCountDownTick.bind(this)
        this.onCountDownDone = this.onCountDownDone.bind(this)
    }


    onCountDownTick(countdown) {
        this.setState({
            endCountDown: countdown <= 0
        });
    }

    onCountDownDone() {
        //TODO explosions
        console.log("Explosions...")
    }


    render() {

        const dateInFuture = new Date('2020-10-18T12:00:00Z');
        return (
            <ReactMomentCountDown className="clock" toDate={dateInFuture} onTick={this.onCountDownTick} onCountdownEnd={this.onCountDownDone} sourceFormatMask='YYYY-MM-DD HH:mm:ss' />
        );
    }
}

