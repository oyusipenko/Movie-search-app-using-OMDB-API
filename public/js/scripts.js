'use strict'
window.onload = function () {
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
        
    let movies = [];
    function getMovies () {
        movies = [];
        fetch("http://www.omdbapi.com/?apikey=8b47da7b&s="+search.value+"&page=1")
            .then(response => response.json())
            .then(function(data){
                let num = data.Search.length;
                for (let i = 0; i < num; i++) {
                    movies.push(data.Search[i]);
                }
                // console.log(data)
                console.log(movies);
                return movies;
            })
            .then(function(movies) {
                let content = document.querySelector('.content');
                content.innerHTML=''
                for (let i = 0; i < movies.length; i++) {
                    console.log(i)
                    let content__element = document.createElement('div')
                    content__element.className = 'content__element'
                    content__element.style.background = 'url('+movies[i].Poster+')'
                    let content__description1 = document.createElement('div')
                    content__description1.className = 'content__description-1'
                    content__description1.innerHTML = "<h3>"+movies[i].Title+"</h3>"
                    let content__description2 = document.createElement('div')
                    content__description2.className = 'content__description-2'
                    content__description2.innerHTML = "<h4>"+movies[i].Type+"</h4><h4>"+movies[i].Year+"</h4>"
                    content__element.append(content__description1)
                    content__element.append(content__description2)
                    content.append(content__element)


                }

            })

    }


    
    let search = document.querySelector("#search");
    let searchButton = document.querySelector("#searchButton");
    

    searchButton.addEventListener('click', function () {
        console.log(search.value)
        getMovies();
    })
};