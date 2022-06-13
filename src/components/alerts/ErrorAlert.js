// main import
import PropTypes from 'prop-types'

// mui components
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'


// other components
import Iconify from '../Iconify'

ErrorAlert.propTypes = {
    open: PropTypes.bool,
    onOpenChanged: PropTypes.func,
    message:PropTypes.string,
    title: PropTypes.string,
}

export default function ErrorAlert ({ open, onOpenChanged, message, title }) {

    return (
        <Dialog 
        open={open}
        onClose={() => onOpenChanged(false)}
        aria-describedby="error-alert-dialog-slide"
        >
            <DialogTitle>
                <h1><Iconify icon='bxs:error-circle'  style={{color:'red', verticalAlign:'middle', fontSize:'30px'}} />{title}</h1>
            </DialogTitle>
            <DialogContent>
                <div>
                <Divider/>
                <h3>{message}</h3>
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => onOpenChanged(false)}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}