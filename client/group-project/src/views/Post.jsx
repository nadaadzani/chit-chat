// import React from 'react'
import { Icon } from "@iconify/react";
// import toast, { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import { postContext } from "../context/PostContext";
import { useEffect } from "react";
import axios from 'axios'

const Post = ({url}) => {
  const { posts, fetchPosts } = useContext(postContext);
  // const [posts, setPosts] = useState([])

//   console.log(posts);
    async function incrementLike(e,id) {
        try {
            await axios.post(`${url}/likes/${id}`, {}, {headers: {Authorization: `Bearer ${localStorage.access_token}`}})
            fetchPosts()
        } catch (error) {
            console.log(error)
        }
    }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <section className="md:py-12 min-h-screen pt-2">
        <div className="w-full min-h-screen mx-auto px-4 md:px-8">
          <div className="max-w-full">
            <h1 className="text-gray-800 text-4xl font-extrabold sm:text-5xl">
              All Posts
            </h1>
          </div>
          <ul className="mt-12 divide-y space-y-3">
            {posts?.map((post, idx) => (
              <li
                key={idx}
                className="px-4 py-5 duration-150 w-full hover:border-white hover:rounded-xl hover:bg-gray-50">
                <a className="space-y-3">
                  <div className="flex items-center gap-x-3">
                    <div className="bg-white w-14 h-14 border rounded-full flex items-center justify-center">
                      <img
                        className="rounded-full object-cover size-14"
                        src={post.User.avatarUrl}
                        alt=""
                      />
                    </div>
                    <div>
                      <span className="block text-sm text-indigo-600 font-medium"></span>
                      <h3 className="text-base text-gray-800 font-semibold mt-1">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 sm:text-sm">{post.content}</p>
                  <div className="text-sm text-gray-600 flex items-center gap-6">
                    <span className="flex items-center gap-2">
                      <Icon
                        className="hover:text-red-500 size-8"
                        icon="wpf:like"
                        onClick={e => incrementLike(e, post.id)}
                      />

                      {post.likes}
                    </span>
                    <span className="flex items-center gap-2">
                      {post.createdAt.split('T')[0]}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Post;
