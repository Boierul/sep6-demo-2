"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {PlayIcon, PlusIcon} from "@heroicons/react/solid";

import {Movie} from "@/utils/typings";
import styles from "./Banner.module.scss"
import {modalState, movieState} from "@/app/atoms/modalAtom";
import {useRecoilState} from "recoil";

interface Props {
    netflixOriginals: {
        results: Movie[];
    };
}

function Banner({netflixOriginals}: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * netflixOriginals.results.length);
        setMovie(netflixOriginals.results[randomIndex]);
    }, [netflixOriginals]);

    console.log(movie);

    return (
        <div className={styles.banner_container}>
            <div className={styles.banner_container_image}>
                <div className={styles.banner_image}>
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}`}
                        layout="fill"
                        alt="Netflix Banner"
                        loading={"lazy"}
                        style={{
                            objectFit: "cover"
                        }}
                    />
                </div>
            </div>

            <h1 className={styles.banner_title}>
                {movie?.title || movie?.name || movie?.original_name || "No Available Title"}
            </h1>
            <p className={styles.banner_overview}>
                {movie?.overview || "No available description for this movie"}
            </p>

            <div className={styles.banner_button_container}>
                <button
                    className={styles.banner_button}
                    onClick={() => {
                        setCurrentMovie(movie);
                        setShowModal(true);
                    }}
                >
                    <PlayIcon height="1.5rem" width="1.5rem"/> Play
                </button>
                <button
                    className={styles.banner_button}
                >
                    <PlusIcon height="1.5rem" width="1.5rem"/> My List
                </button>
            </div>
        </div>
    );
}

export default Banner;