import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState([1]);
  const [itemPerPage] = useState(10);

  useEffect( () => {
    const fetchData = async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setData(res.data);
      console.log('res => ', res)
      setLoading(false);
    };

    fetchData();
  },[]);

  const indexOfLastPost = currentPage * itemPerPage;
  const indexOfFirstPost = indexOfLastPost - itemPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if(loading) return <h2>Loading....</h2>


  return (
    <div className="App">
      <h2>Posts</h2>
      <ul>
        {currentPost.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Pagination
        itemPerPage={itemPerPage}
        totalItems={data.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
