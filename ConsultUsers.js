document.addEventListener('DOMContentLoaded', async function() {
    const tableBody = document.querySelector('#userTable tbody');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    document.querySelector('.container').appendChild(messageElement);

    async function fetchUsers() {
        try {
            const response = await fetch('https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const users = await response.json();
            tableBody.innerHTML = ''; // Clear existing rows
            users.forEach((user, index) => {
                const birthDate = new Date(user.birth_date);
                const formattedDate = `${birthDate.getDate().toString().padStart(2, '0')}/${(birthDate.getMonth() + 1).toString().padStart(2, '0')}/${birthDate.getFullYear()}`;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td contenteditable="false">${user.first_name}</td>
                    <td contenteditable="false">${user.last_name}</td>
                    <td contenteditable="false">${formattedDate}</td>
                    <td class="actions">
                        <button class="edit" onclick="editUser('${user.id}', this)">✏️</button>
                        <button class="delete" onclick="deleteUser('${user.id}')">❌</button>
                        <button class="save" style="display:none;" onclick="saveUser('${user.id}', this)">✔️</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erreur:', error);
            messageElement.textContent = 'Erreur lors de la récupération des données des utilisateurs.';
            messageElement.className = 'message error';
        }
    }

    // Fonction pour éditer un utilisateur
    window.editUser = function(userId, button) {
        const row = button.closest('tr');
        row.querySelectorAll('td[contenteditable="false"]').forEach(cell => {
            cell.setAttribute('contenteditable', 'true');
        });
        row.querySelector('.edit').style.display = 'none';
        row.querySelector('.save').style.display = 'inline-block';

        // Initialiser flatpickr sur le champ de date
        const dateCell = row.querySelector('td:nth-child(3)');
        dateCell.setAttribute('contenteditable', 'false');
        const dateInput = document.createElement('input');
        dateInput.type = 'text';
        dateInput.value = dateCell.textContent;
        dateCell.innerHTML = '';
        dateCell.appendChild(dateInput);
        flatpickr(dateInput, {
            dateFormat: 'd/m/Y',
            onClose: function(selectedDates, dateStr, instance) {
                dateCell.textContent = dateStr;
            }
        });
    }

    // Fonction pour sauvegarder les modifications d'un utilisateur
    window.saveUser = async function(userId, button) {
        const row = button.closest('tr');
        const firstName = row.querySelector('td:nth-child(1)').textContent;
        const lastName = row.querySelector('td:nth-child(2)').textContent;
        const birthDate = row.querySelector('td:nth-child(3)').textContent;

        // Convertir la date au format ISO 8601
        const [day, month, year] = birthDate.split('/');
        const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        try {
            const response = await fetch(`https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/users?id=eq.${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    birth_date: isoDate
                })
            });

            if (response.ok) {
                messageElement.textContent = 'Utilisateur modifié avec succès.';
                messageElement.className = 'message success';
                row.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
                    cell.setAttribute('contenteditable', 'false');
                });
                row.querySelector('.edit').style.display = 'inline-block';
                row.querySelector('.save').style.display = 'none';
            } else {
                const errorText = await response.text();
                messageElement.textContent = `Erreur lors de la modification de l'utilisateur: ${errorText}`;
                messageElement.className = 'message error';
            }
        } catch (error) {
            console.error('Erreur:', error);
            messageElement.textContent = 'Erreur lors de la modification de l\'utilisateur.';
            messageElement.className = 'message error';
        }
    }

    // Fonction pour supprimer un utilisateur
    window.deleteUser = async function(userId) {
        const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (confirmDelete) {
            try {
                const response = await fetch(`https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/users?id=eq.${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo'
                    }
                });

                if (response.ok) {
                    messageElement.textContent = 'Utilisateur supprimé avec succès.';
                    messageElement.className = 'message success';
                    fetchUsers(); // Recharger les utilisateurs après la suppression
                } else {
                    const errorText = await response.text();
                    messageElement.textContent = `Erreur lors de la suppression de l'utilisateur: ${errorText}`;
                    messageElement.className = 'message error';
                }
            } catch (error) {
                console.error('Erreur:', error);
                messageElement.textContent = 'Erreur lors de la suppression de l\'utilisateur.';
                messageElement.className = 'message error';
            }
        }
    }

    // Fonction pour ajouter un nouvel utilisateur
    document.getElementById('addUserButton').addEventListener('click', function() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td class="actions">
                <button class="save" onclick="addUser(this)">✔️</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Initialiser flatpickr sur le champ de date
        const dateCell = row.querySelector('td:nth-child(3)');
        const dateInput = document.createElement('input');
        dateInput.type = 'text';
        dateCell.innerHTML = '';
        dateCell.appendChild(dateInput);
        flatpickr(dateInput, {
            dateFormat: 'd/m/Y',
            onClose: function(selectedDates, dateStr, instance) {
                dateCell.textContent = dateStr;
            }
        });
    });

    // Fonction pour ajouter un nouvel utilisateur
    window.addUser = async function(button) {
        const row = button.closest('tr');
        const firstName = row.querySelector('td:nth-child(1)').textContent;
        const lastName = row.querySelector('td:nth-child(2)').textContent;
        const birthDate = row.querySelector('td:nth-child(3)').textContent;

        if (!firstName || !lastName || !birthDate) {
            messageElement.textContent = 'Veuillez remplir tous les champs.';
            messageElement.className = 'message error';
            return;
        }

        // Convertir la date au format ISO 8601
        const [day, month, year] = birthDate.split('/');
        const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        try {
            const response = await fetch('https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    birth_date: isoDate
                })
            });

            if (response.ok) {
                messageElement.textContent = 'Utilisateur ajouté avec succès.';
                messageElement.className = 'message success';
                fetchUsers(); // Recharger les utilisateurs après l'ajout
            } else {
                const errorText = await response.text();
                messageElement.textContent = `Erreur lors de l'ajout de l'utilisateur: ${errorText}`;
                messageElement.className = 'message error';
            }
        } catch (error) {
            console.error('Erreur:', error);
            messageElement.textContent = 'Erreur lors de l\'ajout de l\'utilisateur.';
            messageElement.className = 'message error';
        }
    }

    // Charger les utilisateurs au chargement de la page
    fetchUsers();
});