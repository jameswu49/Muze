/* global data */

var $homePage = document.querySelector('.home-page');
var $icon = document.querySelector('.headphone');
var $hotLink = document.querySelector('.hot');
var $hotTracks = document.querySelector('.hot-tracks');
var $discoverLink = document.querySelector('.discover');
var $discoverPage = document.querySelector('.discover-page');
var $mySongsLink = document.querySelector('.songs');
var $mySongsPage = document.querySelector('.mySongs-Page');
var $hotContainer = document.querySelector('.hot-container');

var arr = [$hotTracks, $homePage, $discoverPage, $mySongsPage];

function addHidden(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (!arr[i].className.includes('hidden') && data.view + ' hidden' !== arr[i].className) {
      arr[i].classList.add('hidden');
    }
  }
}

function removeHidden(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].className.includes('hidden') && data.view + ' hidden' === arr[i].className) {
      arr[i].classList.remove('hidden');
    }
  }
}

function viewSwap(entryType) {
  data.entries = entryType;
  if (data.view === 'hot-tracks') {
    addHidden(arr);
    removeHidden(arr);

  } if (data.view === 'home-page') {
    addHidden(arr);
    removeHidden(arr);
  }

  if (data.view === 'discover-page') {
    addHidden(arr);
    removeHidden(arr);
  }

  if (data.view === 'mySongs-Page') {
    addHidden(arr);
    removeHidden(arr);
  }

}

function switchPage() {
  if (event.target.matches('.hot')) {
    data.view = 'hot-tracks';
    viewSwap('hot-tracks');
  }

  if (event.target.matches('.headphone')) {
    data.view = 'home-page';
    viewSwap('home-page');
  }

  if (event.target.matches('.discover')) {
    data.view = 'discover-page';
    viewSwap('discover-page');
  }

  if (event.target.matches('.songs')) {
    data.view = 'mySongs-Page';
    viewSwap('mySongs-Page');
  }

}

$hotLink.addEventListener('click', switchPage);
$icon.addEventListener('click', switchPage);
$discoverLink.addEventListener('click', switchPage);
$mySongsLink.addEventListener('click', switchPage);

var hotTracksURL = encodeURIComponent('https://openwhyd.org/hot?format=json');

function getHotTracks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + hotTracksURL);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var hot = createTracks(xhr.response);
    $hotContainer.appendChild(hot);
  });
  xhr.send();
}

getHotTracks();

function createTracks(entry) {

  var div = document.createElement('div');
  div.className = 'row track';

  var col4 = document.createElement('div');
  col4.className = 'col-4';
  div.appendChild(col4);

  var image = document.createElement('img');
  image.setAttribute('src', entry.tracks[0].img);
  col4.appendChild(image);

  var col8 = document.createElement('div');
  col8.className = 'col-8';
  div.appendChild(col8);

  var songName = document.createElement('p');
  songName.className = 'song-name';
  songName.textContent = entry.tracks[0].name;
  col8.appendChild(songName);

  var userName = document.createElement('p');
  userName.className = 'username';
  col8.appendChild(userName);

  var addbtn = document.createElement('button');
  addbtn.className = 'addbtn';
  addbtn.innerText = '+';
  col8.appendChild(addbtn);

  var addSpan = document.createElement('span');
  addSpan.className = 'add';
  col8.appendChild(addSpan);

  return div;
}
