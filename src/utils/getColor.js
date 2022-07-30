import { blue,} from '@mui/material/colors';

const BLUEA100 = blue.A100;
const BLUEA200 = blue.A200;
const BLUEA400 = blue.A400;
const BLUEA700 = blue.A700;

// Get  project plan color
export const getPlanColor = (plan) => {
    let color = 'default'
    switch (plan) {
        case 'PHOTO':
            color = BLUEA100
            break;
        case 'VIDEO':
            color = BLUEA200
            break;
        case '360VRWT':
            color = BLUEA400
            break;
        case 'WEBCAM':
            color = BLUEA700
            break;
        default:
            color ='default';
            break;
    }
    return color
}

// Get project status color
export const getStatusColor = (status) => {
    let color = 'default'
    switch (status) {
        case 'PENDING':
            color = 'default'
            break;
        case 'APPROVED':
            color = 'success'
            break;
        case 'COMPLETED':
            color = 'info'
            break;
        default:
            color = 'default';
            break;
    }
    // console.log(color)
    return color
}

// Get active project color
export const getActiveColor = (active) => {
    if (active) {
        return 'success'
    }
    return 'warning'   
}
// Request related ////////////////////////////////////////////////////////////////////////////

// Get project status color
export const getRequestStatusColor = (status) => {
    let color = 'default'
    switch (status) {
        case 'RECIEVED':
            color = 'warning'
            break;
        case 'IN_PROGRESS':
            color = 'info'
            break;
        case 'PROCESSED':
            color = 'success'
            break;
        default:
            color = 'default';
            break;
    }
    // console.log(color)
    return color
}

// Payment related //////////////////////////////////////////////////////////////////////

export const getPaymentRefundedColor = (state) => {
    if (!state) {
        return 'success'
    }
    return 'warning'
}