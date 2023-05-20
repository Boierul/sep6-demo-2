// 'use client'

import styles from './page.module.css'
import Row from "@/app/components/Row/Row";
import {Movie} from "@/utils/typings";
// import React, {useEffect, useState} from "react";
// import {useRecoilValue} from "recoil";
// import {modalState} from "@/app/atoms/modalAtom";
import Modal from "@/app/components/Modal/Modal";


// Need full path url in server side rendering
async function getPosts() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=aae78cfb39d643aed516a8501149479e&language=en-US`)
    if (!res.ok) {
        console.log(res)
    }
    return res.json();
}

interface Props {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
}

export default async function Home() {
    const trendingData = await getPosts()
    // console.log(trendingData)

    // const showModal = useRecoilValue(modalState);
    // const [showModal, setShowModal] = useState(false);

    // const handleAddClick = () => {
    //     setShowModal(true);
    // };
    // const handleClose = ()=>{
    //     setShowModal(false)
    // }

    return (
        <>
            <main className={styles.main}>
                <Row title="Trending Now" movies={trendingData}/>
            </main>
            <Modal/>
        </>
    )
}

