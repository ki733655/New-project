"use client";

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Card,
  Paper
} from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set the workerSrc for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const years = Array.from(new Array(30), (val, index) => index + 2020);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const data = [{
  year : "2014",
  month : "July",
  pdf : "/pdf/application.pdf"
}]

const PaySlip = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSubmit = () => {
    setPdfFile(data[0].pdf);
    setError(null); // Clear any previous errors
  };

  const handlePdfError = (error) => {
    setError(error);
    setPdfFile(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          PaySlip Viewer
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="year-select-label">Select the year</InputLabel>
              <Select
                labelId="year-select-label"
                value={year}
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="month-select-label">Select the month</InputLabel>
              <Select
                labelId="month-select-label"
                value={month}
                onChange={handleMonthChange}
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4} display="flex" justifyContent="center" alignItems="center">
            <Button
              sx={{ height: 56 }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          {pdfFile ? (
            <Paper sx={{ p: 2, width: '100%', maxWidth: 800 }}>
              <Typography variant="h6" gutterBottom>
                PDF Document
              </Typography>
              <Document file={pdfFile} onError={handlePdfError}>
                <Page pageNumber={1} />
              </Document>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={() => window.open(pdfFile, '_blank')}>
                  View
                </Button>
                <Button variant="contained" color="secondary" href={pdfFile} download>
                  Download
                </Button>
              </Box>
            </Paper>
          ) : error ? (
            <Typography variant="body1" color="error">
              {/* Failed to load PDF file: {error.message} */}
              
            </Typography>
          ) : (
            <Typography variant="body1">
              Please select a year and month to view the payslip.
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default PaySlip;
