import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

const Company = (props) => {
    const [nip, setNip] = useState("");
    const [disabled, setDIsabled] = useState(false);
    const handleChange = (e) => {
        props.handleCompanyChange({[e.target.name] : e.target.value});
    };
    const handleNipApi =async (event) =>{
        setNip(event.target.value);
        if(event.target.value.length === 10){
            setDIsabled(true);
            const data = await axios.get("http://localhost:5000/company/"+event.target.value);
            console.log(data);
            if(data?.data?.root?.dane[0]?.ErrorMessageEn){
                window.alert(data?.data?.root?.dane[0]?.ErrorMessageEn[0]);
            }
            // handle data
            const obj = {};
            obj['fullName'] = data?.data?.root?.dane[0]?.Nazwa[0];
            obj['id'] = data?.data?.root?.dane[0]?.Nip[0];
            obj['city'] = data?.data?.root?.dane[0]?.Powiat[0];
            props.handleCompanyChange(obj);
            setDIsabled(false);
        };
    };
    const formData = props.formData;
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid style={{marginBottom : 8}} container spacing={2}>
                <Grid item xs={6}>
                    <TextField sx={{width : "100%"}} disabled={disabled} value={nip} onChange={handleNipApi} name="nip" label="Search NIP" variant="outlined" />
                </Grid>
            </Grid>
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