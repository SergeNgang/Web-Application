document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const tableBody = document.querySelector('#user-table tbody');
    const emptyButton = document.getElementById('empty-table');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const username = document.getElementById('input-username').value.trim();
        const email = document.getElementById('input-email').value.trim();
        const isAdmin = document.getElementById('input-admin').checked;
        const imageInput = document.getElementById('input-image');

        if (!username) return;

        const adminText = isAdmin ? 'X' : '-';

        // assistance from gemini
        let imageUrl = '';
        if (imageInput.files && imageInput.files[0]) {
            imageUrl = URL.createObjectURL(imageInput.files[0]);
        }

        // assistance from Gemini
        let existingRow = null;
        const rows = tableBody.querySelectorAll('tr');
        for (let row of rows) {
            const usernameCell = row.cells[0];
            if (usernameCell && usernameCell.textContent === username) {
                existingRow = row;
                break;
            }
        }

        if (existingRow) {
            existingRow.cells[1].textContent = email;
            existingRow.cells[2].textContent = adminText;
            // with the use of Gemini i was able to fully understand how the width,and height of the image can be set to 64 px each
            if (imageUrl) {
                let imgElement = existingRow.cells[3].querySelector('img');
                if (!imgElement) {
                    imgElement = document.createElement('img');
                    imgElement.width = 64;
                    imgElement.height = 64;
                    existingRow.cells[3].appendChild(imgElement);
                }
                imgElement.src = imageUrl;
            }
        } else {
            const newRow = document.createElement('tr');
            const userCell = document.createElement('td');
            userCell.textContent = username;
            newRow.appendChild(userCell);
            const emailCell = document.createElement('td');
            emailCell.textContent = email;
            newRow.appendChild(emailCell);
            const adminCell = document.createElement('td');
            adminCell.textContent = adminText;
            newRow.appendChild(adminCell);
            const imageCell = document.createElement('td');
            if (imageUrl) {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.width = 64;
                img.height = 64;
                imageCell.appendChild(img);
            }
            newRow.appendChild(imageCell);

            tableBody.appendChild(newRow);
        }

        // this should reset the form once submit is clicked
        form.reset();
    });

    emptyButton.addEventListener('click', () => {
        tableBody.innerHTML = '';
    });
});