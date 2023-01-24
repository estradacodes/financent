import { React, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Input, Col, FormGroup, Label, Container } from 'reactstrap'
import Header from './Navbar'

function AddTransactionForm(props){
    const [date, setDate] = useState([]);
    const [type, setType] = useState([]);
    const [name, setName] = useState([]);
    const [amount, setAmount] = useState([]);
    const location = useLocation();
    const [ledgerId, setLedgerId] = useState(location.state.id)

    const navigate = useNavigate();

    const addData = async (e) => {
        e.preventDefault()
        let response = await fetch("/api/ledger/transaction", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ledger_id: ledgerId,
                date: date,
                name: name,
                amount: amount,
                type: type
            }),
        })
        if (response.status === 200){
            navigate(`/ledgers/view/${ledgerId}`)
        }
    }
    return(
    <div>
        <Header />
        <Container>
        <h3>Add a New Transaction</h3>
        <p> Please enter the new details below:</p>
        <Form row onSubmit={addData}>
            <Col sm={6}>
            <FormGroup className='fg-1'>
               <Label for="date">Date</Label>
               <Input
                type='date'
                value={date}
                placeholder=""
                onChange={(e) => setDate(e.target.value)}
              />
              </FormGroup>
              <FormGroup className='fg-1'>
              <Label for="name">Name</Label>
               <Input
                    type='name'
                    value={name}
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormGroup>
            <FormGroup className='fg-1'>
            <Label for="date">Amount</Label>
                 <Input
                    type='amount'
                    value={amount}
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </FormGroup>
            <FormGroup className='fg-1'>
            <Label for="date">Type</Label>
                <Input
                    type='type'
                    value={type}
                    placeholder="Deposit or Withdrawl"
                    onChange={(e) => setType(e.target.value)}
                />
            </FormGroup>
                <Button type='submit'>Add</Button>
                </Col>
        </Form>    
        </Container>
    </div>
    )
}
export default AddTransactionForm