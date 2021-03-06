import React, {Component} from 'react';
import authHeader from "../services/auth-header";
import './PlatformList.css';

const API_URL = 'https://compar.herokuapp.com';

class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            favorites: [],
            isDeleted: false,
        };
        this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    }

    deleteFromFavorites = async (id) => {
        fetch(API_URL + `/favorites/delete/` + id, {
            mode: 'cors',
            method: "DELETE",
            headers: authHeader(),
        })
        this.gettingFavorites()
    }


    gettingFavorites = async () => {
        const api_url = await
            fetch( API_URL + "/favorites_list", { headers: authHeader() })
        const data = await api_url.json();
        let favorites = data.map((favs) => {
            return (
                <span key={favs.id}  >
                    <div className="AdContainer"  >
                        <div className="imageContainer">
                            <img src={favs.platformId.photo_link} onClick={ e => window.open(favs.platformId.ad_link, "_blank")} alt="" />
                        </div>
                        <div className="titleContainer">
                            <p><b>{favs.platformId.brandId+' '+favs.platformId.model}</b></p>
                            <p> {favs.platformId.year+'   '+favs.platformId.fuel}</p>
                            <div className="locationContainer">
                            <div className="location">Location: {favs.platformId.country+' '+favs.platformId.place}</div>
                        </div>
                        </div>
                        <div className="priceContainer">
                               <div className="price">Price: € <b> {favs.platformId.price} </b> </div>
                               <div className="price_diff">Price difference: € <b> {favs.platformId.price_diff} </b></div>
                                <a className="button cross" href="#!" onClick={() => this.deleteFromFavorites(favs.id)}> </a>
                        </div>
                    </div>
                    </span>
            )
        })
        this.setState({favorites:favorites});
    }

    componentDidMount() {
        this.gettingFavorites()
    }

    render() {

        return (
            <div>
                {this.state.favorites}
            </div>
        )
    }
}

export default Favorites;