import React, {Component} from 'react';
import authHeader from "../services/auth-header";


class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            favorites: [],
            // id: 0,
        };
        this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    }

    deleteFromFavorites(id) {
        var url = "http://localhost:8000/api/favorites/delete/" + id    //тут  ad_id  который находится в Favorites
        fetch(url, { method: "DELETE", headers: authHeader()})
        window.location.reload(false);
    }
// onClick={ e => window.location.href = favs.platformId.ad_link }

    componentDidMount() {
        const url = "http://localhost:8000/api/favorites"
        fetch(url, { headers: authHeader() })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)

                let favorites= result.map((favs) => {
                    console.log(favs.id)
                    return (
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
                            <button className="button red" href="#" onClick={() => this.deleteFromFavorites(favs.id)}><b>Delete from Favorites</b></button>
                        </div>

                    </div>
                    </span>
                            )
                        })
                        this.setState({favorites:favorites});
                    })
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