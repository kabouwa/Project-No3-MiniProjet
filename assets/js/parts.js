//<a href="/pages/dashboard.html"><img src="" alt="logo" id="logo"></a>
const head = `
<link rel="icon" href="https://cdn-icons-png.flaticon.com/512/33/33308.png">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
<link rel="stylesheet" href="/assets/css/root.css">
`
const header = `
<div class="text-white d-flex justify-content-between align-items-center py-2">
    <div class="d-flex justify-content-between align-items-center">
        <button id="menu-toggler"><i class="fa-solid fa-bars m-0" style="font-size: 1.4rem;"></i></button>
        <a href="/pages/dashboard.html" class="display-6 m-0 text-decoration-none text-white title">Mini Project JavaScript</a>
    </div>
    <div class="user-info d-flex justify-content-end align-items-center gap-2">
        <a href="/pages/profile.html" class="text-decoration-none text-white">
            <img src="" alt="logo" id="logo">
            <span class="fw-bold" id="user"></span>
        </a>
        <button class="btn btn-outline-danger text-light" id="logout">Se Deconnecter</button>
    </div>
</div>
`
const navbar = `
<ul class="navbar-nav container flex-row justify-content-center gap-2">
    <li class="nav-item">
        <a href="/pages/admin/users.html" class="nav-link px-3">Gérer Les Utilisateurs</a>
    </li>
    <li class="nav-item">
        <a href="/pages/admin/addUser.html" class="nav-link px-3">Ajouter Un Utilisateur</a>
    </li>
    <li class="nav-item">
        <a href="/pages/admin/manageRequests.html" class="nav-link px-3">Gérer Les Demandes</a>
    </li>
</ul>
`
const aside = `
<ul class="p-1">
    <li class="nav-item">
        <a href="/pages/dashboard.html " class="nav-link text-white px-2 py-3 my-3"><i class="fas fa-home"></i> Accueil</a>
    </li>
    <li class="nav-item">
        <a href="/pages/profile.html" class="nav-link text-white px-2 py-3 my-3"><i class="fas fa-user"></i> Profile</a>
    </li>
    <li class="nav-item">
        <a href="/pages/changeColor.html" class="nav-link text-white px-2 py-3 my-3"><i class="fas fa-palette"></i> Modifier Couleur</a>
    </li> 
    <li class="nav-item">
        <a href="/pages/myRequests.html" class="nav-link text-white px-2 py-3 my-3"><i class="fas fa-list"></i> Mes Demandes</a>
    </li> 
    <li class="nav-item">
        <a href="/pages/addRequest.html" class="nav-link text-white px-2 py-3 my-3"><i class="fas fa-plus-circle"></i> Ajouter Une Demande</a>
    </li> 
</ul>
`
const footer = `
<div class="container pt-4 pb-5">
    <div class="row align-items-center justify-content-between g-3">
        
        <div class="col-12 col-md-6 text-center text-md-start text-secondary">
            <p class="mb-1 fw-bold text-white">Mini Projet JavaScript développé par Mohammed Rahali</p>
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
    <p class="text-center text-light mt-3">&copy; ${new Date().getFullYear()} ISTA HaySalam(dev104). Tous droits réservés.</p>
</div>
`

$('head').append(head)
$("header").html(header)
$("nav").html(navbar)
$("aside").html(aside)
$("footer").html(footer)
