import  React, { Component } from  'react';
import './PlatformList.css';
import Form from './Form';
import authHeader from "../services/auth-header";


class PlatformList extends Component {
    constructor() {
        super();
        this.state = {
            platform: [],
            search:null,
            id: 0,
        };
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    // onSubmit=(event)=> {
    //     console.log("submit")
    //     event.preventDefault()
    //     console.log("this.year_min=", this.year_min, "this.year_max=", this.year_max, "this.price_min=", this.price_min, "this.price_max=", this.price_max)
    // }

    // changeHandler = event => {
    //     const { price_min, value } = event.target;
    //     this.setState({ [name]: value });
    // };

    addToFavorites(platformId) {
        fetch(`http://localhost:8000/api/favorites/add/`+ platformId, { method:"POST", headers: authHeader()})
            .then(res => res.json())
            .then(console.log)
    }

  //   searchSpace=(event)=>{
  //       let model = event.target.value;
  //       this.setState({search:model})
  //       console.log(this.state.search)
  // }

    gettingPlatform = async (e) => {
        e.preventDefault();
        var price_diff = e.target.elements.price_diff.value;
        console.log('price_diff', price_diff)
        var year_min = e.target.elements.year_min.value;
        var year_max = e.target.elements.year_max.value;
        var price_min = e.target.elements.price_min.value;
        var price_max = e.target.elements.price_max.value;
        const api_url = await
        fetch(`http://127.0.0.1:8000/api/platforml/price_diff=${price_diff}?year_min=${year_min}&year_max=${year_max}&price_min=${price_min}&price_max=${price_max}`);
        const data = await api_url.json();
        console.log(data);
        let platform = data.filter((plat)=>{
            if(this.state.search == null)
                return plat
            else if(plat.model.toLowerCase().includes(this.state.search.toLowerCase())){
                return plat
      }
    }).map((plat) => {
            return (
                <span key={plat.id} >
                    <div className="AdContainer"  >
                        <div className="imageContainer">
                            <img src={plat.photo_link} onClick={ e => window.open(plat.ad_link, "_blank")} alt="" />
                        </div>
                        <div className="titleContainer">
                            <p><b>{plat.brandId+' '+plat.model}</b></p>
                            <p> {plat.year+'   '+plat.fuel}</p>
                            <div className="locationContainer">
                            <div className="location">Location: {plat.country+' '+plat.place}</div>
                        </div>
                        </div>
                        <div className="priceContainer">
                            <div className="price">Price: {plat.price} EUR</div>
                            <div className="price_diff">Price difference: € {plat.price_diff} </div>
                            <a href="#" className="knopka01" onClick={() => this.addToFavorites(plat.id)}>Add</a>
                        </div >

                    </div>
                    </span>
            )
        })
        this.setState({platform: platform})
    }

    render() {
        return(
              <div>

                  <Form listAds={this.gettingPlatform} />
                   {/*<input type="search" placeholder="Enter model to be searched" onChange={(e)=>this.searchSpace(e)} />*/}
                  {this.state.platform}
              </div>
    )}
}

export  default  PlatformList;