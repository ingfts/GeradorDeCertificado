function gerarCertificado() {
    const nome = document.getElementById('nome').value;
    const curso = document.getElementById('curso').value;
    const dataConclusao = document.getElementById('dataConclusao').value;
    const instituicao = document.getElementById('instituicao').value;
    const nomeDiretor = document.getElementById('nomeDiretor').value;

    const regex = /\d/;

    if (nome === "" || curso === "" || instituicao === "" || dataConclusao === "" || nomeDiretor === "") {
        alert("Campos obrigatórios não preenchidos");
    } else if (regex.test(nome) || regex.test(curso) || regex.test(instituicao) || regex.test(nomeDiretor)) {
        alert("Somente o campo 'Data de conclusão' pode ser numérico");
    } else {
        // Formatar a data no formato (dia, mês, ano)
        const dataFormatada = formatData(dataConclusao);

        const textoCertificado = `
            <div id="certificadoForm">
                <header>
                    <h1>CERTIFICADO</h1>
                    <p>Certificamos que ${nome} concluiu com sucesso o curso de ${curso} oferecido por</p>
                    <p>${instituicao} em ${dataFormatada}, demonstrando competência e dedicação no aprendizado.</p>
                </header>
                <footer>
                    <p id="rubricaDiretor">${nomeDiretor}</p>
                    <p id="diretorResponsavel">Diretor(a) responsável</p>
                </footer>
            </div>`;

        // Atualiza o HTML do elemento 'container'
        const certificadoForm = document.getElementById('container');
        certificadoForm.innerHTML = textoCertificado;

        const css = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                #certificadoForm {
                    width: 700px;
                    margin: 0 auto;
                    text-align: center;
                    padding: 50px;
                    border: 2px solid #735E59;
                    background-color: #fff;
                    font-family: 'Arial', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #735E59;

                }

                h1 {
                    font-size: 36px;
                    color: #735E59;
                    margin-bottom: 20px;
                    font-family: 'Arial', sans-serif;

                }

                p {
                    font-size: 25px;
                    color: #735E59;
                    margin-bottom: 10px;
                    font-family: 'Aguafina Script', cursive;
                    font-weight: 400;
                    font-style: normal;
                }

                #rubricaDiretor {
                    font-size: 24px;
                    font-weight: bold;
                    margin-top: 30px;
                    font-family: 'League Script', cursive;
                    font-weight: 400;
                    font-style: normal;
                }

                #diretorResponsavel {
                    font-size: 15px;
                    color: #735E59;
                    border-top: solid #735E59 2px;
                    font-family: 'Arial', sans-serif;
                    padding-top: 10px;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', css);

        // Configuração do PDF 
        const formatacao = {
            margin: [10, 10, 10, 10],
            filename: "meuCertificado.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };

        // Gerar o PDF a partir do elemento DOM certificadoForm
        html2pdf().set(formatacao).from(certificadoForm).save();
    }
}

function formatData(data) {
    const partesData = data.split('-'); 
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];

    // Formatação data: dia, mês, ano
    return `${dia} de ${mes} de ${ano}`;
}
