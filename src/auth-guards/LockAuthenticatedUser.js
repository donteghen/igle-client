/* eslint-disable consistent-return */
import { Navigate} from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { useEffect } from "react";

LockAuthenticatedUser.propTypes = {
    children: PropTypes.node,
    user: PropTypes.object
}
function LockAuthenticatedUser({ children,  user}) {
    useEffect(() => {
        if (user) {
            return <Navigate to='/dashboard/app' replace />;
        }
    }, [user])
    
    if (user) {
      return <Navigate to='/' replace />;
    }
  
    return children;
  }
  const mapStateToProps = ({user}) => ({user})
  export default connect(mapStateToProps)(LockAuthenticatedUser)