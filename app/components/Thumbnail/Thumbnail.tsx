import {Movie} from "@/utils/typings";
import {modalState, movieState} from "../../atoms/modalAtom";
import styles from './Thumbnail.module.scss'

import Image from "next/image";
import {useRecoilState} from "recoil";

interface Props {
    movie: Movie;
}

function Thumbnail({movie}: Props) {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    return (
        <div
            className={styles.thumbnail_container}
            onClick={() => {
                setCurrentMovie(movie);
                setShowModal(true);
            }}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${
                    movie.backdrop_path || movie.poster_path
                }`}
                className={styles.thumbnail_image}
                layout="fill"
                alt=""
            />
            <h5 className={styles.thumbnail_title}>{movie?.title}</h5>
        </div>
    );
}

export default Thumbnail;
