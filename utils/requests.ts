import {Movie} from "@/utils/typings";

// Maybe use next: {revalidate: 3600} to cache the data for 1 hour (but not every resource is loading correctly)
export const getTrendingMoviesThisWeek = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

export const getNetflixOriginals = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_networks=213`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

export const getTopRated = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

export const getActionMovies = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=28`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

export const getComedyMovies = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=35`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

export const getHorrorMovies = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=27`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

export const getRomanceMovies = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=10749`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

export const getDocumentaries = async (): Promise<Movie[]> =>
    await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_genres=99`, {
            next: {revalidate: 3600}
        }
    ).then((res) => res.json());

