import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SelectInput from '@mui/material/Select/SelectInput';
import styled from '@emotion/styled';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 420,
      fontSize: 8,
      border: '1 solid #dadde9',
    },
  }));

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
            discount: 0,
            rate: 0,
            worthNet: 0,
            worthGross: 0,
            gtu: ""
          });
        props.handleProductChange({...props.formData, products : product});

    }
    const handleProductChange = (e, index) => {
        e.preventDefault();

        let product = formData.products;
        console.log(e.target.name.split("-"));
        product[index][e.target.name.split("-")[0]] = e.target.value;
        product[index]["worthNet"] = getWorthNet(product[index]);
        product[index]["worthGross"] = getWorthGross(product[index]);
        props.handleProductChange({...props.formData, products : product});
    };

    const getWorthGross = (item) => {
        const {
            rate= 0
        } = item;
        let totalPrice = getWorthNet(item);
        if(parseInt(rate) >= 0){
            totalPrice = totalPrice + ((parseInt(rate)/100) * totalPrice)
        }
        return totalPrice;
    }
    const getWorthNet = (item) => {
        const {
            qty= 1,
            discount= 0,
            // rate= 0,
            netPrice = 0
        } = item;
        let totalPrice = (qty * netPrice);
        totalPrice = totalPrice - ((discount / 100) * totalPrice)
        return totalPrice;
    };
    const formData = props.formData;
    console.log(formData);
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} InputLabelProps={{ shrink: true }} type="date" value={formData?.dateOfIssue} onChange={handleChange} name="dateOfIssue" label={props.t("Date Of Issue")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} InputLabelProps={{ shrink: true }} type="date" value={formData?.saleDate} onChange={handleChange} name="saleDate" label={props.t("Sale Date")} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{props.t("Payment Deadline")}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData?.paymentDeadline}
                                onChange={handleChange}
                                name="paymentDeadline"
                                label={props.t("paymentDeadline")}
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
                    <TextField sx={{width : "100%"}} value={formData?.series} onChange={handleChange} name="series" label={props.t("series")} variant="outlined" />
                </Grid>
            </Grid>
            <Grid container mt={2} spacing={2}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{props.t("Payment Method")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData?.paymentMethod}
                                    onChange={handleChange}
                                    name="paymentMethod"
                                    label="Payment Method"
                                >
                                <MenuItem value={"Cash"}>{props.t("Cash")}</MenuItem>
                                <MenuItem value={"Transfer"}>{props.t("Transfer")}</MenuItem>
                                <MenuItem value={"Compensation"}>{props.t("Compensation")}</MenuItem>
                                <MenuItem value={"On delivery"}>{props.t("On delivery")}</MenuItem>
                                <MenuItem value={"Credit / Debit Card"}>{props.t("Credit / Debit Card")}</MenuItem>
                                </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{props.t("All Paid")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formData?.paid}
                                    onChange={handleChange}
                                    name="paid"
                                    label={props.t("All paid")}
                                >
                                <MenuItem value={"Yes"}>{props.t("Yes")}</MenuItem>
                                <MenuItem value={"No"}>{props.t("No")}</MenuItem>
                                </Select>
                    </FormControl>
                </Grid>
                {formData?.paid == "Yes" && <Grid item xs={3}>
                    <TextField sx={{width : "100%"}} InputLabelProps={{ shrink: true }} type="date" value={formData?.invoiceDate} onChange={handleChange} name="invoiceDate" label={props.t("Invoice Date")} variant="outlined" />
                
                </Grid>}
            </Grid>
            <Grid container mt={2} spacing={2}>
                <h3>{props.t("Product Detail")}</h3>
                <TableContainer component={Paper}>
                    <Button onClick={handleAdd} variant="contained" sx={{float:"right"}}>{props.t("Add More product")}</Button>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>{props.t("No")}</TableCell>
                            <TableCell>{props.t("Product")}</TableCell>
                            <TableCell>{props.t("PKWiU")}</TableCell>
                            <TableCell>{props.t("Unit")}</TableCell>
                            <TableCell>{props.t("Quantity")}</TableCell>
                            <TableCell>{props.t("Net Price")}</TableCell>
                            <TableCell>{props.t("Discount%")}</TableCell>
                            <TableCell>{props.t("Rate")}</TableCell>
                            <TableCell>{props.t("Worth Net")}</TableCell>
                            <TableCell>{props.t("Worth Gross")}</TableCell>
                            <TableCell>{props.t("GTU")} <HtmlTooltip placement="top-start" title={<React.Fragment>
                                        <table>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_1</td>
                                                <td style={{float: "left", border: "1px"}}>alcoholic beverages</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_2</td>
                                                <td style={{float: "left", border: "1px"}}>fuels</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_3</td>
                                                <td style={{float: "left", border: "1px"}}>Heating oil and lubricant oil</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_4</td>
                                                <td style={{float: "left", border: "1px"}}>Tobacco products</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_5</td>
                                                <td style={{float: "left", border: "1px"}}>Waste</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_6</td>
                                                <td style={{float: "left", border: "1px"}}>Electronic devices and there parts and material</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_7</td>
                                                <td style={{float: "left", border: "1px"}}>vehicles and car part</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_8</td>
                                                <td style={{float: "left", border: "1px"}}>precious and base metal</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_9</td>
                                                <td style={{float: "left", border: "1px"}}>drugs and medical devices</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_10</td>
                                                <td style={{float: "left", border: "1px"}}>building structures and land</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_11</td>
                                                <td style={{float: "left", border: "1px"}}>trading in green gas emission allowances</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_12</td>
                                                <td style={{float: "left", border: "1px"}}>intangible service ,incl. marketing advertisement</td>
                                            </tr>
                                            <tr>
                                                <td style={{float: "left", border: "1px"}}>GTU_13</td>
                                                <td style={{float: "left", border: "1px"}}>transport and warehouse management services</td>
                                            </tr>
                                        </table></React.Fragment>}><InfoIcon /></HtmlTooltip></TableCell>
                            <TableCell>{props.t("Action")}</TableCell>
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
                                    gtu= "",
                                    netPrice = ""
                                } = row;
                                return(
                                    <TableRow
                                    key={index}
                                    sx={{ '& td, & th': { border: 1.5 } }}
                                    >
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={name} onChange={(e) => handleProductChange(e,index)} id={`name-${index}`} name={`name-${index}`} label={props.t("name")} variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={pkwiu} onChange={(e) => handleProductChange(e,index)} name={`pkwiu-${index}`} label={props.t("pkwiu")} variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <Select sx={{width : "100%"}} value={unit} onChange={(e) => handleProductChange(e,index)} name={`unit-${index}`} label={props.t("unit")} variant="outlined">
                                                <MenuItem value="Service">Service</MenuItem>
                                                <MenuItem value="vol">vol</MenuItem>
                                                <MenuItem value="pcs">pcs</MenuItem>
                                                <MenuItem value="m3">m3</MenuItem>
                                                <MenuItem value="m2">m2</MenuItem>
                                                <MenuItem value="m">m</MenuItem>
                                                <MenuItem value="l">l</MenuItem>
                                                <MenuItem value="Km">Km</MenuItem>
                                                <MenuItem value="Kg">Kg</MenuItem>
                                                <MenuItem value="h">h</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" sx={{width : "100%"}} value={qty} onChange={(e) => handleProductChange(e,index)} name={`qty-${index}`} label={props.t("qty")} variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={netPrice} onChange={(e) => handleProductChange(e,index)} name={`netPrice-${index}`} label={props.t("Net Price")} variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={discount} onChange={(e) => handleProductChange(e,index)} name={`discount-${index}`} label={props.t("discount")} variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                        <Select sx={{width : "100%"}} value={rate} onChange={(e) => handleProductChange(e,index)} name={`rate-${index}`} label={props.t("rate")} variant="outlined">
                                                <MenuItem value="23">23%</MenuItem>
                                                <MenuItem value="8">8%</MenuItem>
                                                <MenuItem value="5">5%</MenuItem>
                                                <MenuItem value="0%WDT">0%WDT</MenuItem>
                                                <MenuItem value="0%Exp">0%Exp</MenuItem>
                                                <MenuItem value="nie Podl">nie Podl</MenuItem>
                                                <MenuItem value="nie podl. UE">nie podl. UE</MenuItem>
                                                <MenuItem value="zw">zw</MenuItem>
                                                <MenuItem value="0">0%</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={worthNet} onChange={(e) => handleProductChange(e,index)} name={`worthNet-${index}`} label={props.t("worthNet")} variant="outlined" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField sx={{width : "100%"}} value={worthGross} onChange={(e) => handleProductChange(e,index)} name={`worthGross-${index}`} label={props.t("worthGross")} variant="outlined" />
                                        </TableCell>
                                
                                        <TableCell>
                                            
                                            <Select sx={{width : "100%"}} value={gtu} onChange={(e) => handleProductChange(e,index)} name={`gtu-${index}`} label={props.t("gtu")} variant="outlined">
                                                    <MenuItem value="Nil">Nil</MenuItem>
                                                    <MenuItem value="GTU_1">GTU_1</MenuItem>
                                                    <MenuItem value="GTU_2">GTU_2</MenuItem>
                                                    <MenuItem value="GTU_3">GTU_3</MenuItem>
                                                    <MenuItem value="GTU_4">GTU_4</MenuItem>
                                                    <MenuItem value="GTU_5">GTU_5</MenuItem>
                                                    <MenuItem value="GTU_6">GTU_6</MenuItem>
                                                    <MenuItem value="GTU_7">GTU_7</MenuItem>
                                                    <MenuItem value="GTU_8">GTU_8</MenuItem>
                                                    <MenuItem value="GTU_9">GTU_9</MenuItem>
                                                    <MenuItem value="GTU_10">GTU_10</MenuItem>
                                                    <MenuItem value="GTU_11">GTU_11</MenuItem>
                                                    <MenuItem value="GTU_12">GTU_12</MenuItem>
                                                    <MenuItem value="GTU_13">GTU_13</MenuItem>
                                                </Select>
                                        </TableCell>
                                        <TableCell><span onClick={() => handleRemove(index)}>{props.t("remove")}</span></TableCell>
                                    </TableRow>
                            )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Grid>
            <TextField sx={{width : "100%"}} onChange={handleChange} value={formData?.description} name="description" label={props.t("description")} variant="outlined" />
            <Button onClick={props.handlePrint}></Button>
        </Box>
    );

};

export default Product;