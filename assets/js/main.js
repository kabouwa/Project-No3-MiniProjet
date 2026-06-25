const api = 'https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire'

// My tools 
const removeErrors = _ =>{ $(".error").remove() }

function renderErrors(errors){
    removeErrors()
    $('.errors').html(errors.map(err => `<li class="error alert alert-danger my-2">${err}</li>`))
    $('.error').css({
        opacity : "0",
        scale : "0.9"
    }).animate({
        opacity : "1",
        scale : "1"
    })
}

function toggleSubmit(state=false){
    state = state===1 ? true : state
    if(state!=true && state!=false){
        console.error('toggleSubmit function must get in params a bool value !')
        return
    }
    const btn = $('[type="submit"]')
    btn.prop('disabled', !state)
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
    try{
        if(f.get('nom').trim().length<3 
        || f.get('prenom').trim().length<3 
        || f.get('pays').trim().length<3 
        || !f.get('age').trim().length
        || +f.get('age')<0 
        || +f.get('age')>100 
        || !f.get('devise').length
        || f.get('email').trim().length<4 
        || f.get('username').trim().length < 3
        || f.get('password').trim().length < 1
        ){
            errors.push('Remplir tous les champs !')
        }
    }catch(error){
        errors.push('Les champs sont invalide !')
    }

    if(errors.length > 0){
        renderErrors(errors)
        // toggleSubmit(true)
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
        // toggleSubmit(true)      
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
        //"demandes":[]
    }
    if(!itsUpdate){
        newUser.demandes = []
    }
    // toggleSubmit(true)
    return newUser
}

//Password toggler
$(".password-toggler").html('<i class="fa-regular fa-eye"></i>')
$(".password-toggler").addClass('btn')
$(".password-toggler").click(e =>{
    let type = e.target.previousElementSibling.type
    switch (type){
        case "text": 
            e.target.previousElementSibling.type = "password"
            $(".password-toggler").html('<i class="fa-regular fa-eye"></i>')
            break
        case "password":
            e.target.previousElementSibling.type = "text"
            $(".password-toggler").html('<i class="fa-regular fa-eye-slash"></i>')
            break
    }
})