function renderRequests(){
    if(user.admin){
        $("table").html('<p class="alert alert-danger">Vous etes un administrateur, vous n\'avez pas l\'access a cette page !</p>');
        return
    }
    if(!user.demandes.length){
        $($(".no-req-founded").children().get(0)).html('Aucune demande trouvée ! <a class="navbar-item text-info" href="/pages/addRequest.html">ajouter une demande</a>');
        return
    }
    $(".no-req-founded").remove();
    user.demandes.forEach(d => {
        let row = $('<tr>',{class : "align-middle"})
        let statusColor = ''
        let disabled = false
        try{
            statusColor = d.status.toLowerCase() === "en attente"
            ? "text-warning"
            : d.status.toLowerCase() === "approuvée"
            ? "text-success"
            :"text-danger"
            disabled = (d.status.toLowerCase().trim()!=="en attente")?true:false

        }catch{
            console.warn('Object non valid Detected !')
        }
        row.html(`
            <td class="fw-bold">${d.id}</td>
            <td>${d.titre}</td>
            <td>${d.demande}</td>
            <td>${d.dateAjout}</td>
            <td class="${statusColor} fw-bold">${d.status}</td>

            <td>
                <button class="btn btn-secondary cancelBtn" data-req-id=${d.id} ${disabled?"disabled":""}>Annuler</button>
            </td>`)     
        $('.table-users').append(row)
    });

};renderRequests()

$('.cancelBtn').click(async e=>{
    let delReqId = e.target.dataset.reqId    
    user.demandes =  user.demandes.filter(d=> d.id!=delReqId)
    await saveUser()
    location.reload()
})