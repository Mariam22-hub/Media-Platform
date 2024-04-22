import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function Media() {
    const { media, toggleLike, deleteMedia} = useGlobalContext();

    return (
        <MediaStyled>
            <div className="media-container">
                {media.map(item => {
                    const isVideo = item.filename.endsWith('.mp4') || item.filename.endsWith('.mov');
                    return (
                        <div key={item._id} className="media">
                            {isVideo ? (
                                <video width="100%" height="auto" controls>
                                    <source src={item.mediaUrl} type="video/mp4" /> 
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img src={item.mediaUrl} alt={item.title} style={{ width: '100%', height: 'auto', borderRadius: '15px' }} />
                            )}
                            <div className="content-container">
                                <div className="text-container">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                                <button 
                                    className={`like-button ${item.liked ? 'liked' : ''}`}  
                                    onClick={() => toggleLike(item._id)}>
                                    {item.liked ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>}
                                </button>
                                
                                <div className="dropdown">
                                    <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg width="12" height="14" fill="white" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        </svg>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-light bg-light">
                                        <li><a className="dropdown-item text-danger" onClick={() => deleteMedia(item._id)}>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </MediaStyled>
    );
}

const MediaStyled = styled.div`
    .media-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        grid-gap: 1.5rem;
        padding-top: 3rem;
        
        .media {
            transition: all .4s ease;
            cursor: pointer;
            border-radius: 15px;
            overflow: hidden;

            video, img {
                width: 100%;
                height: auto;
                border-radius: 15px;
            }

            .content-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                
                .like-button {
                    margin-left: 18rem;
                    background: none;
                    border: none;
                    color: #777;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.25rem 0.5rem;
                    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

                    &:hover {
                        color: #fff;
                        border-color: #777;
                    }

                    &.liked {
                        color: red;
                        &:hover {
                            color: #880808;
                            border-color: red;
                        }
                    }
                }

                .text-container {
                    h4 {
                        color: white;
                        font-size: 1.5rem;
                        font-weight: 500;
                    }

                    p {
                        color: #fff;
                        opacity: 0.8;
                        font-size: 1rem;
                        line-height: 1.4rem;
                    }
                }
                
            }
        }
    }
`;

export default Media;
