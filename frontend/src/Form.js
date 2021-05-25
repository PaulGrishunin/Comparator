import React from "react";

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
                <div>
                    <label htmlFor="year_min">year_min </label>
                    <input type="number" name="year_min" onChange={this.onYearMinChange} />
                    <label htmlFor="year_max"> year_max</label>
                    <input type="number" name="year_max" onChange={this.onYearMaxChange}/>

                    <label htmlFor="price_min"> price_min</label>
                    <input type="number" name="price_min" onChange={this.onPriceMinChange}/>
                    <label htmlFor="price_max"> price_max</label>
                    <input type="number" name="price_max" onChange={this.onPriceMaxChange}/>
                    <label htmlFor="price_diff"> price_diff</label>
                    <input type="number" name="price_diff" onChange={this.onPriceDifChange}/>
                    <button>Search</button>
                </div>
            </form>
        );
    }
}

export default Form;