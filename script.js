// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function calculate() {
  const rows = document.querySelectorAll('tbody tr');
  let totalA = 0,
    totalB = 0,
    totalC = 0,
    grandTotal = 0;

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[type="number"]');
    const valueA = parseFloat(inputs[0].value) || 0;
    const valueB = parseFloat(inputs[1].value) || 0;
    const valueC = parseFloat(inputs[2].value) || 0;

    // Calculate the row total only if all inputs A, B, and C are filled
    if (valueA !== 0 || valueB !== 0 || valueC !== 0) {
      const calculatedRowTotal =
        valueA * parseFloat(document.getElementById('multiplierA').value) +
        valueB * parseFloat(document.getElementById('multiplierB').value) +
        valueC * parseFloat(document.getElementById('multiplierC').value);

      const totalCell = row.querySelector('.total input');

      // If total cell is empty, set it to calculated value
      if (totalCell.value === '') {
        totalCell.value = calculatedRowTotal.toFixed(2);
      }

      // Only use the calculated total if the total field is empty
      if (totalCell.value === '' || parseFloat(totalCell.value) !== 0) {
        totalCell.value = calculatedRowTotal.toFixed(2);
      }

      // Update dataset for the calculated total
      totalCell.dataset.calculated = totalCell.value; // Store current total

      // Accumulate totals for columns A, B, C and grand total
      totalA += valueA;
      totalB += valueB;
      totalC += valueC;
      grandTotal += parseFloat(totalCell.value) || 0; // Use the input value for grand total
    }
  });

  // Update column totals
  document.getElementById('totalA').textContent = totalA.toFixed(2);
  document.getElementById('totalB').textContent = totalB.toFixed(2);
  document.getElementById('totalC').textContent = totalC.toFixed(2);

  // Update overall total for the total column
  document.getElementById('overallTotal').textContent = grandTotal.toFixed(2);
}

// Debounced calculate function
const debouncedCalculate = debounce(calculate, 300);

// Add a new row to the table
function addRow() {
  const tableBody = document.getElementById('tableBody');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
      <td><input type="text" /></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td class="total"><input type="text" placeholder="" oninput="debouncedCalculate()" /></td>
      <td><button onclick="deleteRow(this)" class="print-hide">Delete</button></td>
  `;

  tableBody.appendChild(newRow);
}

// Delete a row from the table
function deleteRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
  calculate(); // Recalculate total after deleting a row
}

// Print the page as PDF
function printPDF() {
  window.print();
}

// Attach the debounced function to all relevant input fields
document
  .querySelectorAll('input[type="number"], .total input')
  .forEach((input) => {
    input.addEventListener('input', debouncedCalculate);
  });

// Attach event listener to the Total button
document.getElementById('totalButton').addEventListener('click', calculate);
