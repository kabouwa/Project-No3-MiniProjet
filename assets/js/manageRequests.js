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
        
        e.target.classList.remove("bg-danger","bg-warning","bg-success")
        e.target.classList.add(newStatus==='En attente'?"bg-warning":newStatus==='Approuvée'?"bg-success":"bg-danger")
        
        await updateStatus(userId,ReqId,newStatus)
    })
}

async function renderRequests() {
    let requests = await getRequests()
    if(!requests.length){
        $($('.line1').children().get(0)).text('Aucune demandes trouvée !')
        return
    }
    $('.line1').remove()    
    requests.forEach(req=>{
        let row = $('<div>',{
            class : "row py-3 border-bottom",
        })
        row.html(`
            <div class="col-1">${req.id}</div>
            <div class="col-2">${req.username}</div>
            <div class="col-3">${req.titre}</div>
            <div class="col-2">${req.demande}</div>
            <div class="col-2">${req.dateAjout}</div>
            <div class="col-2">
                <select name="status" data-req-id="${req.id}" data-user-id="${req.userId}" class="status form-select text-white w-75 bg-${req.status==='En attente'?"warning":req.status==='Approuvée'?"success":"danger"}">
                    <option value="En attente" ${req.status==='En attente'?"selected":''}>En attente</option>
                    <option value="Approuvée"  ${req.status==='Approuvée' ?"selected":''}>Approuvée</option>
                    <option value="Rejectée"    ${req.status==='Rejectée' ?"selected":''}>Rejectée</option>
                </select>
            </div>
        `)
        $('#reqs-table').append(row)
    })
    await addEvents()
};renderRequests()

renderRequests()
setInterval(_=>{
    tableHead = $('.thead')
    $('#reqs-table').children().remove()
    $('#reqs-table').append(tableHead)
    renderRequests()
},10000)