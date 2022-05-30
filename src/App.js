import { useEffect } from 'react';
import {connect} from 'react-redux'

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


 function App({fetchUser, user}) {
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

const mapStateToProps = (state) => ({user : state.user})
export default connect(mapStateToProps, actions)(App);