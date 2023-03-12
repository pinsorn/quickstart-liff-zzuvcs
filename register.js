function JSONPush() {
  let FirstName = document.getElementById('fName').value;
  let LastName = document.getElementById('lName').value;
  let DayofBirth = yearConverter(
    document.getElementById('datetimepicker1Input').value
  );
  let TelNumber = document.getElementById('tel').value;
  let EMail = document.getElementById('mail').value;
  let Address = document.getElementById('addr').value;
  let Twin = document.getElementById('twin').checked;
  let MedicalTwin = document.getElementById('medtwin').checked;
  let OlderTwin = document.getElementById('oldertwin').checked;
  let lineParam = document.getElementById('userId').value;
  let regisData = new CreateUserRequest(
    FirstName,
    LastName,
    DayofBirth,
    TelNumber,
    EMail,
    Twin,
    MedicalTwin,
    OlderTwin,
    Address,
    lineParam
  );

  console.log(JSON.stringify(regisData));
  RegisterRequest(regisData);
}
function yearConverter(date) {
  let datetimeArray = date.split(' ');
  let rawDate = datetimeArray[0].split('/');
  let time = datetimeArray[1].split(':');
  let day = rawDate[0];
  let month = rawDate[1];
  let year = rawDate[2] - 543;
  let hour = time[0] - new Date().getTimezoneOffset() / 60;
  let min = time[1];
  let correctedDate = new Date(
    year + '-' + month + '-' + day + ' ' + hour + ':' + min
  );
  return correctedDate;
}
function RegisterRequest(UserRequestInput) {
  const data = JSON.stringify(UserRequestInput);
  //const url = window.location.origin + '/api/User';
  const url = 'https://aurume-gems.com/api/user';
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  const body = data;
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
      console.log(JSON.parse(xhr.responseText));
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  xhr.send(body);
}
class CreateUserRequest {
  constructor(
    fName,
    lName,
    birthday,
    number,
    mail,
    twin,
    medtwin,
    oldertwin,
    addr,
    alternativeUID
  ) {
    this.fName = fName;
    this.lName = lName;
    this.birthday = birthday;
    this.number = number;
    this.mail = mail;
    this.twin = twin;
    this.medtwin = medtwin;
    this.oldertwin = oldertwin;
    this.addr = addr;
    this.alternativeUIDBinding = 'LIFF-Aurume';
    this.alternativeUID = alternativeUID;
  }
}
