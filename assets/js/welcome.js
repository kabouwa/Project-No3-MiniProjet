const nom = user.nom;
const type = user.admin ? "administrateur" : "utilisateur"
const templates = [
    `Bonjour ${nom}, vous êtes connecté en tant que ${type} !`,
    `Bienvenue ${nom} ! Vous accédez en tant que ${type}.`,
    `${nom}, vous êtes maintenant connecté avec les droits ${type}.`,
    `Salut ${nom}, tu es identifié comme ${type}. Bienvenue !`,
    `Connexion réussie ! ${nom}, vous avez les permissions de ${type}.`,
    `${nom}, votre profil ${type} est actif et prêt à l'emploi.`,
    `Bienvenue ${nom} dans votre espace ${type} !`,
    `${nom} (${type}), c'est bon, vous êtes connecté !`,
    `Accès accordé à ${nom} en tant que ${type}. À bientôt !`,
    `${nom}, vous disposez maintenant des droits de ${type}. C'est parti !`,
    `Heureux de vous revoir ${nom}, statut: ${type}.`,
    `Bonjour et bienvenue ${nom}! Mode ${type} activé.`,
    `${nom}, votre session ${type} a commencé avec succès.`,
    `Salutations ${nom}, vous êtes maintenant ${type} sur cette plateforme.`,
    `${nom} en tant que ${type} - authentification confirmée !`,
    `Bienvenue de nouveau ${nom} ! Vous êtes identifié comme ${type}.`,
    `${nom}, l'accès ${type} est maintenant actif pour vous.`,
    `Connexion établie pour ${nom}, profil: ${type}.`,
    `${nom}, vous êtes maintenant opérationnel en tant que ${type} !`,
    `Bravo ${nom}! Vous accédez à votre compte ${type}.`
]
const RandomIndex = Math.floor( Math.random() * templates.length  )
$("#welcome-message").text(templates[RandomIndex])