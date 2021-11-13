import React, {useState} from 'react'
import {Navbar, Alignment, Button} from '@blueprintjs/core';
import {useHistory, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import UserDropdown from './UserDropdown';
import Badge from '@mui/material/Badge';
import StarredModal from '../StarredModal';
import SettingsModal from '../SettingsModal';

const ComposedNavbar: React.FC = () => {

  const history = useHistory();

  const handleOnClick = (link: string) => {
    history.push(link);
  }

  //@ts-ignore 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleSettingsClose = () => {
    setSettingsOpen(false);
  }
  const handleSettingsOpen = () => {
    if (isLoggedIn) {
      setSettingsOpen(true);
    }
  }
  
  const [starOpen, setStarOpen] = useState(false);

  const handleStarClose = () => {
    setStarOpen(false);
  }

  const handleStarOpen = () => {
    if (isLoggedIn) {
      setStarOpen(true);
    }
  }

  const [stockOpen, setStockOpen] = useState(false);

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
              QuantX
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
        <Button 
          className="bp3-minimal" 
          icon="star" 
          onClick={() => handleStarOpen()}
        />        
        <Button 
          className="bp3-minimal" 
          icon="cog" 
          onClick={() => handleSettingsOpen()}
        />        
      </Navbar.Group>

      <StarredModal 
        isOpen={starOpen}
        handleClose={handleStarClose}
        title="Starred"
      />

      <SettingsModal 
        isOpen={settingsOpen}
        handleClose={handleSettingsClose}
        title="Settings"
      />

    </Navbar>
  )

}

export default ComposedNavbar;