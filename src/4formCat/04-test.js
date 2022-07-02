const button = document.getElementById('reload');
const favorite = document.getElementsByClassName('favorite');
const span = document.getElementById('error');

button.addEventListener('click', function(){
    getImage()
})

async function getImage() {
    try{
        const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=4&page=1',{
            method: 'GET',
        })
        const data = await res.json()

        if(data.length >= 0){
            data.forEach(item => {
                const section = document.getElementById('init')
                const div = document.createElement('div');
                const picture = document.createElement('picture');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const textBtn = document.createTextNode('Favorite');

                div.className = 'div'
                img.src = item.url
                img.className = 'image'
                btn.onclick = () => saveImageFavorite(item.id)

                btn.appendChild(textBtn)
                picture.appendChild(img)
                div.appendChild(picture)
                div.appendChild(btn)
                section.appendChild(div)
            })
        }else{
            span.innerHTML = `Algo salio mal codigo de error: ${res.status}`
            setTimeout(()=>{span.innerHTML = ''},5000)
        }
    }catch(e){ console.error(e.message) }
}

async function getImageFavorite() {
    try{
        const res = await fetch(`https://api.thecatapi.com/v1/favourites`,{
            method: 'GET',
            headers: {
                'X-API-KEY': `${key}`
            }
        })
        const data = await res.json()
        const article = document.getElementById('yourFavorite')
        if(data.length >= 0){
            article.innerHTML = ""
            data.forEach(item => {
                const btnText = document.createTextNode('delete')
                const div = document.createElement('div')
                const btn = document.createElement('button')
                const img = document.createElement('img')

                btn.appendChild(btnText)
                btn.onclick = () => deleteImageFavorite(item.id)
                img.src = item.image.url
                img.className = 'image_favorite'
                div.className = 'divFavorite'
                div.appendChild(img)
                div.appendChild(btn)
                article.appendChild(div)
            });
        }else{

        }
    }catch(e){console.error(e.message)}
}

function saveImageFavorite(id) {
    fetch(`https://api.thecatapi.com/v1/favourites`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${key}`
        },
        body: JSON.stringify({image_id: id})
    })
        .then((res) => res.json())
        .then((res) => {
           getImageFavorite()
        })
        .catch((e) => console.error(e.message))
}

async function deleteImageFavorite(id) {
    try{
        const res = await fetch(`https://api.thecatapi.com/v1/favourites/${id}?api_key=${key}`,{
            method: 'DELETE',
            'X-API-KEY': `${key}`
        })
        const data = await res.json()
        if(res.status !== 200){
            span.innerHTML = `Algo salio mal codigo de error: ${res.status}`
            setTimeout(()=>{span.innerHTML = ''},5000)
        }else{
            getImageFavorite()
        }
    }catch(e){console.error(e.message)}
}

async function uploadCatPicture(){
    const form = document.getElementById('formCat')
    const formData = new FormData(form)
    try{
        const res = await fetch('https://api.thecatapi.com/v1/images/upload',{
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // ya que estamos enviando un form-data fetch coloca el content-type y las variables extra 
                'X-API-KEY': `${key}`
            },
            body: formData
        })

        const data = await res.json()
        if(res.ok){
            saveImageFavorite(data.id)
        }else{
            span.innerHTML = `Algo salio mal codigo de error: ${res.status}`
            setTimeout(()=>{span.innerHTML = ''},5000)
        }

    }catch(e){ console.error(e.message)}
}

getImage()
getImageFavorite()