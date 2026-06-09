// Obtém a referência da tela do pergaminho
const display = document.getElementById('display');
let currentInput = '';
let shouldResetDisplay = false;

// Adiciona números à tela
function appendNumber(number) {
    if (display.innerText === '0' || shouldResetDisplay) {
        resetDisplay();
    }
    currentInput += number;
    display.innerText = currentInput;
}

// Adiciona operadores (+, -, *, /)
function appendOperator(operator) {
    if (shouldResetDisplay) shouldResetDisplay = false;
    
    // Evita adicionar múltiplos operadores seguidos
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else if (currentInput !== '') {
        currentInput += operator;
    }
    display.innerText = currentInput;
}

// Limpa toda a tela (Magia de banimento)
function clearDisplay() {
    currentInput = '';
    display.innerText = '0';
}

// Apaga o último caractere digitado
function deleteLast() {
    if (shouldResetDisplay) return;
    currentInput = currentInput.toString().slice(0, -1);
    display.innerText = currentInput || '0';
}

// Realiza o cálculo místico
function calculate() {
    if (currentInput === '') return;
    
    try {
        // Resolve a expressão matemática com segurança básica
        // Substitui caracteres se necessário, embora usemos os padrões internamente
        let result = eval(currentInput);
        
        // Trata divisões por zero ou resultados inválidos
        if (result === Infinity || isNaN(result)) {
            display.innerText = "Feitiço Falhou";
            currentInput = '';
        } else {
            // Arredonda números decimais longos para não quebrar a tela
            if (result.toString().includes('.') && result.toString().split('.')[1].length > 4) {
                result = parseFloat(result.toFixed(4));
            }
            display.innerText = result;
            currentInput = result.toString();
        }
    } catch (error) {
        display.innerText = "Erro Runas";
        currentInput = '';
    }
    shouldResetDisplay = true;
}

// Reseta o estado para uma nova conta
function resetDisplay() {
    display.innerText = '';
    shouldResetDisplay = false;
    if (currentInput === '0') currentInput = '';
}