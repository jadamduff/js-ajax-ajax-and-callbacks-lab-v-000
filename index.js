$(document).ready(function (){
  let searchRepositories = function() {
    let url = 'https://api.github.com/search/repositories?q=';
    let terms = $('#searchTerms').val().split(' ');

    for (const term of terms) {
      if (terms.indexOf(term) === 0) {
        url += term;
      } else {
        url += '+' + term;
      }
    }

    $.get(url, function(response) {
      console.log(response);
      let html = '<ul>';
      for (const repo of response['items']) {
        html += '<ul><li>Repo Name: <a href="' + repo['html_url'] + '">' + repo['name'] + '</a></li><li>' + repo['description'] + '</li><li>Owner Login' + repo['owner']['login'] + '</li><li><img src="' + repo['owner']['avatar_url'] + '" /><li><a href="' + repo['owner']['html_url'] + '">Profile</a></li><li><a href="#" data-repository="' + repo['name'] + '" data-owner="' + repo['owner']['name'] + '" onclick="showCommits(this)">Show Commits</a></li></ul>';
      }
      $('#results').html(html);
    });
  };

  let showCommits = function() {

  }

  $('#searchBtn').on('click', searchRepositories);
});
