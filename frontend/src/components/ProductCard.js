import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Stack, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          {product.name}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
          <Chip size="small" label={product.categoryName || 'General'} />
          {product.inStock ? (
            <Chip size="small" color="success" label="In stock" />
          ) : (
            <Chip size="small" color="warning" label="Out of stock" />
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          component={RouterLink}
          to={`/products/${product.id}`}
          size="small"
          variant="contained"
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
}
