import { filter } from 'lodash';
import PropTypes from 'prop-types'
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import Card from '@mui/material/Card';
import Table  from '@mui/material/Table';
import Stack  from '@mui/material/Stack';
import Avatar  from '@mui/material/Avatar';
import Checkbox  from '@mui/material/Checkbox';
import TableRow  from '@mui/material/TableRow';
import TableBody  from '@mui/material/TableBody';
import TableCell  from '@mui/material/TableCell';
import Container  from '@mui/material/Container';
import TablePagination  from '@mui/material/TablePagination';
import Typography  from '@mui/material/Typography';
import TableContainer  from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// components
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import  ProjectListHead from './ProjectListHead';
import ProjectListToolbar from './ProjectListToolbar';
import ProjectMoreMenu  from './ProjectMoreMenu';
// function
import {getPlanColor, getStatusColor, getActiveColor} from '../../../utils/getColor'
import {getAllProjects} from '../../../services/api/project'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'owner', label: 'Owner', alignRight: false },
  { id: 'active', label: 'Active', alignRight: false },
  { id: 'Plan', label: 'Plan', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_project) => _project.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

ProjectTable.propTypes = {
  queryString: PropTypes.string
}

export default function ProjectTable({queryString}) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [projects, setProjects] = useState([])

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(false)

  const [errorMess, setErrorMess] = useState('')
  const [errorAlert, setErrorAlert] = useState(false)

  useEffect(() => {
    if (errorMess && errorMess.length > 0) {
      setErrorAlert(true)
    }
  }, [errorMess])

  useEffect(() => {
    if (queryString) {
      fetchProjects(queryString)
    }
    else {
        fetchProjects()
    }
  }, [])

  const handleErrorAlertClosed = () => {
    setErrorAlert(false)
    setErrorMess('')
  }

  const fetchProjects = (queryString) => {
      setLoading(true)
      setTimeout(() => {
        getAllProjects(queryString).then(result => {
          setLoading(false)
          if (!result.ok) {
            setErrorMess(result.errorMessage)
            return
          }
          setProjects(result.data)
        }).catch(() => setLoading(false))
      }, 2000);
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = projects?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects?.length) : 0;

  const filteredProjects = applySortFilter(projects, getComparator(order, orderBy), filterName);

  const isProjectNotFound = filteredProjects.length === 0;

  return (
      <Container>
     { errorAlert &&
      <Alert severity="error" onClose={handleErrorAlertClosed}>
        <AlertTitle>Error</AlertTitle>
        {errorMess}
      </Alert>
     }
        <Card>
        {loading && <LinearProgress />}
          <ProjectListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProjectListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={projects?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, owner:{email, avatar}, active, plan, status } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={email} src={avatar} />
                            <Typography variant="subtitle2" noWrap>
                              {email}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                        <Label variant="ghost" color={getActiveColor(active)}>
                          {active ? 'Yes' : 'No'}
                          </Label>                        
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={getPlanColor(plan)}>
                            {sentenceCase(plan)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={getStatusColor(status)}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          <ProjectMoreMenu project={row} active={active} onFetchProjects={fetchProjects} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isProjectNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projects?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
  );
}
