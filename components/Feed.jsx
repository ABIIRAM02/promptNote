'use client'

import { useState , useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data , handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout" >
      {data.map((post, index) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText , setSearchText] = useState('');
  const [post , setPost] = useState([])
  const dummyData = post
  
  const handleSearchcChange = (e) => {

    const value = e.target.value
    setSearchText(value)

    const filteredPosts = post?.filter(({ prompt }) =>
    prompt.toLowerCase().includes(value.toLowerCase())
);
    if(value === ''){
      fetchPosts()
    }

    setPost(filteredPosts)

  }

    const fetchPosts = async () => {

      const res = await fetch('/api/prompt')
      const data = await res.json();

      setPost(data)
    }

  useEffect(()=> {
    fetchPosts()
  } , [])


  return (
    <section className="feed" >
      <form className="relative w-full flex-center" >
        <input 
        type="text"
        placeholder="Search for a tag or username"
        value={searchText}
        onChange={handleSearchcChange}
        required
        className="search_input peer"
        />
      </form>

    <PromptCardList
    data={post}
    handleTagClick={ () => {} }
    />

    </section>
  )
}

export default Feed