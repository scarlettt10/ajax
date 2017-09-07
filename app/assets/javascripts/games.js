var currentGame = {};
var showForm = false;
var editingGame;

$(document).ready( function() {

  function getGame(id) {
    $.ajax({
      url: '/games/' + id,
      type: 'GET'
    }).done( function(game) {
      if (editingGame) {
        var li = $("[data-id='" + id + "'").parents('li');
        $(li).replaceWith(game);
        editingGame = null;
      } else {
        $('#games-list').append(game);
      }
    });
  }

  function toggle() {
    showForm = !showForm;
    $('#game-form').remove();
    $('#games-list').toggle();

    if (showForm) {
      let data = {};
      if (editingGame) 
        data.id = editingGame;
      $.ajax({
        url: "/game_form",
        type: 'GET',
        data: data
      }).done( function(html) {
        $('#toggle').after(html);
      });
    }
  }

 

  $(document).on('submit', '#game-form form', function(e) {
    e.preventDefault();
    var params = $(this).serializeArray();
    var url = '/games';
    var method = 'POST';

    if (editingGame) {
      url = url + '/' + editingGame;
      method = 'PUT'
    }

    $.ajax({
      url: url,
      type: method,
      data: params,
    }).done( function(game) {
      toggle();
      getGame(game.id);
    }).fail( function(err) {
      alert(err.responseJSON.errors);
    });
  });

  $('#toggle').on('click', function() {
    toggle();
  });

  $(document).on('click', '.game-item', function() {
    currentGame.id = this.dataset.id
    currentGame.name = this.dataset.name
    $.ajax({
      url: '/games/' + currentGame.id + '/characters',
      type: 'GET'
    }).done( function(characters) {
      $('#game').text('Characters in ' + currentGame.name);
      var list = $('#characters');
      list.empty();
      characters.forEach( function(char) {
        var li = '<li data-character-id="' + char.id + '">' + char.name + ' - ' + char.power + '</li>'
        list.append(li);
      })
    })
  });
});