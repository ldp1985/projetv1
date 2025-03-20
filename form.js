// Formulaire utilisateur
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
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo'
            },
            body: JSON.stringify(userData)
        });
        
        const messageElement = document.getElementById('userMessage');
        
        if (response.ok) {
            messageElement.textContent = 'Utilisateur ajouté avec succès à la base de données.';
            messageElement.className = 'message success';
            document.getElementById('userForm').reset();
        } else {
            const result = await response.json();
            messageElement.textContent = `Erreur lors de l'ajout de l'utilisateur: ${result.error || 'Erreur inconnue'}`;
            messageElement.className = 'message error';
        }
    } catch (error) {
        console.error('Erreur:', error);
        const messageElement = document.getElementById('userMessage');
        messageElement.textContent = `Erreur lors de l'ajout de l'utilisateur. ${error.message}`;
        messageElement.className = 'message error';
    }
});

// Nouveau gestionnaire pour le formulaire cadastre
document.getElementById('cadastreForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const cadastreData = {
        libelle: document.getElementById('libelle').value,
        adresse: document.getElementById('adresse').value,
        ref_cadastre: document.getElementById('refCadastre').value,
        code_commune: document.getElementById('codeCommune').value,
        superficie: document.getElementById('superficie').value,
        type_de_bien: document.getElementById('typeDeBien').value,
        lien_hypertexte: document.getElementById('lienHypertexte').value,
        coordonnees: document.getElementById('coordonnees').value
    };
    
    try {
        const response = await fetch('https://axohxoqosxcrkqidbphf.supabase.co/rest/v1/rpc/add_cadastre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2h4b3Fvc3hjcmtxaWRicGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTk0MzksImV4cCI6MjA1ODAzNTQzOX0.ljNyiUBjgouNB1Reui8i0b-fGz4x1nZClbdU0EAeFPo'
            },
            body: JSON.stringify(cadastreData)
        });
        
        const messageElement = document.getElementById('cadastreMessage');
        
        if (response.ok) {
            messageElement.textContent = 'Information cadastrale ajoutée avec succès.';
            messageElement.className = 'message success';
            document.getElementById('cadastreForm').reset();
        } else {
            const result = await response.json();
            messageElement.textContent = `Erreur lors de l'ajout des informations cadastrales: ${result.error || 'Erreur inconnue'}`;
            messageElement.className = 'message error';
        }
    } catch (error) {
        console.error('Erreur:', error);
        const messageElement = document.getElementById('cadastreMessage');
        messageElement.textContent = `Erreur lors de l'ajout des informations cadastrales. ${error.message}`;
        messageElement.className = 'message error';
    }
});