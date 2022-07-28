const brandArr = [];

window.onload = function() {
    if(document.readyState == 'complete') {
    getBrands();
    }
    };

async function getBrands(){
    let id = sessionStorage.getItem('id');
    const res = await sendQuery(brandQuery, id);
    console.log(res.data.brands.length);
    for(let i=0;i<res.data.brands.length;i++){
        const brandObjs = {
            id: res.data.brands[i].id,
            name: res.data.brands[i].name,
        };
        brandArr.push(brandObjs);
    }
    console.log(brandArr);
}


function findBrand(event){
    event.preventDefault();
    brandToFind = document.getElementById("textid").value;
    let foundObj = brandArr.find(o => o.name === brandToFind);
    console.log(foundObj.id);
    let msg = "";
    if(foundObj === undefined){
        msg = "Brand Not Found, Try Again";
    }
    else{
        msg = `Brand Found. ID: ` + foundObj.id + ` Name: ` + foundObj.name;
        nextbtn.disabled = false;
        document.getElementById("nextbtn").hidden = false;
        sessionStorage.setItem('objid', foundObj.id);
    }
    document.getElementById("brandFound").innerHTML = msg;
    console.log(foundObj);
}

const brandQuery = `
query ListBrands {
    brands {
      id
      name
      rgbaColor {
        red
        green
        blue
        alpha
      }
      avatar
      slug
    }
  }
`;
