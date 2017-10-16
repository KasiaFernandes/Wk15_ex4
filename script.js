class Stopwatch extends React.Component {
    constructor() {
        super();
        // this.reset();
        // initial state
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
            },
            running: false,
            list: []
        }
    }

    reset() {
        // in React, you can't directly alter the state; you can only set it in constructor
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }



    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;

        function pad0(value) {
            let result = value.toString();
            if (result.length < 2) {
                result = "0" + result;
            }
            return result;
        }
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            })
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        let { miliseconds, seconds, minutes } = this.state.times;

        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            times: {
                miliseconds: miliseconds, //same as "miliseconds,"
                seconds: seconds,
                minutes //same as minutes: minutes; if key is same as value
            }
        });
    }

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }

    addToList() {
        if (!this.state.running) {
            var currentResult = this.format(this.state.times);
            this.setState({
                list: [...this.state.list, currentResult]
            })
        }
    }

    resetList() {
        //timesList.innerHTML = "";
        this.setState({
            list: []
        })
    }

    render() {
        return (
            <div className="outer">
                <nav className="controls">
                    <a href="#" className="button" onClick={this.start.bind(this)}>Start</a>
                    <a href="#" className="button" onClick={this.stop.bind(this)}>Stop</a>
                    <a href="#" className="button" onClick={this.reset.bind(this)}>Reset</a>
                    <a href="#" className="button" onClick={this.addToList.bind(this)}>Add to List</a>
                    <a href="#" className="button" onClick={this.resetList.bind(this)}>Reset List </a>
                </nav>
                <div className="stopwatch">{this.format(this.state.times)}</div>
                <h4>Results List</h4>
                <ul id="results">{this.state.list.map(item => <li>{item}</li>)}</ul>
            </div>
        )
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById("stopwatch"));

