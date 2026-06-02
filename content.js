function injectSmartAttendance() {
    const table = document.getElementById('AttendanceDetailDataTable');
    if (!table) return;

    // Target the header row and inject the title column ONLY ONCE
    const headerRow = table.querySelector('tr');
    if (headerRow && !headerRow.classList.contains('header-patched')) {
        const newHeader = document.createElement('th');
        newHeader.innerText = "Smart Status";
        newHeader.style.backgroundColor = "#2c3e50";
        newHeader.style.color = "#ffffff";
        newHeader.style.padding = "10px";
        newHeader.style.textAlign = "center";
        headerRow.appendChild(newHeader);
        headerRow.classList.add('header-patched');
    }

    /* ======================================================================= */
    /* CHANGE THESE TWO NUMBERS TO MATCH YOUR PORTAL'S COLUMN POSITIONS        */
    /* Counting starts at 0 from left to right (Col 1 = 0, Col 2 = 1, Col 3 = 2...) */
    const attendedIndex = 5;
    const totalIndex = 6;
    /* ======================================================================= */

    // Select data rows
    let dataRows = table.querySelectorAll('tr.odd, tr.even');
    if (dataRows.length === 0) {
        dataRows = table.querySelectorAll('tr:not(:first-child)');
    }

    // Process each row individually
    dataRows.forEach(row => {
        // Skip rows that are hidden, empty, or already calculated
        if (row.offsetHeight === 0 || row.classList.contains('row-calculated')) {
            return;
        }

        const cells = row.querySelectorAll('td');
        if (cells.length <= Math.max(attendedIndex, totalIndex)) return;

        // Grab clean text values
        const rawAttendedText = cells[attendedIndex].innerText.trim();
        const rawTotalText = cells[totalIndex].innerText.trim();

        // Check if data is missing or still loading placeholder dashes/empty slots
        if (rawAttendedText === "" || rawTotalText === "" || rawAttendedText === "-" || rawTotalText === "-") {
            return;
        }

        const attended = parseInt(rawAttendedText, 10);
        const total = parseInt(rawTotalText, 10);

        // Ensure we are working with real integers before executing calculations
        if (!isNaN(attended) && !isNaN(total) && total > 0) {
            const currentPercentage = (attended / total) * 100;
            let statusText = "";
            let cellBgColor = "";
            let textColor = "";

            // Attendance Logic Formulas
            if (currentPercentage >= 75) {
                let safeBunks = Math.floor((attended - (0.75 * total)) / 0.75);
                safeBunks = Math.max(0, safeBunks);
                statusText = safeBunks > 0 ? `Can skip: ${safeBunks}` : `On the line (75%)`;
                cellBgColor = "#e2f0d9";
                textColor = "#385723";
            } else {
                const requiredClasses = Math.ceil(((0.75 * total) - attended) / 0.25);
                statusText = `Need: ${requiredClasses} class${requiredClasses > 1 ? 'es' : ''}`;
                cellBgColor = "#fce4d6";
                textColor = "#c65911";
            }

            // Inject the calculation outcome column cell
            const newCell = document.createElement('td');
            newCell.innerHTML = `<strong>${statusText}</strong>`;
            newCell.style.backgroundColor = cellBgColor;
            newCell.style.color = textColor;
            newCell.style.textAlign = "center";
            newCell.style.padding = "8px";
            newCell.style.border = "1px solid #d9d9d9";

            row.appendChild(newCell);

            // Lock this specific row so it is never re-calculated or double-appended
            row.classList.add('row-calculated');
        }
    });
}

// Initial direct sweep execution
injectSmartAttendance();

// Persistent real-time MutationObserver structure 
const observer = new MutationObserver(() => {
    injectSmartAttendance();
});
observer.observe(document.body, { childList: true, subtree: true });