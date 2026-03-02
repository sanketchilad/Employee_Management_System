import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Users } from "lucide-react";
import "../scss/Header.scss";

const Header = () => {
  return (
    <AppBar position="static" className="headerAppBar">
      <Toolbar className="headerToolbar">
        <Box className="headerLogoTitle">
          <Box className="logoWrapper">
            <Users className="logoIcon" />
          </Box>
          <Typography variant="h6" className="headerTitle">
            Employee Management System
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;