function renderProfile(){    
    const userInformation = {
        //id:value
        nom : user.nom,
        prenom : user.prenom,
        username : user.pseudo,
        password : user.MotDePasse,
        email : user.email,
        pays : user.Pays,
        age : user.age,
        devise : user.Devise,
        couleur : user.couleur,
        admin : user.admin==true?"Oui":"Non"
    }

    for(let key in userInformation){
        $(`#${key}`).val(userInformation[key])
    }
}
$(function (){
    renderProfile()
    setInterval(_=>{
        getUser()
        renderProfile()
    },2000)
})