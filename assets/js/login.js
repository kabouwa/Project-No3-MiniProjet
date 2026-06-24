if(sessionStorage.getItem('user')){
    window.location.href = "/pages/dashboard.html";
}
//Remplir automatiquement
(function (){
    let remember = localStorage.getItem('remember')
    if(remember){
        let credentials = JSON.parse(remember)
        $("#username").val(credentials.username)
        $("#password").val(credentials.password)
        $("#remember").prop("checked",true)
    }
})()

//Validation depuis API
async function checkUser(username,password){
    let foundedUser = false
    try{
        const res = await fetch(api)
        const data = await res.json()
        data.forEach(user => {
            if(user.pseudo == username && user.MotDePasse == password){
                foundedUser = user
            }
        });
        return foundedUser
    }catch(e){
        console.error(e)
        return -1
    }
}

//Event Submit
$("#login-form").submit(async (e)=>{   
    e.preventDefault()
    removeErrors()
    toggleSubmit()
    let foundedUser = null
    let errors = []
    const username = $("#username").val()
    const password = $("#password").val()
    const remember = $("#remember").is(":checked")
    //Client Validation
    if(username.length<3){
        errors.push("nom d'utilisateur invalide!")
    }
    if(password.length<3){
        errors.push("Mot de passe invalide!")
    }
    
    if(errors.length>0){
        toggleSubmit(true)
        renderErrors(errors)
        return
    }

    //Api fetching
    for(let i=1; i<=3; i++){
        foundedUser = await checkUser(username,password)
        if(foundedUser==-1){
            continue
        }else if(!foundedUser){
            valid = false
            foundedUser = null
            errors.push("Nom d'utilisateur ou Mot de passe est incorrect!")
        }else if(foundedUser){
            sessionStorage.setItem('user',JSON.stringify(foundedUser))            
            remember?             
            localStorage.setItem(
                    'remember',
                    JSON.stringify({
                        username : username,
                        password : password
                    }
            ))
            :localStorage.removeItem('remember')
        }
        toggleSubmit(true)
        break
    }
    if(errors.length>0){
        renderErrors(errors)
    }else{
       window.location.href = '/pages/dashboard.html'
    }
});