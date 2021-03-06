window.onload = function () {
  //
  //  HEADER SLIDER
  //
  const photos = [
    { src: "url('img/header/slider/banner1.png')" },
    { src: "url('img/header/slider/banner2.png')" },
    { src: "url('img/header/slider/banner3.png')" },
    { src: "url('img/header/slider/banner4.png')" },
    { src: "url('img/header/slider/banner5.png')" }
  ];
  const slider = document.querySelector('.slider');
  let counter = 0;
  document.querySelector('#sliderArrowLeft').addEventListener('click', function () {
    counter -= 1;
    counter = (counter + photos.length) % photos.length;
    slider.style.backgroundImage = photos[counter].src;
  });
  document.querySelector('#sliderArrowRight').addEventListener('click', function () {
    counter += 1;
    counter = (counter + photos.length) % photos.length;
    slider.style.backgroundImage = photos[counter].src;
  });
  //
  //  matchMedia
  //
  function changes(event) {
    let description = document.querySelector('.description');
    let searchTitle = document.querySelector('.search__title');
    if (event.matches) {
      description.innerHTML = '<h2><b>Welcome to MovieCollection website</b></h2>';
      searchTitle.innerHTML = '<h3>Explore Movies & Series</h3>';
    } else {
      description.innerHTML = '<h2><b>Welcome to MovieCollection website</b> which is run by the friends of MovieCollection</h2>';
      searchTitle.innerHTML = '<h3>Explore Movies <br> & Series</h3>';
    }
  }
  if (matchMedia) {
    let screen = window.matchMedia('(max-width:650px)');
    screen.addListener(changes);
    changes(screen);
  }
  //
  //  MAIN REQUEST
  //
  let search = document.querySelector('#search');
  let searchButton = document.querySelector('#searchButton');
  let movies = [];
  let importedData;
  function getMovies(page) {
    movies = [];
    fetch('https://www.omdbapi.com/?apikey=8b47da7b&s=' + search.value + '&page=' + page + '')
      .then(response => response.json())
      .then(function (data) {
        let num = data.Search.length;
        for (let i = 0; i < num; i += 1) {
          movies.push(data.Search[i]);
        }
        importedData = data;
        return movies;
      })
      .then(function () {
        let content = document.querySelector('.content');
        content.innerHTML = '';
        for (let i = 0; i < movies.length; i += 1) {
          let contentElement = document.createElement('li');
          contentElement.className = 'content__element';
          if (movies[i].Poster === 'N/A') {
            contentElement.style.background = "url('./img/main/pic2.png')";
          } else {
            contentElement.style.background = 'url(' + movies[i].Poster + ')';
          }
          let contentDescription1 = document.createElement('div');
          contentDescription1.className = 'content__description-1';
          contentDescription1.innerHTML = movies[i].Title;
          let contentDescription2 = document.createElement('div');
          contentDescription2.className = 'content__description-2';
          contentDescription2.innerHTML = '<h4>' + movies[i].Type + '</h4><h4>' + movies[i].Year + '</h4>';
          contentElement.append(contentDescription1);
          contentElement.append(contentDescription2);
          content.append(contentElement);
          document.querySelector('#totalResults').innerHTML = importedData.totalResults;
          document.querySelector('#itemPerPage').innerHTML = movies.length;
        }
      })
      .catch(function () {
        document.querySelector('.content').innerHTML = 'Фильм с данным названием ' + search.value + ' не существует в базе.';
        document.querySelector('#fromResult').innerHTML = '0';
        document.querySelector('#toResult').innerHTML = '0';
        document.querySelector('#totalResults').innerHTML = '0';
        document.querySelector('#itemPerPage').innerHTML = '0';
      });
  }
  //
  //  PAGINATION
  //

  let pageNumber = 1;
  let fromResultSpan = document.querySelector('#fromResult');
  let toResultSpan = document.querySelector('#toResult');
  let fromResult;
  let toResult;

  searchButton.addEventListener('click', function () {
    pageNumber = 1;
    document.querySelector('#fromResult').innerHTML = '1';
    document.querySelector('#toResult').innerHTML = '10';
    getMovies(pageNumber);
  });
  document.querySelector('#prevPage').addEventListener('click', function () {
    if (pageNumber === 1) {
      pageNumber = 1;
    } else {
      pageNumber -= 1;
    }
    fromResult = pageNumber * 10 - 9;
    toResult = pageNumber * 10;
    if (toResult > importedData.totalResults) {
      toResult = importedData.totalResults;
    }
    fromResultSpan.innerHTML = fromResult;
    toResultSpan.innerHTML = toResult;
    getMovies(pageNumber);
  });
  document.querySelector('#nextPage').addEventListener('click', function () {
    if (Math.ceil(importedData.totalResults / 10) !== pageNumber) {
      pageNumber += 1;
    }
    fromResult = pageNumber * 10 - 9;
    toResult = pageNumber * 10;
    if (toResult > importedData.totalResults) {
      toResult = importedData.totalResults;
    }
    fromResultSpan.innerHTML = fromResult;
    toResultSpan.innerHTML = toResult;
    getMovies(pageNumber);
  });
};
