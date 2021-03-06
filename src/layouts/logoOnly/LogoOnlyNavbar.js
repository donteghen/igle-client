
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// components
import AccountPopover from '../dashboard/AccountPopover';
// import LanguagePopover from '../dashboard/LanguagePopover';
import Logo from '../../components/Logo';
import DemoContactForm from '../../sections/feedback/demoContactForm';



// ----------------------------------------------------------------------

// const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    width:'100%'
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

const activeStyle = {
    margin:'0 20px',
    textDecoration: "underline solid #0f3996 5px",
    color:'#0f3996',
   '@media (max-width: 400px)': {
        display:'none'
    }
  };
const inActiveStyle = {
    margin:'0 20px',
    textDecoration: "none",
    color:'black',
    '@media (maxWidth: 400px)': {
        display:'none'
    }
  };

// LogoOnlyNavbar.propTypes = {
//   onOpenSidebar: PropTypes.func,
// };

export default function LogoOnlyNavbar() {
  const [openDemo, setOpenDemo] = useState(false)

  const handleClosed = () => {
    setOpenDemo(false)
  }
  return (
    <RootStyle>
      <ToolbarStyle>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }} display={{xs:'none', md:'block'}} sx={{mr:3}}>
         <NavLink to="contact" style={({ isActive }) => isActive ? activeStyle : inActiveStyle}>Contact</NavLink>
         <NavLink to="about" style={({ isActive }) => isActive ? activeStyle : inActiveStyle}>About</NavLink>
         <NavLink to="faqs" style={({ isActive }) => isActive ? activeStyle : inActiveStyle}>FAQs</NavLink>
        </Stack>
        <Button variant='outlined' onClick={() => setOpenDemo(true)} sx={{mr:2}}>REQUEST DEMO</Button>
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <LanguagePopover /> */}
          <AccountPopover />
        </Stack>
        <DemoContactForm open={openDemo} onClosed={handleClosed} />
      </ToolbarStyle>
    </RootStyle>
  );
}