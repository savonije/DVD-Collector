export interface MovieID {
    id: string;
    name: string;
}

export interface Movie extends MovieID {
    actors?: string;
    awards?: string;
    dateAdded?: Date;
    director?: string;
    genre?: string;
    imdbID?: string;
    imdbRating?: string;
    metascore?: string;
    plot?: string;
    poster?: string;
    rating: number;
    runtime?: string;
    year?: string;
}
