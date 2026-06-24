const params = new URLSearchParams(location.search)
const userId = params.get('userid')
// if(!user.admin)location.href = '/pages/dashboard'
// if(!userId)location.href = '/pages/admin/users.html'


async function renderUser(){
    let u
    try{
        const res = await fetch(`${api}/${userId}`)
        u = await res.json()
        if(!u)location.href = '/pages/admin/users.html'
    }catch{
      location.href = '/pages/admin/users.html'
      return
    }
    //Rendering
    const userInformation = {
        nom : u.nom,
        prenom : u.prenom,
        admin : u.admin ? "Oui" : "Non",
        username : u.pseudo,
        password : u.MotDePasse,
        email : u.email,
        pays : u.Pays,
        age : u.age,
        devise : u.Devise,
        couleur : u.couleur,
    }
    for(let key in userInformation){
        $(`#${key}`).val(userInformation[key])
    }
    if(u.admin){
        $("#isAdmin").prop("checked",true)
    }
    $('#id').text(u.id)
    $("#update-link").attr('href', `UpdateUser.html?userid=${u.id}` )
};renderUser()
