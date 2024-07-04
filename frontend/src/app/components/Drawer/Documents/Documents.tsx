import React from 'react';
import { Container, Grid, Typography, Paper, Box, Divider } from '@mui/material';

const DocumentPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Documents Information
      </Typography>
      <Grid container spacing={4}>
        {documents.length > 0 ? (
          documents.map((document, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                {document.adhaarCard && (
                  <Box mb={2}>
                    <Typography variant="h6">Adhaar Card</Typography>
                    <Typography color="textSecondary">
                      {document.adhaarCard}
                    </Typography>
                    <Divider sx={{ marginTop: 2 }} />
                  </Box>
                )}
                {document.panCard && (
                  <Box mb={2}>
                    <Typography variant="h6">PAN Card</Typography>
                    <Typography color="textSecondary">
                      {document.panCard}
                    </Typography>
                    <Divider sx={{ marginTop: 2 }} />
                  </Box>
                )}
                {document.drivingLicense && (
                  <Box mb={2}>
                    <Typography variant="h6">Driving License</Typography>
                    <Typography color="textSecondary">
                      {document.drivingLicense}
                    </Typography>
                    <Divider sx={{ marginTop: 2 }} />
                  </Box>
                )}
                {document.passport && (
                  <Box mb={2}>
                    <Typography variant="h6">Passport</Typography>
                    <Typography color="textSecondary">
                      {document.passport}
                    </Typography>
                    <Divider sx={{ marginTop: 2 }} />
                  </Box>
                )}
                {document.experienceLetter && (
                  <Box mb={2}>
                    <Typography variant="h6">Experience Letter</Typography>
                    <Typography color="textSecondary">
                      {document.experienceLetter}
                    </Typography>
                    <Divider sx={{ marginTop: 2 }} />
                  </Box>
                )}
                {document.bankDetails && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Bank Details
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">Account Number:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.accountNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">CIF Number:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.cifNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">IFSC Code:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.ifscCode}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">First Name:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.firstName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">Middle Name:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.middleName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">Last Name:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.lastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">Address:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.address}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">Pin Code:</Typography>
                        <Typography color="textSecondary">
                          {document.bankDetails.pinCode}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: '100%' }}>
            No documents available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default DocumentPage;

// Sample usage of the DocumentPage component
const documents = [
  { adhaarCard: '1234-5678-9101' },
  { panCard: 'ABCDE1234F' },
  { drivingLicense: 'DL-1234567890' },
  { passport: 'P1234567' },
  { experienceLetter: 'Experience Letter Content' },
  {
    bankDetails: {
      accountNumber: '123456789012',
      cifNumber: 'CIF123456',
      ifscCode: 'IFSC0001234',
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Smith',
      address: '1234 Elm Street, Apt 567, City, State, Country',
      pinCode: '123456',
    },
  },
];

// Example of rendering the component
// <DocumentPage documents={documents} />
