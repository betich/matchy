import React from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import Loading from '../../../Components/Loading';

class ViewUser extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.getData = this.getData.bind(this);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios
        .get(`/app/users/${this.props.match.params.id}`)
        .then((res) => res.data)
        .then((user) => {
            this.setState({ user, loading: false });
        })
        .catch((err) => console.error(err))
    }

    render() {
        const { loading, user } = this.state;
        return (
            <>
            { loading ? (<Loading />) : (
                <>
                    <Card
                        bg="white"
                        text="black"
                        style={{ width: '18rem' }}
                        className="mb-2"
                        >
                        <Card.Header>{user.name.first + ' ' + user.name.last}</Card.Header>
                        <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                            interests: {user.interests.join(', ')}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </>
            )}
            </>
        );
    }
}

export default ViewUser;