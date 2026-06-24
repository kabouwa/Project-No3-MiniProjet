var user = sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')) : null
!user?location.href = '/':null
user.avatar = 'https://cdn-icons-png.flaticon.com/512/18290/18290762.png'

async function getUser(){
    const res = await fetch(`${api}/${user.id}`)
    user = await res.json()
    await saveUser()
};getUser()

async function saveUser(){
    sessionStorage.setItem('user',JSON.stringify(user))
    const res = await fetch(`${api}/${user.id}`, {
        method : "PUT",
        headers :  { "Content-Type" : "application/json" },
        body : JSON.stringify(user)
    })
    const data = await res.json()
    return data
}

function renderParts(){
    //Background Color
    $('main').css('background-color',user.couleur)
    //Logo
    $("#logo").attr('src',user.avatar)
    //Nom et prenom    
    $("#user").html(`${user.prenom[0].toUpperCase()+user.prenom.slice(1)} ${user.nom[0].toUpperCase()+user.nom.slice(1)} ${user.admin==true?'<i class="fa-solid fa-user-shield text-warning"></i>':''}`)    
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
        location.href = '/'
    })
})

//Menu Button
$("#menu-toggler").click(async e=>{
    const a = $('aside')
    if(a.css('width') === '50px'){
        await a.animate({
            width : "250px",
        },200)
        await $('main').removeClass("hidden-aside")
    }else{
        await a.animate({
            width : "50px",
        },200)
        await $('main').addClass("hidden-aside")
    }
})