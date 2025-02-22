export interface MovieID {
    id: string;
    name: string;
}

export interface Movie extends MovieID {
    imdbID: string;
    rating: number;
    dateAdded?: Date;
    poster: string;
    year?: string;
    director?: string;
    plot?: string;
}

export interface MovieDetails extends Movie {
    Genre: string;
    Awards: string;
    Actors: string;
    Metascore: string;
    Rated: string;
    Runtime: string;
    imdbRating: string;
}
