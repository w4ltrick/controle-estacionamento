class EstacionamentoController {
    constructor() {
        // Inputs do formulário
        this._inputPlaca = document.getElementById('placa');
        this._inputProprietario = document.getElementById('proprietario');
        this._inputApartamento = document.getElementById('apartamento');
        this._inputBloco = document.getElementById('bloco');
        this._inputModelo = document.getElementById('modelo');
        this._inputCor = document.getElementById('cor');
        this._inputVaga = document.getElementById('vaga');

        // Elementos de mensagens e views
        this._mensagemElement = document.getElementById('mensagem');
        this._mensagemView = new MensagemView(this._mensagemElement);
        this._vagasRegistradasElement = document.getElementById('vagas-registradas');

        this._totalVagas = 50; // Total de vagas no estacionamento

        if (this._vagasRegistradasElement) {
            this._vagasView = new VagaView(this._vagasRegistradasElement);
        }

        this._init();
    }

    _init() {
        if (this._isPaginaListagem()) {
            this._carregarDadosIniciais();

            const btnVagasDisponiveis = document.getElementById('btn-vagas-disponiveis');
            if (btnVagasDisponiveis) {
                btnVagasDisponiveis.addEventListener('click', e => {
                    e.preventDefault();
                    this._toggleVagasDisponiveis();
                });
            }
        }

        const formCadastro = document.getElementById('form-cadastro');
        if (formCadastro) {
            formCadastro.addEventListener('submit', e => {
                e.preventDefault();
                this._cadastrarVaga();
            });

            // Preenche automaticamente o número da vaga se passado por URL
            const vagaParam = new URLSearchParams(window.location.search).get('vaga');
            if (vagaParam && this._inputVaga) {
                this._inputVaga.value = vagaParam;
            }
        }
    }

    _isPaginaListagem() {
        return window.location.pathname.includes('index.html') ||
               window.location.pathname === '/' ||
               window.location.pathname.endsWith('/');
    }

    _carregarDadosIniciais() {
        if (this._obterVagas().length === 0) {
            const dadosExemplo = [
                new Vaga('ABC-1234', 'Carlos Silva', 101, 'A', 'Toyota Corolla', 'Prata', 1),
                new Vaga('DEF-5678', 'Maria Oliveira', 203, 'B', 'Honda Civic', 'Preto', 2),
                new Vaga('GHI-9012', 'João Pereira', 305, 'C', 'Fiat Uno', 'Branco', 3),
                new Vaga('JKL-3456', 'Ana Santos', 402, 'A', 'Volkswagen Gol', 'Vermelho', 4),
                new Vaga('MNO-7890', 'Pedro Costa', 104, 'D', 'Chevrolet Onix', 'Azul', 5)
            ];
            localStorage.setItem('vagas', JSON.stringify(dadosExemplo));
        }
        this._atualizarTabelaVagas();
    }

    _obterVagas() {
        const vagasJSON = JSON.parse(localStorage.getItem('vagas')) || [];
        return vagasJSON.map(v => new Vaga(
            v._placa,
            v._proprietario,
            v._apartamento,
            v._bloco,
            v._modelo,
            v._cor,
            v._numeroVaga
        ));
    }

    _atualizarTabelaVagas() {
        if (this._vagasView) {
            const vagas = this._obterVagas();
            this._vagasView.update(vagas);
        }
    }

    _toggleVagasDisponiveis() {
        const vagasDisponiveisSection = document.getElementById('vagas-disponiveis-section');
        if (!vagasDisponiveisSection) return;

        const estaVisivel = vagasDisponiveisSection.style.display !== 'none';

        if (estaVisivel) {
            vagasDisponiveisSection.style.display = 'none';
        } else {
            vagasDisponiveisSection.style.display = 'block';
            const vagas = this._obterVagas();
            this._vagasView.updateVagasDisponiveis(this._totalVagas, vagas);
        }
    }

    _cadastrarVaga() {
        const vaga = new Vaga(
            this._inputPlaca.value.trim(),
            this._inputProprietario.value.trim(),
            parseInt(this._inputApartamento.value),
            this._inputBloco.value.trim(),
            this._inputModelo.value.trim(),
            this._inputCor.value.trim(),
            parseInt(this._inputVaga.value)
        );

        const vagas = this._obterVagas();
        const vagaExistente = vagas.find(v => v._numeroVaga == vaga.numeroVaga);

        if (vagaExistente) {
            this._mensagemView.update('Esta vaga já está ocupada. Por favor, escolha outra vaga.', 'erro');
            return;
        }

        vagas.push(vaga);
        localStorage.setItem('vagas', JSON.stringify(vagas));

        this._mensagemView.update('Reserva de vaga cadastrada com sucesso!', 'sucesso');
        alert('Reserva de vaga cadastrada com sucesso!');
        document.getElementById('form-cadastro').reset();
    }

    removerVaga(numeroVaga) {
        if (confirm('Tem certeza que deseja remover esta reserva de vaga?')) {
            let vagas = this._obterVagas();
            vagas = vagas.filter(vaga => vaga._numeroVaga != numeroVaga);

            localStorage.setItem('vagas', JSON.stringify(vagas));
            this._atualizarTabelaVagas();
            this._mensagemView.update('Reserva de vaga removida com sucesso!', 'sucesso');
        }
    }
}
