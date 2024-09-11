// Function to calculate total for each row and the grand total
function calculate() {
  const rows = document.querySelectorAll('#tableBody tr');
  let grandTotal = 0;

  rows.forEach((row) => {
    const inputs = row.querySelectorAll("input[type='number']");
    let total = 0;
    const values = [9.4, 11.25, 13.5, 16.2];

    inputs.forEach((input, index) => {
      const value = parseFloat(input.value) || 0;
      total += value * values[index];
    });

    row.querySelector('.total').innerText = total.toFixed(2); // Display total with 2 decimal points
    grandTotal += total; // Accumulate the total to grand total
  });

  // Update grand total
  document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
}

// Function to add a new row
function addRow() {
  const tableBody = document.getElementById('tableBody');
  const row = document.createElement('tr');

  // Name input
  row.innerHTML = `
      <td><input type="text" placeholder="Enter name"></td>
      <td><input type="number" placeholder="0"></td>
      <td><input type="number" placeholder="0"></td>
      <td><input type="number" placeholder="0"></td>
      <td><input type="number" placeholder="0"></td>
      <td class="total">0.00</td>
      <td><button onclick="deleteRow(this)">Delete</button></td>
  `;
  tableBody.appendChild(row);
}

// Function to delete a row
function deleteRow(button) {
  button.parentElement.parentElement.remove();
  calculate(); // Recalculate after deletion
}

// Function to print the table as a PDF
function printPDF() {
  const printContents = document.querySelector('.container').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}

// Initialize with one row
addRow();
