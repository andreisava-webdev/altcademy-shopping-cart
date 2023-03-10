var displayNoItems = function () {
  if ($('table tbody').children().length === 0) {
    $('<p>There are no items in the cart</p>').insertAfter('table');
  }
};

var updateItemPrice = function (ele) {
  var price = parseFloat($(ele).children('.itemPrice').text().split('$')[1]);
  var quantity = parseFloat($(ele).find('.itemQuantity input').val());

  $(ele)
    .children('.price')
    .html('$' + price * quantity);
};

var updatePrices = function () {
  $('tbody tr').each(function (i, ele) {
    var price = updateItemPrice(ele);
  });
};

$(document).ready(function () {
  displayNoItems();
  updatePrices();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    displayNoItems();
    updatePrices();
  });

  var timeout;
  $(document).on('input', '[name=itemQuantity]', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updatePrices();
    }, 1000);
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var itemName = $(this).children('[name=itemName]').val();
    var itemPrice = $(this).children('[name=itemPrice]').val();

    $('tbody').append(
      '<tr>' +
        '<td class="itemName">' +
        itemName +
        '</td>' +
        '<td class="itemPrice">$' +
        itemPrice +
        '</td>' +
        '<td class="itemQuantity d-flex align-items-center">' +
        '<input value="0" class="form-control form-control-sm mr-2" /><button class="btn btn-danger btn-sm remove">Remove</button>' +
        '</td>' +
        '<td class="price"></td>' +
        '</tr>'
    );

    displayNoItems();
    updatePrices();
  });
});
