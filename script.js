function calculate() {
  // Get user input values, defaulting to 0 if the input is empty
  const value1 = parseFloat(document.getElementById('inputValue1').value) || 0;
  const value2 = parseFloat(document.getElementById('inputValue2').value) || 0;
  const value3 = parseFloat(document.getElementById('inputValue3').value) || 0;
  const value4 = parseFloat(document.getElementById('inputValue4').value) || 0;

  // Perform calculations
  const result1 = (9.4 * value1).toFixed(2);
  const result2 = (11.25 * value2).toFixed(2);
  const result3 = (13.5 * value3).toFixed(2);
  const result4 = (16.2 * value4).toFixed(2);
  const total = (
    parseFloat(result1) +
    parseFloat(result2) +
    parseFloat(result3) +
    parseFloat(result4)
  ).toFixed(2);

  // Display results
  document.getElementById('result1').textContent = result1;
  document.getElementById('result2').textContent = result2;
  document.getElementById('result3').textContent = result3;
  document.getElementById('result4').textContent = result4;
  document.getElementById(
    'finalTotal'
  ).innerHTML = `<strong>Total: ${total}</strong>`;
}
