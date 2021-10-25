import React, { useEffect, useState } from "react";
// import { Link } from "@reach/router";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://cf-asgmt-serverless-api.juanzhi.workers.dev/posts"
      );
      const postsResp = await resp.json();
      setPosts(postsResp.posts.sort((a, b) => (a.datetime < b.datetime) ? 1 : -1));
    };

    getPosts();
  }, []);

  const createPost = async (post) => {
    const resp = await fetch(
        "https://cf-asgmt-serverless-api.juanzhi.workers.dev/posts", {
            method: "POST",
            body: JSON.stringify(post),
        }
    );
    const postsResp = await resp.json();
    return postsResp
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
        id : posts.length + 1,
        title: event.target.title.value,
        username: event.target.username.value,
        content: event.target.content.value,
        datetime: new Date()
    }
    const resp = await createPost(post);
    setPosts(resp.posts.sort((a, b) => (a.datetime < b.datetime) ? 1 : -1));
  };

  return (
      <>
        <div className="App">
          <div className="create-area">
            <h1>Create a post here!</h1>
            <form action="" method="post" className="create-form" onSubmit={handleSubmit}>
              <div className="user-n-title">
                    <input id="user-name" type="text" name="username" placeholder="username" required></input>
                    <input id="title" type="text" name="title" placeholder="title"required></input>
              </div>
              <div className="content">
                  <textarea name="content" placeholder="Share something..."></textarea>
              </div>
              <div className="button">
                <input type="submit" value="Post" id="button"></input>
              </div>
            </form>
          </div>

          {/* show posts */}
          <div className="posts">
            <h1>Posts</h1>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <div id="post-user">{post.username}</div>
                    <div id="post-body"> 
                        <div id="post-title">{post.title}</div>
                        <h3 id="post-content">{post.content}</h3>
                        <p id="post-time"><em>Posted at: {new Date(post.datetime).toLocaleString()}</em></p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </>

  );
};

export default Posts;