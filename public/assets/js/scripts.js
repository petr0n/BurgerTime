// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $('.change-sleep').on('click', function(event) {
    var id = $(this).data('id');
    var newSleep = $(this).data('newsleep');

    var newSleepState = {
      sleepy: newSleep
    };

    // Send the PUT request.
    $.ajax('/api/cats/' + id, {
      type: 'PUT',
      data: newSleepState
    }).then(
      function() {
        console.log('changed sleep to', newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $('.delete-burger').on('click', function(){
    let id = $(this).data('id');
    $.ajax('/api/delete/' + id, {
      type: 'DELETE'
    }).then(
      function(){
        console.log('Burger deleted');
        location.reload();
    });
  });

  $('.create-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax('/api/burger', {
      type: 'POST',
      data: {
        burgerName: $('#burgerName').val().trim(),
        devoured: $('[name=devoured]:checked').val().trim()
      }
    }).then(
      function() {
        location.reload();
      }
    );
  });
});
