var $homePage = document.querySelector('.home-page');
var $icon = document.querySelector('.headphone');
var $hotLink = document.querySelector('.hot');
var $hotTracks = document.querySelector('.hot-tracks');
var $discoverLink = document.querySelector('.discover');
var $discoverPage = document.querySelector('.discover-page');
var $mySongsLink = document.querySelector('.songs');
var $mySongsPage = document.querySelector('.mySongs-Page');

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
