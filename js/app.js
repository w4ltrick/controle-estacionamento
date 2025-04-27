// Inicializa o controlador quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const controller = new EstacionamentoController();
    
    // Verifica se estamos na página de cadastro e se há uma vaga pré-selecionada
    if (window.location.pathname.includes('cadastro.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const vagaSelecionada = urlParams.get('vaga');
        
        if (vagaSelecionada) {
            const inputVaga = document.getElementById('vaga');
            if (inputVaga) {
                inputVaga.value = vagaSelecionada;
            }
        }
    }
});