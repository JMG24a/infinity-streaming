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
    createCategories(genres, $categoryPreview)
  }
}

function createCategories(data, $){
  $.innerHTML = ""
  data.forEach(item => {
    const $div = document.createElement('div')
    const $h3 = document.createElement('h3')
    const $h3Text = document.createTextNode(`${item.name}`)

    $div.className = 'category-container'
    $div.onclick = () => redirectCategory(item)
    $h3.className = 'category-title'
    $h3.id = `id${item.id}`

    $h3.appendChild($h3Text)
    $div.appendChild($h3)
    $.appendChild($div)
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

//page search
async function getSearchPreview(query){
  const {data} = await instance(`/search/movie`,{
    params: {
      query
    }
  })

  if(data.results.length >= 0){
    const { results } = data
    generatorListMovie(results,$genericList)
  }
}

//page trending
async function getTrending(){
  const {data} = await instance(`/trending/movie/week`)

  if(data.results.length >= 0){
    const { results } = data
    generatorListMovie(results,$genericList)
  }
}


//page Details
async function getDetailPage(id){
  const {data} = await instance(`/movie/${id}`)

  if(data){
    $detailCategoriesList.innerHTML = ""

    const { overview, vote_average, original_title, genres, poster_path, id} = data
    initialSection(overview, vote_average, original_title, poster_path)
    createCategories(genres, $detailCategoriesList)
    getRelationMovies(id)
  }
}

function initialSection(overview, vote_average, original_title, posterPath){
  $detailDescription.innerText = ""
  $detailDescription.innerText = overview

  $detailScore.innerText = ""
  $detailScore.innerText = vote_average

  $detailTitle.innerText = ""
  $detailTitle.innerText = original_title

  const imgURL = `https://image.tmdb.org/t/p/w500${posterPath}`
  $header.style.background = `
  linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
  url(${imgURL})`
}

async function getRelationMovies(id){
  const {data} = await instance(`/movie/${id}/recommendations`)
  console.log(data)
  if(data){
    const {results} = data
    generatorListMovie(results,$relationMovies)
  }
}

//generator list movie
function generatorListMovie(data, $){
  $.innerHTML = ""
  data.forEach(item => {
    const $div = document.createElement('div')
    const $img = document.createElement('img')

    $div.className = 'movie-container'
    $div.onclick = () => redirectMovie(item)
    $img.src = `https://image.tmdb.org/t/p/w300${item.poster_path}`
    $img.className = 'movie-img'
    $img.alt = `${item.original_title}`

    $div.appendChild($img)
    $.appendChild($div)
  });
}
