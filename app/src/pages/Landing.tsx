import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'
import { Icon } from '@blueprintjs/core'

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
              <div className="animate__animated animate__lightSpeedInLeft">
                <span className={classes.title}>
                  Create and Backtest Your Algorithms
                </span>
              </div>
              <div className="animate__animated animate__lightSpeedInRight">
                <span className={classes.subTitle} data-aos-delay="500">
                  Join the newest Quant Trading Platform
                </span>
              </div>
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
              <Icon icon={'lightning'} size={60} />
              <h3 className={classes.boxTitle}>EXECUTE ALGORITHMS</h3>
              <p className={classes.boxText}>
                Deploy your algorithm for immediate, live backtesting on real
                stock data
              </p>
            </div>
          </div>
          <div
            className={classes.midColumn}
            data-aos="fade"
            data-aos-delay="500"
          >
            <div className={classes.box}>
              <Icon icon={'chart'} size={60} />
              <h3 className={classes.boxTitle}>VISUALIZE PERFORMANCE</h3>
              <p className={classes.boxText}>
                View your algorithm's performance with portfolio summaries and
                detailed execution information
              </p>
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.box} data-aos="fade" data-aos-delay="1000">
              <Icon icon={'confirm'} size={60} />
              <h3 className={classes.boxTitle}>PROVE YOURSELF</h3>
              <p className={classes.boxText}>
                Compete with others in competitions to prove your algorithmic
                prowess and show off your best performances
              </p>
            </div>
          </div>
        </div>
        <section className={classes.algoSection}>
          <div className={classes.rowGrid}>
            <div className={classes.col1} data-aos="fade" data-aos-delay="500">
              <img src="EditorIcon.png" alt="" className={classes.editorIcon}/>
              <h3 className={classes.algoTitle}>
                Code Algorithms In A Browser Based IDE, with Free Financial Data
              </h3>
              <p className={classes.algoText}>
                Design and test your strategy on our free data. Code in multiple
                programming languages to run your backtest to analyze your strategy.
              </p>
            </div>
            <div className={classes.col2} data-aos="fade" data-aos-delay="500">
              <img src="EditorScreen.png" alt="" className={classes.img} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const useStyles = makeStyles({
  editorIcon: {
    width: '70px'
  },
  col1: {
    marginRight: '4rem',
    width: 'calc((100% - 6rem) / 2)',
  },
  col2: {
    width: 'calc((100% - 6rem) / 2)',
  },
  img: {
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  algoSection: {
    padding: '3rem 2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rowGrid: {
    maxWidth: '114rem',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    padding: '5rem 10rem',
  },
  algoTitle: {
    fontSize: '2rem',
    color: '#313131',
    lineHeight: '1.4em',
    marginBottom: '1rem',
    marginTop: '2.5rem',
  },
  algoText: {
    fontSize: '20px',
    color: '#313131',
    lineHeight: '1.7'
  },
  headerBackground: {
    height: '98vh',
    position: 'relative',
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
    // fontFamily: 'Norpeth-DemiBold',
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
    backgroundColor: '#394A54',
    padding: '1rem 2rem',
    color: '#fff',
    outline: 'none',
    fontSize: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    // fontFamily: 'Norpeth-DemiBold',
    fontWeight: 'bold',
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
