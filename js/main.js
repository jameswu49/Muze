var $homePage = document.querySelector('.home-page');
var $icon = document.querySelector('.headphone');
var $navbarButton = document.querySelector('.navbar-toggler');
var $navbarDiv = document.querySelector('.navbar-collapse');
var $navUl = document.querySelector('ul');
var $hotLink = document.querySelector('.hot');
var $hotTracks = document.querySelector('.hot-tracks');
var $discoverLink = document.querySelector('.discover');
var $discoverPage = document.querySelector('.discover-page');
var $searchLink = document.querySelector('.song');
var $searchTitle = document.querySelector('.search-title');
var $hotContainer = document.querySelector('.hot-container');
var $discoverContainer = document.querySelector('.discover-container');
var $searchText = document.querySelector('.search-text');
var $userTitle = document.querySelector('.user-title');
var $userPage = document.querySelector('.user-page');
var $playlistPage = document.querySelector('.playlist-page');
var $playlistContainer = document.querySelector('.playlist-container');
var $userPlaylist = document.querySelector('.playlist-p');
var $playlistTitle = document.querySelector('.playlist-title');
var $search = document.querySelector('.search');
var $userSearch = document.querySelector('.user');
var $songForm = document.querySelector('.song-form');
var $userForm = document.querySelector('.user-form');
var $followingTitle = document.querySelector('.following-title');
var $followingContainer = document.querySelector('.following-container');
var $followingPage = document.querySelector('.following-page');
var $userFollowing = document.querySelector('.following-p');
var $userLikedSongs = document.querySelector('.liked-p');
var $likedSongsPage = document.querySelector('.likedsongs-page');
var $likedSongsTitle = document.querySelector('.likedSongs-title');
var $likedSongsContainer = document.querySelector('.likedSongs-container');
var $searchPage = document.querySelector('.search-page');
var $searchContainer = document.querySelector('.search-container');
var $title = document.querySelector('.title');
var $subTitle = document.querySelector('.subtext');
var $loader = document.querySelector('.lds-facebook');

var arr = [$hotTracks, $homePage, $discoverPage, $searchPage, $userPage, $playlistPage, $followingPage, $likedSongsPage, $searchPage];

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
    $userSearch.classList.add('hidden');
    $search.classList.remove('hidden');
  }

  if (data.view === 'discover-page') {
    addHidden(arr);
    removeHidden(arr);
  }

  if (data.view === 'search-page') {
    addHidden(arr);
    removeHidden(arr);
    $userSearch.classList.add('hidden');
    $search.classList.remove('hidden');
  }
}

function switchPage() {
  if (event.target.matches('.hot')) {
    data.view = 'hot-tracks';
    viewSwap('hot-tracks');
    $userSearch.classList.add('hidden');
    $search.classList.remove('hidden');
    getHotTracks();
  }

  if (event.target.matches('.headphone')) {
    data.view = 'home-page';
    viewSwap('home-page');
    $songForm.reset();
  }

  if (event.target.matches('.discover')) {
    data.view = 'discover-page';
    viewSwap('discover-page');
    $userSearch.classList.remove('hidden');
    $search.classList.add('hidden');
  }

  if (event.target.matches('.song')) {
    data.view = 'search-page';
    viewSwap('search-page');
    $userForm.reset();
  }

}

$search.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    data.view = 'search-page';
    $searchTitle.innerText = 'Search Results';
    viewSwap('search-page');
    getSearchResults();
  }
});

$userSearch.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    $searchText.className = 'hidden';
    data.view = 'discover-page';
    viewSwap('discover-page');
    getUser();

  }
});

function hideLoader() {
  $loader.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', function () {
  $title.className = 'title title-fade shadow';
  $subTitle.className = 'subtext subtext-fade shadow';
});

$hotLink.addEventListener('click', switchPage);
$icon.addEventListener('click', switchPage);
$discoverLink.addEventListener('click', switchPage);
$searchLink.addEventListener('click', switchPage);

$navUl.addEventListener('click', function collapseNavBar(e) {
  if (e.target && e.target.matches('.link')) {
    $navbarButton.className = 'navbar-toggler collapsed';
    $navbarDiv.className = 'navbar-collapse collapse';
  }
});

var hotTracksURL = encodeURIComponent('https://openwhyd.org/hot?format=json');

function getHotTracks() {
  var hotTracks = new XMLHttpRequest();
  $hotContainer.classList.remove('hidden');
  hotTracks.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + hotTracksURL);
  hotTracks.setRequestHeader('token', 'abc123');
  hotTracks.responseType = 'json';
  hotTracks.addEventListener('load', function () {
    hideLoader();
    for (var i = 0; i < hotTracks.response.tracks.length; i++) {
      var hot = createTracks(hotTracks.response.tracks[i]);
      $hotContainer.appendChild(hot);
    }
  });
  hotTracks.send();
}

