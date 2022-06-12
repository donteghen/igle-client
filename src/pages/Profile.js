// main imports
import {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// mui components
import Box from "@mui/material/Box"

Profile.propTypes = {
    user: PropTypes.object
}
function Profile ({user}) {
    return (
        <Box>Comming Up soon : {user?.name}</Box>
    )
}
const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(Profile)