if(!user.admin)location.href = '/pages/dashboard'

async function getRequests(){
    const res = await fetch(api)
    const data = await res.json()
    let allRequests = []

    data.forEach(user =>{
        try{
           user.demandes.forEach(req=>{
                req['username'] = user.pseudo
                req['userId'] = user.id
                allRequests.push(req)
            }) 
        }catch(error){}
    });
    allRequests = allRequests.sort((a, b) =>+b.id - +a.id)
    return allRequests
}

async function updateStatus(userId,reqId,newStatus){    
    if(newStatus!=="En attente" && newStatus!=="Approuvée" && newStatus!=="Rejectée"){
        console.error("Bad request : Status not valid !")
        return false
    }
    //Get User and update full Object
    let res = await fetch(`${api}/${userId}`)
    let user = await res.json()
    user.demandes.forEach((req,index)=>{
        if(req.id==reqId){
            user.demandes[index].status = newStatus
        }
    })

    //Update Full Objects
    res = await fetch(`${api}/${userId}`,{
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
}

async function addEvents(){
    $(".status").change(async e=>{
        let userId = e.target.dataset.userId
        let ReqId = e.target.dataset.reqId
        let newStatus = e.target.value
        
        let classColor = newStatus === 'En attente' ? '-warning' 
                    : newStatus === 'Approuvée' ? '-success' 
                    : '-danger';

        e.target.classList.remove("bg-danger","bg-warning","bg-success")
        $(e.target).addClass(`bg${classColor}`)

        let card = $(e.target).closest('.card');
        card.removeClass('border-warning border-success border-danger');
        card.addClass(`border${classColor}`);

        await updateStatus(userId,ReqId,newStatus)
    })
}

async function renderRequests() {
    let requests = await getRequests()
    if(!requests.length){
        $('#not-found').text('Aucune demandes trouvée !')
        return
    }

    // Affichage Cards
    $("#reqs-cards").html(
        requests.map(req => `
<div class="col-12 col-md-6 col-lg-4 col-xl-3 my-3">
    <div class="card border-start border-4 mb-2 h-100 border-${req.status==='En attente'?"warning":req.status==='Approuvée'?"success":"danger"}">
        <div class="card-body pb-2">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="card-title mb-1">
                        <span class="badge bg-secondary me-2">#${req.id}</span>${req.username}
                    </h6>
                    <h5 class="mb-1"><small >${req.titre}</small></h5>
                    <p class="mb-1"><small class="text-muted">${req.demande}</small></p>
                    <p class="mb-0"><small class="text-muted">${req.dateAjout}</small></p>
                </div>
                <select name="status" data-req-id="${req.id}" data-user-id="${req.userId}" class="status form-select form-select-sm text-white bg-${req.status==='En attente'?"warning":req.status==='Approuvée'?"success":"danger"}" style="width: 150px;"  >
                    <option value="En attente" ${req.status==='En attente'?"selected":''}>En attente</option>
                    <option value="Approuvée"  ${req.status==='Approuvée' ?"selected":''}>Approuvée</option>
                    <option value="Rejectée"    ${req.status==='Rejectée' ?"selected":''}>Rejectée</option>
                </select>
            </div>
        </div>
    </div>  
</div>
        `).join("")
    )
    await addEvents()
}

renderRequests()
setInterval(_=>{
    renderRequests()
},10000)