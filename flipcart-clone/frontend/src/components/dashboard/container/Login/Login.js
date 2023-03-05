import React from 'react'
import Dashboard from '../../Dashboard'
import { Button, Col, Form, Row } from 'react-bootstrap/';
import Container from 'react-bootstrap/esm/Container';
import { Input } from '../../../../utils/input/Input';
export const Login = () => {
    return (
        <Dashboard>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
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
