// import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa";
// import { Card, Avatar, Col, Typography, Row } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// const { Title } = Typography;
// const { Meta } = Card;
// function LandingPage() {

//     const [Videos, setVideos] = useState([])

//     useEffect(() => {
//         axios.get('/api/video/getVideos')
//             .then(response => {
//                 if (response.data.success) {
//                     console.log(response.data.videos)
//                     setVideos(response.data.videos)
//                 } else {
//                     alert('Failed to get Videos')
//                 }
//             })
//     }, [])





//     const renderCards = Videos.map((video, index) => {

//         var minutes = Math.floor(video.duration / 60);
//         var seconds = Math.floor(video.duration - minutes * 60);

//         return <Col lg={6} md={8} xs={24}>
//             <div style={{ position: 'relative' }}>
//                 <a href={`/video/${video._id}`} >
//                 <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
//                 <div className=" duration"
//                     style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
//                     color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
//                     padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
//                     fontWeight:'500', lineHeight:'12px' }}>
//                     <span>{minutes} : {seconds}</span>
//                 </div>
//                 </a>
//             </div><br />
//             <Meta
//                 avatar={
//                     <Avatar src={video.writer.image} />
//                 }
//                 title={video.title}
//             />
//             <span>{video.writer.name} </span><br />
//             <span style={{ marginLeft: '3rem' }}> {video.views}</span>
//             - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
//         </Col>

//     })



//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>
//             <Title level={2} > Recommended </Title>
//             <hr />

//             <Row gutter={16}>
//                 {renderCards}
//             </Row>
//         </div>
//     )
// }

// export default LandingPage
import React, { useEffect, useState, useRef } from 'react'
import { Typography, Row, Button } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCard from '../../commons/GridCards'
const { Title } = Typography;
function LandingPage() {
    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])


    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies([...Movies, ...result.results])
                setMainMovieImage(MainMovieImage || result.results[0])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        console.log('CurrentPage', CurrentPage)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);

    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            console.log('clicked')
            buttonRef.current.click();

        }
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />

            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > Movies by latest </Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
