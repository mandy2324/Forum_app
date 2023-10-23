import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ threadId }) => {
  console.log("Thread ID in CommentForm:", threadId); 
  
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleCommentSubmit = async () => {
    console.log("Thread ID in handleCommentSubmit:", threadId); 
    const reply = {
      author: author,
      content: content,
    };

    try {
      const response = await axios.put(`http://localhost:8080/thread`, {
        _id: threadId, 
        reply: reply,
      });

      if (response.status === 200) {
       console.log("Comment added:", response.data);
       setAuthor("");
       setContent("");
        console.log("thread ID", threadId);
      } else {
        console.error("Error adding comment:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        placeholder="Your Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default CommentForm;
