import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

const Seller = (props) => {
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
                setDIsabled(false);
                window.alert(data?.data?.root?.dane[0]?.ErrorMessageEn[0]);
                return;
            }
            // handle data
            const obj = {};
            obj['fullName'] = data?.data?.root?.dane[0]?.Nazwa[0];
            obj['id'] = data?.data?.root?.dane[0]?.Nip[0];
            obj['city'] = data?.data?.root?.dane[0]?.Miejscowosc[0];
            obj['code'] = data?.data?.root?.dane[0]?.KodPocztowy[0];
            obj['street'] = data?.data?.root?.dane[0]?.Ulica[0] +","+ data?.data?.root?.dane[0]?.NrNieruchomosci[0] + " " + data?.data?.root?.dane[0]?.NrLokalu[0] ;
            props.handleCompanyChange(obj);
            setDIsabled(false);
        };
    };
    const formData = props.formData;
    return(
        <Box sx={{ flexGrow: 1 }}>
            <h2>{props.t("Seller Details")}</h2>
            <Grid style={{marginBottom : 8}} container spacing={2}>
                <Grid item xs={6}>
                    <TextField sx={{width : "100%"}} disabled={disabled} value={nip} onChange={handleNipApi} name={props.t("nip")} label="Search NIP" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.fullName} onChange={handleChange} name="fullName" label={props.t("Full Name")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.shortName} onChange={handleChange} name="shortName" label={props.t("Short Name")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.email} onChange={handleChange} name="email" label={props.t("email")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "20%"}} value={formData?.taxId} onChange={handleChange} name="taxId" label={props.t("taxId")} variant="outlined" />
                    <TextField sx={{width : "80%"}} value={formData?.id} onChange={handleChange} name="id" label={props.t("id")} variant="outlined" />
                </Grid>
            </Grid>
            <Grid container mt={2} spacing={2}>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.code} onChange={handleChange} name="code" label={props.t("Code")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.city} onChange={handleChange} name="city" label={props.t("City")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.street} onChange={handleChange} name="street" label={props.t("Street, House flat")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{props.t("Country")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData?.country}
                            onChange={handleChange}
                            name="country"
                            label={props.t("Country")}
                        >
                        <MenuItem value={"Poland"}>Poland</MenuItem>
                        <MenuItem value={"Germany"}>Germany</MenuItem>
                        <MenuItem value={"India"}>India</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.bankName} onChange={handleChange} name="bankName" label={props.t("Bank Acount Name")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.bankAccountNo} onChange={handleChange} name="bankAccountNo" label={props.t("Bank Account Number")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.logo} onChange={handleChange} name="logo" label={props.t("Enter logo url")} variant="outlined" />
                </Grid>
            </Grid>
        </Box>
    );

};

export default Seller;