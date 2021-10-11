import React from 'react'
import Nav from 'react-bootstrap/Nav';
import {Navbar, Alignment, Button} from '@blueprintjs/core';
import {useHistory} from 'react-router-dom';

const ComposedNavbar: React.FC = () => {

  const history = useHistory();

  const handleOnClick = (link: string) => {
    history.push(link);
  }

  return (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>  
        <Navbar.Heading>
          <h2>
            Quantx
          </h2>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="chart" text="Stock" onClick={() => handleOnClick("/stock-view")} />
        <Button className="bp3-minimal" icon="social-media" text="Social" />
        <Button className="bp3-minimal" icon="document" text="Files" onClick={() => handleOnClick("/files")}/>
        <Navbar.Divider /> 
        <Button className="bp3-minimal" icon="user" />
        <Button className="bp3-minimal" icon="notifications" />
        <Button className="bp3-minimal" icon="cog" />
      </Navbar.Group>
  {/* 
      <Container>
        <div> 
          <Navbar.Brand href="#home">
            QuantX
          </Navbar.Brand>
        </div>

        <div
          style={{display: "flex", justifyContent: "space-between"}}
        >
          <Nav className="me-auto">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Tutorials</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#login">John Doe</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </div>
      </Container> */}
    </Navbar>
  )

}

export default ComposedNavbar;