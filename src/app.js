/*eslint no-console: ['error', { allow: ['info', 'warn', 'error'] }] */

'use strict'

const fetchHeaders = new Headers({
  'pragma': 'no-cache',
  'cache-control': 'no-cache'
});

const fetchInit = {
  method: 'GET',
  headers: fetchHeaders
};

window.addEventListener('DOMContentLoaded', function(){
  fetch('./data.json', fetchInit).then(function(response) {
    response.json().then(
      function(json){
        var bodyEls =document.getElementsByTagName('body');
        bodyEls[0].textContent = json.data;
      });
  });
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
    console.info('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    console.error('ServiceWorker registration failed: ', err);
  });
}
