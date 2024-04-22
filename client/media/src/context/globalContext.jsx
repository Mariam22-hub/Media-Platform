import React, { useEffect } from "react";
import axios from "axios"

const GlobalContext = React.createContext()

//actions
const LOADING = 'LOADING'
const SET_MEDIA = 'SET_MEDIA'
// const SET_SELECTED_MEDIA = 'SET_SELECTED_MEDIA'
const TOGGLE_LIKE = 'TOGGLE_LIKE';
const DELETE_MEDIA = 'DELETE_MEDIA';

const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true};
        
        case SET_MEDIA:
            if (!Array.isArray(action.payload)) {
                    console.error('Expected an array for SET_MEDIA, received:', action.payload);
                    return {
                        ...state,
                        loading: false,
                        media: []
                    };
            }
            return{
                ...state,
                loading: false,
                media: [
                    ...action.payload.map((file) => {
                        return{
                            ...file,
                            mediaUrl: file.mediaUrl 
                        }
                    })
                ]
            }

        case TOGGLE_LIKE:
            const updatedMedia = state.media.map(media => {
                if (media.id === action.payload) {
                    return {...media, liked: !media.liked};
                }
                return media;
            });
            return {
                ...state,
                media: updatedMedia
            };
        
        case DELETE_MEDIA:
            return {
                ...state,
                media: state.media.filter(media => media.id !== action.payload)
            };
        
        default:
            return state;
    }
}

// const reducer = (state, action) => {
//     switch(action.type){
//         case LOADING:
//             return {...state, loading: true}
        // case SET_MEDIA:
        //     if (!Array.isArray(action.payload)) {
        //             console.error('Expected an array for SET_MEDIA, received:', action.payload);
        //             return {
        //                 ...state,
        //                 loading: false,
        //                 media: []
        //             };
        //     }
        //     return{
        //         ...state,
        //         loading: false,
        //         media: [
        //             ...action.payload.map((file) => {
        //                 return{
        //                     ...file,
        //                     mediaUrl: file.mediaUrl 
        //                 }
        //             })
        //         ]
        //     }
//         default:
//             return state
//     }
// }

export const GlobalProvider = ({children}) => {
    
    const initialState = {
        media: [],
        loading: false,
    }

    const [state, dispatch] = React.useReducer(reducer, initialState)
    
    // get all media
    const fetchMedia = async () => {
        try {
            const response = await axios.get('http://localhost:3001',{
                headers: {
                    'Content-Type': 'multipart/form-data'
                } 
            })
            console.log(response)

            dispatch({type: SET_MEDIA, payload: response.data.data.result.data})
        } 
        catch (error) {
            console.log(error)
        }   
    }

    const toggleLike = async (id) => {
        try {
            console.log(id)
            const response = await axios.put(`http://localhost:3001/toggle/${id}`);
            console.log(response)
            if (response.status === 200) {
                dispatch({ type: TOGGLE_LIKE, payload: id });
                fetchMedia()
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const deleteMedia = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/delete/${id}`);
            alert("Media is being deleted")
            if (response.status === 200) {
                dispatch({ type: DELETE_MEDIA, payload: id });
                alert("Media Deleted")
                fetchMedia();
            } 
            else {
                console.error('Failed to delete media:', response);
                alert("Failed to delete media")
            }
        } catch (error) {
            console.error('Error deleting media:', error);
            alert("Failed to delete media")
        }
    };

    useEffect(() => {
        fetchMedia()
    }, [])

    return (
        <GlobalContext.Provider value={{ ...state, fetchMedia, toggleLike, deleteMedia }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    return React.useContext(GlobalContext)
}