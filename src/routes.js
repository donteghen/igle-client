import { Navigate, useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/logoOnly/LogoOnlyLayout';
// Common pages imports
import Blog from './pages/Blog';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Contact from './pages/Contact';
import About from './pages/About';
import Faqs from './pages/Faqs';
import PrivacyPolicy from './pages/Privacy';
import TermsOfUse from './pages/Terms';
import Profile from './pages/Profile'
import Home from './pages/Home';
// auth guard import 
import RequiredUserAuth from './auth-guards/RequiredUserAuth';
import LockAuthenticatedUser from './auth-guards/LockAuthenticatedUser';
// user protected imports
import UserProjects from './pages/UserProject'
import UserRequests from './pages/UserRequest';
import UserProjectDetail from './pages/UserProjectDetail'
// admin protected imports
import Users from './pages/User';
import Projects from './pages/Project';
import Requests from './pages/Request';
import Testimonials from './pages/Testimonial';
import Reports from './pages/Report';
import ContactMessages from './pages/ContactMessage';
import AccountVerification from './pages/AccountVerification';
import ResetPassword from './pages/ResetPassword';
import ConfirmResetPassword from './pages/ConfirmResetPassword';


// ----------------------------------------------------------------------

Router.propTypes = {
  user: PropTypes.object
}
 function Router({user}) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <RequiredUserAuth>
              <DashboardLayout />
              </RequiredUserAuth>,
      children: [
        { path: 'profile', element: <Profile user={user} /> },

        { path: 'app', element: <DashboardApp /> },
        { path: 'user-projects/:id', element: <UserProjectDetail /> },
        { path: 'user-projects', element: <UserProjects /> },
        { path: 'user-requests', element: <UserRequests /> },

        { path: 'users', element: <Users /> },
        { path: 'projects', element: <Projects /> },
        { path: 'reports', element: <Reports /> },
        { path: 'requests', element: <Requests /> },
        { path: 'contact-messages', element: <ContactMessages /> },
        { path: 'testimonials', element: <Testimonials /> },
        { path: 'products', element: <Products /> },
        { path: 'blogs', element: <Blog /> },
        { path: '', element: <Navigate to="/dashboard/app" /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        {path: 'terms-of-use', element: <TermsOfUse />},
        {path: 'home', element: <Home />},
        {path: 'privacy-policy', element: <PrivacyPolicy />},
        {path: 'faqs', element: <Faqs />},
        {path: 'about', element: <About />},
        {path: 'contact', element: <Contact />},
        { path: '/confirm-reset-password', element: <ConfirmResetPassword /> },
        { path: '/reset-password', element: <ResetPassword /> },
        { path: '/account-verification', element: <AccountVerification /> },
        { path: '/', element: <Navigate to="/home" /> },
        { path: 'login', 
        element: <LockAuthenticatedUser>
                    <Login />
                  </LockAuthenticatedUser> },
        { path: 'register', 
        element:<LockAuthenticatedUser>
                  <Register />
                </LockAuthenticatedUser>  },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const mapStateToProps = ({user}) => ({user})
export default connect(mapStateToProps, null)(Router)