'use client'

import MuiModal from "@mui/material/Modal";
import {modalState, movieState} from "@/app/atoms/modalAtom";
import {Cast, Crew, Element, Genre, Movie, MovieCredits} from "@/utils/typings";
import {useRecoilState} from "recoil";
import XIcon from "@heroicons/react/outline/XIcon";
import {useEffect, useState} from "react";
import ReactPlayer from "react-player/lazy";
import {PlusIcon, VolumeOffIcon} from "@heroicons/react/solid";
import {CheckIcon, VolumeUpIcon} from "@heroicons/react/outline";
import toast, {Toaster} from "react-hot-toast";
import styles from "./Modal.module.scss";
import {getNumberWithCommas, getNumberWithSpaces} from "@/utils/numbers";
import {formatDate} from "@/utils/date";

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    // const { user } = useAuth();
    // const [movies, setMovies] = useState<Movie[]>([]);
    // const [cast, setCast] = useState<Cast[]>();

    const [fetchedMovie, setFetchedMovie] = useState<Movie>();
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [moviesData, setMoviesData] = useState<MovieCredits[]>();
    const [movieExecutors, setMovieExecutors] = useState<{
        directors: Crew[];
        writers: Crew[];
    }>({directors: [], writers: []});

    const [muted, setMuted] = useState(true);
    const [addedToList, setAddedToList] = useState(false);

    // useEffect(() => {
    //     console.log(showModal)
    // }, [showModal]);

    // useEffect(() => {
    //     console.log('Movie useEffect :: directors and writers trigger');
    //
    //     const executors: {
    //         directors: Crew[];
    //         writers: Crew[];
    //     } = {
    //         directors: [],
    //         writers: [],
    //     };
    //
    //     moviesData.crew.map((c) => {
    //         if (c.job === 'Director') executors.directors.push(c);
    //         else if (c.job === 'Writer' || c.job === 'Novel')
    //             executors.writers.push(c);
    //     });
    //
    //     setMovieExecutors(executors);
    // }, [moviesData]);

    useEffect(() => {
        if (!movie) return;

        async function getMovieCreditsFetch() {
            const movieData = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
                .then((res) => res.json());

            if (movieData?.cast && movieData?.crew) {
                setMoviesData(movieData)
            }

            if (movieData?.crew) {
                const executors: {
                    directors: Crew[];
                    writers: Crew[];
                } = {
                    directors: [],
                    writers: [],
                };

                movieData.crew.map((c: Crew) => {
                    if (c.job === 'Director') executors.directors.push(c);
                    else if (c.job === 'Writer' || c.job === 'Novel')
                        executors.writers.push(c);
                });

                setMovieExecutors(executors);
            }
        }

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === "tv" ? "tv" : "movie"
                }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then((response) => response.json());

            if (data?.budget && data?.revenue) {
                setFetchedMovie(data);
            }

            if (data?.videos) {
                const index = data.videos.results.findIndex(
                    (element: Element) => element.type === "Trailer"
                );
                setTrailer(data.videos?.results[index]?.key);
            }

            if (data?.genres) {
                setGenres(data.genres);
            }
        }

        fetchMovie();
        getMovieCreditsFetch();

    }, [movie]);

    // useEffect(() => {
    //   if (user) {
    //     return onSnapshot(
    //       collection(db, "customers", user.uid, "myList"),
    //       (snapshot) => setMovies(snapshot.docs)
    //     );
    //   }
    // }, [db, movie?.id]);
    //
    // useEffect(
    //   () =>
    //     setAddedToList(
    //       movies.findIndex((result) => result.data().id === movie?.id) !== -1
    //     ),
    //   [movies]
    // );

    const handleList = async () => {
        setAddedToList(!addedToList);
        //   if (addedToList) {
        //     await deleteDoc(
        //       doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
        //     );
        //
        //     await fetch("/api/deleteMedia", {
        //       body: JSON.stringify({
        //         userId: user!.uid,
        //         mediaId: movie?.id,
        //         mediaType: movie?.media_type ?? "movie",
        //       }),
        //       headers: { "Content-Type": "application/json" },
        //       method: "POST",
        //     });
        //
        //     toast(
        //       `"${
        //         fetchedMovie?.title || fetchedMovie?.original_name
        //       }" has been removed from your favorite list`,
        //       {
        //         duration: 8000,
        //       }
        //     );
        //   } else {
        //     await setDoc(
        //       doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
        //       { ...movie }
        //     );
        //
        //     console.table({
        //       userId: user!.uid,
        //       movieId: movie?.id,
        //       mediaType: movie?.media_type,
        //       imageUrl: movie?.backdrop_path ?? "",
        //     });
        //
        //     await fetch("/api/addMovieToList", {
        //       body: JSON.stringify({
        //         userId: user!.uid,
        //         movieId: movie?.id,
        //         mediaType: movie?.media_type ?? "movie",
        //         imageUrl: movie?.backdrop_path ?? "",
        //       }),
        //       headers: { "Content-Type": "application/json" },
        //       method: "POST",
        //     });
        //
        toast(
            `"${
                fetchedMovie?.title || fetchedMovie?.original_name
            }" has been added the your favorite list`,
            {
                duration: 1500,
            }
        );
        //   }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    // useEffect(() => {
    //     // #movie_player > div.ytp-chrome-top.ytp-show-cards-title > div.ytp-chrome-top-buttons
    //     const topButtonsElement = document.querySelector("#movie_player > div.ytp-chrome-top.ytp-show-cards-title > div.ytp-chrome-top-buttons")
    //     console.log(topButtonsElement)
    //     if (topButtonsElement) {
    //         topButtonsElement.style.display = "none";
    //         console.log(topButtonsElement)
    //     }
    // }, [showModal]);

    // useEffect(() => {
    //     const topButtonsElement = document.querySelector('.ytp-chrome-top-buttons');
    //     console.log(topButtonsElement)
    //     // if (topButtonsElement) {
    //     //     topButtonsElement.style = "display: none;";
    //     // }
    // }, [showModal]);


    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className={styles.modal_container}
        >
            <div className={styles.modal_container_inner}>
                <Toaster position="bottom-center"
                         toastOptions={{
                             style: {
                                 border: '1px solid #ffffff',
                                 padding: '16px',
                                 background: '#181818',
                                 color: '#ffffff'
                             }
                         }}/>

                <button
                    onClick={handleClose}
                    className={`${styles.modalButton_Close}`}
                >
                    <XIcon height="1.5rem" width="1.5rem" stroke-width="2"/>
                </button>

                <div className={styles.modal_container_player}>
                    <div style={{
                        pointerEvents: "none",
                        overflow: "hidden"
                    }}>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${trailer}`}
                            width="100%"
                            height="100%"
                            config={{
                                youtube: {
                                    playerVars: {
                                        disablekb: 1
                                    }
                                }
                            }}
                            muted={muted}
                            playing
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                objectFit: "cover"
                            }}
                        />
                    </div>

                    <div className={styles.modal_buttons_container}>
                        <div className={styles.modalButton_list}>
                            <button className={styles.modalButton} onClick={handleList}>
                                {addedToList ? (
                                    <CheckIcon height="1.5rem" width="1.5rem"/>
                                ) : (
                                    <PlusIcon height="1.5rem" width="1.5rem"/>
                                )}
                            </button>

                            <button className={styles.modalButton} onClick={() => setMuted(!muted)}>
                                {muted ? (
                                    <VolumeOffIcon height="1.5rem" width="1.5rem"/>
                                ) : (
                                    <VolumeUpIcon height="1.5rem" width="1.5rem"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles.modal_container_additional_info_main}>
                        <div className={styles.modal_container_header}>
                            <p className={styles.modal_container_rating}>
                                Rating: {fetchedMovie?.vote_average.toFixed(2)}
                            </p>
                            <p className={styles.modal_container_date}>
                                {formatDate(fetchedMovie?.release_date) || formatDate(fetchedMovie?.first_air_date) || "Not Available"}
                            </p>
                            <div className={styles.modal_container_icon}>
                                HD
                            </div>
                        </div>

                        <div className={styles.modal_container_details}>
                            <div className={styles.modal_container_main_details}>
                                <h2 className={styles.modal_container_movie_title}>
                                    {fetchedMovie?.title || fetchedMovie?.name}
                                </h2>
                                <p className={styles.modal_container_overview}>{fetchedMovie?.overview}</p>
                            </div>

                            <div className={styles.modal_container_identifiers}>
                                <div>
                                    <span className={styles.modal_container_color_gray}>Genres: </span>
                                    {genres.map((genre) => genre.name).join(", ")}
                                </div>

                                <div>
                                    <span className={styles.modal_container_color_gray}>Original language: </span>
                                    {fetchedMovie?.original_language.toUpperCase()}
                                </div>
                                <div>
                                    <span className={styles.modal_container_color_gray}>Total votes: </span>
                                    {fetchedMovie?.vote_count}
                                </div>
                            </div>
                        </div>

                        <div className={styles.modal_container_cast_title}>
                            <h2>Cast</h2>
                        </div>
                        <div className={styles.modal_container_top_casts}>
                            {moviesData ? moviesData.cast.slice(0, 4).map(({id, name, character}) => (
                                <div key={id} className={styles.modal_container_top_cast}>
                                    <p className={styles.modal_container_top_cast_character}>
                                        {character}
                                    </p>
                                    <div>
                                        <p className={styles.modal_container_top_cast_name}>{name}</p>
                                    </div>
                                </div>
                            )) : []}
                        </div>

                        <div className={styles.modal_container_divider}></div>

                        <div className={styles.modal_container_more_info}>
                            <div className={styles.modal_container_more_info_inner}>
                                <div className={styles.modal_container_director_title}>
                                    <h5 className={styles.modal_container_director_title_typography}>
                                        Director{movieExecutors.directors.length > 1 && 's'}
                                    </h5>
                                    <div className={styles.modal_container_director_cast}>
                                        <p className={styles.modal_container_top_cast_name}>
                                            {movieExecutors.directors.map(({name}, index) => (
                                                <li key={index} className={styles.modal_container_li}>
                                                    {name}
                                                </li>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.modal_container_director_title}>
                                    {movieExecutors.writers.length > 0 ?
                                        <h5 className={styles.modal_container_director_title_typography}>
                                            Writer{movieExecutors.writers.length > 1 && 's'}
                                        </h5> : null}
                                    {movieExecutors.writers.length > 0 ?
                                        <div className={styles.modal_container_director_cast}>
                                            <p className={styles.modal_container_top_cast_name}>
                                                {movieExecutors.writers.map(({name}, index) => (
                                                    <li key={index} className={styles.modal_container_li}>
                                                        {name}
                                                    </li>
                                                ))}
                                            </p>
                                        </div> : null}
                                </div>
                            </div>

                            <div className={styles.modal_container_boxoffice_container}>
                                <div className={styles.modal_container_boxoffice_title}>
                                    <h3>Box Office</h3>
                                </div>
                                <div className={styles.modal_container_boxoffice_inner}>
                                    <div className={styles.modal_container_boxoffice_budget}>
                                        <h5 className={styles.modal_container_color_gray}>
                                            Budget Worldwide
                                        </h5>
                                        <p className={styles.modal_container_boxoffice_paragraph}>
                                            {fetchedMovie?.budget ? '$ ' + getNumberWithSpaces(fetchedMovie?.budget) : 'Not available'}
                                        </p>
                                    </div>

                                    <div className={styles.modal_container_boxoffice_gross}>
                                        <h5 className={styles.modal_container_color_gray}>
                                            Cumulative Worldwide Gross
                                        </h5>
                                        <p className={styles.modal_container_boxoffice_paragraph}>
                                            {fetchedMovie?.revenue ? '$ ' + getNumberWithSpaces(fetchedMovie?.revenue) : 'Not available yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MuiModal>
    );
}

export default Modal;
