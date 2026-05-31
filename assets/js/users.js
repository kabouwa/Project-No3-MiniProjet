!user.admin?location.href = '/pages/dashboard.html':null
async function getUsers(){
    const res = await fetch(api)
    let users = await res.json()
    users = users.sort((a, b) =>+b.id - +a.id)
    return users
}

async function renderUsers(){
    const users = await getUsers()
    if(!users.length){
        $($(".no-user-founded").children().get(0)).text('Aucune utilisateur trouvée !');
        return
    }
    $(".no-user-founded").remove();
    users.forEach(u => {
        let row = $('<tr>',{class : "align-middle"})
        try{
            row.html(`
                <td class="fw-bold">${u.id}</td>
                <td>${u.pseudo}</td>
                <td>${u.nom}</td>
                <td>${u.prenom}</td>
                <td>${u.age}</td>
                <td>${u.Pays}</td>
                <td>${u.Devise}</td>
                <td>${u.email}</td>
                <td>${!u.couleur.startsWith("#")?u.couleur:`<input class="form-control p-1" type="color" value="${u.couleur}" disabled>` }</td>
                <td>${u.admin?'Oui':'Non'}</td>
                <td>
                    <a class="btn btn-warning modifier" href="/pages/admin/updateUser.html?userid=${u.id}">Modifier</a>
                </td>`)        
            $('.table-users').append(row)
        }catch(error){}
    });
};renderUsers()