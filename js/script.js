let endOfPage = 0;
let preloading = false;

const showPreloader = () => {
    let preloader = document.getElementById('giphy-embed');
    preloader.style.display = "block";
}
const hidePreloader = () => {
    let preloader = document.getElementById('giphy-embed');
    preloader.style.display = "none";
}


const getData = () => {
    if (!preloading) {
        preloading = true;
        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {
                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);


                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebSite = document.createElement('p');
                    pId.innerText = `User Id: ${user.id}`;
                    pName.innerText = `User Name: ${user.name}`;
                    pWebSite.innerHTML = `User URL: ${user.website} <br>----------`;


                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebSite);
                }
                preloading = false;
                hidePreloader();
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            })

    }
    
    

}

const scrollToEndofPage = () => {


    let d = document.documentElement;

    let scrollHeight = d.scrollHeight;

    let scrollTop = d.scrollTop;

    let clientHeight = d.clientHeight;

    let sumScrollTopAndClientHeight = Math.ceil(clientHeight + scrollTop);

    // console.log(`scrollHeight ${scrollHeight}`)
    // console.log(`scrllsum ${sumScrollTopAndClientHeight}`)

    if (sumScrollTopAndClientHeight >= scrollHeight) {

        endOfPage += 1;
        showPreloader();
        getData();
    }




}


window.addEventListener('scroll', scrollToEndofPage);