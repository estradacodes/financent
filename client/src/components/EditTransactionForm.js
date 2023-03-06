import { React, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Input, Col, FormGroup, Label, Container} from 'reactstrap'
import Header from "./Navbar"

function EditTransactionForm(props){
    const location = useLocation();
    const [date, setDate] = useState(location.state.date);
    const [type, setType] = useState(location.state.type);
    const [name, setName] = useState(location.state.name);
    const [amount, setAmount] = useState(location.state.amount);
    const [ledgerId, setLedgerId] = useState(location.state.id)
    const [trxId, setTrxId] = useState(location.state.trx_Id);
    
    const navigate = useNavigate();

    const updateData = async (e) => {
        e.preventDefault()
        let response = await fetch("/api/ledger/transaction/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ledger_id: ledgerId,
                trx_id: trxId,
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
            <h3>Edit Transaction Details</h3>
            <p> Please enter the updated details below:</p>
            <Form row onSubmit={updateData}>
            <Col sm={8}>
               <FormGroup className="fg-1">
                <Label for='date'> Date </Label>
               <Input
                type='date'
                value={date}
                placeholder=""
                onChange={(e) => setDate(e.target.value)}
              />
              </FormGroup>
              <FormGroup className='fg-1'>
              <Label for='name'> Name </Label>
               <Input
                    type='name'
                    value={name}
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormGroup>
            <FormGroup className='fg-1'>
            <Label for='date'> Amount </Label>
                <Input
                    type='amount'
                    value={amount}
                    placeholder="amount"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </FormGroup>
            <FormGroup className='fg-1'>
            <Label for='type'> Type </Label>
            <Input
                    type="select"
                    onChange={(e) => setType(e.target[e.target.selectedIndex].text)}
                    value={type}
                >
                    <option>
                    Deposit
                    </option>
                    <option>
                    Withdrawl
                    </option>
                </Input>
            </FormGroup>
                <Button type='submit'>Save</Button>
            </Col>
        </Form>    
        </Container>
    </div>
    )
}
export default EditTransactionForm