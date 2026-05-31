// async function generateId(){
//     let newId
//     const res = await fetch(api)
//     const users = await res.json()
//     while(true){
//         newId = `${Math.floor( 50000 + Math.random() * 50000 )}` 
//         let founded = false
//         users.forEach(u => {
//             if(u.id==newId){
//                 founded = true
//             }
//         });
//         if(!founded){
//             break
//         }
//     }
//     return newId
// }

//Event Submit
$("#signup-form").submit(async (e)=>{   
    e.preventDefault()
    toggleSubmit()
    removeErrors()
    let errors = []
    const f = new FormData(e.target)
    let newUser = await validateInputs(f)
    if(!newUser){
        return
    }else{
        newUser.admin = false
        newUser.couleur = "#fff"
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
        location.href = '/'
    }
    
    toggleSubmit(true)
});