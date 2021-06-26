import React, {Component} from 'react';
import authHeader from "../services/auth-header";
import './PlatformList.css';

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
        // e.preventDefault();
        const api_url = await
        fetch(`http://localhost:8000/favorites/delete/` + id, {
            // mode: 'cors',
            method: "DELETE",
            // headers: authHeader(),
        })
            // .then(res => res.json())
            // .then(result => {
            //     console.log(result);
                    // console.log("deletefrom", this.state.isDeleted)
            // })
        document.location.reload()
    }


    gettingFavorites = async () => {
        // e.preventDefault();
        const api_url = await
            fetch( "http://localhost:8000/favorites", { headers: authHeader() })
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
                                <br/>
                            <div className="location">Location: {favs.platformId.country+' '+favs.platformId.place}</div>
                        </div>
                        </div>
                        <div className="priceContainer">
                                <div className="price">Price: {favs.platformId.price} EUR</div>
                                <div className="price_diff"> € {favs.platformId.price_diff} </div>
                                <a href="#" className="button cross"  onClick={() => this.deleteFromFavorites(favs.id)}></a>
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