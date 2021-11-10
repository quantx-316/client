import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import FlashOnIcon from '@mui/icons-material/FlashOn';
import {  Icon  } from "@blueprintjs/core";

const Landing = () => {
  useEffect(() => {
    AOS.init({
      // initialise with other settings
      duration: 2000,
      once: true, // whether animation should happen only once - while scrolling down
      mirror: true, // whether elements should animate out while scrolling past them
    })
    AOS.refresh()
  }, [])
  const classes = useStyles()
  return (
    <div>
      <header className={classes.headerBackground}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <h1 className={classes.textWrapper}>
              <span className={classes.title} data-aos="fade">
                Create and Backtest Your Algorithms
              </span>
              <span
                className={classes.subTitle}
                data-aos="fade"
                data-aos-delay="500"
              >
                Join the newest Quant Trading Platform
              </span>
            </h1>
          </div>
          <div>
            <a
              href="#/auth"
              type="button"
              className={classes.button}
              data-aos="fade"
              data-aos-delay="1000"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>
      <main>
        <div className={classes.mainContainer}>
          <div className={classes.column}>
            <div className={classes.box} data-aos="fade">
              <Icon icon={"lightning"} size={60} />
              <h3 className={classes.boxTitle}>EXECUTE ALGORITHMS</h3>
              <p className={classes.boxText}>
                Deploy your algorithm for immediate, live backtesting on real
                stock data
              </p>
            </div>
          </div>
          <div className={classes.midColumn}>
            <div className={classes.box} data-aos="fade" data-aos-delay="500">
              <Icon icon={"chart"} size={60} />
              <h3 className={classes.boxTitle}>VISUALIZE PERFORMANCE</h3>
              <p className={classes.boxText}>
                View your algorithm's performance with portfolio summaries and
                detailed execution information
              </p>
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.box} data-aos="fade" data-aos-delay="1000">
              <Icon icon={"confirm"} size={60} />
              <h3 className={classes.boxTitle}>PROVE YOURSELF</h3>
              <p className={classes.boxText}>
                Compete with others in competitions to prove your algorithmic
                prowess and show off your best performances
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const useStyles = makeStyles({
  headerBackground: {
    height: '98vh',
    position: 'relative',
    // backgroundImage: url("https://cdn.quantconnect.com/i/tu/homepage-header-bg.svg"),
    // backgroundRepeat: "repeat-x",
    // backgroundPosition: "center bottom",
    backgroundColor: '#202024',
    maxHeight: '850px',
  },
  container: {
    padding: 'min(40vh - 10rem, 240px) 3rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  wrapper: {
    marginBottom: '2.2rem',
    color: '#fff',
  },
  textWrapper: {},
  title: {
    fontSize: '42px',
    fontFamily: 'Norpeth-DemiBold',
    wordWrap: 'break-word',
  },
  subTitle: {
    marginTop: '2rem',
    display: 'block',
    fontSize: '1.5rem',
    wordWrap: 'break-word',
  },
  button: {
    borderRadius: '4px',
    backgroundColor: '#394A59',
    padding: '1rem 2rem',
    color: '#fff',
    outline: 'none',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
    },
  },

  mainContainer: {
    paddingRight: '15%',
    paddingLeft: '15%',
    maxWidth: '100%',
    display: 'flex',
    borderBottom: '1px solid #edf3fb',
  },
  column: {
    marginRight: '4rem',
    width: 'calc((100% - 2 * 4rem) / 3)',
    float: 'left',
  },
  midColumn: {
    borderRight: '1px solid #e7eaec',
    borderLeft: '1px solid #e7eaec',
    marginRight: '4rem',
    width: 'calc((100% - 2 * 4rem) / 3)',
    float: 'left',
  },
  box: {
    fontSize: '1.5rem',
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
  },
  boxTitle: {
    color: '#313131',
    marginTop: '2rem',
    lineHeight: '2em',
  },
  boxText: {
    fontSize: '20px',
    color: '#313131',
    textAlign: 'center',
    lineHeight: '1.7',
  },
})

export default Landing
