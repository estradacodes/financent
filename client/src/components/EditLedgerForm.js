import { React, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import "./Forms.css"
import { Form, Button, Input, Col, FormGroup, Label, Container } from 'reactstrap'
import Header from './Navbar'

function EditLedgerForm(props){
    const location = useLocation();

    const [id, setId] = useState(location.state.id);
    const [name, setName ] = useState(location.state.name);
    const [amount, setAmount] = useState(location.state.amount);
    
    const navigate = useNavigate();

    const updateData = async (e) => {
        e.preventDefault()
        let response = await fetch("/api/ledger/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: name,
                amount: amount,
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
        <h3>Edit Ledger Details</h3>
        <p>Please update the details below:</p>
        <Form row onSubmit={updateData}>
            <Col sm={6}>
                <FormGroup className="fg-1">
                <Label for="name"> Name </Label>
               <Input
                type='name'
                value={name}
                placeholder=""
                onChange={(e) => setName(e.target.value)}
              />
              </FormGroup>
              <FormGroup className="fg-1">
                <Label for='amount'> Amount </Label>
                <Input
                    type='amount'
                    value={amount}
                    placeholder="amount"
                    onChange={(e) => setAmount(e.target.value)}
                />
                </FormGroup>
                <Button type='submit'>Save</Button>
            </Col>
         </Form>
        </Container>
    </div>
    )
}
export default EditLedgerForm