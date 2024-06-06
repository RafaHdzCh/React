import { faker } from "@faker-js/faker";
import { memo, useEffect, useState } from "react";
import { PostProvider, usePosts } from "./PostContext";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

export default function App() 
{
  const [isFakeDark, SetIsFakeDark] = useState(false);

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () 
    {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => SetIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
      <PostProvider>
        <Header />
        <Main />
        <Archive show={false} />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() 
{
  const context = usePosts();

  return (
    <section>
      <header>
        <h1>
          <span>⚛️</span>The Atomic Blog
        </h1>
        <div>
          <Results />
          <SearchPosts />
          <button onClick={context.onClearPosts}>Clear posts</button>
        </div>
      </header>
      
      <Footer />
    </section>
  );
}

function SearchPosts() 
{
  const context = usePosts();

  return (
    <input
      value={context.searchQuery}
      onChange={(event) => context.setSearchQuery(event.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() 
{
  const context = usePosts();

  return <p>🚀 {context.posts.length} atomic posts found</p>;
}

function Main() 
{
  return (
    <main>
      <FormAddPost />
      <Posts  />
    </main>
  );
}

function Posts() 
{
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() 
{
  const context = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (event) 
  {
    event.preventDefault();
    if (!body || !title) return;
    context.onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() 
{
  const context = usePosts();
  return (
    <ul>
      {
        context.posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))
      }
    </ul>
  );
}

const Archive = memo(function Archive({show}) 
{
  const context = usePosts();
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(show);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => context.onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
})

function Footer() 
{
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}