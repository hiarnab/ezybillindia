import { toast } from "react-toastify";

function validateText(input){
  const alphabetPattern = /^[a-zA-Z\s]+$/;
  if (input.match(alphabetPattern) || input===" ") {
    // do nothing
    return true
  } else {
    event.target.value = input.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabet characters
    toast.error("Only Alphabets are allowed.", {position:"top-center"})
    return false
  }
}

export function validateNumber(input){ 
  const alphabetPattern = /^[0-9\s]*$/;
  if (input.match(alphabetPattern) || input===" ") {
    // do nothing
  } else {
    event.target.value = input.replace(/[^0-9\s]/g, ""); // Remove non-alphabet characters
    toast.error("Only Numbers are allowed.", {position:"top-center"})
    
  }
}

export  function isNumberKey(evt)
{
  const alphabetPattern = /^[0-9\s]*$/;
  if (evt.match(alphabetPattern) || evt ===" ") {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
       && (charCode < 48 || charCode > 57))
      return false;
  
    return true;
  }
 
}
export default validateText