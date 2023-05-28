import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

const SignUp = props => {

    const [show, setShow] = React.useState(false);
    const [first, setFirst] = React.useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  
  
    const submitForm = () => {
        console.log('hi')
        handleClose()
        let configObj = {
            method: 'POST',
            headers:{
            'content-type': 'application/json',
            Accept: 'application/json'
            },
        body: JSON.stringify({
            
        })
        }
        //controlled form, save answers in state and use it to send a post request to backend to save new user info - and change state to be logged in
    }

    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
          Sign Up
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstname" placeholder="First name" onChange={(e) => setFirst(e.target.value)}/>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastname" placeholder="Last name"/>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" placeholder="Enter email address" />
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" placeholder="Choose new password" type='password'/>
                <Form.Control type='submit' onClick={()=>submitForm()}/>
              </Form>
          </Modal.Body>
          <Modal.Footer>
          
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default SignUp