import React, {useState} from 'react'
import {Navbar, Alignment, Button} from '@blueprintjs/core';
import {useHistory, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import UserDropdown from './UserDropdown';
import Badge from '@mui/material/Badge';
import NotifsModal from '../NotifsModal';

const ComposedNavbar: React.FC = () => {

  const history = useHistory();

  const handleOnClick = (link: string) => {
    history.push(link);
  }
  
  const [notifsOpen, setNotifsOpen] = useState(false);

  const handleNotifsClose = () => {
    setNotifsOpen(false);
  }

  const handleNotifsOpen = () => {
    setNotifsOpen(true);
  }

  //@ts-ignore 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  //@ts-ignore 
  const notifs = useSelector(state => state.notif.listNotif);

  return (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>  
        <Navbar.Heading>
          <h2>
            <Link
              to={
                isLoggedIn ? 
                "/home" : 
                "/"
              }
              style={{
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Quantx
            </Link>
          </h2>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp3-minimal" icon="home" text="Home" onClick={() => handleOnClick("/home")} />
        <Button className="bp3-minimal" icon="chart" text="Stock" onClick={() => handleOnClick("/stock-view")} />
        {/* <Button className="bp3-minimal" icon="document" text="Files" onClick={() => handleOnClick("/files")}/> */}
        <Button className="bp3-minimal" icon="social-media" text="Social" onClick={() => handleOnClick("/social")} />

        <Navbar.Divider /> 
        <UserDropdown />

        {
          notifs && notifs.length > 0 ? 

            <Badge variant="dot" color="error">
              <Button 
                className="bp3-minimal" 
                icon="notifications" 
                onClick={() => handleNotifsOpen()}
              />
            </Badge>

            :

            <Button 
              className="bp3-minimal" 
              icon="notifications" 
              onClick={() => handleNotifsOpen()}
            />

        }
        
        {/* <Button className="bp3-minimal" icon="cog" /> */}
      </Navbar.Group>

      <NotifsModal 
        isOpen={notifsOpen}
        handleClose={handleNotifsClose}
        title="Notifications"
      />

    </Navbar>
  )

}

export default ComposedNavbar;