import { Form, Col } from 'react-bootstrap';
import React from 'react';

/* ==============================================================
    <DatePicker onChange={} />

    onChange(date) {
        date = {
            day: Number,
            month: Number,
            year: Number
        }
    }
=================================================================== */

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

const getCurrentYear = () => {
    var dateObj = new Date();
    var year = dateObj.getUTCFullYear();

    return year;
};

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: this.props.day,
            month: this.props.month,
            year: this.props.year
        }
        this.startYear = 1920;
        this.currentYear = getCurrentYear();
        this.inputChange = this.inputChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    inputChange(e) {
        switch (e.target.dataset.format) {
            case('day'):
                this.setState({ day: e.target.value });   
                break;
            case('month'):
                this.setState({ month: e.target.value });
                break;
            case('year'):
                this.setState({ year: e.target.value });
                break;
            default:
                console.error('unexpected input');
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (!(prevState.day === this.state.day && prevState.month === this.state.month && prevState.year === this.state.year)) {
            this.sendData();
        }
    }

    sendData() {
        this.props.onChange(this.state);
    }

    render() {
        return (
            <Form.Row>
                <Form.Group as={Col} sm={4} md={2} lg={1} >
                    <Form.Control as="select" required onChange={this.inputChange} data-format="day" value={this.state.day} >
                    <option value="" disabled defaultValue>Day</option>
                    {range(1,31).map((day, i) => <option className="form-select" key={i} value={ day }>{ day }</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={4} md={4} lg={2} >
                    <Form.Control as="select" required onChange={this.inputChange} data-format="month" value={this.state.month} >
                    <option value="" disabled defaultValue>Month</option>
                    {months.map((month, i) => <option className="form-select" key={i+1} value={ i+1 }>{ month }</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={4} md={2} lg={1} >
                    <Form.Control as="select" required onChange={this.inputChange} data-format="year" value={this.state.year} >
                    <option value="" disabled defaultValue>Year</option>
                    {range(this.startYear,this.currentYear).map((year, i) => <option className="form-select" key={i} value={ year }>{ year }</option>)}
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        );
    }
}

export default DatePicker;