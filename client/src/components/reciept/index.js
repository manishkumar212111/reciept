import React, { useEffect, useState } from "react";
import "./index.css";
import logo from "../../assets/logo.jpg";
import Pdf from 'react-to-pdf';

const Index = (props) => {
  const ref= React.createRef();
  const [options, setOptions] = useState(
    {
      orientation: 'portrait',
      unit: "pt",
      type: [0, 0],
    }
  )
  useEffect(() => {
    setOptions({
      orientation: 'portrait',
      unit: "pt",
      type : [document.getElementById("print").offsetWidth, document.getElementById("print").offsetHeight]
    })
  }, []);
  const product = props.product || {};
  const company = props.company || {};
  return (<>
  <Pdf targetRef={ref} options={options} filename="reciept.pdf" scale={1}>
        {({toPdf, targetRef}) => (
            <button onClick={toPdf} ref={targetRef}>{props.t("Generate pdf")}</button>
        )}
    </Pdf>
    <div className="outer-container" id="print" ref={ref}>
      <div className="division-container">
        <img alt="company logo" src={company.logo ? company.logo : logo} className="company-logo" />
        <div className="table-outer-container">
          <div className="table-container">
            <div className="table-col-type-one bold">
              <p>Faktura nr {"Invoice nu"}</p>
            </div>
            <div className="table-col-type-two">
              <p>Data wystawienia: {product.dateOfIssue}</p>
              <p>Data sprzedaży: {product.saleDate}</p>
            </div>
            <div className="table-col-type-three">
              <p>Termin płatności: {product.paymentDeadline}</p>
              <p>Metoda płatności: {product.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="division-container-one">
        <div className="text-container-one">
          <p className="bold">Sprzedawca</p>
          <p>SCOPEWIT Sp. z o. o.</p>
          <p>Gajków, ul. Polna 38</p>
          <p>55-002 Kamieniec Wrocławski</p>
          <p>NIP: {company.nip}</p>
        </div>
        <div className="text-container">
          <div className="bold">{company.shortName}</div>
          <p>{company.fullName}</p>
          <p>{company.street}</p>
          <p>{company.code}{company.city}</p>
          <p>{company.taxId}</p>
        </div>
      </div>

      <div className="empty-div" />

      <div className="table-container-one">
        <table>
          <tr>
            <th>Lp</th>
            <th>Nazwa</th>
            <th>PKWiU</th>
            <th>Jedn</th>
            <th>Ilość</th>
            <th>Cena netto</th>
            <th>Rabat</th>
            <th>Stawka</th>
            <th>Wartość netto</th>
            <th>Wartość brutto</th>
          </tr>
          {product?.products?.map((itm,index) => (<tr>
            <td>{index}</td>
            <td className="table-left-text">{itm.name}</td>
            <td>{itm.pkwiu}</td>
            <td>{itm.unit}</td>
            <td>{itm.worthNet}</td>
            <td>{itm.discount}</td>
            <td>{itm.rate}</td>
            <td>{itm.worthNet}</td>
            <td>{itm.worthNet - itm.discount}</td>
            <td>{itm.worthGross}</td>
          </tr>))}
        </table>
      </div>

      <div className="division-container">
        <div className="table-container-one">
          <table>
            <tr>
              <th>Stawka VAT</th>
              <th>Wartość netto</th>
              <th>Kwota VAT</th>
              <th>Wartość brutto</th>
            </tr>
            <tr>
              <td className="text-center">8%</td>
              <td>76,85</td>
              <td>6,15</td>
              <td>83,00</td>
            </tr>
            <tr>
              <td className="text-center">Razem</td>
              <td>76,85</td>
              <td>6,15</td>
              <td>83,00</td>
            </tr>
          </table>
        </div>

        <div className="table-container-one">
          <table className="table-no-outline">
            <tr>
              <td>Zapłacono</td>
              <td>80,00 PLN</td>
            </tr>
            <tr>
              <td>Do zapłaty</td>
              <td>0,00 PLN</td>
            </tr>
            <tr>
              <td>Razem</td>
              <td>83,00 PLN</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="text-container-two">
        <p>Słownie</p>
        <p>osiemdziesiąt trzy złote 0/100</p>
      </div>
      <div className="space-container" />

      <div className="division-container">
        <div className="text-container-3">
          <p className="bold">Niraj Choudhari</p>
          <p>Imię i nazwisko osoby uprawnionej</p>
          <p>do wystawiania faktury</p>
        </div>
        <div className="text-container-3">
          <p>Imię i nazwisko osoby uprawnionej</p>
          <p>do odbioru faktury</p>
        </div>
      </div>
      <p className="text-center">www.scopewit.com</p>
    </div>
    </>
  );
};

export default Index;
