 const bar = document.querySelector('.bar');
  const sect1 = document.querySelector('.sect1');

  bar.addEventListener('click', () => {
    sect1.classList.toggle('show');
  });

  const box = document.getElementById('box')
  const year =  new Date().getFullYear();
  box.innerText = `Copy @ ${year}. All Right Deserved `

  fetch('http://localhost:3000/blogs')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('blogs')
   
    data.forEach(blog => {
      const div = document.createElement('div')
       div.className = 'blog-card'
      div.innerHTML = ` 
      ${blog.image ? `<img src="http://localhost:3000/images/${blog.image}" > ` : '' }
        <div class='line'> 
        <h3>${blog.headline}</h3>
           <p> <i>${blog.blog}</i></p>
            <strong>Author: ${blog.author}</strong>
           <div> 
              <div> 
                   <small> ${new Date(blog.createdAt).toLocaleDateString(undefined, {
              year:'numeric' ,
              month: 'long' , 
              day: 'numeric'
              
            })}</small> 
              </div>
            
            <button class="delete-btn" data-id="${blog._id}">Delete</button>
            </div>    
        </div>   
            
      `
      container.appendChild(div)

      const deleteBtn = div.querySelector('.delete-btn')
      deleteBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this blog?")) {
          fetch(`http://localhost:3000/blogs/${blog._id}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(result => {
              alert('Blog deleted successfully!')
              window.location.reload()
            })
            .catch(err => console.error('Error deleting:', err))
        }
      })
      
    })
  })
  .catch(err => console.error('error' , err))


  
  const form = document.getElementById('blogForm')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const formData = new FormData(form)

  fetch('http://localhost:3000/blogs', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      alert('Blog posted successfully!')
      console.log(data)
      window.location.reload() // reload page to show new blog
    })
    .catch(err => console.error('Error:', err))
})
