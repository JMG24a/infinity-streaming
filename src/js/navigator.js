window.addEventListener('load', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator() {
  if (location.hash.startsWith('#trends')) {
    trends();
  } else if (location.hash.startsWith('#search=')) {
    search();
  } else if (location.hash.startsWith('#movie=')) {
    movie();
  } else if (location.hash.startsWith('#category=')) {
    categories();
  } else {
    home();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function home(){
  //header
  $header.style.background = `white`
  $header.classList.remove('header-container--long')
  $title.classList.remove('inactive')
  $headerArrow.classList.add('inactive')
  $headerSearchTile.classList.add('inactive')
  $searchForm.classList.remove('inactive')
  //home
  $trendingPreview.classList.remove('inactive')
  $categoriesPreview.classList.remove('inactive')
  //search
  // $headerSearch.classList.add('inactive')
  //details
  $movieDetail.classList.add('inactive')
  //generic list
  $genericList.classList.add('inactive')

  getTrendingDay()
  getCategories()
}

function search(){
  //header
  $header.style.background = `white`
  $header.classList.remove('header-container--long')
  $title.classList.add('inactive')
  $headerArrow.classList.remove('inactive')
  $headerArrow.classList.remove('header-arrow--white')
  $headerSearchTile.classList.add('inactive')
  $searchForm.classList.remove('inactive')
  $movieDetail.classList.add('inactive')
  //home
  $trendingPreview.classList.add('inactive')
  $categoriesPreview.classList.add('inactive')
  //search
  // $headerSearch.classList.add('inactive')
  //details
  $movieDetail.classList.add('inactive')
  //generic list
  $genericList.classList.remove('inactive')

  const [_, dataQuery] = window.location.hash.split('=');

  getSearchPreview(dataQuery)
}


function categories(){
  //header
  $header.style.background = `white`
  $header.classList.remove('header-container--long')
  $title.classList.add('inactive')
  $headerArrow.classList.remove('inactive')
  $headerArrow.classList.remove('header-arrow--white')
  $headerSearchTile.classList.remove('inactive')
  $searchForm.classList.add('inactive')
  $movieDetail.classList.add('inactive')
  //home
  $trendingPreview.classList.add('inactive')
  $categoriesPreview.classList.add('inactive')
  //search
  // $headerSearch.classList.add('inactive')
  //details
  $movieDetail.classList.add('inactive')
  //generic list
  $genericList.classList.remove('inactive')

  const [_, dataQuery] = window.location.hash.split('=');
  const [categoryId, categoryName] = dataQuery.split('-')

  const text = document.createTextNode(`${categoryName}`)
  $headerSearchTile.innerText = ''
  $headerSearchTile.appendChild(text)

  getCategoriesPreview(categoryId)
}

function trends(){
  //header
  $header.style.background = `white`
  $header.classList.remove('header-container--long')
  $title.classList.add('inactive')
  $headerArrow.classList.remove('inactive')
  $headerArrow.classList.remove('header-arrow--white')
  $headerSearchTile.classList.remove('inactive')
  $searchForm.classList.add('inactive')
  $movieDetail.classList.add('inactive')
  //home
  $trendingPreview.classList.add('inactive')
  $categoriesPreview.classList.add('inactive')
  //search
  // $headerSearch.classList.add('inactive')
  //details
  $movieDetail.classList.add('inactive')
  //generic list
  $genericList.classList.remove('inactive')

  $headerSearchTile.innerText = 'Tendendias'

  getTrending()
}

function movie(){
  //header
  $header.classList.add('header-container--long')
  $title.classList.add('inactive')
  $headerArrow.classList.remove('inactive')
  $headerArrow.classList.add('header-arrow--white')
  $headerSearchTile.classList.add('inactive')
  $searchForm.classList.add('inactive')
  //home
  $trendingPreview.classList.add('inactive')
  $categoriesPreview.classList.add('inactive')
  //search
  // $headerSearch.classList.add('inactive')
  //details
  $movieDetail.classList.remove('inactive')
  //generic list
  $genericList.classList.add('inactive')

  const [_, dataQuery] = window.location.hash.split('=');
  const [categoryId, categoryName] = dataQuery.split('-');

  getDetailPage(categoryId)
}
