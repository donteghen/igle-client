export const setBaseUrl = () => {

    console.log(process.env.NODE_ENV)
    let baseUrl = null

    if (process.env.NODE_ENV === 'production') {
        baseUrl = 'api/';
        return baseUrl
    }

    baseUrl = `${process.env.REACT_APP_API_BASE_URL}api/`
    
    return baseUrl
}