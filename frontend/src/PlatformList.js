import  React, { Component } from  'react';
import './PlatformList.css';
import Filter from './Filter';

class PlatformList extends Component {

    constructor() {
        super();
        this.state = {
            platform: [],
        };
    }
    year_min="";
    year_max="";
    price_min="";
    price_max="";


    onSubmit=(event)=> {
        console.log("submit")
        event.preventDefault()
        console.log("this.year_min=", this.year_min, "this.year_max=", this.year_max, "this.price_min=", this.price_min, "this.price_max=", this.price_max)
    }

    // changeHandler = event => {
    //     const { price_min, value } = event.target;
    //     this.setState({ [name]: value });
    // };

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


    componentDidMount() {
        var url = "http://127.0.0.1:8000/api/platforml/price_diff=10"  // + this.props.product
        // console.log(this.year_min)
        fetch(url, {
            mode: 'cors',
            method: 'GET',
        })
            .then(results => {return results.json()}).then(data => {
            let platform = data.results.map((plat) => {
                return (
                    <span key={plat.id} onClick={ e => window.location.href = plat.ad_link } >
                    <div className="AdContainer"  >
                        <div className="imageContainer">
                            <img src={plat.photo_link} alt="" />
                        </div>
                        <div className="titleContainer">
                            <p><b>{plat.brandId+' '+plat.model}</b></p>
                            <p> {plat.year}</p>
                        </div>
                        <div className="priceContainer">
                                <div className="price">Price: {plat.price} EUR</div>
                                <div className="price_diff"> € {plat.price_diff} </div>
                        </div>
                    </div>
                    </span>
                )
            })
            this.setState({platform: platform})
        })

    }

    render() {
        return( <div className="FilterContainer">
                <form onSubmit={this.onSubmit} method="get">
                    <div>
                        <label htmlFor="year_min">year_min </label>
                        <input type="text" name="year_min" onChange={this.onYearMinChange} />
                        <label htmlFor="year_max"> year_max</label>
                        <input name="year_max" id="year_max" onChange={this.onYearMaxChange}/>

                        <label htmlFor="price_min"> price_min</label>
                        <input name="price_min" id="price_min" onChange={this.onPriceMinChange}/>
                        <label htmlFor="price_max"> price_max</label>
                        <input name="price_max" id="price_max" onChange={this.onPriceMaxChange}/>

                        <input value="Search"  type="submit"/>
                    </div>
                </form>

                {this.state.platform}
        </div>

    )}
}

export  default  PlatformList;