class Vaga {
    constructor(placa, proprietario, apartamento, bloco, modelo, cor, numeroVaga) {
        this._placa = placa;
        this._proprietario = proprietario;
        this._apartamento = apartamento;
        this._bloco = bloco;
        this._modelo = modelo;
        this._cor = cor;
        this._numeroVaga = numeroVaga;
        this._data = new Date();
    }
    
    get placa() {
        return this._placa;
    }
    
    get proprietario() {
        return this._proprietario;
    }
    
    get apartamento() {
        return this._apartamento;
    }
    
    get bloco() {
        return this._bloco;
    }
    
    get modelo() {
        return this._modelo;
    }
    
    get cor() {
        return this._cor;
    }
    
    get numeroVaga() {
        return this._numeroVaga;
    }
    
    get data() {
        return new Date(this._data.getTime());
    }
}