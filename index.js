// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
}
async function checkInternalBrowser() {
  if (!liff.isInClient()) {
    btnLogIn.style.display = 'block';
    btnLogOut.style.display = 'block';
  }
}
function closeLIFF() {
  liff.closeWindow();
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
