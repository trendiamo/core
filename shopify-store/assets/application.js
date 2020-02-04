// Put your applicaiton javascript here

let btn_50 = document.getElementById('btn_get_50_now');

let open_50_modal = function() {
  modal = document.getElementById('modal_50_now');
  if (modal){
    modal.className = 'modal_50 open';
  }
}

let getUserKey = function() {
  return document.getElementById('a_customer_key').value;
}

let sendData = function({url, data, redirectUrl, callback}) {
  fetch(url, {
    "credentials": "include",
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,de;q=0.8,pt;q=0.7",
      "authorization": "Plain helloworld",
      "userkey": getUserKey(),
      "cache-control": "no-cache, no-cache",
      "content-type": "application/json",
      "pragma": "no-cache","sec-fetch-mode":"cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": url,
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": data,
    "method": "POST",
    "mode": "cors"
  }).then(function(response) {
    return response.json()
  }).then(function(json) {
    if (!json.errors){
      callback(json)
      if (redirectUrl){
        window.location.href = redirectUrl
      }
    }
  })
}

if (btn_50) {
  btn_50.addEventListener('click', open_50_modal);
  document.getElementById('send_50').addEventListener('click', () => {
    var url = "http://localhost:5000/shopify_store_api/v1/shopify_customers"

    var data = JSON.stringify({
      "shopify_customer": {
        "answers": {
          "answer_1": document.getElementById('answer_1').value,
          "answer_2": document.getElementById('answer_2').value
        }
      }
    });

    redirectUrl = "https://hellodude23.myshopify.com/discount/UPTOUS?redirect=/collections/all"

    sendData({url, data, redirectUrl})
  });
}

var toggleReturns = event => {
  event.preventDefault();
  event.stopPropagation();
  var url = 'https://6106c063.ngrok.io/shopify_store_api/v1/toggle_returns'

  var redirectUrl = "https://hellodude23.myshopify.com/discount/cart"

  var callback = data => {
    if (data.tags === 'discounted-clients, uptous-no-returns'){
      window.location.href = 'https://hellodude23.myshopify.com/discount/UPTOUS-NO-RETURNS?redirect=/cart'
    }else{
      window.location.href = 'https://hellodude23.myshopify.com/discount/UPTOUS?redirect=/cart'
    }
  }

  sendData({url, callback})
}
