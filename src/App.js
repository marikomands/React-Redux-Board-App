import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "./features/Posts";

function App() {
  const [name, setName] = useState("");
  console.log("🚀 ~ App ~ name:", name);
  const [content, setContent] = useState("");

  const postList = useSelector((state) => state.posts.value);
  console.log("🚀 ~ App ~ postList:", postList);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addPost({
        id: uuidv4(),
        name: name,
        content: content,
      })
    );
    setName("");
    setContent("");
  };

  return (
    <div className="App">
      <div>
        <h1>React-Redux Bulletin Board</h1>
      </div>
      <div className="addPost">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Contents"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button onClick={() => handleClick()}>Post</button>
        <hr />
      </div>
      <div className="displayPosts">
        {postList.map((post) => (
          <div key={post.id} className="post">
            <h1 className="postName">{post.name}</h1>
            <h2 className="postContent">{post.content}</h2>
            <button onClick={() => dispatch(deletePost({ id: post.id }))}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
