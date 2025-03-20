document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = document.getElementById('birthDate').value;

    const userData = {
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate
    };

    try {
        const response = await fetch('https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/rpc/add_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo', // Remplacez par votre clé API
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo' // Remplacez par votre clé API
            },
            body: JSON.stringify(userData)
        });


        if (response.ok) {
            document.getElementById('message').textContent = 'Utilisateur ajouté avec succès à la base de données.';
        } else {
            document.getElementById('message').textContent = `Erreur lors de l'ajout de l'utilisateur: ${result.error}`;
        }
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('message').textContent = `Erreur lors de l'ajout de l'utilisateur. ${error.message}`;
    }
});
