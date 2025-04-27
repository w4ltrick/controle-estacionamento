class VagaView {
    constructor(elemento) {
        this._elemento = elemento;
    }
    
    _template(modelo) {
        return `
            ${modelo.map(vaga => `
                <tr data-vaga="${vaga.numeroVaga}">
                    <td>${vaga.numeroVaga}</td>
                    <td>${vaga.placa}</td>
                    <td>${vaga.modelo}</td>
                    <td>${vaga.cor}</td>
                    <td>${vaga.proprietario}</td>
                    <td>${vaga.apartamento}</td>
                    <td>${vaga.bloco}</td>
                    <td>
                        <button class="btn btn-danger btn-remover" data-vaga="${vaga.numeroVaga}">Remover</button>
                    </td>
                </tr>
            `).join('')}
        `;
    }
    
    update(modelo) {
        this._elemento.innerHTML = this._template(modelo);
        
        // Adiciona event listeners aos botões de remover
        const botoesRemover = this._elemento.querySelectorAll('.btn-remover');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', function() {
                const numeroVaga = this.getAttribute('data-vaga');
                const controller = new EstacionamentoController();
                controller.removerVaga(numeroVaga);
            });
        });
    }
    
    _templateVagasDisponiveis(totalVagas, vagasOcupadas) {
        const vagasDisponiveis = [];
        
        // Supondo que temos 50 vagas no total
        for (let i = 1; i <= totalVagas; i++) {
            if (!vagasOcupadas.some(vaga => vaga.numeroVaga == i)) {
                vagasDisponiveis.push(i);
            }
        }
        
        if (vagasDisponiveis.length === 0) {
            return `<p>Não há vagas disponíveis no momento.</p>`;
        }
        
        return `
            <div class="vagas-grid">
                ${vagasDisponiveis.map(vaga => `
                    <div class="vaga-item vaga-disponivel">
                        <span>Vaga ${vaga}</span>
                        <a href="cadastro.html?vaga=${vaga}" class="btn btn-primary">Reservar</a>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    updateVagasDisponiveis(totalVagas, vagasOcupadas) {
        document.getElementById('lista-vagas-disponiveis').innerHTML = 
            this._templateVagasDisponiveis(totalVagas, vagasOcupadas);
    }
}