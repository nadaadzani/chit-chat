import { createContext } from 'react';
import { useState } from "react";
import axios from 'axios'

// initial value
export const postContext = createContext({
    posts: [],
    handlePost: () => { },
})

// provider
// eslint-disable-next-line react/prop-types
export default function PostContext({ children }) {
    const [posts, setPosts] = useState([])

    async function fetchPosts() {
        try {
            const { data } = await axios.get('http://localhost:3000/posts', { headers: { Authorization: `Bearer ${localStorage.access_token}`}})
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <postContext.Provider value={
            {
                posts,
                fetchPosts,
            }
        }>
            {children}
        </postContext.Provider>
    )
}