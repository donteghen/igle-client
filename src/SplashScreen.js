import styled from '@emotion/styled';


const CoverStyle = styled('div')(({ theme }) => ({
    height: '100vh',
    width:'100%',
    padding: theme.spacing(3),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(to left, rgba(15, 57, 150, 1), rgba(15, 57, 150,1))',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0)
      // padding: theme.spacing(7, 5, 0, 7),
    },
  }));

  const OverlayTextStyle = styled('div')(({ theme }) => ({
    transform: 'translateY(30vh)',
    textAlign:'center',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0),
      transform: 'translateY(40vh)',
    },
  }));


export default function SplashScreen () {
      return(
          <CoverStyle>
            <OverlayTextStyle>
                <p style={{margin:'auto'}}>
                    <img src='/static/mock-images/reports/video-icon.png' 
                    alt='logo' width='100px' height='100px'
                    className="animate__animated animate__pulse animate__infinite animate__slow" />
                </p>
                <p style={{textTransform:'capitalize', fontWeight:'bold', color:'white', marginTop:'10px'}}
                    className="animate__animated animate__bounceInUp animate__4 animate__slow">
                    Your Build, We Document.
                </p>
            </OverlayTextStyle>
          </CoverStyle>
      )
  }