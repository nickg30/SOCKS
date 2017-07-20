

var myForm = document.getElementById('frmUploader');
console.log(myForm);

var currentTime = new Date()

var month = currentTime.getMonth() + 1

var day = currentTime.getDate()

var year = currentTime.getFullYear()

var dateString= year + "-" + month + "-" + day

document.getElementById('date').value = dateString;


