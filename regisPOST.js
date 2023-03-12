function getID(){
  const urlParams = new URL(window.location.toLocaleString()).searchParams;
  var lineParam;
  if(urlParams.has('lineuid')){
      lineParam = urlParams.get('lineuid');
      let uidbox = document.getElementById("UID");
      uidbox.value = lineParam;
  }
  else{
      window.alert("ERROR INVALID PARAMETER: Open link from Line Chat again");
      window.location.replace("/AurumeSoon.html");
      return;
  }
}
function JSONPush(){
    
    let FirstName = document.getElementById("fName").value;
    let LastName = document.getElementById("lName").value;
    let DayofBirth = yearConverter(document.getElementById("datetimepicker1").value);
    let TelNumber = document.getElementById("tel").value;
    let EMail = document.getElementById("mail").value;
    let Address = document.getElementById("addr").value;
    let Twin = document.getElementById("twin").checked;
    let MedicalTwin = document.getElementById("medtwin").checked;
    let OlderTwin = document.getElementById("oldertwin").checked;
    let lineParam = document.getElementById("UID").value;
    let regisData = new CreateUserRequest(FirstName,LastName,DayofBirth,TelNumber,EMail,Twin,MedicalTwin,OlderTwin,Address,lineParam);
    
    
    console.log(JSON.stringify(regisData));
    RegisterRequest(regisData);
}
function DisableNextButton() {
  document.getElementById("btn").disabled = 'true';
}
function yearConverter(date) {
  let datetimeArray = date.split(" ");
  let rawDate = datetimeArray[0].split("/");
  let time = datetimeArray[1].split(":");
  let day = rawDate[0];
  let month = rawDate[1];
  let year = rawDate[2]-543;
  let hour = time[0]-new Date().getTimezoneOffset()/60;
  let min = time[1];
  let correctedDate = new Date(year+'-'+month+'-'+day+' '+hour+':'+min);
  //correctedDate.setFullYear(year,month,day);
  //correctedDate.setHours(hour,min,0);
  window.alert(correctedDate);
  return correctedDate;
}
function RegisteredNotification(lineToken){
  let request = new internalRequest(lineToken)
  const data2 = JSON.stringify(request);
  console.log(JSON.stringify(request));
  const url2 = window.location.origin+"/line/";
  const xhr2 = new XMLHttpRequest();
  xhr2.open("POST", url2);
  xhr2.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr2.onload = () => {
    if (xhr2.readyState == 4 && xhr2.status == 201) {
      console.log(JSON.parse(xhr2.responseText));
      DisableNextButton();
      //window.location.replace("/AurumeSoon.html");
    } else {
      console.log(`Error: ${xhr2.status}`);
    }
  }
  const body2 = data2;
  xhr2.send(body2);
}
function RegisterRequest(UserRequestInput){
    const data = JSON.stringify(UserRequestInput);
    const url = window.location.origin+"/api/User";
 const xhr = new XMLHttpRequest();
xhr.open("POST", url);
xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
const body = data;
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 201) {
    console.log(JSON.parse(xhr.responseText));
    RegisteredNotification(UserRequestInput.alternativeUID);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};
xhr.send(body);
}
class CreateUserRequest {
    constructor(fName,lName,birthday,number,mail,twin,medtwin,oldertwin,addr,alternativeUID)
    {
        this.fName = fName;
        this.lName =lName;
        this.birthday = birthday;
        this.number = number;
        this.mail = mail;
        this.twin = twin;
        this.medtwin = medtwin;
        this.oldertwin = oldertwin;
        this.addr = addr;
        this.alternativeUIDBinding = "LINE";
        this.alternativeUID = alternativeUID;
    }
}
class internalRequest {
  constructor(Value){
    this.ProtocolLevel = 69;
    this.Method = "notice_registered";
    this.Value = [Value];
    this.indicator = "12CC3AB665F870BF49EB14FBB4C2ABE841129227C0571D5C7198801B505DE7C8"; 
  }
}