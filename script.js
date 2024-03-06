let fr = new FileReader();
document.getElementById('inputfile')
            .addEventListener('change', function () {
 
                
                fr.onload = function () {
                    document.getElementById('output')
                        .textContent = fr.result;
                        document.querySelector('.dispnone').classList.remove('dispnone')
                }
 
                fr.readAsText(this.files[0]);
            })
let obj = []

// function hasMobile(elem){
//     if(elem){
//         return `<Mobile>${el[2]}</Mobile>`
//     }
// }
function csvParseFanvil(){
    let xmlResult = ``
    let xmlBody= ``
    obj = fr.result.split('\n')
    obj.forEach((el, index)=>{
        
            obj[index] = (el.split(','))
    })
    obj.forEach((el, index)=>{
        if(index===0){
            return
        }
        if(el.length===1){
            return
        }
        xmlBody += `<DirectoryEntry>
        <Name>${el[1]}</Name>
        <Telephone>${el[2]}</Telephone>
        ${el[3] !=='' ? `<Mobile>${el[3]}</Mobile>` : ''}
    </DirectoryEntry>
    `
    })
    xmlResult = `<CiscoIPPhoneDirectory>
    ${xmlBody}</CiscoIPPhoneDirectory>`
    return xmlResult
}
function csvParseYealink(){
    let xmlResult = ``
    let xmlBody= ``
    let cur = 'Директор'
    obj.forEach((el, index)=>{
            if(index===0){
                return
            }
            if(el.length===1){
                return
            }
            if(el[0]!==cur){
                cur = el[0]
                xmlBody +=`
    </Menu>
    <Menu Name="${el[0]}">
        <Unit Name="${el[1]}" Phone1="${el[2]}" Phone2="${el[3] !=='' ? el[3]:''}" Phone3="" default_photo="Resource:"/>`
            }
            else{
                xmlBody += `
        <Unit Name="${el[1]}" Phone1="${el[2]}" Phone2="${el[3] !=='' ? el[3]:''}" Phone3="" default_photo="Resource:"/>`
            }
        })
        xmlResult = `<?xml version="1.0" encoding="UTF-8"?>
<YealinkIPPhoneBook>
    <Title>Yealink</Title>
    <Menu Name="Директор">${xmlBody}
    </Menu>
</YealinkIPPhoneBook>`
    return xmlResult
}

let link
let content
let file
function downloadFile(){
    // link = document.createElement("a");
    // content = JSON.stringify(xmlResult);
    formData = {
        'file1': csvParseFanvil(),
        'file2': csvParseYealink(),
      };
    fetch(`upload/index.php`, {
        mode:"same-origin", 
        method:"POST", 
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(  formData )})
        .then( response => {
        // Manipulate response here
        console.log( "response: ", response ); // JSON data parsed by `data.json()` call
        // In this case where I send entire $decoded from PHP you could arbitrarily use this
        console.log( "response.data: ", JSON.parse( response.data ) );
        } );

}          