// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined || genre ==`` || year ==``) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Please type genre and year!` // a string of data
    }
  }
  else {
    // new array of movies to be returned by the API data

    let moviesReturned = {
      numResults: 0,
      movies: []
    }

    //loop through the posts
    for (let i=0; i < moviesFromCsv.length; i++) {

    }
    // store listing in memory
    let movie = moviesFromCsv[i]

    // if the year is not 0 
    if (movie.startYear == year && movie.genres.includes(genre) && movie.genres != `\\N` && movie.runtimeMinutes != `\\N`) {
      
    // create a new object containing the pertinent fields
      let selectedMovie = {
        title: movie.primaryTitle,
        releaseYear: movie.startYear,
        movieGenre: movie.genres
      }
    // push the object to the final array
moviesReturned.movies.push(selectedMovie)
moviesReturned.numResults = moviesReturned.numResults + 1
    }
  }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(moviesReturned)  // a string of data
    }
  }
}