function createTracks(hotTracks) {

  var div = document.createElement('div');
  div.className = 'row track';

  var col4 = document.createElement('div');
  col4.className = 'col-4';
  div.appendChild(col4);

  var image = document.createElement('img');
  image.setAttribute('src', hotTracks.img);
  col4.appendChild(image);

  var col8 = document.createElement('div');
  col8.className = 'col-8';
  div.appendChild(col8);

  var songName = document.createElement('p');
  songName.className = 'song-name';
  songName.textContent = hotTracks.name;
  songName.addEventListener('click', function () {
    window.open('https://openwhyd.org' + hotTracks.eId);
  });
  col8.appendChild(songName);

  var userName = document.createElement('p');
  userName.className = 'username';
  userName.textContent = 'Posted by: ' + hotTracks.uNm;
  userName.addEventListener('click', function () {
    window.open('https://openwhyd.org/u/' + hotTracks.uId);
  });
  col8.appendChild(userName);

  return div;
}

function createUser(userData) {
  var div = document.createElement('div');
  div.className = 'user-row row track';

  var userImgCol = document.createElement('div');
  userImgCol.className = 'userImg col-5 d-flex justify-content-end';
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
  $discoverContainer.classList.remove('hidden');
  var userData = new XMLHttpRequest();
  var getUserPlaylistURL = encodeURIComponent('https://openwhyd.org/search?q=' + $userSearch.value + '&format=json');
  userData.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + getUserPlaylistURL);
  userData.setRequestHeader('token', 'abc123');
  userData.responseType = 'json';
  userData.addEventListener('load', function () {
    $discoverContainer.replaceChildren('');
    hideLoader();
    if (userData.response.results.users.length === 0) {
      var h2 = document.createElement('h2');
      h2.className = 'none';
      h2.innerText = 'No Users Found';
      $discoverContainer.appendChild(h2);
    }
    for (var i = 0; i < userData.response.results.users.length; i++) {
      var users = createUser(userData.response.results.users[i]);
      $discoverContainer.appendChild(users);
    }
  });
  userData.send();
}

function getUserPlaylist() {
  $playlistContainer.classList.remove('hidden');
  var userPlaylist = new XMLHttpRequest();
  var getUserPlaylistURL = encodeURIComponent('https://openwhyd.org/u/' + data.userID[0] + '/playlists?format=json');
  userPlaylist.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + getUserPlaylistURL);
  userPlaylist.setRequestHeader('token', 'abc123');
  userPlaylist.responseType = 'json';
  userPlaylist.addEventListener('load', function () {
    $playlistContainer.replaceChildren('');
    hideLoader();
    if (userPlaylist.response.length === 0) {
      var h2 = document.createElement('h2');
      h2.className = 'none';
      h2.innerText = 'No Playlists Available';
      $playlistContainer.appendChild(h2);
    }
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
    window.open('https://openwhyd.org' + userPlaylist.url);
  });

  var trackNum = document.createElement('p');
  trackNum.className = 'track-num';
  trackNum.innerText = 'Number of Tracks: ' + userPlaylist.nbTracks;
  playlistTextCol.appendChild(trackNum);

  return div;
}

$userPlaylist.addEventListener('click', function () {
  $playlistPage.classList.remove('hidden');
  $userPage.classList.add('hidden');
  $playlistTitle.innerText = $userTitle.innerText + "'s Playlist";
  getUserPlaylist();
});

$userFollowing.addEventListener('click', function () {
  $followingPage.classList.remove('hidden');
  $userPage.classList.add('hidden');
  $followingTitle.innerText = 'Following';
  getFollowingList();
});

function createFollowing(userFollowing) {
  var div = document.createElement('div');
  div.className = 'following-row row track';

  var followingImgCol = document.createElement('div');
  followingImgCol.className = 'col-5 d-flex justify-content-end';
  div.appendChild(followingImgCol);

  var userImg = document.createElement('img');
  userImg.className = 'userplaylist-image';
  userImg.setAttribute('src', 'https://openwhyd.org/img/u/' + userFollowing.uId);
  followingImgCol.appendChild(userImg);

  var followingTextCol = document.createElement('div');
  followingTextCol.className = 'col-5 user-playlist-col';
  div.appendChild(followingTextCol);

  var followingName = document.createElement('p');
  followingName.className = 'user-playlist text';
  followingName.innerText = userFollowing.uNm;
  followingTextCol.appendChild(followingName);
  followingName.addEventListener('click', function () {
    window.open('https://openwhyd.org/u/' + userFollowing.uId);
  });

  return div;
}

