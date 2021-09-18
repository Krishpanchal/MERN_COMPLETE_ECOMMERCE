import React from "react";
import { Spinner } from "react-bootstrap";

const SpinLoader = () => {
  return (
    <Spinner
      as='span'
      animation='grow'
      size='sm'
      role='status'
      aria-hidden='true'
    />
  );
};

export default SpinLoader;
