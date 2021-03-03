import { Alert } from 'react-bootstrap';

const Flash = (props) => {
    let variant = 'secondary';
    switch (props.type) {
        case 'success':
            variant = 'success';
            break;
        case 'error':
            variant = 'danger';
            break;
        case 'warning':
            variant = 'warning';
            break;
        default:
            variant = 'secondary';
    }

    return (
        <Alert variant={variant} onClose={props.onClose} dismissible>
            {props.message}
        </Alert>
    );
}

export default Flash;