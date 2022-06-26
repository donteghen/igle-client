/* eslint-disable react/no-unknown-property */
import {useEffect} from 'react'
import PropTypes from 'prop-types'
// mui components
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
// hooks
 import useResponsive from '../../hooks/useResponsive';

VirtualtourReport.propTypes = {
    embbedSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
}
export default function VirtualtourReport ({embbedSrc, title, overview})  {

     const smUp = useResponsive('up', 'sm');

    useEffect(() => {
        console.log(embbedSrc, title)
    }, [])
    return (
        <Box component='div' sx={{width:'100%', height:'100%'}}>
            <iframe title={title} width='100%' height={`${smUp ? '100%' : '60%'}`} src={embbedSrc} frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen />
            <Box sx={{my:2}}>
                <Paper square sx={{bgcolor:'primary.main', p:1, color:'white'}}>
                <h1 style={{textAlign:'center', margin:'10px 0'}}>Quick Overview</h1>
                <p style={{fontSize:'14px'}}>{overview}</p>
                </Paper>
            </Box>
        </Box>
    )
}


