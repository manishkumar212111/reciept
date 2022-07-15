import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

const Company = (props) => {
    const handleChange = (e) => {
        props.handleCompanyChange({[e.target.name] : e.target.value});
    };

    useEffect(() => {
        const api = async () => {
            let text = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
            <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"> 
            <wsa:To>https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To> 
            <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action> </soap:Header>
            <soap:Body> <ns:Zaloguj>
            <ns:pKluczUzytkownika>eda04987a39a4f4b8075</ns:pKluczUzytkownika> </ns:Zaloguj>
            </soap:Body>
            </soap:Envelope>`;
            var config = {
                headers: {'Content-Type': 'application/soap+xml; charset=utf-8'}
            };
            let data = axios.post("https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc", text , config);
            console.log(data);
        }

        api();
    });
    const formData = props.formData;
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.fullName} onChange={handleChange} name="fullName" label="Full Name" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.shortName} onChange={handleChange} name="shortName" label="Short Name" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.email} onChange={handleChange} name="email" label="email" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "20%"}} value={formData?.taxId} onChange={handleChange} name="taxId" label="taxId" variant="outlined" />
                    <TextField sx={{width : "80%"}} value={formData?.id} onChange={handleChange} name="id" label="id" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container mt={2} spacing={2}>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.code} onChange={handleChange} name="code" label="Code" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.city} onChange={handleChange} name="city" label="City" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.street} onChange={handleChange} name="street" label="Street, House flat" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData?.country}
                            onChange={handleChange}
                            name="country"
                            label="Country"
                        >
                        <MenuItem value={"Poland"}>Poland</MenuItem>
                        <MenuItem value={"Germany"}>Germany</MenuItem>
                        <MenuItem value={"India"}>India</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.logo} onChange={handleChange} name="logo" label="Enter logo url" variant="outlined" />
                </Grid>
            </Grid>
        </Box>
    );

};

export default Company;