function getFollowingList() {
  $followingContainer.classList.remove('hidden');
  var followingList = new XMLHttpRequest();
  var followingListURL = encodeURIComponent('https://openwhyd.org/api/follow/fetchFollowers/' + data.userID[0]);
  followingList.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + followingListURL);
  followingList.setRequestHeader('token', 'abc123');
  followingList.responseType = 'json';
  followingList.addEventListener('load', function () {
    $followingContainer.replaceChildren('');
    hideLoader();
    if (followingList.response.length === 0) {
      var h2 = document.createElement('h2');
      h2.className = 'none';
      h2.innerText = 'Currently Not Following Anyone';
      $followingContainer.appendChild(h2);
    }
    for (var i = 0; i < followingList.response.length; i++) {
      var following = createFollowing(followingList.response[i]);
      $followingContainer.appendChild(following);
    }
  });
  followingList.send();
}

$userLikedSongs.addEventListener('click', function () {
  $likedSongsPage.classList.remove('hidden');
  $userPage.classList.add('hidden');
  $likedSongsTitle.innerText = 'Liked Songs';
  getLikedSongs();
});

function createLikedSongs(likedSongs) {
  var div = document.createElement('div');
  div.className = 'likedSongs-row row track';

  var likedSongsImgCol = document.createElement('div');
  likedSongsImgCol.className = 'col-5 d-flex justify-content-end';
  div.appendChild(likedSongsImgCol);

  var likedSongsImg = document.createElement('img');
  likedSongsImg.className = 'userplaylist-image';
  likedSongsImg.setAttribute('src', likedSongs.img);
  likedSongsImg.addEventListener('error', function () {
    likedSongsImg.setAttribute('src', '../images/error.png');
  });
  likedSongsImgCol.appendChild(likedSongsImg);

  var likedSongsTextCol = document.createElement('div');
  likedSongsTextCol.className = 'col-5 user-playlist-col';
  div.appendChild(likedSongsTextCol);

  var likedSongsName = document.createElement('p');
  likedSongsName.className = 'user-playlist text';
  likedSongsName.innerText = likedSongs.name;
  likedSongsTextCol.appendChild(likedSongsName);
  likedSongsName.addEventListener('click', function () {
    window.open('https://openwhyd.org' + likedSongs.eId);
  });

  return div;
}

function getLikedSongs() {
  $likedSongsContainer.classList.remove('hidden');
  var likedSongsList = new XMLHttpRequest();
  var likedSongsListURL = encodeURIComponent('https://openwhyd.org/u/' + data.userID[0] + '/likes?format=json');
  likedSongsList.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + likedSongsListURL);
  likedSongsList.setRequestHeader('token', 'abc123');
  likedSongsList.responseType = 'json';
  likedSongsList.addEventListener('load', function () {
    $likedSongsContainer.replaceChildren('');
    hideLoader();
    if (likedSongsList.response.length === 0) {
      var h2 = document.createElement('h2');
      h2.className = 'none';
      h2.innerText = 'No Songs Available';
      $likedSongsContainer.appendChild(h2);
    }
    for (var i = 0; i < likedSongsList.response.length; i++) {
      var likedSongs = createLikedSongs(likedSongsList.response[i]);
      $likedSongsContainer.appendChild(likedSongs);
    }
  });
  likedSongsList.send();
}

function createSearchResults(searchResults) {
  var div = document.createElement('div');
  div.className = 'user-row row track';

  var searchImgCol = document.createElement('div');
  searchImgCol.className = 'col-5 d-flex justify-content-end';
  div.appendChild(searchImgCol);

  var searchImg = document.createElement('img');
  searchImg.className = 'user-image';
  searchImg.setAttribute('src', searchResults.img);
  searchImgCol.appendChild(searchImg);

  var searchTextCol = document.createElement('div');
  searchTextCol.className = 'col-5 user-text-col';
  div.appendChild(searchTextCol);

  var searchText = document.createElement('p');
  searchText.className = 'text';
  searchText.innerText = searchResults.name;
  searchText.addEventListener('click', function () {
    window.open('https://openwhyd.org' + searchResults.eId);
  });
  searchText.className = 'user-text';
  searchTextCol.appendChild(searchText);
  return div;
}

function getSearchResults() {
  $searchContainer.classList.remove('hidden');
  var searchResults = new XMLHttpRequest();
  var getSearchResultsURL = encodeURIComponent('https://openwhyd.org/search?q=' + $search.value + '&format=json');
  searchResults.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + getSearchResultsURL);
  searchResults.setRequestHeader('token', 'abc123');
  searchResults.responseType = 'json';
  searchResults.addEventListener('load', function () {
    $searchContainer.replaceChildren('');
    hideLoader();
    if (searchResults.response.results.tracks.length === 0) {
      var h2 = document.createElement('h2');
      h2.className = 'none';
      h2.innerText = 'No Songs Found';
      $searchContainer.appendChild(h2);
    }
    for (var i = 0; i < searchResults.response.results.tracks.length; i++) {
      if (searchResults.response.results.tracks[i] === null) {
        continue;
      }
      var results = createSearchResults(searchResults.response.results.tracks[i]);
      $searchContainer.appendChild(results);
    }
  });
  searchResults.send();
}
