import { Form } from 'react-bootstrap';
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

class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: 1,
            month: 1,
            year: 1970
        }

        this.inputChange = this.inputChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    inputChange(e) {
        switch (e.target.dataset.format) {
            case('day'):
                this.setState({ day: e.target.value }, this.sendData());   
                break;
            case('month'):
                this.setState({ month: e.target.value }, this.sendData());
                break;
            case('year'):
                this.setState({ year: e.target.value }, this.sendData());
                break;
            default:
                console.error('unexpected input');
        }
    }

    sendData() {
        this.props.onChange(this.state);
    }

    render() {
        return (
            <>
                <Form.Control required onChange={this.inputChange} data-format="day" placeholder="Password" />
                <Form.Control required onChange={this.inputChange} data-format="month" placeholder="Password" />
                <Form.Control required onChange={this.inputChange} data-format="year" placeholder="Password" />
            </>
        );
    }
}

export default DatePicker;