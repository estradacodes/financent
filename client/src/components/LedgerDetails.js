import { React, useRef, useCallback, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table, Row, Col, Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faArrowUpRightFromSquare, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'
import Header from './Navbar'
import "./LedgerDetails.css"

function LedgerDetails (props){
    const [data, setData] = useState(0)
    const dataFetchedRef = useRef(false)

    let { id } = useParams();

    const dollar_formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    const getData = useCallback(async() => {
        let result = await fetch('/api/ledger/view', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                id: id
            }),
        })
        let ledgerData = await result.json()
        setData(ledgerData.data[0])
      },[id])

      const deleteData = async (e, trx_id) => {
        let result = await fetch('/api/ledger/transaction/', {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                ledger_id: id, 
                transaction_id: trx_id
            }),
        })
        if (result.status === 200) {
            getData()
        }
    }
    
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true
        getData()
         .catch(console.error)
    }, [getData]);

    if (data === 0) {
        return( 
            <div>
                <h2>Ledger List</h2>
                <p>....is Loading</p>
            </div>
        )
    } else {
    return (
        <div>
            <Header />
            <Container>
            <h3>Ledger</h3>
            <div className='data'>
                <div className='ledger-info'>
                    <FontAwesomeIcon className="ledger-icon" color="green" icon={faMoneyCheckDollar} />
                    <h5><strong>Name:</strong> {data.name}</h5> 
                    <h5><strong>Starting Balance:</strong> {dollar_formatter.format(data.amount.$numberDecimal)}</h5> 
                    <h5><strong>Running Balance:</strong> {dollar_formatter.format(data.running_bal)}</h5>
                </div>
                <Row className='data-table'>
                    <Col>
                    <Table>
                        <thead>
                            <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Running Balance</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.transactions.map((item) => {
                                return <tr key={item.id}>
                                    <th scope="row">{new Date(item.date).toDateString()}</th>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{dollar_formatter.format(item.amount.$numberDecimal)}</td>
                                    <td>{dollar_formatter.format(item.running)}</td>
                                    <td><Link to={`/ledgers/transaction/edit`} 
                                    state={{ id:id, 
                                            trx_Id:item.id,
                                            date: item.date,
                                            name: item.name,
                                            type: item.type,
                                            amount: item.amount.$numberDecimal
                                            }}><FontAwesomeIcon color="green" icon={faArrowUpRightFromSquare} /></Link></td>
                                    <td><Link onClick={(e) => deleteData(e, item.id)}><FontAwesomeIcon color="black" icon={faTrashCan} /></Link></td>
                                </tr> })}
                        </tbody>
                    </Table>
                    <Link to={'/ledgers/transaction/add'} state={{id:id}}><Button color='secondary'>Add</Button></Link>
                    </Col>
                </Row> 
            </div>        
            </Container>               
        </div>
        )
    }
}

export default LedgerDetails