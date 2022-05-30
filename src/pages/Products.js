import { useEffect, useState } from 'react';
import {connect} from 'react-redux'
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import * as actions from '../redux/actions'

// ----------------------------------------------------------------------

function EcommerceShop({user, fetchUser}) {
  const [openFilter, setOpenFilter] = useState(false);
  useEffect(() => {
    fetchUser().then(res => console.log(res)).catch(e => console.log(e))
  }, [])
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products {user ? user.name : 'no auth'}
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => ({user : state.user})
export default connect(mapStateToProps, actions)(EcommerceShop);