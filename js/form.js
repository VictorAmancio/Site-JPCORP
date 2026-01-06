document.getElementById('formContato').addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('enviar.php', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(res => res.json())
    .then(data => {
        if (data.sucesso) {
            alert('Mensagem enviada com sucesso!');
            this.reset();
        } else {
            alert(data.erro || 'Erro ao enviar');
        }
    })
    .catch(() => {
        alert('Erro de conexão');
    });
});
