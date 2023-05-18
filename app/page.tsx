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
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=aae78cfb39d643aed516a8501149479e&language=en-US`, {
        cache: "no-cache",
    })
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
                {/*{data.map((post) => (*/}
                {/*  <div key={post.id}>*/}
                {/*      <h2>{post.title}</h2>*/}
                {/*      <h4>{post.content}</h4>*/}
                {/*      <h4>{post.published.toString()}</h4>*/}
                {/*  </div>*/}
                {/*))}*/}
                <Row title="Trending Now" movies={trendingData}/>
                {/*<button style={{*/}
                {/*    paddingBottom: "100px",*/}
                {/*    backgroundColor: "red",*/}
                {/*}} onClick={handleAddClick}>Click</button>*/}
                {/*<button style={{*/}
                {/*    paddingBottom: "100px",*/}
                {/*    backgroundColor: "red",*/}
                {/*}} onClick={handleClose}>Click</button>*/}
            </main>
            <Modal showModal={true}/>
        </>
    )
}

