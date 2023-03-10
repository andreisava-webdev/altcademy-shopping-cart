$(document).ready(function () {
  if ($('table tbody').children().length === 0) {
    $('<p>There are no items in the cart</p>').insertAfter('table');
  }
});
