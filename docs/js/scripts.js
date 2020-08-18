'use strict'

window.onload = function () {
    // 
    //  HEADER SLIDER
    //
    const photos = [
        {src: "url('img/header/slider/banner1.png')"},
        {src: "url('img/header/slider/banner2.png')"},
        {src: "url('img/header/slider/banner3.png')"},
        {src: "url('img/header/slider/banner4.png')"},
        {src: "url('img/header/slider/banner5.png')"}
    ];
    const slider = document.querySelector(".slider");
    let counter = 0;
    document.querySelector("#sliderArrowLeft").addEventListener('click', function () {
        counter -= 1;
        counter = (counter + photos.length) % photos.length;
        slider.style.backgroundImage = photos[counter].src;
    })
    document.querySelector("#sliderArrowRight").addEventListener('click', function () {
        counter += 1;
        counter = (counter + photos.length) % photos.length;
        slider.style.backgroundImage = photos[counter].src;
    })
    // 
    //  MAIN REQUEST
    //
    let movies = [];
    let importedData;
    function getMovies (page) {
        movies = [];
        fetch("https://www.omdbapi.com/?apikey=8b47da7b&s="+search.value+"&page="+page+"")
            .then(response => response.json())
            .then(function(data){
                let num = data.Search.length;
                for (let i = 0; i < num; i++) {
                    movies.push(data.Search[i]);
                }
                importedData = data;
                return movies;
            })
            .then(function(movies) {
                let content = document.querySelector('.content');
                content.innerHTML=''
                for (let i = 0; i < movies.length; i++) {
                    let content__element = document.createElement('section')
                    content__element.className = 'content__element'
                    content__element.style.background = 'url('+movies[i].Poster+')'
                    let content__description1 = document.createElement('title')
                    content__description1.className = 'content__description-1'
                    content__description1.innerHTML = movies[i].Title;
                    let content__description2 = document.createElement('div')
                    content__description2.className = 'content__description-2'
                    content__description2.innerHTML = "<h4>"+movies[i].Type+"</h4><time>"+movies[i].Year+"</time>"
                    content__element.append(content__description1)
                    content__element.append(content__description2)
                    content.append(content__element)
                    document.querySelector("#totalResults").innerHTML = importedData.totalResults;
                    document.querySelector("#itemPerPage").innerHTML = movies.length;
                }
            })
            .catch(function (error) {
                console.log(error)
                document.querySelector('.content').innerHTML='Фильма с данным названием не существует в базе.'
                document.querySelector("#fromResult").innerHTML = '0';
                document.querySelector("#toResult").innerHTML = '0';
                document.querySelector("#totalResults").innerHTML = '0';
                document.querySelector("#itemPerPage").innerHTML = '0';
            });
    }
    // 
    //  HEADER PAGINATION
    //
    let search = document.querySelector("#search");
    let searchButton = document.querySelector("#searchButton");
    let pageNumber = 1;
    let fromResultSpan = document.querySelector("#fromResult");
    let toResultSpan = document.querySelector("#toResult");
    let fromResult;
    let toResult;

    searchButton.addEventListener('click', function () {
        pageNumber = 1;
        document.querySelector("#fromResult").innerHTML = '1';
        document.querySelector("#toResult").innerHTML = '10';
        getMovies(pageNumber);
    })
    document.querySelector("#prevPage").addEventListener('click', function () {
        if (pageNumber == 1) {
            pageNumber = 1;
        } else {
            pageNumber -= 1;
        }
        fromResult = pageNumber * 10-9;
        toResult = pageNumber * 10;
        if (toResult > importedData.totalResults) {
            toResult = importedData.totalResults
        } 
        fromResultSpan.innerHTML = fromResult;
        toResultSpan.innerHTML = toResult;
        getMovies(pageNumber);
    })
    document.querySelector("#nextPage").addEventListener('click', function () {
        if (Math.ceil(importedData.totalResults/10) == pageNumber) {
            
        } else {
            pageNumber += 1;
        }
        fromResult = pageNumber * 10-9;
        toResult = pageNumber * 10;
        if (toResult > importedData.totalResults) {
            toResult = importedData.totalResults
        } 
        fromResultSpan.innerHTML = fromResult;
        toResultSpan.innerHTML = toResult;
        getMovies(pageNumber);
    })
};





if (matchMedia) {
    let screen = window.matchMedia("(max-width:650px)");
    screen.addListener(changes);
    changes(screen);
};
function changes(event){
    if (event.matches) {
        document.querySelector(".description").innerHTML= "<h2><b>Welcome to MovieCollection website</b></h2>";
        document.querySelector(".search__title").innerHTML= "<h3>Explore Movies & Series</h3>";
    } else {
        document.querySelector(".description").innerHTML= "<h2><b>Welcome to MovieCollection website</b> which is run by the friends of MovieCollection</h2>";
        document.querySelector(".search__title").innerHTML= "<h3>Explore Movies <br> & Series</h3>";
    }
};
