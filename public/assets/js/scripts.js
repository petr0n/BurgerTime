// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $('.devour').on('click', function(event) {
    var id = $(this).data('id');
    var devour = $(this).data('devour');

    var isDevoured = {
      devoured: devour
    };

    // Send the PUT request.
    $.ajax('/api/burger/' + id, {
      type: 'PUT',
      data: isDevoured
    }).then(
      function() {
        console.log('changed to ', isDevoured);
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
    $.ajax('/api/add', {
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
