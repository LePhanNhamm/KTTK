import React from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Menu as MenuIcon,
  MeetingRoom,
  CalendarToday,
  ExitToApp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('token');
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="sticky" elevation={1} sx={{ 
      backgroundColor: 'background.paper',
      color: 'text.primary',
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mr: 3,
              fontWeight: 'bold',
              cursor: 'pointer',
              color: 'primary.main'
            }}
            onClick={() => navigate('/')}
          >
            KARAOKE HAPPY
          </Typography>

          {!isMobile && (
            <>
              <Button 
                startIcon={<CalendarToday />}
                onClick={() => navigate('/bookings')}
                sx={{ mr: 1 }}
              >
                Đặt phòng
              </Button>
              <Button 
                startIcon={<MeetingRoom />}
                onClick={() => navigate('/rooms')}
              >
                Quản lý phòng
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/bookings'); handleClose(); }}>
                  <CalendarToday sx={{ mr: 1 }} /> Đặt phòng
                </MenuItem>
                <MenuItem onClick={() => { navigate('/rooms'); handleClose(); }}>
                  <MeetingRoom sx={{ mr: 1 }} /> Quản lý phòng
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} /> Đăng xuất
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              color="inherit"
              endIcon={<ExitToApp />}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;