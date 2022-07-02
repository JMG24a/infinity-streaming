const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
})
const key ='db0420ba-17c8-430c-9d3c-4f54eb338543';
instance.defaults.headers.common['X-API-KEY'] = `${key}`

const formCat = document.getElementById('formCat')
const uploadCat = document.getElementById('uploadCat')
const file = document.getElementById('file')
const button = document.getElementById('reload');
const favorite = document.getElementsByClassName('favorite');
const span = document.getElementById('error');

button.addEventListener('click', function(){
    getImage()
})

async function getImage() {
    try{
        const {data} = await instance('/images/search?limit=4&page=1')

        if(data.length >= 0){
            const section = document.getElementById('init')
            section.innerHTML = ""
            data.forEach(item => {
                const div = document.createElement('div');
                const picture = document.createElement('picture');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const textBtn = document.createTextNode('Favorite');

                div.className = 'divRandom'
                img.src = item.url
                img.className = 'image'
                btn.onclick = () => saveImageFavorite(item.id)
                btn.className = "favorite"

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
        const {data} = await instance(`/favourites`)

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
                btn.className = "delete-favorite"
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
    instance.post(`/favourites`,{
        image_id: id
    })
        .then((res) => {
           getImageFavorite()
        })
        .catch((e) => console.error(e.message))
}

async function deleteImageFavorite(id) {
    try{
        const res = await instance.delete(`/favourites/${id}`)
        if(res.status !== 200){
            span.innerHTML = `Algo salio mal codigo de error: ${res.status}`
            setTimeout(()=>{span.innerHTML = ''},5000)
        }else{
            getImageFavorite()
        }
    }catch(e){console.error(e.message)}
}

function renderImage(formData) {
    const file = formData.get('file')
    const image = URL.createObjectURL(file)
    uploadCat.setAttribute('src', image)
}

file.addEventListener('change', (event) => {
    console.log('holas', formCat)
    const formData = new FormData(formCat)
    renderImage(formData)
});

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