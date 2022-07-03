const history = []

function redirectTrending(){
  window.location.hash = '#trends'
}

function redirectCategory(item){
  const direction = `#category=${item.id}-${item.name}`
  history.push(direction)
  window.location.hash = direction
}

function redirectMovie(item){
  const direction = `#movie=${item.id}-${item.title}`
  history.push(direction)
  window.location.hash = direction
}

$headerArrow.addEventListener('click', function(){
  history.pop(window.location.hash)
  window.location.hash = history[history.length - 1]

  if(history.length <= 0){
    window.location.hash = '#home'
  }
})

$searchForm.addEventListener('submit', function(e){
  e.preventDefault()

  if($searchingMovie.value.length > 0){
    const value = $searchingMovie.value
    $searchingMovie.value = ""
    window.location.hash = `#search=${value}`
    history.push(`#search=${value}`)
  }
})
