import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';

const Sidebar = () => {
  // Basic menu items without icons
  const menuItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Phòng hát', path: '/rooms' },
    { text: 'Đặt phòng', path: '/bookings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px', // Adjust based on your header height
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => window.location.href = item.path}
            selected={window.location.pathname === item.path}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;