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
            const birthDate = new Date(user.birth_date);
            const formattedDate = `${birthDate.getDate().toString().padStart(2, '0')}/${(birthDate.getMonth() + 1).toString().padStart(2, '0')}/${birthDate.getFullYear()}`;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${formattedDate}</td>
                <td><button class="delete-button" data-id="${user.id}">Supprimer</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Ajouter un gestionnaire d'événements pour les boutons de suppression
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async function() {
                const userId = this.getAttribute('data-id');
                const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
                if (confirmDelete) {
                    try {
                        const deleteResponse = await fetch(`https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/users?id=eq.${userId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo', // Remplacez par votre clé API
                                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo' // Remplacez par votre clé API
                            }
                        });

                        if (deleteResponse.ok) {
                            this.closest('tr').remove();
                        } else {
                            alert('Erreur lors de la suppression de l\'utilisateur.');
                        }
                    } catch (error) {
                        console.error('Erreur:', error);
                        alert('Erreur lors de la suppression de l\'utilisateur.');
                    }
                }
            });
        });
    } catch (error) {
        console.error('Erreur:', error);
        const tableBody = document.querySelector('#userTable tbody');
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4">Erreur lors de la récupération des données des utilisateurs.</td>`;
        tableBody.appendChild(row);
    }
});