import React, { useState } from "react";
import { Alert, Card, CardBody, CardTitle } from "reactstrap";

const AlertMessage = ({ message, status }) => {
  return (
    <div>
      <CardBody className="">
        <div>
          <Alert color={status}>
            <i className="bi bi-bell me-2" />
            {message}
          </Alert>
        </div>
      </CardBody>
    </div>
  );
};

export default AlertMessage;
