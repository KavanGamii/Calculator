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
  // const themeToggle = document.querySelector('.theme-toggle');
  // if (document.body.classList.contains('dark')) {
  //   themeToggle.textContent = '🌙'; // Moon icon for dark theme
  // } else {
  //   themeToggle.textContent = '☀️'; // Sun icon for light theme
  // }
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

// Print the page as PDF with Gujarati translation
function printPDF() {
  translateToGujarati(); // Translate to Gujarati before printing
  window.print();
  setTimeout(() => revertToOriginal(), 1000); // Revert to original text after printing
}

// Function to translate table content to Gujarati for printing
function translateToGujarati() {
  const header = document.querySelectorAll('th');
  const footer = document.querySelectorAll('tfoot td');

  // Translate table headers
  header[0].textContent = 'નામ'; // Name
  header[1].textContent = 'A (9.40x)';
  header[2].textContent = 'B (11.25x)';
  header[3].textContent = 'C (13.50x)';
  header[4].textContent = 'D (16.20x)';
  header[5].textContent = 'કુલ'; // Total
  header[6].textContent = 'વધારાની'; // Delete
  // Translate footer
  footer[0].textContent = 'કુલ:'; // Grand Total
}

// Function to revert the translation after printing
function revertToOriginal() {
  const header = document.querySelectorAll('th');
  const footer = document.querySelectorAll('tfoot td');

  // Revert table headers to original
  header[0].textContent = 'Name';
  header[1].textContent = 'A (9.40x)';
  header[2].textContent = 'B (11.25x)';
  header[3].textContent = 'C (13.50x)';
  header[4].textContent = 'D (16.20x)';
  header[5].textContent = 'Total';
  header[6].textContent = 'Delete';

  // Revert footer
  footer[0].textContent = 'Grand Total:';
}

// Listen for the print event to translate before printing
window.onbeforeprint = function () {
  translateToGujarati();
};

// Listen for the afterprint event to revert after printing
window.onafterprint = function () {
  revertToOriginal();
};
