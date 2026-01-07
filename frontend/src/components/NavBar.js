import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  const linkButton = (to, label) => (
    <Button
      component={RouterLink}
      to={to}
      color="inherit"
      sx={{
        textTransform: 'none',
        borderBottom: location.pathname === to ? '2px solid rgba(255,255,255,0.9)' : '2px solid transparent',
        borderRadius: 0
      }}
    >
      {label}
    </Button>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <ShoppingCartIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          SmartShop
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {linkButton('/', 'Home')}
          {linkButton('/products', 'Products')}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
