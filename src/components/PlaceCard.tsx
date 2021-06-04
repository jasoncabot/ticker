import React from "react";
import { Link } from "react-router-dom";
import { Place } from "./Place";

interface PlaceCardProps {
    onPlaceToggled: (id: number) => (void)
    visited: boolean
    distanceInKm?: number
    place: Place
}

export const PlaceCard: (props: PlaceCardProps) => (any) = ({ visited, place, distanceInKm, onPlaceToggled }) => {

    return (
        <div className="col mt-4">
            <div className="card h-100">
                <img className="card-img-top" src={`${process.env.PUBLIC_URL}/images/${place.ID}.jpg`} alt={place.ImageAlt ?? place.Title} />
                <div className="card-body">
                    <h5 className="card-title">{place.Title}</h5>
                    {distanceInKm && (
                        <p className="card-subtitle text-muted">{distanceInKm} km</p>
                    )}
                    <p className="card-text">{place.Summary}</p>
                    <p className="card-text"><Link className="card-link" to={`/places/${place.ID}`}>Read more</Link></p>
                </div>
                <div className="card-footer">
                    <div className="form-check">
                        <input onChange={(e) => { onPlaceToggled(place.ID) } } className="form-check-input" type="checkbox" value="" id={`mav-${place.ID}`} checked={visited} />
                        <label className="form-check-label" htmlFor={`mav-${place.ID}`}>
                            Visited
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}