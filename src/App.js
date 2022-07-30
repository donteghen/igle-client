import { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ErrorBoundary from './components/errorboundary'
import SplashScreen from './SplashScreen';
// functions
import * as actions from './redux/actions'


// ----------------------------------------------------------------------


App.propTypes = {
  fetchUser: PropTypes.func,
}

 function App({fetchUser}) {
  const [appIsLoading, SetAppIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('iUserToken')) {
      console.log(localStorage.getItem('iUserToken'))
      fetchUser().then(result => {
        console.log(result.data)
      })
    }
    
    setTimeout(() => {
      SetAppIsLoading(false)
    }, 6000);

  }, [])

  return (
    <ErrorBoundary>       
      <ThemeProvider>
      {appIsLoading ? 
      <SplashScreen />
      :
      <>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </>}
      </ThemeProvider>
    </ErrorBoundary>
  );
}


export default connect(null, actions)(App);