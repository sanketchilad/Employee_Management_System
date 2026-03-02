import { Pagination as MuiPagination, Box, Typography } from '@mui/material';
import '../scss/Pagination.scss';

const Pagination = ({ total, page, setPage }) => {
  const rowsPerPage = 10;
  const pageCount = Math.ceil(total / rowsPerPage);

  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, total);

  if (pageCount <= 1) return null;

  return (
    <Box className="paginationContainer">
      {/* Left Side */}
      <Typography variant="body2" className="paginationInfo">
        Showing {start}–{end} of {total}
      </Typography>

      <MuiPagination
        count={pageCount}
        page={page}
        onChange={(e, value) => setPage(value)}
        shape="rounded"
        color="primary"
        size="small"
        siblingCount={0}
        boundaryCount={1}
      />
    </Box>
  );
};

export default Pagination;