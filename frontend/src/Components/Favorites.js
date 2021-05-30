import React, {Component} from 'react';
import authHeader from "../services/auth-header";


class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            favorites: [],
            isDeleted: false
        };
        this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    }

    deleteFromFavorites(favoritesId) {
        fetch(`http://localhost:8000/api/favorites/delete/` + favoritesId, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                    this.setState({isDeleted: true});
                // window.location.reload(false);
            }, (error) => {
                    // console.log(error);
                }
            )
    }


    gettingFavorites = async () => {
        // e.preventDefault();
        const api_url = await
        fetch( "http://localhost:8000/api/favorites", { headers: authHeader() })
        const data = await api_url.json();
        let favorites = data.map((favs) => {
                    console.log(favs.id)
                    return (      // onClick={ e => window.location.href = favs.platformId.ad_link }
                        <span key={favs.id}  >
                    <div className="AdContainer"  >
                        <div className="imageContainer">
                            <img src={favs.platformId.photo_link} alt="" />
                        </div>
                        <div className="titleContainer">
                            <p><b>{favs.platformId.brandId+' '+favs.platformId.model}</b></p>
                            <p> {favs.platformId.year}</p>
                        </div>
                        <div className="priceContainer">
                                <div className="price">Price: {favs.platformId.price} EUR</div>
                                <div className="price_diff"> € {favs.platformId.price_diff} </div>
                                <button className="button red"  onClick={() => this.deleteFromFavorites(favs.id)}><b>Delete from Favorites</b></button>
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
        if (!this.state.isDeleted){
            console.log("1+", this.state.isDeleted)
        return (
            <div>
                {this.state.favorites}
            </div>
        )}
        else {
            console.log("2+", this.state.isDeleted)
            window.location.reload(true);
        }
    }
}

export default Favorites;