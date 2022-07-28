let foundObj = sessionStorage.getItem('objid');
let libraryArr = [];

async function getLibrary(){
    let id = sessionStorage.getItem('id');
    let libraryList = await sendQuery(libraryQuery, id);
    console.log(libraryList);
    for(let i=0;i<libraryList.data.brand.libraries.items.length;i++){
        const brandObjs = {
            id: libraryList.data.brand.libraries.items[i].id,
            name: libraryList.data.brand.libraries.items[i].name,
        };
        libraryArr.push(brandObjs);
    }
    let list = document.getElementById("selectForm");
    for(let i=0; i<libraryArr.length;i++) {
        let li = document.createElement("option");
        li.innerText = libraryArr[i].name;
        li.id = `listItem${i}`;
        list.appendChild(li);
    }
}

async function librarySelected(libVal, maxImages){

    selectedLibrary = libraryArr.find(o => o.name === libVal).id;
    console.log(selectedLibrary);
    let id = sessionStorage.getItem('id');
    console.log(id);
    const libraryAssetQuery = `
        query LibraryAssets {
            library(id: "${selectedLibrary}") {
            id
            name
            type: __typename
            assets(page: 1, limit: ${maxImages}) {
                total
                items {
                id
                title
                tags {
                    value
                }
                ... on Image {
                    previewUrl
                }
                }
            }
            }
        }`;
    const res = await sendQuery(libraryAssetQuery , id);
    for(let i=0;i<res.data.library.assets.items.length;i++){
        let img = document.createElement("img");
        //console.log(res.data.library.assets.items[i].previewUrl);
        img.src = res.data.library.assets.items[i].previewUrl;
        img.style = "height: 400px; margin:10px";
        let src = document.getElementById("imgContainer");
        src.appendChild(img);
        
    }
}

const libraryQuery = `
query BrandLibraries {
    brand(id: "${foundObj}") {
      id
      name
      libraries(page: 1, limit: 25) {
        total
        items {
          type: __typename
          id
          name
          assetCount
        }
      }
    }
  }`;



