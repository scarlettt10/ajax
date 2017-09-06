$(document).ready( function() {

$(document).on('click', '.character-item', function() {
  currentCharacter.id = this.dataset.id
  currentCharacter.power = this.dataset.power
  $.ajax({
    url: '/characters/' + currentCharacter.id ,
    type: 'GET'
  }).done( function(characters) {
    $('#character').text('Characters in ' + currentGame.name);
    var list = $('#characters');
    list.empty();
    characters.forEach( function(char) {
      var li = '<li data-character-id="' + char.id + '">' + char.name + ' - ' + char.power + '</li>'
      list.append(li);
    })
  })
});
});