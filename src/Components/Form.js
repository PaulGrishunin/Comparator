import React from "react";
import './PlatformList.css';

class Form extends React.Component {

    onYearMinChange = (event) => {
        this.year_min = event.target.value;
    }
    onYearMaxChange = (event) => {
        this.year_max = event.target.value;
    }
    onPriceMinChange = (event) => {
        this.price_min = event.target.value;
    }
    onPriceMaxChange = (event) => {
        this.price_max = event.target.value;
    }
    onPriceDifChange = (event) => {
        this.price_diff = event.target.value;
    }


    render() {
        return(
            <form className="FilterContainer" onSubmit={this.props.listAds} method="get">
                    <fieldset>
                        <legend>Year of manufacture</legend>
                        <div className="select-row">
                            {/*<input id="price_min" className='form-control' name="price_min" autoComplete='off' placeholder="from" onChange={this.onYearMinChange}/>*/}
                            <select name= "year_min" className="form-control form-control--combobox ab-normal combo-variant" onChange={this.onYearMinChange}>
                                <option value="">from</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                                <option value="2012">2012</option>
                                <option value="2011">2011</option>
                                <option value="2010">2010</option>
                                <option value="2009">2009</option>
                                <option value="2008">2008</option>
                                <option value="2007">2007</option>
                                <option value="2006">2006</option>
                                <option value="2005">2005</option>
                                <option value="2004">2004</option>
                                <option value="2003">2003</option>
                                <option value="2002">2002</option>
                                <option value="2001">2001</option>
                                <option value="2000">2000</option>
                                <option value="1999">1999</option>
                                <option value="1998">1998</option>
                                <option value="1997">1997</option>
                                <option value="1996">1996</option>
                                <option value="1995">1995</option>
                                <option value="1994">1994</option>
                                <option value="1993">1993</option>
                                <option value="1992">1992</option>
                                <option value="1991">1991</option>
                                <option value="1990">1990</option>
                           </select>
                            <select name= "year_max" className="form-control form-control--combobox ab-normal combo-variant" onChange={this.onYearMaxChange}>
                                <option value="">to</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                                <option value="2012">2012</option>
                                <option value="2011">2011</option>
                                <option value="2010">2010</option>
                                <option value="2009">2009</option>
                                <option value="2008">2008</option>
                                <option value="2007">2007</option>
                                <option value="2006">2006</option>
                                <option value="2005">2005</option>
                                <option value="2004">2004</option>
                                <option value="2003">2003</option>
                                <option value="2002">2002</option>
                                <option value="2001">2001</option>
                                <option value="2000">2000</option>
                                <option value="1999">1999</option>
                                <option value="1998">1998</option>
                                <option value="1997">1997</option>
                                <option value="1996">1996</option>
                                <option value="1995">1995</option>
                                <option value="1994">1994</option>
                                <option value="1993">1993</option>
                                <option value="1992">1992</option>
                                <option value="1991">1991</option>
                                <option value="1990">1990</option>
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Price, €</legend>
                        <div className="select-row">
                            <select name= "price_min" className="form-control form-control--combobox ab-normal combo-variant" onChange={this.onPriceMinChange}>
                                <option value="">from</option>
                                <option value="1">1</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                <option value="1500">1500</option>
                                <option value="2000">2000</option>
                                <option value="2500">2500</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                                <option value="5000">5000</option>
                                <option value="6000">6000</option>
                                <option value="7000">7000</option>
                                <option value="8000">8000</option>
                                <option value="9000">9000</option>
                                <option value="10000">10000</option>
                                <option value="11000">11000</option>
                                <option value="12000">12000</option>
                                <option value="13000">13000</option>
                                <option value="14000">14000</option>
                                <option value="15000">15000</option>
                                <option value="16000">16000</option>
                                <option value="17000">17000</option>
                                <option value="18000">18000</option>
                                <option value="19000">19000</option>
                                <option value="20000">20000</option>
                                <option value="25000">25000</option>
                                <option value="30000">30000</option>
                                <option value="40000">40000</option>
                                <option value="50000">50000</option>
                                <option value="60000">60000</option>
                                <option value="70000">70000</option>
                                <option value="80000">80000</option>
                                <option value="90000">90000</option>
                                <option value="100000">100000</option>
                                <option value="150000">150000</option>
                                <option value="200000">200000</option>
                                </select>
                                <select name= "price_max" className="form-control form-control--combobox ab-normal combo-variant" onChange={this.onPriceMaxChange}>
                                    <option value="">to</option>
                                    <option value="1">1</option>
                                    <option value="100">100</option>
                                    <option value="500">500</option>
                                    <option value="1000">1000</option>
                                    <option value="1500">1500</option>
                                    <option value="2000">2000</option>
                                    <option value="2500">2500</option>
                                    <option value="3000">3000</option>
                                    <option value="4000">4000</option>
                                    <option value="5000">5000</option>
                                    <option value="6000">6000</option>
                                    <option value="7000">7000</option>
                                    <option value="8000">8000</option>
                                    <option value="9000">9000</option>
                                    <option value="10000">10000</option>
                                    <option value="11000">11000</option>
                                    <option value="12000">12000</option>
                                    <option value="13000">13000</option>
                                    <option value="14000">14000</option>
                                    <option value="15000">15000</option>
                                    <option value="16000">16000</option>
                                    <option value="17000">17000</option>
                                    <option value="18000">18000</option>
                                    <option value="19000">19000</option>
                                    <option value="20000">20000</option>
                                    <option value="25000">25000</option>
                                    <option value="30000">30000</option>
                                    <option value="40000">40000</option>
                                    <option value="50000">50000</option>
                                    <option value="60000">60000</option>
                                    <option value="70000">70000</option>
                                    <option value="80000">80000</option>
                                    <option value="90000">90000</option>
                                    <option value="100000">100000</option>
                                    <option value="150000">150000</option>
                                    <option value="200000">200000</option>
                                    </select>
                        </div>
                    </fieldset>
                <fieldset>
                    <legend>Price difference, €</legend>
                    <div className="select-row-dif">
                        <select name="price_diff" required className="form-control form-control--combobox ab-normal combo-variant" onChange={this.onPriceDifChange}>
                            <option value="">from</option>
                            <option value="1">1</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                            <option value="2500">2500</option>
                            <option value="3000">3000</option>
                            <option value="4000">4000</option>
                            <option value="5000">5000</option>
                            <option value="6000">6000</option>
                            <option value="7000">7000</option>
                            <option value="8000">8000</option>
                            <option value="9000">9000</option>
                            <option value="10000">10000</option>
                            <option value="11000">11000</option>
                            <option value="12000">12000</option>
                            <option value="13000">13000</option>
                            <option value="14000">14000</option>
                            <option value="15000">15000</option>
                            <option value="16000">16000</option>
                            <option value="17000">17000</option>
                            <option value="18000">18000</option>
                            <option value="19000">19000</option>
                            <option value="20000">20000</option>
                            <option value="25000">25000</option>
                            <option value="30000">30000</option>
                            <option value="40000">40000</option>
                            <option value="50000">50000</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <button>Search</button>
                </fieldset>
            </form>
        );
    }
}

export default Form;