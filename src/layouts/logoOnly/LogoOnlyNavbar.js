
import { NavLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar,} from '@mui/material';
// components
import AccountPopover from '../dashboard/AccountPopover';
import LanguagePopover from '../dashboard/LanguagePopover';
import Logo from '../../components/Logo';



// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
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
        
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          <AccountPopover />
        </Stack>
        
      </ToolbarStyle>
    </RootStyle>
  );
}