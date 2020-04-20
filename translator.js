const divisores = [
    {valor: 1000000000000, extenso: '1 trilhão', pinyin: 'zhào', chines: '兆'},
    {valor:   100000000, extenso: '100 milhões', pinyin: 'yì', chines: '亿'},
    {valor:       10000, extenso: '10 mil',      pinyin: 'wàn', chines: '万'},
    {valor:        1000, extenso: 'mil',         pinyin: 'qiān', chines: '千'},
    {valor:         100, extenso: 'cem',         pinyin: 'bǎi', chines: '百'},
    {valor:          10, extenso: 'dez',         pinyin: 'shí', chines: '十'}
];
const map = {};
map['0'] = {extenso: 'zero', pinyin: 'líng', chines: '零'};
map['1'] = {extenso: 'um', pinyin: 'yī', chines: '一'};
map['2'] = {extenso: 'dois', pinyin: 'èr', chines: '二'};
map['3'] = {extenso: 'três', pinyin: 'sān', chines: '三'};
map['4'] = {extenso: 'quatro', pinyin: 'sì', chines: '四'};
map['5'] = {extenso: 'cinco', pinyin: 'wǔ', chines: '五'};
map['6'] = {extenso: 'seis', pinyin: 'liù', chines: '六'};
map['7'] = {extenso: 'sete', pinyin: 'qī', chines: '七'};
map['8'] = {extenso: 'oito', pinyin: 'bā', chines: '八'};
map['9'] = {extenso: 'nove', pinyin: 'jiǔ', chines: '九'};
map['10'] = {extenso: 'dez', pinyin: 'shí', chines: '十'};
map['100'] = {extenso: 'cem', pinyin: 'bǎi', chines: '百'};
map['1000'] = {extenso: 'mil', pinyin: 'qiān', chines: '千'};
map['10000'] = {extenso: '10 mil', pinyin: 'wàn', chines: '万'};
map['100000000'] = {extenso: '100 milhões', pinyin: 'yì', chines: '亿'};
map['1000000000000'] = {extenso: '1 trilhão', pinyin: 'zhào', chines: '兆'};

const possuiOutrosZeros = function(str) {
    let result = false;
    if (str && str.length) {
        // Desconsidero os zeros à direita
        while (str.length && str.charAt(str.length-1) == '0') {
            str = str.substr(0, str.length-1);
        }
        for (var index = 0; !result && index < str.length; ++index) {
            result = str.charAt(index) == '0';
        }
    }
    return result;
};
const calcula = function (dividendo, resultado) {
    let resto, quociente;
    if (!resultado) {
        resultado = {
            formula: [],
            pinyin: [],
            chines: [],
            divididendoOriginal: dividendo
        };
    }
    if (dividendo <= 10) {
        resto = dividendo;
    } else {
        for (var i = 0; i < divisores.length; ++i) {
            const divisor = divisores[i].valor;
            if (dividendo >= divisor) {
                resto = dividendo % divisor;
                quociente = (dividendo - resto) / divisor;
                if (quociente > 10) {
                    const resultadoDoQuociente = calcula(quociente);
                    resultado.formula.push( '('+ resultadoDoQuociente.formula + ')*' + divisores[i].extenso );
                    resultado.pinyin.push( resultadoDoQuociente.pinyin + ' ' + divisores[i].pinyin );
                    resultado.chines.push( resultadoDoQuociente.chines + divisores[i].chines );
                } else {
                    if (resultado.divididendoOriginal < 20) {
                        resultado.formula.push( divisores[i].extenso );
                        resultado.pinyin.push( divisores[i].pinyin );
                        resultado.chines.push( divisores[i].chines );
                    } else {
                        resultado.formula.push( quociente + '*' + divisores[i].extenso );
                        resultado.pinyin.push( map[quociente].pinyin + ' ' + divisores[i].pinyin );
                        resultado.chines.push( map[quociente].chines + divisores[i].chines );
                    }
                }
                dividendo = resto > 0 ? resto : 0;
                
            } else if (resultado.divididendoOriginal > divisor && dividendo > 0) {
                if (!possuiOutrosZeros(dividendo+'')) {
                    resultado.formula.push('0');
                    resultado.pinyin.push( map['0'].pinyin );
                    resultado.chines.push( map['0'].chines );
                }
                while ((i+1) < divisores.length && divisores[i+1].valor > dividendo) {
                    ++i;
                }
            }
        }
    }
    if (resto > 0 && resto <= 10) {
        resultado.formula.push( resto );
        resultado.pinyin.push( map[resto].pinyin );
        resultado.chines.push( map[resto].chines );
    }
    resultado.formula = resultado.formula.join(' + ');
    resultado.pinyin = resultado.pinyin.join(' ');
    resultado.chines = resultado.chines.join('');
    return resultado;
};
const traduzir = function(){
    const numero = document.getElementById('numeroParaTraduzir').value;
    let traducao;
    /*let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-mesa-op.cloudfunctions.net/translatorGET?number='+numero);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', '*');
    xhr.setRequestHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers'
    );
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();
    traducao = JSON.parse(xhr.responseText);
    */
    traducao = calcula(numero);
    document.getElementById('txtFormula').value = traducao.formula;
    document.getElementById('txtPinyin').value = traducao.pinyin;
    document.getElementById('txtChines').value = traducao.chines;
};