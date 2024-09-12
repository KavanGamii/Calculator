// Toggle theme between light and dark
function toggleTheme() {
  document.body.classList.toggle('dark');
  document.querySelector('.container').classList.toggle('dark');
  document
    .querySelectorAll('table, th, td, button, .theme-toggle')
    .forEach((element) => {
      element.classList.toggle('dark');
    });

  // Change theme toggle icon
  const themeToggle = document.querySelector('.theme-toggle');
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '🌙'; // Moon icon for dark theme
  } else {
    themeToggle.textContent = '☀️'; // Sun icon for light theme
  }
}

// Calculate totals for each row and the grand total
function calculate() {
  const rows = document.querySelectorAll('tbody tr');
  let grandTotal = 0;

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[type="number"]');
    let rowTotal = 0;

    inputs.forEach((input, index) => {
      const multiplier = [9.4, 11.25, 13.5, 16.2][index]; // Corresponding multipliers
      const value = parseFloat(input.value) || 0;
      rowTotal += value * multiplier;
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
