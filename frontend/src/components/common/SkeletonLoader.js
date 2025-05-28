import React from 'react';
import { Skeleton, Box, Card, CardContent, Grid } from '@mui/material';

export const TableSkeleton = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" width="100%" height={56} />
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" width="100%" height={52} sx={{ mt: 1 }} />
      ))}
    </Box>
  );
};

export const CardSkeleton = () => {
  return (
    <Card sx={{ height: '100%', minHeight: 120 }}>
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );
};

export const DashboardSkeleton = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="text" width="30%" height={40} sx={{ mb: 3 }} />
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardSkeleton />
          </Grid>
        ))}
      </Grid>
      
      <Skeleton variant="text" width="25%" height={32} sx={{ mb: 2 }} />
      <TableSkeleton />
    </Box>
  );
};

export const FormSkeleton = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="text" width="30%" height={40} sx={{ mb: 3 }} />
      
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
      ))}
      
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mt: 2 }} />
    </Box>
  );
};