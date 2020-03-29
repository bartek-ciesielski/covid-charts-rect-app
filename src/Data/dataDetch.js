import React, { useEffect, useState } from 'react';
import { readString } from 'react-papaparse'


const Posts = () => {

    const [postsList, setPostArr] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(response => response.json())
            .then(data => setPostArr([...data]
            ))
            .catch((error) => {
                alert('Error:', error);
            });
    }, []);
    console.log(postsList, 'sssssss')
   return postsList
}

export default Posts