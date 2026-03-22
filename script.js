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

    let totalCumule = 0;
    let sucreChoisi = null; // null = pas encore choisi, true = oui, false = non

    // === BOUTONS OUI / NON ===
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
        noteClient.value = '';

        // Reset sucre
        sucreChoisi = null;
        btnOui.classList.remove('selected');
        btnNon.classList.remove('selected');
    });

    // === VALIDER LA COMMANDE ===
    btnValider.addEventListener('click', () => {
        if (totalCumule === 0) {
            alert("Ton panier est vide !");
            return;
        }
        resumeFinalListe.innerHTML = listePanier.innerHTML;
        totalFinal.innerHTML = totalAffichage.innerHTML;
        modal.classList.remove('modal-hidden');
    });

    // === FERMER LA MODAL ===
    btnFermer.addEventListener('click', () => {
        modal.classList.add('modal-hidden');
    });

});