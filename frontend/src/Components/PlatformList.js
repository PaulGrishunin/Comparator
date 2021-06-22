import  React, { Component } from  'react';
import './PlatformList.css';
import Form from './Form';
import authHeader from "../services/auth-header";
import Spinner from './Spinner';

class PlatformList extends Component {
    constructor() {
        super();
        this.state = {
            platform: [],
            search:null,
            id: 0,
            loading: false,
            registred: true,
        };
        this.addToFavorites = this.addToFavorites.bind(this);
        // this.filterList = this.filterList.bind(this);
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

    searchSpace=(event)=>{
        let model = event.target.value;
        this.setState({search:model})
        console.log(this.state.search)
  }

    // filterList(e){
    //     var filteredList = this.platform.filter(function(model){
    //         return model.toLowerCase().search(e.target.value.toLowerCase())!== -1;
    //     });
    //     // обновление состояния
    //     this.setState({platform: filteredList});
    // }

    renderPlatformList(plat) {
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
                            { Object.keys(authHeader()).length != 0 ?<a href="#" className="button heart" onClick={() => this.addToFavorites(plat.id)}></a>:
                                null}
                        </div >
                    </div>
                    </span>
        )
    }

    gettingPlatform = async (e) => {
        console.log(this.state.registred)
        console.log('gettingPlatform STARTED')
        this.setState ( {loading: true},)
        e.preventDefault();
        var price_diff = e.target.elements.price_diff.value;
        var year_min = e.target.elements.year_min.value;
        var year_max = e.target.elements.year_max.value;
        var price_min = e.target.elements.price_min.value;
        var price_max = e.target.elements.price_max.value;
        const api_url = await
        fetch(`http://127.0.0.1:8000/api/platforml/price_diff=${price_diff}?year_min=${year_min}&year_max=${year_max}&price_min=${price_min}&price_max=${price_max}`);
        const data = await api_url.json();
        console.log(data);
        this.setState({loading: false})
        let platform = data.filter((plat)=>{
            if(this.state.search == null)
                return plat
            else if(plat.model.toLowerCase().includes(this.state.search.toLowerCase())){
                return plat
      }
    }).map((plat) =>  this.renderPlatformList(plat))
        this.setState({platform: platform, loading: false},)
            localStorage.setItem('platform-data', JSON.stringify(data));
    }

    componentDidMount(){
         const data = localStorage.getItem('platform-data');
        let platform = JSON.parse(data).map((plat) => this.renderPlatformList(plat)
)
        this.setState({platform: platform},)
    }

    render() {

        return(
              <div>
                  <Form listAds={this.gettingPlatform} />
                  {/*<input placeholder="Поиск" onChange={this.filterList} />*/}
                   <input type="search" placeholder="🔍 model" onChange={(e)=>this.searchSpace(e)} />
                  {this.state.loading ? <Spinner />:
                      this.state.platform}
              </div>
    )}
}

export  default  PlatformList;