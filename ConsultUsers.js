document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo', // Remplacez par votre clé API
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo' // Remplacez par votre clé API
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const users = await response.json();

        const tableBody = document.querySelector('#userTable tbody');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.birth_date}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur:', error);
        const tableBody = document.querySelector('#userTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="3">Erreur lors de la récupération des données des utilisateurs.</td>`;
        tableBody.appendChild(row);
    }
});