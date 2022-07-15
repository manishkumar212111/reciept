import './App.css';
import React, { useState } from 'react';
import PdfWork from './components/reciept'
import Company from './components/Company';
import Product from './components/Product';

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

  const handleCompanyChange = (obj) => {
    setFormData(ev => ({...ev, company : {...ev.company, ...obj}}));
  }
  const handleProductChange = (obj) => {
    setFormData(ev => ({...ev, basic : {...ev.basic, ...obj}}));
  }
  return (
    <div className="App">   
      <div className="container">
        <h3>Reciepts</h3>
        <ul className="nav nav-tabs">
          <li onClick={() => setActive("detail")} className={active == "detail" ? "active" : ""}><a>Company Detail</a></li>
          <li onClick={() => setActive("product")} className={active == "product" ? "active" : ""}><a>Product Information</a></li>
          <li onClick={() => setActive("print")} className={active == "print" ? "active" : ""}><a>Print</a></li>
        </ul>
      {active == "product" && <Product formData={formData?.basic} handleProductChange={handleProductChange} />}
      {active == "detail" && <Company formData={formData?.company} handleCompanyChange={handleCompanyChange} handlePrint={() => setActive("print")}/>}
      {active == "print" && <PdfWork company={formData?.company} product={formData?.product} />}
      </div>

    </div>
  );
}

export default App;
