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
var $userTitle = document.querySelector('.user-title');
var $userPage = document.querySelector('.user-Page');
var $gerard = document.querySelector('.gerard');
var $stefanos = document.querySelector('.stefanos');
var $jacques = document.querySelector('.jacques');
var $ludimix = document.querySelector('.ludimix');
var $playlistPage = document.querySelector('.playlist-page');
var $playlistContainer = document.querySelector('.playlist-container');
var $userPlaylist = document.querySelector('.playlist-p');
var $playlistTitle = document.querySelector('.playlist-title');

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

function createPlaylist(xhr) {
  var div = document.createElement('div');
  div.className = 'playlist-row row track';

  var playlistImgCol = document.createElement('div');
  playlistImgCol.className = 'col-5 d-flex justify-content-end';
  div.appendChild(playlistImgCol);

  var playlistImg = document.createElement('img');
  playlistImg.className = 'userplaylist-image';
  playlistImg.setAttribute('src', 'https://openwhyd.org' + xhr.img);
  playlistImgCol.appendChild(playlistImg);

  var playlistTextCol = document.createElement('div');
  playlistTextCol.className = 'col-5 user-playlist-col';
  div.appendChild(playlistTextCol);

  var playlistText = document.createElement('p');
  playlistText.innerText = xhr.name;
  playlistText.className = 'user-playlist text';
  playlistTextCol.appendChild(playlistText);
  playlistText.addEventListener('click', function () {
    window.open('https://openwhyd.org' + xhr.url);
  });

  var playlistNum = document.createElement('p');
  playlistNum.className = 'track-num';
  playlistNum.innerText = 'Number of Tracks: ' + xhr.nbTracks;
  playlistTextCol.appendChild(playlistNum);

  return div;
}

function showUsersPage(name) {
  addHidden(arr);
  $userPage.classList.remove('hidden');
  $userTitle.innerText = name + ' Page';
}

function showGerardPlayList() {
  addHidden(arr);
  $playlistPage.classList.remove('hidden');
  $playlistTitle.innerText = "Gérard's Playlist";
  gerardPlaylist();
}

var gerardPlaylistURL = encodeURIComponent('https://openwhyd.org/u/5361647f71eaec19b57037e4/playlists?format=json');

function gerardPlaylist() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + gerardPlaylistURL);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $playlistContainer.replaceChildren('');
    for (var i = 0; i < xhr.response.length; i++) {
      var playlist = createPlaylist(xhr.response[i]);
      $playlistContainer.appendChild(playlist);
    }
  });
  xhr.send();
}

function showStefanosPlayList() {
  addHidden(arr);
  $playlistPage.classList.remove('hidden');
  $playlistTitle.innerText = "Stefanos' Playlist";
  getStefanosPlaylist();
}

var stefanosPlaylistURL = encodeURIComponent('https://openwhyd.org/u/544c39c3e04b7b4fca803438/playlists?format=json');

function getStefanosPlaylist() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + stefanosPlaylistURL);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $playlistContainer.replaceChildren('');
    for (var i = 0; i < xhr.response.length; i++) {
      var playlist = createPlaylist(xhr.response[i]);
      $playlistContainer.appendChild(playlist);
    }
  });
  xhr.send();
}

function showJacquesPlaylist() {
  addHidden(arr);
  $playlistPage.classList.remove('hidden');
  $playlistTitle.innerText = "jacques' Playlist";
  getJacquesPlaylist();
}

var jacquesPlaylistURL = encodeURIComponent('https://openwhyd.org/u/5438c677e04b7b4fca7fb4f3/playlists?format=json');

function getJacquesPlaylist() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + jacquesPlaylistURL);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $playlistContainer.replaceChildren('');
    for (var i = 0; i < xhr.response.length; i++) {
      var playlist = createPlaylist(xhr.response[i]);
      $playlistContainer.appendChild(playlist);
    }
  });
  xhr.send();
}

function showLudimixPlaylist() {
  addHidden(arr);
  $playlistPage.classList.remove('hidden');
  $playlistTitle.innerText = "Ludimix's Playlist";
  getLudimixPlaylist();
}

var ludimixPlaylistURL = encodeURIComponent('https://openwhyd.org/ludimix/playlists?format=json');

function getLudimixPlaylist() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + ludimixPlaylistURL);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $playlistContainer.replaceChildren('');
    for (var i = 0; i < xhr.response.length; i++) {
      var playlist = createPlaylist(xhr.response[i]);
      $playlistContainer.appendChild(playlist);
    }
  });
  xhr.send();
}

$gerard.addEventListener('click', function () {
  data.view = 'gerards-page';
  showUsersPage("Gérard's");
});

$stefanos.addEventListener('click', function () {
  data.view = 'stefanos-page';
  showUsersPage("Stefanos'");
});

$jacques.addEventListener('click', function () {
  data.view = 'jacques-page';
  showUsersPage('jacques');
});

$ludimix.addEventListener('click', function () {
  data.view = 'ludimix-page';
  showUsersPage("Ludimix's");
});

$userPlaylist.addEventListener('click', function () {
  if (data.view === 'gerards-page') {
    showGerardPlayList();
  } else if (data.view === 'stefanos-page') {
    showStefanosPlayList();
  } else if (data.view === 'jacques-page') {
    showJacquesPlaylist();
  } else if (data.view === 'ludimix-page') {
    showLudimixPlaylist();
  }
});
