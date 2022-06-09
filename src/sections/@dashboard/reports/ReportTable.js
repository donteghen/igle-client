
/* eslint-disable camelcase */
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
// material
import { Card, Table, Checkbox, TableRow, TableBody, TableCell, Container,
  TableContainer, TablePagination} from '@mui/material';
// components
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import  ReportListHead from './ReportListHead';
import ReportMoreMenu from './ReportMoreMenu';
// function
import {getAllReportsByAdmin} from '../../../services/api/report'
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'file_type', label: 'File Type', alignRight: false },
  { id: 'Project', label: 'project', alignRight: false },
  { id: 'alert_dispatched', label: 'Alert Dispatched', alignRight: false },
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

ReportTable.propTypes = {
    queryString: PropTypes.string,
}

export default function ReportTable({queryString}) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [reports, setReports] = useState([])

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    if (queryString) {
        fetchReports(queryString)
    }
    else {
        fetchReports()
    }
  }, [])

  const fetchReports = (queryString) => {
    getAllReportsByAdmin(queryString).then(result => {
      if (!result.ok) {
        // eslint-disable-next-line no-alert
        window.alert('error')
        return
      }
      setReports(result.data)
    })
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = reports?.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reports?.length) : 0;

  const filteredReports = applySortFilter(reports, getComparator(order, orderBy), filterName);

  const isReportNotFound = filteredReports.length === 0;

  return (
      <>
      <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ReportListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={reports?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, date, project:{name} , file:{file_type}, alert_dispatched } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" >
                            {fDateTime(date)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" >
                            {file_type}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                            {name}
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={`${alert_dispatched ? 'success' : 'warning'}`}>
                            {alert_dispatched ? 'Yes' : 'No'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <ReportMoreMenu report={row} />
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

                {isReportNotFound && (
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
            count={reports?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      
      </>
  );
}


