document.addEventListener('DOMContentLoaded', () => {

    // === ÉLÉMENTS ===
    const btnAjouter = document.getElementById('btn-ajouter');
    const btnValider = document.getElementById('btn-valider');
    const listePanier = document.getElementById('liste-panier');
    const totalAffichage = document.getElementById('total-panier');
    const noteClient = document.getElementById('note-client');
    const modal = document.getElementById('modal-resume');
    const btnFermer = document.getElementById('btn-fermer');
    const resumeFinalListe = document.getElementById('resume-final-liste');
    const totalFinal = document.getElementById('total-final');
    const btnOui = document.querySelector('.btn-oui');
    const btnNon = document.querySelector('.btn-non');
    const affichageNotePanier = document.getElementById('affichage-note-panier');
    const btnPayer = document.getElementById('btn-payer'); 

    let totalCumule = 0;
    let sucreChoisi = null;

    // === BOUTONS OUI / NON ===
    if (btnOui && btnNon) {
        btnOui.addEventListener('click', () => {
            sucreChoisi = true;
            btnOui.classList.add('selected');
            btnNon.classList.remove('selected');
        });

        btnNon.addEventListener('click', () => {
            sucreChoisi = false;
            btnNon.classList.add('selected');
            btnOui.classList.remove('selected');
        });
    }

    // === AJOUTER AU PANIER ===
    btnAjouter.addEventListener('click', () => {
        const tailleChoisie = document.querySelector('input[name="Taille_cafée"]:checked');
        const saveurChoisie = document.querySelector('input[name="Saveur_cafée"]:checked');
        const extraChoisi = document.querySelector('input[name="Extras"]:checked');

        if (!tailleChoisie) {
            alert("Choisis une taille ! ☕");
            return;
        }

        if (totalCumule === 0) {
            listePanier.innerHTML = '';
        }

        let prixTaille = parseInt(tailleChoisie.value);
        let prixExtra = extraChoisi ? parseInt(extraChoisi.value) : 0;
        let prixArticle = prixTaille + prixExtra;
        totalCumule += prixArticle;

        const nomTaille = tailleChoisie.parentElement.querySelector('span').innerText;
        const nomSaveur = saveurChoisie ? saveurChoisie.parentElement.querySelector('span').innerText : "Nature";
        const nomExtra = extraChoisi ? extraChoisi.parentElement.querySelector('span').innerText : "Sans extra";
        const nomSucre = sucreChoisi === true ? "Avec sucre" : sucreChoisi === false ? "Sans sucre" : "Sucre non précisé";

        const nouvelArticle = document.createElement('li');
        nouvelArticle.style.borderBottom = "1px solid #eee";
        nouvelArticle.style.padding = "5px 0";
        nouvelArticle.innerHTML = `
            <strong>${nomTaille}</strong> (${nomSaveur}) 
            + ${nomExtra} — ${nomSucre}
            — <span>${prixArticle}€</span>
        `;
        listePanier.appendChild(nouvelArticle);
        totalAffichage.innerText = `Total : ${totalCumule}€`;

        // Reset sucre pour la prochaine commande
        sucreChoisi = null;
        if (btnOui) btnOui.classList.remove('selected');
        if (btnNon) btnNon.classList.remove('selected');
    });

    // === MISE À JOUR DE LA NOTE EN TEMPS RÉEL ===
    if (noteClient && affichageNotePanier) {
        noteClient.addEventListener('input', () => {
            const texte = noteClient.value.trim();
            if (texte !== "") {
                affichageNotePanier.innerText = "📝 Note : " + texte;
                affichageNotePanier.style.display = "block";
            } else {
                affichageNotePanier.style.display = "none";
            }
        });
    }

    // === VALIDER LA COMMANDE (OUVRIR MODAL) ===
    btnValider.addEventListener('click', () => {
        if (totalCumule === 0) {
            alert("Ton panier est vide !");
            return;
        }

        let contenuFinal = listePanier.innerHTML;
        const maNote = noteClient.value.trim();

        if (maNote !== "") {
            contenuFinal += `
                <li style="list-style:none; margin-top:15px; padding:10px; border-top:2px dashed #6f4e37; color:#6f4e37;">
                    <strong>📝 Note pour le barista :</strong><br>
                    "${maNote}"
                </li>
            `;
        }

        resumeFinalListe.innerHTML = contenuFinal;
        totalFinal.innerHTML = totalAffichage.innerHTML;
        modal.classList.remove('modal-hidden');
    });

    // === FERMER LA MODAL ===
    btnFermer.addEventListener('click', () => {
        modal.classList.add('modal-hidden');
    });

    // === ANIMATION DE PAIEMENT ===
    if (btnPayer) {
        btnPayer.addEventListener('click', () => {
            const modalContent = document.querySelector('.modal-content');
            
            modalContent.innerHTML = `
                <div class="spinner"></div>
                <p>Traitement du paiement en cours...</p>
                <p style="font-size: 0.8rem; color: gray;">Connexion sécurisée avec Wero 🔒</p>
            `;

            setTimeout(() => {
                modalContent.innerHTML = `
                    <div style="font-size: 50px;"></div>
                    <h2 class="success-msg" style="color: #2e7d32; margin: 10px 0;">Paiement Accepté !</h2>
                    <p>Merci pour votre commande chez <strong>Peak Coffee</strong>.</p>
                    <p>Votre café sera prêt dans quelques minutes. ☕</p>
                    <button onclick="window.location.reload()" 
                            style="margin-top:20px; background:#6f4e37; color:white; padding: 12px 25px; border-radius: 30px; cursor:pointer; border:none; font-weight:bold;">
                        Nouvelle commande
                    </button>
                `;
            }, 2500);
        });
    }
});
