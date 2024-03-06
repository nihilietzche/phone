let fr = new FileReader();
document.getElementById('inputfile')
            .addEventListener('change', function () {
 
                
                fr.onload = function () {
                    document.getElementById('output')
                        .textContent = fr.result;
                        dimaParseCsvToXml()
                        document.querySelector('.dispnone').classList.remove('dispnone')
                }
 
                fr.readAsText(this.files[0]);
            })
let obj = []
let xmlResult = ``
let xmlBody= ``
// function hasMobile(elem){
//     if(elem){
//         return `<Mobile>${el[2]}</Mobile>`
//     }
// }
function dimaParseCsvToXml(){
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
}

let link
let content
let file
function downloadFile(){
    link = document.createElement("a");
    content = xmlResult;
    file = new Blob([content], { type: 'text/plain' });

    fetch(`upload/index.php`, {
        mode: 'no-cors', 
        method:"POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body:file})
    .then(response => console.log(response.text()))

    // // link.href = URL.createObjectURL(file);
    // // link.download = "sample.xml";
    // // const file = document.getElementById('inputfile').files[0]; // получаем выбранный файл

    // const xhr = new XMLHttpRequest(); // создаем объект XMLHttpRequest
    // const formData = new FormData(); // создаем объект FormData для передачи файла

    // formData.append('file', file); // добавляем файл в объект FormData

    // xhr.open('POST', '/upload/index.php', true); // указываем метод и URL сервера, куда будет отправлен файл

    // xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded; charset=UTF-8');

    // xhr.addEventListener("readystatechange", () => {
    //     console.log(xhr.response);
    //     if (xhr.readyState == XMLHttpRequest.DONE) {
    //         console.log('ready')
    //     }
    //   });

    // xhr.send(formData); // отправляем запрос на сервер с помощью метода send()


    // // link.click();
    // // URL.revokeObjectURL(link.href);
}          