
import React from "react";
import { RouteComponentProps } from "react-router-dom";

import data from './../data/eh.json';
import { Place } from "./Place";

type PlaceDetailsProps = { id: string };

export const PlaceDetails = ({ match }: RouteComponentProps<PlaceDetailsProps>) => {

    const place: Place | null = (data as any)[match.params.id];

    if (place) {
        return (
            <div>
                Known Place
            </div>
        );
    } else {
        return (
            <div>
                Unknown Place
            </div>
        );

    }
};
