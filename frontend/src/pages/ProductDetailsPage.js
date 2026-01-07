import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { api } from '../api';
import { Alert, Button, Chip, Divider, Paper, Skeleton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        if (mounted) setP(res.data);
      } catch (e) {
        if (mounted) setError('Product not found or backend is not running.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, [id]);

  return (
    <>
      <Button component={RouterLink} to="/products" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to products
      </Button>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Skeleton width="40%" />
          <Skeleton />
          <Skeleton />
          <Skeleton width="30%" />
        </Paper>
      ) : p ? (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {p.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Chip label={p.categoryName || 'General'} />
              {p.inStock ? <Chip color="success" label="In stock" /> : <Chip color="warning" label="Out of stock" />}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">
              {p.description}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 900, mt: 2 }}>
              ${p.price}
            </Typography>
          </Stack>
        </Paper>
      ) : null}
    </>
  );
}
