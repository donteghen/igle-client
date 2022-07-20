// Prop-types
import PropTypes from 'prop-types'
// Material Imports
import {  styled,} from '@mui/material/styles';
import { Grid, Paper} from "@mui/material";

import Iconify from "./Iconify";

const CustomPaper = styled(Paper)({
    textAlign:'center',
    p:2,
    cursor:'pointer',
    transition:'transform 0.5s linear',
    '&:hover': {
        transform:'scale(1.05, 1.05)'
    }
})

const CustomIconify = styled(Iconify) ({
    width:100, 
    height:100,  
    color:'white',
    backgroundColor:'#2065d1',
    borderRadius:'50%'
})

const GridItem = ({title, iconName}) =>  (
        <CustomPaper elevation={6} sx={{textAlign:'center', p:2}}>
            <CustomIconify icon={iconName}  />
            <p>{title}</p>
        </CustomPaper>
    )
GridItem.propTypes = {
    title: PropTypes.string,
    iconName:PropTypes.string,
}    

export function ValueWidgets() {
    return (
        <Grid container spacing={2} justifyContent={{xs:'center', md:'space-between'}} sx={{px:{md:4, lg:16}, py:2}}>
            <Grid item xs={5} md={3} lg={2}>
                <GridItem iconName='dashicons:video-alt3' title='Video Report' />
            </Grid>
            <Grid item xs={5} md={3} lg={2}>
                <GridItem iconName='ic:baseline-photo-library' title='Photo Report' />
            </Grid>
            <Grid item xs={5} md={3} lg={2}>
                <GridItem iconName='teenyicons:360-solid' title='360 VR Report' />
            </Grid>
            <Grid item xs={5} md={3} lg={2}>
                <GridItem iconName='bi:webcam-fill' title='Webcam Report' />
            </Grid>
        </Grid>
    )
}