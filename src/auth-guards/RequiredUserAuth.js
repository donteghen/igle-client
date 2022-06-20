import PropTypes from 'prop-types'
import { Navigate} from "react-router-dom";
import {connect} from 'react-redux'

RequiredUserAuth.propTypes = {
    children: PropTypes.node,
    user: PropTypes.object
}

function RequiredUserAuth({ children,  user}) {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps)(RequiredUserAuth)