function Pessoas() {
  async function cadastrarPessoa(formData) {
    const nome = formData.get("nome");
    const email = formData.get("email");

    try {
        const response = await fetch("http://localhost:3000/pessoas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                email
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Usuário ${nome} cadastrado com sucesso!`);
        }
        else {
            alert("Não foi possível executar a operação");
        }
    }
    catch(exception) {
        alert("Não foi possível executar a operação");
    }
  }

  return (
    <div className="sobre-nos">
      <h1>Cadastro de pessoa</h1>

      <form action={cadastrarPessoa}>
        <input name="nome" placeholder="Nome" />
        <input name="email" placeholder="Email"/>

        <button class="btn-primary" type="submit">Enviar</button>
      </form>
    </div> 
  );
}

export default Pessoas;