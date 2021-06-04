
import React, { useState } from "react";
import { PlaceCard } from './PlaceCard';

import { Place } from "./Place";
import { usePosition } from 'use-position';

import data from './../data/eh.json';
import { calculateDistance } from "./DistanceCalculator";

type PlaceListProps = {
    visited?: Set<number>
    onPlaceToggled: (id: number) => (void)
}

interface SortablePlace {
    key: string
    title: string
    distance: number
    place: Place
}

const sortablePlaces: (place: Record<string, Place>, latitude: number | undefined, longitude: number | undefined) => (SortablePlace[]) = (places: Record<string, Place>, latitude: number | undefined, longitude: number | undefined) => {

    return Object.values(places).map((place: Place) => {
        const distance = (latitude && longitude) ? Math.floor(calculateDistance(latitude, longitude, parseFloat(place.Latitude), parseFloat(place.Longitude))) : 0;
        return {
            key: `place-${place.ID}`,
            title: place.Title,
            distance: distance,
            place: place
        }
    });
}

enum PlaceSortMethod {
    Title,
    Distance
}

export const PlaceList: (props: PlaceListProps) => (any) = ({ visited, onPlaceToggled }) => {
    const { latitude, longitude } = usePosition(false);
    const [sort, setSort] = useState(PlaceSortMethod.Title);

    const items = sortablePlaces(data as Record<string, Place>, latitude, longitude).sort((a, b) => {
        if (sort === PlaceSortMethod.Title) {
            return a.title.localeCompare(b.title);
        } else if (sort === PlaceSortMethod.Distance) {
            return a.distance - b.distance;
        }
        return a.title.localeCompare(b.title);
    }).map(item => {
        return (
            <PlaceCard
                key={item.key}
                onPlaceToggled={onPlaceToggled}
                place={item.place}
                distanceInKm={item.distance}
                visited={visited?.has(item.place.ID) || false}
            />
        )
    });

    return (
        <div className="container">
            <div className="row mt-3">
                <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); setSort(sort === PlaceSortMethod.Title ? PlaceSortMethod.Distance : PlaceSortMethod.Title) }}>Sorted by {sort === PlaceSortMethod.Title ? 'Title' : 'Distance'}</button>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {items}
            </div>
        </div>
    );
};
