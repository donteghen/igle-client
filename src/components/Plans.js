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
    step:'1',
    title: 'Join',
    description: [
      'After reading',
      '& deciding which',
      'what plan suites',
      'your project, then',
      'create an account'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'contained',
  },
  {
    step:'2',
    title: 'Creation',
    description: [
      'Once your account',
      'has been verified',
      'start creating a',
      'project profile and',
      'wait for confirmation'
    ],
    buttonText: 'Create Project',
    buttonVariant: 'outlined',
  },
  {
    step:'3',
    title: 'Payment',
    description: [
      'Pick a payment',
      'method options',
      'make your payment',
      'submit a receipt ',
      'via email & done'
    ],
    buttonText: 'Done',
    buttonVariant: 'outlined',
  },
];

Plans.propTypes = {
    user: PropTypes.object
}

function Plans({user}) {
    const navigate = useNavigate()
    const handleClicked = () => {
        
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
    const getIcon = (step) => {
        switch (step) {
            case '1' :
                return <Iconify icon='icon-park-outline:open-an-account' style={{fontSize:'40px'}} />
            case '2' : 
                return <Iconify icon='ant-design:file-add-outlined' style={{fontSize:'40px'}} />  
            case '3' : 
                return <Iconify icon='material-symbols:payments-outline-rounded' style={{fontSize:'40px'}} /> 
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
          How It Works
        </Typography>
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
              md={4}
            >
              <Card>
                <CardHeader
                  title={getIcon(tier.step)}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  
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
                    {tier.step}. {' '} {tier.title}
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
                    {tier.buttonText}
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