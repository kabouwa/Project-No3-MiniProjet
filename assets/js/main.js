const api = 'https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire'

function renderErrors(errors){
    removeErrors()
    errors.forEach(e => {        
        let errorBlock = $('<li>',{
            class : "error alert alert-danger my-2",
            text : e,
        })
        $('.errors').append(errorBlock)
    });
}
function removeErrors(){
    $(".error").remove()
}

function toggleSubmit(state=true){
    const btn = $('[type="submit"]')
    btn.prop('disabled',state)
    btn.toggleClass('bg-secondary')
    btn.toggleClass('bg-success')
}

async function validUsername(username){
    const res = await fetch(api)
    const users = await res.json()
    let valid = true
    users.forEach(u => {
        if(u.pseudo.toLowerCase().trim()==username.toLowerCase().trim()){
            valid = false
        }
    });     
    return valid
}


async function validateInputs(f,itsUpdate=false){
    let errors = []
    //Validations 
    if(f.get('nom').trim().length<3 
    || f.get('prenom').trim().length<3 
    || f.get('pays').trim().length<3 
    || +f.get('age')<0 
    || +f.get('age')>100 
    || !f.get('devise').trim().length
    || f.get('email').trim().length<4 
    || f.get('username').trim().length < 3
    || f.get('password').trim().length < 1
    ){
        errors.push('Remplir tous les champs !')
    }
    if(errors.length > 0){
        renderErrors(errors)
        toggleSubmit(false)
        return false
    }
    //Age
    if(!Number.isInteger(+f.get('age').trim())){
        errors.push('Age invalide !')
    }

    //Email
    let EmailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if(!EmailPattern.test(f.get('email').trim())){
        errors.push('Email invalide !')
    }
    //Password
    let pswdPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/
    if(!pswdPattern.test(f.get('password').trim())){
        errors.push('Mot de passe invalide ! Il doit avoit au moins une lettre en majuscule, et une en miniscule, un chiffre, 8 caracteres, et un caractere special (@ # $ % ^ & *! ).')
    }

    //Username
    const valid = itsUpdate?true: await validUsername(f.get('username'))
   
    if(!valid){
        errors.push("Nom d'utilisateur existe deja !")
    }
    if(errors.length > 0){
        renderErrors(errors)
        toggleSubmit(false)      
        return false
    }
    let newUser = {
        "nom": f.get('nom').trim(),
        "prenom": f.get('prenom').trim(),
        "age": f.get('age').trim(),
        "admin": $('#isAdmin').is(":checked"),
        "pseudo": f.get('username').trim().toLowerCase(),
        "MotDePasse": f.get('password').trim(),
        "couleur": f.get('couleur'),
        "Devise": f.get('devise').trim().toUpperCase(),
        "Pays": f.get('pays').trim(),
        "email": f.get('email').trim().toLowerCase(),
        "avatar": "https://cdn-icons-png.flaticon.com/512/18290/18290762.png",
        "photo": "https://loremflickr.com/640/480/people",
    }
    return newUser
}