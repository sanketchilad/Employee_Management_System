import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import '../scss/EmployeePage.scss';

const EmployeeDetailPage = ({
  employee,
  countries,
  onClose,
}) => {
  if (!employee) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Dialog
      open={!!employee}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Employee Details</DialogTitle>

      <DialogContent dividers>
        <Box className="detailContent">
          <Typography variant="h6">
            {employee.name}
          </Typography>

          <Typography>
            Employee Id: {employee.id}
          </Typography>

          <Typography>
            Email: {employee.email}
          </Typography>

          <Typography>
            Mobile: {employee.mobile}
          </Typography>

          <Typography>
            Country:  {countries.find((c) => c.country === employee.country)?.country || employee.country}
          </Typography>

          <Typography>
            State: {employee.state}
          </Typography>

          <Typography>
            District: {employee.district}
          </Typography>

          <Typography>
            Created on: {formatDate(employee.createdAt)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDetailPage;