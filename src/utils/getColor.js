// Get  project plan color
export const getPlanColor = (plan) => {
    let color = 'default'
    switch (plan) {
        case 'STANDARD':
            color ='default'
            break;
        case 'PRO':
            color ='primary'
            break;
        case 'ENTERPRISE':
            color ='secondary'
            break;
        default:
            color ='default';
            break;
    }
    // console.log(color)
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