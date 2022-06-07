import { useEffect } from 'react';
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
// functions
import * as actions from './redux/actions'


// ----------------------------------------------------------------------


App.propTypes = {
  fetchUser: PropTypes.func
}

 function App({fetchUser}) {
  useEffect(() => {
    fetchUser().then(result => console.log(result))
  }, [])

  
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default connect(null, actions)(App);