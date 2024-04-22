import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import ButtonComponent from './buttonComponent';
import axios from "axios"

axios.defaults.timeout = 120000;

function UploadComponent(props) {
    const {fetchMedia} = useGlobalContext()

    const [media, setMedia] = React.useState(null);
    const [newMedia, setNewMedia] = React.useState(null)
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [label, setLabel] = React.useState('Upload your media...');
    const [loading, setLoading] = React.useState(false);

    const handleTextChange = name => e => {
        if(name === 'title'){
            setTitle(e.target.value)
        }
        else{
            setDescription(e.target.value)
        }
    }

    const handleMedia = (e) => {
        console.log(e.target.value)

        setMedia(e.target.files[0])
        setLabel(e.target.files[0].name)
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true)

        if(title){
            const formData = new FormData();
            // console.log(e.target.title.value)
            // console.log(e.target.description.value)
            // console.log(e.target.media.files[0])

            formData.append('title', e.target.title.value)
            formData.append('description', e.target.description.value)
            formData.append('file', e.target.media.files[0]);
            
            try {
                const response = await axios.post('http://localhost:3001/upload', formData, {
                    headers:{"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"}
                });

                if (response.status == 202) {
                    alert("File has uploaded...")
                }

                fetchMedia();
            } 
            catch (error) {
                fetchMedia();
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            } 
        }
        else{
            alert('Please add a Title')
        }
        
        setLoading(false)
        setTitle('')
        setDescription('')
        setMedia(null)
        setLabel('Upload your video...')
    }


    React.useEffect(() => {
        console.log("in event source")
        const eventSource = new EventSource('http://localhost:3001/events');
        eventSource.onmessage = function(event) {
            console.log('Event received:', event.data);
            const { message, media } = JSON.parse(event.data);
            alert(message);
            fetchMedia()
        };

        eventSource.onerror = function(event) {
            console.error('EventSource failed:', event);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [fetchMedia]);

    return (
        <UploadStyled>
            
            <h2>Upload Media</h2>
            
            <form onSubmit={handleUpload} action="upload" method='POST' encType='multipart/form-data'>
                
                <div className="input-control">
                    <label htmlFor="title" required = {true}> Title </label>
                    
                    <input 
                        type="text"
                        name="title" 
                        id="title" 
                        placeholder='Enter Title' 
                        value={title} 
                        onChange={handleTextChange('title')}
                    />

                </div>

                <div className="input-control">
                    <label htmlFor="description">Description</label>
                    
                    <textarea 
                        name="description" 
                        placeholder='Enter description here...' 
                        id="description" cols="30" rows="6"
                        value={description}
                        onChange={handleTextChange('description')}
                    >
                    </textarea>
                </div>

                <div className="input-control upload-con">
                    <label htmlFor="media">Media Upload</label>
                    
                    <div className="inner-input">
                        <label 
                            className='inner-label' 
                            htmlFor="media"
                            style={{color: media ? '#00b894' : 'rgb(74 74 74)'}}
                            >
                                {label}
                        </label>

                        <input 
                            type="file" 
                            name="media" 
                            id="media"
                            accept="image/*, video/*"
                            hidden
                            onChange={handleMedia}
                        />
                    </div>
                    <div className="upload-btn">
                        <ButtonComponent     
                            name="Upload"
                            bg={"#00b894"}
                            type="submit"
                            disabled={loading}
                        />
                    </div>
                </div>
            </form>
        </UploadStyled>
    );
}


const UploadStyled = styled.div`
    position: fixed;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    background: #262626;  
    padding: 2rem; 
    border-radius: 15px;
    box-shadow: 3px 5px 30px rgba(255,255,255,0.1);
    
    h2{
        color: #fff;
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        .input-control{
            display: flex;
            flex-direction: column;
            input, textarea{
                padding: .8rem 1rem;
                border:1px solid rgb(74 74 74);
                border-radius: 5px;
                outline: none;
                resize: none;
                background: transparent;
                color: #fff;
            }
            label{
                font-size: 1.2rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
                color: #fff;
                opacity: 0.9;
            }
        }
        .inner-input{
            display: flex;
            align-items: center;
            justify-content: center;
            border:2px dashed rgb(74 74 74);
            border-radius: 5px;
            padding: 1rem;
            cursor: pointer;
            height: 90px;
            position: relative;
            padding: 1rem;
            
            .inner-label{
                cursor: pointer;
                margin: 0;
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgb(74 74 74);
            }
        }

        .upload-btn{
            display: flex;
            justify-content: flex-end;
            margin-top: 2rem;
        }
    }
`;

export default UploadComponent;