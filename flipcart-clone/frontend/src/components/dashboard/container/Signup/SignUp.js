import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap/';
import { Input } from '../../../../utils/input/Input';
import Dashboard from '../../Dashboard'

export const SignUp = () => {
    return (
        <Dashboard>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        lable="First Name"
                                        placeholder="First Name"
                                        value=""
                                        type="text"
                                        onChange={() => { }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        lable="Last Name"
                                        placeholder="Last Name"
                                        value=""
                                        type="text"
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>
                            <Input
                                lable="Email"
                                placeholder="Email"
                                value=""
                                type="email"
                                onChange={() => { }}
                            />

                            <Input
                                lable="Password"
                                placeholder="Password"
                                value=""
                                type="password"
                                onChange={() => { }}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Dashboard>
    )
}
