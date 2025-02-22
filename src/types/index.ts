export interface MovieID {
    id: string;
    name: string;
}

export interface Movie {
    id: string;
    imdbID: string;
    name: string;
    rating?: number;
    dateAdded?: Date;
    poster: string;
    year?: string;
    director?: string;
    plot?: string;
}

export interface MovieDetails {
    Poster: string;
    Title: string;
    Year: string;
    Genre: string;
    Awards: string;
    Actors: string;
    Director: string;
    Metascore: string;
    Plot: string;
    Rated: string;
    Runtime: string;
    imdbRating: string;
    imdbID: string;
}
