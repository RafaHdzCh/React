import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

export const PostContext = createContext();

export function PostProvider({children})
{
  const [posts, SetPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, SetSearchQuery] = useState("");
  

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function HandleAddPost(post) 
  {
    SetPosts((posts) => [post, ...posts]);
  }

  function HandleClearPosts() 
  {
    SetPosts([]);
  }

  return(
    <PostContext.Provider value=
    {
      {
        posts:searchedPosts,
        onAddPost:HandleAddPost,
        onClearPosts:HandleClearPosts,
        searchQuery:searchQuery,
        setSearchQuery:SetSearchQuery
      }
    }>
      {children}
    </PostContext.Provider>
  )
}

export function usePosts()
{
  const context = useContext(PostContext);
  if(context === undefined) throw new Error("PostContext was used outside of the PostProvider");
  return context;
}