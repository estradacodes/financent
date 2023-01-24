import { React, useRef, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Row, Col, Button, Container } from 'reactstrap'
import "./Ledger.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";

import Header from './Navbar'
import Loading from './Loading'

function Ledgers (props){
    const { user, isAuthenticated, isLoading } = useAuth0(); 
    const [appUser, setAppUser] = useState(user)
    const [data, setData] = useState(0)
    const dataFetchedRef = useRef(false)
    
    const navigate = useNavigate();
    
    const getData = useCallback(async() => {
        let result = await fetch('/api/ledger/list', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                user: appUser.sub
            }),
        })
        let ledgerData = await result.json()
        setData(ledgerData.data)
      },[appUser])

      const deleteData = async (e, id) => {
        let result = await fetch('/api/ledger/delete', {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                id: id
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

    if (!isAuthenticated){
        navigate("/")
    }

    if (data === 0 || isLoading) {
        return( 
            <div>
                <Header />
                <Loading />
            </div>
        )
    } else {
    return (
        <div>
            <Header />
            <Container>
            <h3>Ledger List</h3>
            <Row md='2'>
                <Col>
                <Table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                        return <tr key={item.id}>
                        <th scope="row">{item.name}</th>
                        <td>${item.amount.$numberDecimal}</td>
                        <td><Link to={`/ledgers/view/${item.id}`}><FontAwesomeIcon color="green" icon={faArrowUpRightFromSquare} /></Link></td>
                        <td><Link to='edit' state={{id: item.id, name: item.name, amount: item.amount.$numberDecimal}}><FontAwesomeIcon color="grey" icon={faPenToSquare} /></Link></td>
                        <td><Link onClick={(e) => deleteData(e, item.id)}><FontAwesomeIcon color="black" icon={faTrashCan} /></Link></td>
                        </tr> })}
                    </tbody>
                </Table>
                <Link to="add"><Button color='secondary'>Add</Button></Link>
                </Col>
            </Row>
            </Container>
        </div>

        )
    }
}
export default Ledgers