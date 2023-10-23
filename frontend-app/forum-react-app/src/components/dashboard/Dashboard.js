import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import CommentForm from './CommentForm'; 
import { useAuth } from "../../service/AuthContextProvider"; 

import "./Dashboard.css";

const cardStyle = {
  color: 'black', // Set the font color to black
};

const Dashboard = () => {
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [threads, setThreads] = useState([]); 

  const [showReplies, setShowReplies] = useState(false);
  const { user } = useAuth();
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/thread') 
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        console.error('Error fetching threads:', error);
      });
  }, []);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleCommentClick = (threadId) => {
    if (user) {
      setIsAddingComment(true);
      setCurrentThreadId(threadId);
    } else {
      alert("Please log in or sign up to comment.");
    }
  };

  return (
    <Container>
      {threads.map((thread) => (
        <Card style={{ width: '18rem' }} key={thread._id} className="my-3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Card.Title style={{ fontSize: '1rem' }}>{thread.title}</Card.Title>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '1rem' }}>{thread.topic}</Card.Subtitle>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Text style={{ fontSize: '1rem' }}>{thread.content}</Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Text style={{ fontSize: '1rem' }}><strong>Author:</strong> {thread.author}</Card.Text>
            </ListGroup.Item>
            {showReplies && (
              thread.replies.map((thread) => (
                <ListGroup.Item key={thread._id}>
                  <Card.Text style={{ fontSize: '1rem' }}>
                    <strong>Author:</strong> {thread.author}
                    <br />
                    <strong>Content:</strong> {thread.content}
                  </Card.Text>
                </ListGroup.Item>
              ))
            )}
            <ListGroup.Item>
              <Button variant="primary" onClick={toggleReplies}>
                {showReplies ? 'Hide Replies' : 'Show Replies'}
              </Button>
              {user && !isAddingComment && (
                <Button variant="success" className="ml-2" onClick={() => handleCommentClick(thread._id)}>Comment</Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
     {isAddingComment && (
  <CommentForm threadId={currentThreadId} />
)}

    </Container>
  );
};

export default Dashboard;
