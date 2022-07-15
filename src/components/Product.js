import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Product = (props) => {
    const handleChange = (e) => {
        props.handleProductChange({...props.formData, [e.target.name] : e.target.value});
    };

    const handleRemove = (index) => {
        let product = formData.products;
        product.splice(index ,1);
        props.handleProductChange({...props.formData, products : product});

    }
    const handleAdd = (index) => {
        let product = formData.products;
        product.push({
            sn: 1,
            name: "",
            pkwiu: "",
            unit: "",
            qty: 1,
            discount: "",
            rate: "",
            worthNet: "",
            worthGross: "",
            gtu: ""
          });
        props.handleProductChange({...props.formData, products : product});

    }
    const handleProductChange = (e, index) => {
        e.preventDefault();

        let product = formData.products;
        console.log(e.target.name.split("-"));
        product[index][e.target.name.split("-")[0]] = e.target.value;
        props.handleProductChange({...props.formData, products : product});
    };
    const formData = props.formData;
    console.log(formData);
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} InputLabelProps={{ shrink: true }} type="date" value={formData?.dateOfIssue} onChange={handleChange} name="dateOfIssue" label="Date Of Issue" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} InputLabelProps={{ shrink: true }} type="date" value={formData?.saleDate} onChange={handleChange} name="saleDate" label="Sale Date" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Payment Deadline</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData?.paymentDeadline}
                                onChange={handleChange}
                                name="paymentDeadline"
                                label="Payment Deadline"
                            >
                            <MenuItem value={"0"}>0</MenuItem>
                            <MenuItem value={"7"}>7</MenuItem>
                            <MenuItem value={"14"}>14</MenuItem>
                            <MenuItem value={"30"}>30</MenuItem>
                            <MenuItem value={"60"}>60</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} value={formData?.series} onChange={handleChange} name="series" label="series" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container mt={2} spacing={2}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData?.paymentMethod}
                                    onChange={handleChange}
                                    name="paymentMethod"
                                    label="Payment Method"
                                >
                                <MenuItem value={"Cash"}>Cash</MenuItem>
                                <MenuItem value={"Transfer"}>Transfer</MenuItem>
                                <MenuItem value={"Compensation"}>Compensation</MenuItem>
                                <MenuItem value={"On delivery"}>On delivery</MenuItem>
                                <MenuItem value={"Credit / Debit Card"}>Credit / Debit Card</MenuItem>
                                </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">All Paid</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData?.paid}
                                    onChange={handleChange}
                                    name="paid"
                                    label="All paid"
                                >
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                                </Select>
                    </FormControl>
                </Grid>
                {formData?.paid == "Yes" && <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} InputLabelProps={{ shrink: true }} type="date" value={formData?.invoiceDate} onChange={handleChange} name="invoiceDate" label="Invoice Date" variant="outlined" />
                
                </Grid>}
            </Grid>
            <Grid container mt={2} spacing={2}>
                <h3>Product Detail</h3>
                <TableContainer component={Paper}>
                    <Button onClick={handleAdd} variant="contained" sx={{float:"right"}}>Add More product</Button>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>PKWiU</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Quantity</TableCell>
                            {/* <TableCell>Cenna Neto</TableCell> */}
                            <TableCell>Discount%</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Worth Net</TableCell>
                            <TableCell>Worth Gross</TableCell>
                            <TableCell>GTU</TableCell>
                            <TableCell>Action</TableCell>
                            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {formData?.products.map((row , index) => {
                                const {
                                    sn= 1,
                                    name= "",
                                    pkwiu= "",
                                    unit= "",
                                    qty= 1,
                                    discount= "",
                                    rate= "",
                                    worthNet= "",
                                    worthGross= "",
                                    gtu= ""
                                } = row;
                                return(
                                    <TableRow
                                    key={index}
                                    sx={{ '& td, & th': { border: 0.5 } }}
                                    >
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={name} onChange={(e) => handleProductChange(e,index)} id={`name-${index}`} name={`name-${index}`} label="name" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={pkwiu} onChange={(e) => handleProductChange(e,index)} name={`pkwiu-${index}`} label="pkwiu" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={unit} onChange={(e) => handleProductChange(e,index)} name={`unit-${index}`} label="unit" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={qty} onChange={(e) => handleProductChange(e,index)} name={`qty-${index}`} label="qty" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={discount} onChange={(e) => handleProductChange(e,index)} name={`discount-${index}`} label="discount" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={rate} onChange={(e) => handleProductChange(e,index)} name={`rate-${index}`} label="rate" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={worthNet} onChange={(e) => handleProductChange(e,index)} name={`worthNet-${index}`} label="worthNet" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={worthGross} onChange={(e) => handleProductChange(e,index)} name={`worthGross-${index}`} label="worthGross" variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={gtu} onChange={(e) => handleProductChange(e,index)} name={`gtu-${index}`} label="gtu" variant="outlined" />
                                        </TableCell>
                                        <TableCell><span onClick={() => handleRemove(index)}>remove</span></TableCell>
                                    </TableRow>
                            )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Grid>
            <TextField sx={{width : "100%"}} onChange={handleChange} value={formData?.description} name="description" label="description" variant="outlined" />
            <Button onClick={props.handlePrint}></Button>
        </Box>
    );

};

export default Product;