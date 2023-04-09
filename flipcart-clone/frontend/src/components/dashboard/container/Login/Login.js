import React, { useState } from 'react'
import Dashboard from '../../Dashboard'
import { Button, Col, Form, Row } from 'react-bootstrap/';
import {  useDispatch } from 'react-redux'
import Container from 'react-bootstrap/esm/Container';
import { Input } from '../../../../utils/input/Input';
import { login } from '../../../../redux/actions';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const userLogin = (e)=>{
        e.preventDefault()
        const user ={
            email,password
        }
        dispatch(login(user))
    }
    return (
        <Dashboard>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                lable="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                lable="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Dashboard>
    )
}
