async function generateReqId(){
    let newId
    const res = await fetch(api)
    const users = await res.json()
    let ids = []
    users.forEach(u=>{
        try{
            u.demandes.forEach(d=>{
                ids.push(d.id)
            })
        }catch(error){}
    })
    newId = Math.max(...ids) + 1
    return newId 
}

function validateRequest(f){
    let errors = []
    if(f.get('titre').trim().length <= 3 || f.get('demande').trim().length <= 3){
        errors.push('Remplir tous les champs pour envoyer !')
    }
    if(errors.length){
        renderErrors(errors)
        return false
    }
    let d = new Date()
    let today = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
    let newRequest = {
        id : "",
        titre : f.get('titre').trim(),
        demande : f.get('demande').trim(),
        status : "En attente",
        dateAjout : today
    }
    return newRequest
}

$(".request-form").submit(async e=>{
    if(user.admin){
        return
    }
    e.preventDefault()
    removeErrors()
    toggleSubmit()
    const f = new FormData(e.target)
    let newReq = validateRequest(f)
    if(!newReq){
        return
    }
    newReq.id = await generateReqId()
    
    if(user.demandes){
        user.demandes.push(newReq)
    }else{
        user.demandes = []
        user.demandes.push(newReq)
    }
    await saveUser()
    location.href = "/pages/myRequests.html"
    toggleSubmit(true)
});


(()=>{
    if(user.admin){
        $('#titre').prop('disabled',true)
        $('textarea').prop('disabled',true)
        $('[type=submit]').prop('disabled',true)
        renderErrors(["Vous etes un administrateur, vous n'avez pas l'access a cette page"])
    }
})()