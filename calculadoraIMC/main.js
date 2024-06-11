//Capturar evento de submit DO FORM
const form = document.querySelector('#form');

form.addEventListener('submit', function(evento){
    evento.preventDefault();
    const inputPeso = evento.target.querySelector('#peso');
    const inputAltura = evento.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // console.log(peso, altura)
    
    if (!peso) {
        setResultado('Peso inválido', false);
        return
    }

    if (!altura) {
        setResultado('Altura inválido', false);
        return
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);

    const msg = `Seu IMC é ${imc} (${nivelImc}).`;

    setResultado(msg, true)
});

function getNivelImc (imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1',
        'Obesidade grau 2', 'Obesidade grau 3'];
    
    if (imc >= 39.9){
        return nivel[5];
    }if (imc >= 34.9) {
        return nivel[4];
        
    }if (imc >= 29.9) {
        return nivel[3];
        
    }if (imc >= 24.9) {
        return nivel[2];
    
    }if (imc >= 18.5) {
        return nivel[1];
            
    }if (imc < 18.5) {
        return nivel[0];
        
    }
}

function getImc (peso, altura) {
    const imc = peso / altura ** 2;
    // console.log(imc);
    return imc.toFixed(2);
 }

function criaP () {
    const p = document.createElement('p');
    return p;
}


function setResultado (msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    

    const p = criaP();

    if (isValid) p.classList.add('paragrafo-resultado');

    p.innerHTML = msg
    resultado.appendChild(p);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
		.then(function(registration) {
            console.log('ServiceWorker registration successful'+ 
			'with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
