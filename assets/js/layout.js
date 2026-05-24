var user = sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')) : null
!user?location.href = '/':null
user.avatar = 'https://cdn-icons-png.flaticon.com/512/18290/18290762.png'

function saveUser(){
    sessionStorage.setItem('user',JSON.stringify(user))
}

function renderParts(){
    //Background Color
    $('main').css('background-color',user.couleur)
    //Logo
    $("#logo").attr('src',user.avatar)
    //Nom et prenom    
    $("#user").html(`${user.nom[0].toUpperCase()+user.nom.slice(1)} ${user.prenom[0].toUpperCase()+user.prenom.slice(1)} ${user.admin==true?'<i class="fa-solid fa-user-shield text-warning"></i>':''}`)    
    //Navigation bar
    
    if(user.admin){
        $(".admin-navbar").removeClass("d-none")
    }else{
        $(".admin-navbar").remove()
    }
}
$(()=>{
    renderParts()
    //Deconnexion
    $("#logout").click(()=>{
        sessionStorage.removeItem('user')
        // localStorage.removeItem('remember')
        location.reload()
    })
})
