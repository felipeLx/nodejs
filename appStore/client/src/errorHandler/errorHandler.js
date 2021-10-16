import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const windowAlertUsername = () => {
    return(
    <Alert className="alert alert-danger" role="alert" variant="danger">
        <strong>This username is not allowed!</strong>
    </Alert>
    );
};