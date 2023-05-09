import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function CheckOutStepes(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>כניסה</Col>
      <Col className={props.step2 ? 'active' : ''}>משלוח</Col>
      <Col className={props.step3 ? 'active' : ''}>תשלום</Col>
      <Col className={props.step4 ? 'active' : ''}>סיום הזמנה</Col>
    </Row>
  );
}
