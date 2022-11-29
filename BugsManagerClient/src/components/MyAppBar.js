import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// icons
import IconButton from '@mui/material/IconButton';
import { Tooltip, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import BugReportIcon from '@mui/icons-material/BugReport';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const APP_NAME = "Bugs Manager Online";

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {APP_NAME}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Summary">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color={'inherit'} startIcon={<BugReportIcon />}>
                Summary
              </Button>
            </Link>
          </Tooltip>

          <Tooltip title="Filtering Bugs">
            <Link to="/bugs" style={{ textDecoration: 'none', color: 'white' }}>
              <Button color={'inherit'} startIcon={<FilterAltIcon />}>
                Filtering Bugs
              </Button>
            </Link>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
