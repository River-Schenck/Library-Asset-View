async function showGraphQLData(event){
    event.preventDefault();
    let nextbtn = document.getElementById("nextbtn");
    document.getElementById("currentUser").innerHTML = "Current User";
    let id = document.getElementById("textid").value;
    sessionStorage.setItem('id', id);
    const res = await sendQuery(userQuery, id);
    const arr = [];
    arr.push(`Name: ` + res.data.currentUser.name);
    arr.push(`Email: ` + res.data.currentUser.email);
    arr.push(`ID: ` + res.data.currentUser.id);
    let list = document.getElementById("currentUser");
    for(let i=0; i<arr.length;i++) {
            let li = document.createElement("li");
            li.innerText = arr[i];
            list.appendChild(li);
    }
    nextbtn.disabled = false;
}

async function sendQuery(query, id){
    return fetch("https://demo.frontify.com/graphql", {
        method: "POST",
        //Q2ydJqV3zbDxV4YNbdJ26uSJLKhkTKoPvz34xBhz
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ` + id,
            "Accept": "application/json",
            
        },
        body: JSON.stringify({
            query: query
        })
    }).then(response => {
        return response.json();
    }).then(res => {
        return res;
    })
}
    //Queries
    const userQuery = `
    query CurrentUser {
        currentUser {
            id,
            email,
            name
        }
    }
    `;




