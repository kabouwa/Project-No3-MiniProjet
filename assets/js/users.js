!user.admin?location.href = '/pages/dashboard.html':null

let users
(async function(){
    const res = await fetch(api)
    users = await res.json()
    users = users.sort((a, b) =>+b.id - +a.id)
    renderUsers()
    $("#search").keyup(renderUsers)
})()

function renderUsers(){
    let s = $("#search").val().trim().toLowerCase();
    let filtredUsers = !s.length 
    ? users 
    : (s === "oui" || s === "non")
    ? users.filter( u =>
        (u.admin && s ==="oui")
        || (!u.admin && s ==="non")
    )
    :users.filter( u =>
        u.id == s
        || u.nom.toLowerCase().includes(s)
        || u.prenom.toLowerCase().includes(s)
        || u.pseudo.toLowerCase().includes(s)
        || u.email.toLowerCase().includes(s)
    )
    
    $("#table-users").empty();
    $("#nb-users").val(filtredUsers.length)
    if(!filtredUsers.length){
        $("#table-users").html(
            `<tr>
                <th colspan="11" class="my-5 py-5 text-center">
                    Aucune utilisateur trouvée !
                </th>
            </tr>`
        )
        return
    }

    // <td>${!u.couleur.startsWith("#")?u.couleur:`<input class="form-control p-1" type="color" value="${u.couleur}" disabled>` }</td>
    filtredUsers.forEach(u => {
        let row = $('<tr>',{class : "align-middle"})
        try{
            row.html(`
                <td class="fw-bold">${u.id}</td>
                <td>${u.nom}</td>
                <td>${u.prenom}</td>
                <td>${u.pseudo}</td>
                <td>${u.email}</td>
                <td>${u.admin?'Oui':'Non'}</td>
                <td>
                    <a class="btn btn-outline-info modifier" href="/pages/admin/user.html?userid=${u.id}">Voir</a>
                    <a class="btn btn-outline-warning modifier" href="/pages/admin/updateUser.html?userid=${u.id}">Modifier</a>
                </td>
            `)
            $('#table-users').append(row)      
        }catch(error){}
    });
}
