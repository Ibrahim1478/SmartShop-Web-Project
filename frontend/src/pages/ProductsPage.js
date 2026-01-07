import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Grid, Alert, TextField, InputAdornment, Skeleton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../components/ProductCard';
import { api } from '../api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await api.get('/products');
        if (mounted) setProducts(res.data);
      } catch (e) {
        if (mounted) setError('Failed to load products.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter(p =>
      (p.name || '').toLowerCase().includes(term) ||
      (p.description || '').toLowerCase().includes(term) ||
      (p.categoryName || '').toLowerCase().includes(term)
    );
  }, [products, q]);

  return (
    <>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search and view product details.
        </Typography>
      </Stack>

      <TextField
        value={q}
        onChange={(e) => setQ(e.target.value)}
        fullWidth
        placeholder="Search by name, category, description..."
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2}>
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={180} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))
        ) : (
          filtered.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
