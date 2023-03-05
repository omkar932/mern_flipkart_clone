import React from 'react'
import { Form } from 'react-bootstrap'

export const Input = (props) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{props.lable}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <Form.Text className="text-muted">
        {props.errorMessage}
      </Form.Text>
    </Form.Group>
  )
}
