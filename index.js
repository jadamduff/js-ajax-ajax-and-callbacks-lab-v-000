$(document).ready(function (){
  function searchRepositories() {
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
        html += '<p><ul><li>Repo Name: <a href="' + repo['html_url'] + '">' + repo['name'] + '</a></li><li>' + repo['description'] + '</li><li>Owner Login' + repo['owner']['login'] + '</li><li><img src="' + repo['owner']['avatar_url'] + '" width="50px" /><li><a href="' + repo['owner']['html_url'] + '">Profile</a></li><li><a href="#" data-repository="' + repo['name'] + '" data-owner="' + repo['owner']['login'] + '" onclick="showCommits(this)">Show Commits</a></li></ul></p>';
      }
      html += '</ul>';
      $('#results').html(html);

      let showCommits = function(el) {
        let url = 'https://api.github.com/repos/' + el.dataset.owner + '/' + el.dataset.repository + '/commits';
        $.get(url, function(response) {
          console.log(response);
          let html = '<ul>';
          for (const repo of response) {
            html += '<p><ul><li>SHA: ' + repo['sha'] + '</li></ul></p>'
          }
          html += '</ul>';
          $('#details').html(html);
        });
      }
    });
  };

  $('#searchBtn').on('click', searchRepositories);
});
