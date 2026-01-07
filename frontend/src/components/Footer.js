import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 3, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">
        SmartShop - Web Design & Programming Final Project (React + MUI + Spring Boot)
      </Typography>
    </Box>
  );
}
