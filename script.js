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

// Function to calculate row total and overall total
function calculate() {
  const rows = document.querySelectorAll('tbody tr');
  let totalA = 0,
    totalB = 0,
    totalC = 0,
    autoTotal = 0,
    manualTotal = 0,
    grandTotal = 0;

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[type="number"]');
    const valueA = parseFloat(inputs[0].value) || 0;
    const valueB = parseFloat(inputs[1].value) || 0;
    const valueC = parseFloat(inputs[2].value) || 0;
    const totalInput = row.querySelector('.total input');

    // Check if the total field was manually updated
    if (totalInput.dataset.manual === 'true') {
      manualTotal += parseFloat(totalInput.value) || 0;
    } else {
      const calculatedRowTotal =
        valueA * parseFloat(document.getElementById('multiplierA').value) +
        valueB * parseFloat(document.getElementById('multiplierB').value) +
        valueC * parseFloat(document.getElementById('multiplierC').value);

      totalInput.value = Math.round(calculatedRowTotal);
      autoTotal += calculatedRowTotal;
    }

    // Accumulate totals for A, B, C
    totalA += valueA;
    totalB += valueB;
    totalC += valueC;
  });

  // Update bottom totals row for A, B, C
  document.getElementById('totalA').textContent = Math.round(totalA);
  document.getElementById('totalB').textContent = Math.round(totalB);
  document.getElementById('totalC').textContent = Math.round(totalC);

  // Set auto and manual totals
  document.getElementById('autoTotal').textContent = Math.round(autoTotal);
  document.getElementById('manualTotal').textContent = Math.round(manualTotal);

  // Set grand total (sum of auto and manual totals)
  grandTotal = autoTotal + manualTotal;
  document.getElementById('grandTotal').textContent = Math.round(grandTotal);
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
      <td class="total"><input type="text" oninput="manualTotal(this)" placeholder="" /></td>
      <td class="no-print"><button onclick="deleteRow(this)" class="print-hide">Delete</button></td>
      <td><input type="number" class="dp dpv" /></td>
  `;

  tableBody.appendChild(newRow);

  // Attach event listeners to the new inputs
  newRow
    .querySelectorAll('input[type="number"]')
    .forEach((input) => input.addEventListener('input', debouncedCalculate));
}

// Function to handle manual entry in the "Total" column
function manualTotal(input) {
  input.dataset.manual = 'true'; // Set flag indicating manual input
  debouncedCalculate(); // Recalculate overall totals
}

// Reset manual total when A, B, or C is updated
function resetManualTotal(input) {
  const row = input.closest('tr');
  const totalInput = row.querySelector('.total input');
  totalInput.dataset.manual = ''; // Clear manual flag
  debouncedCalculate(); // Recalculate the row and overall totals
}

// Delete a row from the table
function deleteRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
  debouncedCalculate(); // Recalculate total after deleting a row
}

// Print the page as PDF
function printPDF() {
  window.print();
}

// Add predefined data rows
function addPredefinedRows() {
  const predefinedData = [
    { name: "Mashi", total: "1700" },
    { name: "Jamadar", total: "1380" },
    { name: "Kanubhai", total: "900" },
    { name: "Mahesh", total: "1250" },
    
  ];

  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = ''; // Clear existing rows

  predefinedData.forEach(data => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text" value="${data.name}" /></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td class="total"><input type="text" value="${data.total}" oninput="manualTotal(this)" data-manual="true" /></td>
      <td class="no-print"><button onclick="deleteRow(this)" class="print-hide">Delete</button></td>
      <td><input type="number" class="dp dpv" /></td>
    `;
    tableBody.appendChild(newRow);
  });

  // Calculate totals after adding all rows
  debouncedCalculate();
}

// Add multiple empty rows
function addMultipleRows(count) {
  for (let i = 0; i < count; i++) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="text"  /></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td><input type="number" oninput="debouncedCalculate()"/></td>
      <td class="total"><input type="text" oninput="manualTotal(this)" /></td>
      <td class="no-print"><button onclick="deleteRow(this)" class="print-hide">Delete</button></td>
      <td><input type="number" class="dp dpv" /></td>
    `;
    document.getElementById('tableBody').appendChild(newRow);
  }
  debouncedCalculate();
}

// Attach the debounced function to all relevant input fields
document
  .querySelectorAll('input[type="number"], .total input')
  .forEach((input) => {
    input.addEventListener('input', debouncedCalculate);
  });

// Load predefined rows when the page initializes
document.addEventListener('DOMContentLoaded', function() {
  addPredefinedRows();
}); 
