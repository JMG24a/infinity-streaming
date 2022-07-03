//axios
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': key,
  }
})

//trending
async function getTrendingDay(){
  const {data} = await instance(`/trending/movie/day`)

  if(data.results.length >= 0){
    const { results } = data
    generatorListMovie(results,$trendingArticlePreview)
  }
}


//category
async function getCategories(){
  const {data} = await instance(`/genre/movie/list`)
  const {genres} = data;

  if(genres){
    createCategories(genres)
  }
}

function createCategories(data){
  $categoryPreview.innerHTML = ""
  data.forEach(item => {
    const $div = document.createElement('div')
    const $h3 = document.createElement('h3')
    const $h3Text = document.createTextNode(`${item.name}`)

    $div.className = 'category-container'
    $div.onclick = () => window.location.hash = `#category=${item.id}-${item.name}`
    $h3.className = 'category-title'
    $h3.id = `id${item.id}`

    $h3.appendChild($h3Text)
    $div.appendChild($h3)
    $categoryPreview.appendChild($div)
  });
}


//page categories
async function getCategoriesPreview(query){
  const {data} = await instance(`/discover/movie`,{
    params: {
      'with_genres': query
    }
  })

  if(data.results.length >= 0){
    const { results } = data
    generatorListMovie(results,$genericList)
  }
}

//generator list movie
function generatorListMovie(data, $){
  data.forEach(item => {
    const $div = document.createElement('div')
    const $img = document.createElement('img')

    $div.className = 'movie-container'
    $img.src = `https://image.tmdb.org/t/p/w300${item.poster_path}`
    $img.className = 'movie-img'
    $img.alt = `${item.original_title}`

    $div.appendChild($img)
    $.appendChild($div)
  });
}
