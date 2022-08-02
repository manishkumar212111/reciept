import './App.css';
import React, { useState } from 'react';
import PdfWork from './components/reciept'
import Company from './components/Company';
import Product from './components/Product';
import {translate} from "./lang";
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

function App() {
  const [active, setActive] = useState("detail");
  const [formData, setFormData] = useState({
    company : {
      logo: "",
      fullName: "",
      shortName: "",
      taxId: "",
      id: "",
      email: "",
      code: "",
      city: "",
      street: "",
      country: "",
      sameMailing: true,
      mailingCode: "",
      mailingCity: "",
      mailingStreet: "",
      mailingCountry: "",
      bankName: "",
      bankAccountNo: ""
    },
    basic: {
      dateOfIssue: "",
      saleDate: "",
      paymentDeadline: "",
      series: "",
      paymentMethod: "",
      Paid: "",
      invoiceDate: "",
      description: "",
      products: [{
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
      }]
    }
  });
  const [language, setLanguage] = useState("en");
  const handleCompanyChange = (obj) => {
    setFormData(ev => ({...ev, company : {...ev.company, ...obj}}));
  }
  const handleProductChange = (obj) => {
    setFormData(ev => ({...ev, basic : {...ev.basic, ...obj}}));
  }
  const handleLang = (event) => {
    console.log(event.target.checked, "fref");
    window.localStorage.setItem("lang", event.target.checked ? "pl" : "en");
    setLanguage(event.target.checked ? "pl" : "en");
  }
  return (
    <div className="App">   
      <div className="container">
        <h3>{translate("Reciepts", language)}</h3>
        <FormGroup style={{float: "right"}}>
          <FormControlLabel control={<Switch inputProps={{ 'aria-label': 'controlled' }} onChange={(event) => handleLang(event)} checked={language == "pl"} />} label="Polish" />
        </FormGroup>
        <ul className="nav nav-tabs">
          <li onClick={() => setActive("detail")} className={active == "detail" ? "active" : ""}><a>{translate("Company Detail", language)}</a></li>
          <li onClick={() => setActive("product")} className={active == "product" ? "active" : ""}><a>{translate("Product Information", language)}</a></li>
          <li onClick={() => setActive("print")} className={active == "print" ? "active" : ""}><a>{translate("Print" , language)}</a></li>
        </ul>
      {active == "product" && <Product t={(txt) => translate(txt, language)} formData={formData?.basic} handleProductChange={handleProductChange} />}
      {active == "detail" && <Company t={(txt) => translate(txt, language)} formData={formData?.company} handleCompanyChange={handleCompanyChange} handlePrint={() => setActive("print")}/>}
      {active == "print" && <PdfWork t={(txt) => translate(txt, language)} company={formData?.company} product={formData?.product} />}
      </div>

    </div>
  );
}

export default App;
