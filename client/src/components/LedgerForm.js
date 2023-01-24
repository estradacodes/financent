import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Form, Button, Input, Col, FormGroup, Label, Container } from 'reactstrap'
import "./Forms.css"
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Navbar';

function LedgerForm(props){
    const [name, setName] = useState([]);
    const [amount, setAmount] = useState([]);

    const { user } = useAuth0();
    
    const navigate = useNavigate();

    const addData = async (e) => {
        e.preventDefault()
        let response = await fetch("/api/ledger/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.sub,
                name: name,
                amount: amount
            }),
        })
        if (response.status === 200){
            navigate('/ledgers')
        }
    }
    return(
    <div>
        <Header />
        <Container>
        <h3> Adding a Ledger</h3>
        <p>Please enter the details below:</p>
        <Form row onSubmit={addData}>
            <Col sm={6}>
               <FormGroup className='fg-1'>
               <Label for ="name">Name</Label> 
               <Input
                type='name'
                value={name}
                placeholder="New Ledger Name"
                onChange={(e) => setName(e.target.value)}
              />
              </FormGroup>
              <FormGroup className='fg-1'>
                <Label for="amount">Amount</Label>
             <Input
                type='amount'
                value={amount}
                placeholder="Starting Amount"
                onChange={(e) => setAmount(e.target.value)}
            />
            </FormGroup>
            <Button type='submit'>Add</Button>
            </Col>
        </Form>
        </Container>    
    </div>
    )
}
export default LedgerForm