$(document).ready(function (){
  let searchRepositories = function() {
    let url = 'https://api.github.com/search/repositories?q=';
    let terms = $('#searchTerms').split(' ');
    for (const term of terms) {
      if (indexOf(term) === 0) {
        url += term;
      } else {
        url += '+' + term;
      }
    }

    $.get(url, function(response) {
      console.log(response);
    })
  };

  $('#searchBtn').on('click', searchRepositories);
});
