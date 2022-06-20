/* eslint-disable no-useless-return */
import {useSearchParams, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
// mui components
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
// other components
import Page from '../components/Page'
import Iconify from '../components/Iconify'
// functions 
import { verifyNewUserAccount } from '../services/api/user'


export default function AccountVerification () {
    const navigate = useNavigate()
    const [searchParam, setSearchParam] = useSearchParams()
    const [completed, setCompleted] = useState(false)

    const [loading, setLoading] = useState(false)
    const [errorMess, setErrorMess] = useState('')


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            const userId = searchParam.get('userId')
            console.log(userId)
            verifyNewUserAccount(userId).then(result => {
                setLoading(false)
                if (!result.ok) {
                    setErrorMess(result.errorMessage)
                    return
                }
                setCompleted(true)
            }).catch(e => setLoading(false))
        }, 2000);
    }, [])

    const handleClicked = () => {
        navigate('/dashboard/app')
    }
    return (
        <Page title='Verify Account'>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Box component='div' sx={{mt:10, py:4, px:{xs:1, md:12}}}>
                <Paper elevation={4} square sx={{py:4, px:{xs:2, md:4, textAlign:'center'}}}>
                    {(!loading && completed) && <><Typography component='h1' sx={{ fontSize:'40px', my:4}}>
                     <Iconify icon='teenyicons:tick-circle-solid' style={{color:'green',}} /> Thanks for confirming
                    </Typography>
                    <Typography component='p' sx={{color:'text.secondary', my:4}}>
                        You account is has been verified successfully. You may now start creating projects and taking advantage of other features.
                    </Typography>
                    <Button onClick={handleClicked} size='large' variant='contained'>
                        Go to Dashboard
                    </Button>
                    </>}
                    {(!loading && !completed) && <><Typography component='h1' sx={{ fontSize:'40px', my:4}}>
                     <Iconify icon='bxs:error' style={{color:'red',}} /> Opps Something went wrong!
                    </Typography>
                    <Typography component='p' sx={{color:'text.secondary', my:4}}>
                        {errorMess}
                    </Typography>
                    <Typography component='p' sx={{color:'text.secondary', my:4}}>
                        You account verification failed. To resolve this issue, please contact support now.
                    </Typography>
                    <Button onClick={handleClicked} size='large' variant='contained'>
                        Contact Support
                    </Button>
                    </>}
                    {loading && <h2>Please wait while we complete the verification process.</h2>}
                </Paper>
            </Box>
        </Page>
    )
}