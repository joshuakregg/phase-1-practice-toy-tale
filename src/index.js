let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(element => {
    
    const toyCollection = document.querySelector('#toy-collection')
    const card = document.createElement('div')
    card.className = 'card'
    const h2 = document.createElement('h2')
    h2.innerText = element.name
    const img = document.createElement('img')
    img.src = element.image
    img.className = 'toy-avatar'
    const p = document.createElement('p')
    p.innerText = element.likes
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = element.id
    button.innerText = 'Like ❤️'
    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(button)
    toyCollection.appendChild(card)
    let likes = element.likes 
    button.addEventListener('click',() => {
      likes += 1 
      fetch(`http://localhost:3000/toys/${element.id}`, {
        method:'PATCH',
        headers: 
        {
          'Content-Type' : "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "likes": likes
        }
        )
      })
      .then(res => res.json())
      .then(data => p.innerText = data.likes)
    })
    
  }))
  function newToy(name, imageURL) { 
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json",
},

body: JSON.stringify({
  "name": name,
  "image": imageURL,
  "likes": 0
})
  })
  .then(res => res.json())
  .then(data => {
    //data is an object
    const toyCollection = document.querySelector('#toy-collection')
    const card = document.createElement('div')
    card.className = 'card'
    const h2 = document.createElement('h2')
    h2.innerText = data.name;
    const img = document.createElement('img')
    img.src = data.image
    img.className = 'toy-avatar'
    const p = document.createElement('p')
    p.innerText = data.likes
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = data.id
    button.innerText = 'Like ❤️'
    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(button)
    toyCollection.appendChild(card)
    button.addEventListener('click',() => console.log('clicked'))
  })
  }

  const form = document.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    console.log()
    console.log()
    newToy(event.target.children[1].value, event.target.children[3].value)
  })
  