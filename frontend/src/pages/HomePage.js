import React, { useEffect, useState } from 'react';
import { Typography, Grid, Alert, Skeleton, Stack, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { api } from '../api';
import { Link as RouterLink } from 'react-router-dom';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await api.get('/products/featured');
        if (mounted) setProducts(res.data);
      } catch (e) {
        if (mounted) setError('Failed to load products from backend. Make sure Spring Boot is running on port 8080.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 900 }} gutterBottom>
            Featured Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Products are fetched from Spring Boot backend.
          </Typography>
        </div>
        <Button component={RouterLink} to="/products" variant="outlined">
          View all products
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={180} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))
        ) : (
          products.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
