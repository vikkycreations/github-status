let githubstatus;
const Components = {
  GO: "8l4ygp009s5s",
  AR: "brv1bkgrwx7q",
  WH: "4230lsnqdsld",
  IS: "kr09ddfgbfsf",
  PR: "hhtssxt0f5v2",
  GA: "br0l2tvcx85d",
  GPK: "st3j38cctv9l",
  GP: "vg70hn9s2tyj",
}
let loader = document.querySelector('.loader');

function init() {
  let DOM = document.createElement('div');

  DOM.innerHTML = githubstatus;
  loader.style.display = 'none';

  Object.keys(Components).forEach(function (c) {
    let ghStatusElement = DOM.querySelector("div[data-component-id='" + Components[c] + "']");
    let statusComponent = document.querySelector("div[data-component='" + c + "']");
    let statusIndicator = statusComponent.querySelector('.status-indicator');
    let statusColor = ghStatusElement.className.split(' ')[1].split('-')[1];
    let statusMessage = ghStatusElement.querySelector(".component-status").textContent.trim();

    statusComponent.setAttribute('data-status', statusColor);
    statusIndicator.innerHTML = statusMessage;
    statusIndicator.setAttribute('data-color', statusColor);
    statusComponent.className += ' show';
  })
}

window.onload = function () {
  const url = 'https://www.githubstatus.com/';
  const request = new XMLHttpRequest();
  
  request.onload = function (res) {
    console.log(res.target.responseText);
    githubstatus = res.target.responseText;
    init();
  }

  request.onerror = function (e) {
    document.querySelector('.status-container').style.display = 'none';
    document.querySelector('.error').style.display = 'flex';
  }

  request.open('GET', url);
  request.send();
}