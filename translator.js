const traduzir = function(){
    const numero = document.getElementById('numeroParaTraduzir').value;
    let traducao;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-mesa-op.cloudfunctions.net/translatorGET?number='+numero);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            traducao = JSON.parse(xhr.responseText);
            document.getElementById('txtFormula').value = traducao.formula;
            document.getElementById('txtPinyin').value = traducao.pinyin;
            document.getElementById('txtChines').value = traducao.chines;
        }
    };
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.send();
};