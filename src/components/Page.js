import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';
import Footer from './footer';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Igle`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
      <Footer />
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
