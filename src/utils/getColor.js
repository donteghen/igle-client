// Get  project plan color
export const getPlanColor = (plan) => {
    switch (plan) {
        case 'STANDARD':
            return 'default'
        case 'PRO':
            return 'primary'
        case 'ENTERPRISE':
            return 'secondary'
        default:
            return 'default';
    }
}

// Get project status color
export const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'default'
        case 'APPROVED':
            return 'success'
        case 'COMPLETED':
            return 'info'
        default:
            return 'default';
    }
}

// Get active project color
export const getActiveColor = (active) => {
    if (active) {
        return 'success'
    }
    return 'warning'   
}