(function() {

  if (document.location.href.indexOf('vat_id_error_country=true') != -1) {
    document.getElementsByClassName('vat_id_error_country')[0].style.display = 'block';
  }

  if (document.location.href.indexOf('vat_id_error_invalid=true') != -1) {
    document.getElementsByClassName('vat_id_error_invalid')[0].style.display = 'block';
  }

  var getPath = function(action) {
    var a = document.createElement('a');
    a.href = action;
    return a.pathname
  };

  var isCheckoutButton = function(target) {
    if (target.form) {
      var action = target.form.getAttribute('action');
      if (-1 !== action.search(/^\/checkout\b/)) {
        return true;
      }
      if (-1 !== action.search(/^\/cart\b/) && 'checkout' === target.getAttribute('name')) {
        return true;
      }
      var path = getPath(action);
      if (-1 !== path.search(/^\/checkout\b/)) {
        return true;
      }
      if (-1 !== path.search(/^\/cart\b/) && 'checkout' === target.getAttribute('name')) {
        return true;
      }
    }
    return false;
  };

  var getVatId = function(target) {
    var inputs = target.form.getElementsByTagName('input');
    for (var i = 0, l = inputs.length; i < l; i++) {
      if (inputs[i].name == 'attributes[vat_id]') {
        return inputs[i].value.toUpperCase();
      }
    }
    return ;
  }

  var setVatId = function(target, value) {
    var inputs = target.form.getElementsByTagName('input');
    for (var i = 0, l = inputs.length; i < l; i++) {
      if (inputs[i].name == 'attributes[vat_id]') {
        inputs[i].value = value;
      }
    }
  }

  var submitForm = function(form) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'checkout';
    form.appendChild(input);
    form.submit();
  }

  var addItemToForm = function(item, form) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'latoriapps-tem-item[]';
    input.value = JSON.stringify(item);
    form.appendChild(input);
  }

  document.addEventListener('click', function(event) {

    // target
    var target = event.target;
    if (event.target.form == undefined) {
      target = event.target.parentElement;
    }

    if (isCheckoutButton(target)) {

      // error messages
      var vat_id_error_country = target.form.getElementsByClassName('vat_id_error_country')[0];
      var vat_id_error_invalid = target.form.getElementsByClassName('vat_id_error_invalid')[0];
      vat_id_error_country.style.display = 'none';
      vat_id_error_invalid.style.display = 'none';

      // form
      var form = target.form;

      // get VAT ID
      var vatId = getVatId(target);
      if (vatId.length == 0) {
        return;
      }

      // no valid length? => show error message
      if (vatId.length < 4 || vatId.length > 15) {
        vat_id_error_invalid.style.display = 'block';
        event.preventDefault();
        return;
      }

      // not starting with 2 letters? => show error message
      if (vatId.match(/\D{2}/i) == null) {
        vat_id_error_invalid.style.display = 'block';
        event.preventDefault();
        return;
      }

      // same country? => show error message
      if (vatId.indexOf('PT') == 0) {
        vat_id_error_country.style.display = 'block';
        setVatId(target, '');
        event.preventDefault();
        return;
      }

      // prevent normal form submit
      event.preventDefault();

      // add current items to cart form afterwards submit to latori tem app to create a draft order
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/cart.js');
      xhr.onload = function() {
        if (xhr.status === 200) {
          var cart = JSON.parse(xhr.responseText);
          if (cart.items.length > 0) {
            for (var i = 0, l = cart.items.length; i < l; i++) {
              addItemToForm(cart.items[i], form);
            }
            form.action = 'https://tax-exempt-manager.herokuapp.com/draft_order/create?shop=uptous-store.myshopify.com';
            form.submit();
          }
        }
        else {
          submitForm(form);
        }
      };
      xhr.send();
    }
  })
})();