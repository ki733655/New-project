"use client";

import React, { useState } from 'react';
import {
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Card
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
    <Card sx={{
      boxShadow: " 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      // backgroundColor : "#edf0f5",
      height: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1vh"
    }}>
      <Container sx={{
        height: 100,
        display: 'flex',
        width : 700,
        alignItems: "center",
        justifyContent: "space-evenly"
      }}>
        <FormControl sx={{ width: 200 }} margin="normal">
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
        <FormControl sx={{ width: 200 }} margin="normal">
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

        <Button
          sx={{ height: 50, width: 100 }}
          variant='contained'
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
      <Container sx={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {pdfFile && (
          <Box>
            <Typography variant="h6" gutterBottom>
              PDF Document
            </Typography>
            <Document file={pdfFile} onError={handlePdfError}>
              <Page pageNumber={1} />
            </Document>
            <Button sx={{ mt: 2, mr: 2 }} variant="contained" color="primary" onClick={() => window.open(pdfFile, '_blank')}>
              View
            </Button>
            <Button sx={{ mt: 2 }} variant="contained" color="secondary" href={pdfFile} download>
              Download
            </Button>
          </Box>
        )}
        {error && (
          <Typography variant="body1" color="error">
            Failed to load PDF file:  {error.message}
          </Typography>
        )}
      </Container>
    </Card>
  );
};

export default PaySlip;
