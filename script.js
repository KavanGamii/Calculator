function calculate() {
  const rows = document.querySelectorAll('tbody tr');
  let totalA = 0, totalB = 0, totalC = 0, grandTotal = 0;

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[type="number"]');
    const valueA = parseFloat(inputs[0].value) || 0;
    const valueB = parseFloat(inputs[1].value) || 0;
    const valueC = parseFloat(inputs[2].value) || 0;

    // Calculate the row total based on multipliers
    const rowTotal = (valueA * parseFloat(document.getElementById('multiplierA').value)) +
      (valueB * parseFloat(document.getElementById('multiplierB').value)) +
      (valueC * parseFloat(document.getElementById('multiplierC').value));

    // Update the row total display
    row.querySelector('.total').textContent = rowTotal.toFixed(2);

    // Accumulate totals for columns A, B, C and the grand total
    totalA += valueA;
    totalB += valueB;
    totalC += valueC;
    grandTotal += rowTotal;
  });

  // Update column totals
  document.getElementById('totalA').textContent = totalA.toFixed(2);
  document.getElementById('totalB').textContent = totalB.toFixed(2);
  document.getElementById('totalC').textContent = totalC.toFixed(2);

  // Update overall total for the total column
  document.getElementById('overallTotal').textContent = grandTotal.toFixed(2);
}

// Add a new row to the table
function addRow() {
  const tableBody = document.getElementById('tableBody');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td><input type="text" placeholder="Enter name" /></td>
    <td><input type="number" placeholder="0" /></td>
    <td><input type="number" placeholder="0" /></td>
    <td><input type="number" placeholder="0" /></td>
    <td class="total">0.00</td>
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
