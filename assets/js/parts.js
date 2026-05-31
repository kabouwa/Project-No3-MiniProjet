//<a href="/pages/dashboard.html"><img src="" alt="logo" id="logo"></a>
const head = `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="https://cdn-icons-png.flaticon.com/512/33/33308.png">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
<link rel="stylesheet" href="/assets/css/root.css">
`
const header = `
<div class="container py-2 text-white d-flex justify-content-between">
    <button class="btn" id="menu-toggler"><img src="" alt="logo" id="logo"></button>
    <div class="user-info d-flex justify-content-end align-items-center gap-2">
        <p class="m-0 fw-bold" id="user"></p>
        <button class="btn btn-danger" id="logout">Se Deconnecter</button>
    </div>
</div>
`
const navbar = `
<ul class="navbar-nav container flex-row justify-content-center gap-1">
    <li class="nav-item px-3">
        <a href="/pages/admin/users.html" class="nav-link">Gérer Les Utilisateurs</a>
    </li>
    <li class="nav-item px-3">
        <a href="/pages/admin/addUser.html" class="nav-link">Ajouter Un Utilisateur</a>
    </li>
    <li class="nav-item px-3">
        <a href="/pages/admin/manageRequests.html" class="nav-link">Gérer Les Demandes</a>
    </li>
</ul>
`
const aside = `
<ul class="p-1">
    <li class="nav-item px-2 py-3 my-3">
        <a href="/pages/dashboard.html" class="nav-link text-white">Accueil</a>
    </li>
    <li class="nav-item px-2 py-3 my-3">
        <a href="/pages/profile.html" class="nav-link text-white">Profile</a>
    </li>
    <li class="nav-item px-2 py-3 my-3">
        <a href="/pages/changeColor.html" class="nav-link text-white">Modifier Couleur</a>
    </li> 
    <li class="nav-item px-2 py-3 my-3">
        <a href="/pages/myRequests.html" class="nav-link text-white">Mes Demandes</a>
    </li> 
    <li class="nav-item px-2 py-3 my-3">
        <a href="/pages/addRequest.html" class="nav-link text-white">Ajouter Une Demande</a>
    </li> 
</ul>
`
const footer = `
<div class="container pt-4 pb-5">
    <div class="row align-items-center justify-content-between g-3">
        
        <div class="col-12 col-md-6 text-center text-md-start text-secondary">
            <p class="mb-1 fw-bold text-white">Mini Projet JavaScript</p>
            <p><i class="bi bi-geo-alt-fill text-success me-2"></i>ISTA HaySalam, Sale, Maroc</p>
        </div>
        <div class="col-12 col-md-6 text-center d-flex justify-content-end">
            <span class="me-3 text-light d-block mb-2 mb-md-0">Suivez-nous :</span>
            <a href="https://facebook.com" class="btn btn-outline-secondary btn-sm rounded-circle me-2" ><i class="bi bi-facebook text-white"></i></a>
            <a href="https://instagram.com" class="btn btn-outline-secondary btn-sm rounded-circle me-2"><i class="bi bi-instagram text-white"></i></a>
            <a href="https://x.com" class="btn btn-outline-secondary btn-sm rounded-circle me-2"><i class="bi bi-twitter-x text-white"></i></a>
            <a href="https://linkedin.com" class="btn btn-outline-secondary btn-sm rounded-circle"><i class="bi bi-linkedin text-white"></i></a>
        </div>
        
    </div>
    <p class="text-center text-light mt-3">&copy; 2026 ISTA HaySalam(dev104). Tous droits réservés.</p>
</div>
`

$('head').append(head)
$("header").html(header)
$("nav").html(navbar)
$("aside").html(aside)
$("footer").html(footer)
