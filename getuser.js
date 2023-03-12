function getUserList(uid) {
  let url = 'https://aurume-gems.com/api/user/LIFF-Aurume/' + uid;
  let Response = httpGetAsync(url);
  let users = JSON.parse(Response);
  if (users.length == 0) {
    window.location.href = window.location.origin + '/register.html';
    return;
  }
}

function httpGetAsync(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      return xmlHttp.responseText;
  };
  xmlHttp.open('GET', 'theUrl', true); // true for asynchronous
  xmlHttp.send(null);
}
function getID() {
  const urlParams = new URL(window.location.toLocaleString()).searchParams;
  var lineParam;
  if (urlParams.has('sku')) {
    lineParam = urlParams.get('sku');
    let uidbox = document.getElementById('sku');
    uidbox.innerHTML = lineParam;
    console.log(lineParam);
  } else {
    //closeLIFF();
    console.log('Noparam');
    let uidbox = document.getElementById('sku');
    uidbox.innerHTML = 'no Param';
    return;
  }
}
async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
}
async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '1660731963-K7lzz7v4' });
  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
  }
  getID();
  getUserProfile();
}
main();
