import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import "./Landing.css"
import LoginButton from './LoginButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faVault, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading"


function Landing() {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate()

    if (isLoading) {
        return <Loading />
    }

    if (isAuthenticated) {
        navigate("/ledgers")
    }

    return (<>
        <Container fluid>
            <Row className="fixed-max-width">
                <Col md={6} className="first-col">
                </Col>
                <Col md={6} className="second-col">
                    <h1>Financent</h1>
                    <p>Managing your finances your way</p>
                    <ListGroup horizontal>
                        <ListGroupItem
                        className="items-grid"
                        >
                        <FontAwesomeIcon icon={faFolderPlus} size={"2xl"} />
                        Create ledgers for each account
                        </ListGroupItem>
                        <ListGroupItem
                        className="items-grid"
                        >
                        <FontAwesomeIcon icon={faClock} size={"2xl"} />
                        Forecast your expenses
                        </ListGroupItem>
                        <ListGroupItem
                        className="items-grid"
                        >
                        <FontAwesomeIcon icon={faVault} size={"2xl"} />
                        No connection to your bank needed
                        </ListGroupItem>
                    </ListGroup>
                    <LoginButton />
                </Col>
            </Row>
        </Container>
    </>)

}

export default Landing;