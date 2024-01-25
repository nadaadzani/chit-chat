// import React from 'react'
import { Icon } from "@iconify/react";
// import toast, { Toaster } from 'react-hot-toast';
import { useContext } from "react";
import { postContext } from "../context/PostContext";
import { useEffect } from "react";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
// eslint-disable-next-line react/prop-types
const Post = ({url,socket}) => {
  const { posts, fetchPosts } = useContext(postContext);
  // const [posts, setPosts] = useState([])

//   console.log(posts);
    async function incrementLike(e,id) {
        try {
            await axios.post(`${url}/likes/${id}`, {}, {headers: {Authorization: `Bearer ${localStorage.access_token}`}})
            fetchPosts()

            socket.emit("sendNotification", {
              senderName: user,
              receiverName: username,
            });

        } catch (error) {
            console.log(error)
        }
    }

    // const handleNotification = (type) => {
    //   type === 1 && setLiked(true);
    //   socket.emit("sendNotification", {
    //     senderName: user,
    //     receiverName: post.username,
    //     type,
    //   });
    // };

    const notify = () => toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Anjing
              </p>
              <p className="mt-1 text-sm text-gray-500">
                You got a new likes!
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <section className="md:py-12 pt-2">
        <div className="min-w-full  overflow-y-scroll px-4 md:px-8">
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
                      <h3 className="text-lg first-letter:uppercase text-gray-800 font-bold mt-1">
                        {post.User.username}
                      </h3>
                      <h5 className="text-xs text-blue-500 font-semibold">
                      {post.User.status}
                      </h5>
                    </div>
                  </div>
                  <p className="text-gray-600 sm:text-sm">{post.content}</p>
                  <div className="text-sm text-gray-600 flex items-center gap-6">
                    <span className="flex items-center gap-2">
                      <Icon
                        className="hover:text-red-500 size-8"
                        icon="wpf:like"
                        onClick={e => {
                          incrementLike(e, post.id);
                          notify();
                        }}
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
          <Toaster />
        </div>
      </section>
    </>
  );
};

export default Post;
