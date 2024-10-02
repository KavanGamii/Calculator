// Toggle theme between light and dark
function toggleTheme() {
  document.body.classList.toggle('dark');
  document.querySelector('.container').classList.toggle('dark');
  document.querySelectorAll('table, th, td, button, .theme-toggle').forEach((element) => {
    element.classList.toggle('dark');
  });
}

// Calculate totals for each row and the grand total
function calculate() {
  const rows = document.querySelectorAll('tbody tr');
  let grandTotal = 0;

  // Get multipliers from input fields
  const multiplierA = parseFloat(document.getElementById('multiplierA').value) || 0;
  const multiplierB = parseFloat(document.getElementById('multiplierB').value) || 0;
  const multiplierC = parseFloat(document.getElementById('multiplierC').value) || 0;

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[type="number"]');
    let rowTotal = 0;

    inputs.forEach((input, index) => {
      const value = parseFloat(input.value) || 0;
      if (index === 0) rowTotal += value * multiplierA; // Column A
      else if (index === 1) rowTotal += value * multiplierB; // Column B
      else if (index === 2) rowTotal += value * multiplierC; // Column C
    });

    // Update total for this row
    row.querySelector('.total').textContent = rowTotal.toFixed(2);
    grandTotal += rowTotal;
  });

  // Update grand total
  document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
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
    <td class="print-only"></td>
    <td class="print-only"></td>
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
