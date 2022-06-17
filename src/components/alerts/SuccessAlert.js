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

SuccessAlert.propTypes = {
    open: PropTypes.bool,
    onClosed: PropTypes.func,
    message:PropTypes.string,
    title: PropTypes.string,
}

export default function SuccessAlert ({ open, onClosed, message, title }) {

    return (
        <Dialog 
        open={open}
        onClose={() => onClosed(false)}
        aria-describedby="success-alert-dialog-slide"
        >
            <DialogTitle>
                <h1><Iconify icon='ep:success-filled'  style={{color:'green', verticalAlign:'middle', fontSize:'60px'}} />{title}</h1>
            </DialogTitle>
            <DialogContent>
                <div>
                <Divider/>
                <h3>{message}</h3>
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => onClosed(false)} variant='outlined'>OK</Button>
            </DialogActions>
        </Dialog>
    )
}