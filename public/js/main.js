const buttonEl = document.querySelector(".btn")
const getButtonEl = document.querySelector(".btn-get")
const outputEl = document.querySelector(".output-container")
const titleEl = document.querySelector(".title")
const authorEl = document.querySelector(".author")


const getPosts = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/posts/')
    const { data: posts } = await res.json()

    console.log("posts: ", posts)
    outputEl.innerHTML = ''

    posts.map((post => {
      const postTitle = document.createElement('p');
      postTitle.textContent = post.title;
      outputEl.appendChild(postTitle);
    }))

  } catch (error) {
    console.log(error)
  }
}

const createPost = async (e) => {
  e.preventDefault()
  const dataObj = {
    title: titleEl.value,
    author: authorEl.value
  }

  console.log("dataObj", dataObj)
  try {
    const res = await fetch('http://localhost:3000/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    const data = await res.json()
    console.log(data)
    titleEl.value = ''
    authorEl.value = ''
 
  }
  catch (error) {
    console.log(error)
  }
}


buttonEl.addEventListener('click', createPost)
getButtonEl.addEventListener('click', getPosts)


