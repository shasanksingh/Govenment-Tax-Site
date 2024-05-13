document.addEventListener('DOMContentLoaded', function () {
    // Function to create and add donation table to the page
    function createDonationTable() {
        // Create table element
        var table = document.createElement('table');
        table.classList.add('donation-table');

        // Create table header
        var headerRow = table.createTHead().insertRow();
        var headers = ['First Name', 'Middle Name', 'Last Name', 'Email', 'Phone No', 'Address', 'Amount'];
        headers.forEach(function (header) {
            var th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        // Create table body
        table.createTBody();

        // Append table to the document
        document.body.appendChild(table);
    }

    // Function to add donation data to the table
    function addDonationToTable(firstName, middleName, lastName, email, phoneNo, address, amount) {
        var tableBody = document.querySelector('.donation-table tbody');

        // Create a new row
        var newRow = tableBody.insertRow();

        // Populate the row with data
        newRow.innerHTML = '<td>' + firstName + '</td>' +
                           '<td>' + middleName + '</td>' +
                           '<td>' + lastName + '</td>' +
                           '<td>' + email + '</td>' +
                           '<td>' + phoneNo + '</td>' +
                           '<td>' + address + '</td>' +
                           '<td>' + amount + '</td>';
    }

    // Function to handle form submission
    function handleFormSubmit(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get form values
        var firstName = document.getElementById('first-name').value;
        var middleName = document.getElementById('middle-name').value;
        var lastName = document.getElementById('last-name').value;
        var email = document.getElementById('email').value;
        var phoneNo = document.getElementById('phone-no').value;
        var address = document.getElementById('address').value;
        var amount = document.getElementById('amount').value;

        // Create or retrieve the array of donation data from local storage
        var donationData = JSON.parse(localStorage.getItem('donationData'));
        if (!Array.isArray(donationData)) {
            donationData = [];
        }

        // Add the new donation data to the array
        donationData.push({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            phoneNo: phoneNo,
            address: address,
            amount: amount
        });

        // Store the updated array in local storage
        localStorage.setItem('donationData', JSON.stringify(donationData));

        // Add the donation to the table
        addDonationToTable(firstName, middleName, lastName, email, phoneNo, address, amount);

        // Clear form inputs
        document.getElementById('first-name').value = '';
        document.getElementById('middle-name').value = '';
        document.getElementById('last-name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone-no').value = '';
        document.getElementById('address').value = '';
    }

    // Attach event listener for form submission
    document.getElementById('donation-form').addEventListener('submit', handleFormSubmit);

    // Create the donation table when the page loads
    createDonationTable();

    // Load and display all donation data when the page loads
    var storedData = JSON.parse(localStorage.getItem('donationData'));
    if (Array.isArray(storedData)) {
        storedData.forEach(function(donation) {
            addDonationToTable(donation.firstName, donation.middleName, donation.lastName, donation.email, donation.phoneNo, donation.address, donation.amount);
        });
    }
});
