const params = new URLSearchParams(location.search)
const updateUserId = params.get('userid')
if(!user.admin)location.href = '/pages/dashboard'
if(!updateUserId)location.href = '/pages/admin/users.html'

async function renderUpdateUser(){
    let u
    try{
        const res = await fetch(`${api}/${updateUserId}`)
        u = await res.json()
        if(!u)location.href = '/pages/admin/users.html'
    }catch{
      location.href = '/pages/admin/users.html'
      return
    }
    //Rendering
    const userInformation = {
        //id:value
        nom : u.nom,
        prenom : u.prenom,
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
};renderUpdateUser()


async function updateUser(updatedUser){
    const res = await fetch(`${api}/${updateUserId}`,{
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(updatedUser)
    })
    const data = await res.json()
    return data
}


$(".update-form").submit(async (e)=>{
    e.preventDefault()
    removeErrors()
    toggleSubmit()
    let errors = []
    const f = new FormData(e.target)
    let newUser = await validateInputs(f,true)
    if(!newUser){
        toggleSubmit(true)
        return
    }
    const response = await updateUser(newUser)
    if(response){
        location.href = '/pages/admin/users.html'
    }else{
        errors.push("Impossible de modifier l'utilisateur pour le moment, veuillez réessayer plus tard !")
        renderErrors(errors)
    }
    toggleSubmit(true)
})


//Delete
$("#delBtn").click(()=>{
    $(".confirm-delete").removeClass("d-none")
})

$("#cancelDel").click(()=>{
    $(".confirm-delete").addClass("d-none")
})
$(".delete-form ").submit(async e=>{
    e.preventDefault()
    const res = await fetch(`${api}/${updateUserId}`,{
        method : "DELETE"
    })
    location.href = '/pages/admin/users.html'
})