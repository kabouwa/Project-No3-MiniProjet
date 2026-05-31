const params = new URLSearchParams(location.search)
if(!user.admin)location.href = '/pages/dashboard'

$(".create-form").submit(async e=>{
    e.preventDefault()
    let errors = []
    const f = new FormData(e.target)
    let newUser = await validateInputs(f)
    if(!newUser){
        return
    }
    //Envoie nouveau utilisateur vers API (POST)
    const res = await fetch(api,{
            method : "POST",
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify(newUser)
        })
    const data = await res.json()
    
    if(data == "Max number of elements reached for this resource!"){
        errors.push("Impossible de s'inscrire a ce moment (Le max des comptes est atteints)!") 
    }
    if(errors.length > 0){
        renderErrors(errors)        
    }else{
        location.href = '/pages/admin/users.html'
    }
    toggleSubmit(true)
})