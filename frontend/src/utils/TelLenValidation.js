function TelLenValidation(e) {
  if (
    !(
      (e.key >= "0" && e.key <= "9") || 
      e.key === "Backspace" ||
      e.key === "Delete" ||
      (e.ctrlKey === true && (e.key === "v" || e.key === "V"))
    ) ||
    (e.target.value.length >= 10 && e.key !== "Backspace" && e.key !== "Delete")
  ) {
    return e.preventDefault();
  }
}

export default TelLenValidation;
