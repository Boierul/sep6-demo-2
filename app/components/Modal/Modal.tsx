'use client'

import MuiModal from "@mui/material/Modal";
import {modalState, movieState} from "@/app/atoms/modalAtom";
import {Cast, Element, Genre, Movie, MovieCredits} from "@/utils/typings";
import {useRecoilState} from "recoil";
import XIcon from "@heroicons/react/outline/XIcon";
import {useEffect, useState} from "react";
import ReactPlayer from "react-player/lazy";
import {PlusIcon, VolumeOffIcon} from "@heroicons/react/solid";
import {CheckIcon, VolumeUpIcon} from "@heroicons/react/outline";
import toast, {Toaster} from "react-hot-toast";
import styles from "./Modal.module.scss";

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [fetchedMovie, setFetchedMovie] = useState<Movie>();
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(true);
    const [addedToList, setAddedToList] = useState(false);
    // const { user } = useAuth();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [moviesData, setMoviesData] = useState<MovieCredits>();
    const [cast, setCast] = useState<Cast>();


    useEffect(() => {
        if (!movie) return;

        async function getMovieCreditsFetch() {
            const movieData = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
                .then((res) => res.json());

            if (movieData?.cast && movieData?.crew) {
                setCast(movieData.cast)
                console.log(movieData.cast);
            }
            // if (movieData?.cast && movieData?.crew) {
            //     setMoviesData(movieData)
            //     console.log(movieData);
            // }
        }

        async function fetchMovie() {
            // console.log("Fetching movie");

            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === "tv" ? "tv" : "movie"
                }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then((response) => response.json());

            setFetchedMovie(data);

            // console.log(data);

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
    //     const topButtonsElement = document.getElementById('ytp-chrome-top-buttons');
    //     if (topButtonsElement) {
    //         topButtonsElement.className.style.display = 'none';
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


    // @ts-ignore
    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className={styles.modal_container}
        >
            <>
                <Toaster position="bottom-center"
                         toastOptions={{
                             style: {
                                 border: '1px solid #ffffff',
                                 padding: '16px',
                                 background: '#181818',
                                 color: '#ffffff'
                             },
                         }}/>
                <button
                    onClick={handleClose}
                    className={`${styles.modalButton_Close}`}
                >
                    <XIcon height="1.5rem" width="1.5rem" stroke-width="2"/>
                </button>

                <div className={styles.modal_container_player}>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        muted={muted}
                        playing
                        style={{
                            position: "absolute",
                            top: "0",
                            left: "0"
                        }}
                    />

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

                <div className={styles.modal_container_asdasda}>
                    <div className={styles.modal_container_dasd}>

                        <div className={styles.modal_container_info}>
                            <p className={styles.modal_container_rating}>
                                Rating: {fetchedMovie?.vote_average.toFixed(1)}
                                {/*Rating: 7.2*/}
                            </p>
                            <p className={styles.modal_container_date}>
                                {/*12 December 2022*/}
                                {fetchedMovie?.release_date || fetchedMovie?.first_air_date}
                            </p>
                            <div className={styles.modal_container_icon}>
                                HD
                            </div>
                        </div>

                        <div className={styles.modal_container_info_main}>
                            <div className={styles.modal_container_inner}>
                                <h2 className={styles.modal_container_movie_title}>
                                    {/*Movie Title*/}
                                    {fetchedMovie?.title || fetchedMovie?.name}
                                </h2>
                                <p className={styles.modal_container_sasdas}>{fetchedMovie?.overview}</p>
                                {/*<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>*/}
                            </div>

                            <div className={styles.modal_container_description_container}>
                                <div>
                                    <span className={styles.color_gray}>Genres: </span>
                                    {/*Action, Adventure, Fantasy*/}
                                    {genres.map((genre) => genre.name).join(", ")}
                                </div>

                                <div>
                                    <span className={styles.color_gray}>Original language: </span>
                                    {/*EN*/}
                                    {fetchedMovie?.original_language.toUpperCase()}
                                </div>
                                <div>
                                    <span className={styles.color_gray}>Total votes: </span>
                                    {/*3000*/}
                                    {fetchedMovie?.vote_count}
                                </div>
                            </div>
                        </div>
                        <div>
                            cast:
                            {cast && <span>hej</span>}
                            {/*{cast.slice(0, 3).map(({ id, name, }) => (*/}
                            {/*    <span>{name}</span>*/}
                            {/*))}*/}
                            {/*{moviesData.cast.slice(0, 3).map(({ id, name}) => (*/}
                            {/*    <div key={id}>*/}
                            {/*        /!*<p>*!/*/}
                            {/*        /!*    {character.replaceAll('/', '\n')}*!/*/}
                            {/*        /!*</p>*!/*/}
                            {/*        <div>*/}
                            {/*            <p>{name}</p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;
