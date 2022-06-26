/* eslint-disable no-useless-return */
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
// mui components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
// functions
import Iconify from './Iconify';

const tiers = [
  {
    title: 'Standard',
    price: '50,000',
    description: [
      'Weekly Report',
      'Image Report',
      'Report Downloadable',
      'On-demand Reporting',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '80,000',
    description: [
        'Weekly Report',
        'Image Report',
        'Video Report',
        'Report Downloadable',
        'On-demand Reporting',
        'Priority email support',

    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '150,000',
    description: [
        'Weekly Report',
        'Image Report',
        'Video Report',
        '360 VR Image Report',
        'Report Downloadable',
        'On-demand Reporting',
        'Priority email support',
        'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

Plans.propTypes = {
    user: PropTypes.object
}

function Plans({user}) {
    const navigate = useNavigate()
    const handleClicked = () => {
        console.log('cliekds')
        if (user?.id && !user?.isAdmin) {
            navigate('/dashboard/user-projects')
        }
        else if (user?.id && user?.isAdmin) {
          return
        }
        else {
            navigate('/register')
        }
    }
    const getIcon = (title) => {
        switch (title) {
            case 'Pro' :
                return <Iconify icon='ant-design:star-outlined' />
            case 'Enterprise' : 
                return <><Iconify icon='ant-design:star-outlined' /> <Iconify icon='ant-design:star-outlined' /></>  
            default : 
                return null  
        }
    }
    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 2 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Our Flexible Project Plans
        </Typography>
        {/* <Typography variant="h5" align="center" color="text.secondary" component="p">
          Quickly build an effective pricing table for your potential customers with
          this layout. It&apos;s built with default MUI components with little
          customization.
        </Typography> */}
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={getIcon(tier.title)}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h4" color="text.primary">
                      XAF {tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} onClick={handleClicked}>
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
        </>
    )
}

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps)(Plans)