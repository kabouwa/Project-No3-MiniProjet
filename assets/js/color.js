// async function updateColor(){
//     const res = await fetch(`${api}/${user.id}`, {
//         method : "PUT",
//         headers :  { "Content-Type" : "application/json" },
//         body : JSON.stringify(user)
//     })
//     const data = await res.json()
// }

function renderColor(){
    $('main').css('background-color',user.couleur)
    if(!user['couleur'].startsWith("#")){
        let field = $('#couleur')
        field.attr('type','text')
        field.val(user['couleur'])        
    }else{
        $("#couleur").val(user.couleur)
    }
}

//Main
if(!user.admin && +user.age<15){
   $('.user-info').remove()
}else{
   $(".invalid-user").remove()
    renderColor()
    $("#modifierCouleur").click(async (e)=>{
        const newColor = $('#nouvelleCouleur').val()
        if(user.couleur === newColor){
            return
        }
        user.couleur = newColor
        saveUser()
        renderColor()
    })  
}