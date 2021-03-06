import React, { Component } from "react";
import { render } from "react-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
       <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#home">ChatStats</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <NavDropdown title="Visualizations" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Word/emoji</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Time-based</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Comparison</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/*<Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>*/}
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
