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
var $discoverContainer = document.querySelector('.discover-container');
var $searchText = document.querySelector('.search-text');
var $userTitle = document.querySelector('.user-title');
var $userPage = document.querySelector('.user-Page');
var $playlistPage = document.querySelector('.playlist-page');
var $playlistContainer = document.querySelector('.playlist-container');
var $userPlaylist = document.querySelector('.playlist-p');
var $playlistTitle = document.querySelector('.playlist-title');
var $search = document.querySelector('.search');
var $form = document.querySelector('form');

var arr = [$hotTracks, $homePage, $discoverPage, $mySongsPage, $userPage, $playlistPage];

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

$search.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    $searchText.className = 'hidden';
    data.view = 'discover-page';
    viewSwap('discover-page');
    getUser();
    $form.reset();
  }
});

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
    for (var i = 0; i < xhr.response.tracks.length; i++) {
      var hot = createTracks(xhr.response.tracks[i]);
      $hotContainer.appendChild(hot);
    }
  });
  xhr.send();
}

getHotTracks();

function createTracks(xhr) {

  var div = document.createElement('div');
  div.className = 'row track';

  var col4 = document.createElement('div');
  col4.className = 'col-4';
  div.appendChild(col4);

  var image = document.createElement('img');
  image.setAttribute('src', xhr.img);
  col4.appendChild(image);

  var col8 = document.createElement('div');
  col8.className = 'col-8';
  div.appendChild(col8);

  var songName = document.createElement('p');
  songName.className = 'song-name';
  songName.textContent = xhr.name;
  songName.addEventListener('click', function () {
    window.open('https://openwhyd.org' + xhr.eId);
  });
  col8.appendChild(songName);

  var userName = document.createElement('p');
  userName.className = 'username';
  userName.textContent = xhr.uNm;
  userName.addEventListener('click', function () {
    window.open('https://openwhyd.org/u/' + xhr.uId);
  });
  col8.appendChild(userName);

  var addbtn = document.createElement('button');
  addbtn.className = 'addbtn';
  addbtn.innerText = '+';
  col8.appendChild(addbtn);

  var addSpan = document.createElement('span');
  addSpan.className = 'add';
  addSpan.innerText = 'Add';
  col8.appendChild(addSpan);

  return div;
}

function createUser(userData) {
  var div = document.createElement('div');
  div.className = 'user-row row track';

  var userImgCol = document.createElement('div');
  userImgCol.className = 'col-5 d-flex justify-content-end';
  div.appendChild(userImgCol);

  var userImg = document.createElement('img');
  userImg.className = 'user-image';
  userImg.setAttribute('src', 'https://openwhyd.org/img/u/' + userData.lastTrack.uId);
  userImgCol.appendChild(userImg);

  var userTextCol = document.createElement('div');
  userTextCol.className = 'col-5 user-text-col';
  div.appendChild(userTextCol);

  var userText = document.createElement('p');
  userText.innerText = userData.name;
  userText.setAttribute('userId', userData.lastTrack.uId);
  userText.className = 'user-text';
  userTextCol.appendChild(userText);
  userText.addEventListener('click', function () {
    $userPage.classList.remove('hidden');
    $discoverPage.classList.add('hidden');
    $userTitle.innerText = userText.innerText + "'s Page";
    data.userID.unshift(event.target.getAttribute('userId'));
  });
  return div;
}

function getUser() {
  var userData = new XMLHttpRequest();
  var getUserPlaylistURL = encodeURIComponent('https://openwhyd.org/search?q=' + $search.value + '&format=json');
  userData.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + getUserPlaylistURL);
  userData.setRequestHeader('token', 'abc123');
  userData.responseType = 'json';
  userData.addEventListener('load', function () {
    $discoverContainer.replaceChildren('');
    for (var i = 0; i < userData.response.results.users.length; i++) {
      var users = createUser(userData.response.results.users[i]);
      $discoverContainer.appendChild(users);
    }
  });
  userData.send();
}

function getUserPlaylist() {
  var userPlaylist = new XMLHttpRequest();
  var getUserPlaylistURL = encodeURIComponent('https://openwhyd.org/u/' + data.userID + '/playlists?format=json');
  userPlaylist.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + getUserPlaylistURL);
  userPlaylist.setRequestHeader('token', 'abc123');
  userPlaylist.responseType = 'json';
  userPlaylist.addEventListener('load', function () {
    // console.log(userPlaylist.response);
    for (var i = 0; i < userPlaylist.response.length; i++) {
      var playlist = createPlaylist(userPlaylist.response[i]);
      $playlistContainer.appendChild(playlist);
    }
  });
  userPlaylist.send();
}

function createPlaylist(userPlaylist) {
  var div = document.createElement('div');
  div.className = 'playlist-row row track';

  var playlistImgCol = document.createElement('div');
  playlistImgCol.className = 'col-5 d-flex justify-content-end';
  div.appendChild(playlistImgCol);

  var playlistImg = document.createElement('img');
  playlistImg.className = 'userplaylist-image';
  playlistImg.setAttribute('src', 'https://openwhyd.org' + userPlaylist.img);
  playlistImgCol.appendChild(playlistImg);

  var playlistTextCol = document.createElement('div');
  playlistTextCol.className = 'col-5 user-playlist-col';
  div.appendChild(playlistTextCol);

  var playlistText = document.createElement('p');
  playlistText.className = 'user-playlist text';
  playlistText.innerText = userPlaylist.name;
  playlistTextCol.appendChild(playlistText);
  playlistText.addEventListener('click', function () {
    $userPage.classList.remove('hidden');
    $discoverPage.classList.add('hidden');
    $userTitle.innerText = playlistText.innerText + "'s Page";
  });

  return div;
}

$userPlaylist.addEventListener('click', function () {
  $playlistPage.classList.remove('hidden');
  $userPage.classList.add('hidden');
  $playlistTitle.innerText = $userTitle.innerText + "'s Playlist";
  getUserPlaylist();
});
