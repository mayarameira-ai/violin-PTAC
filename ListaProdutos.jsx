import { useEffect, useState } from "react";

const URL_API = "http://localhost:3000/produtos";

export default function ListaProdutos() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(URL_API);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados = await resposta.json();
        setItens(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro ao carregar: {erro}</p>;
  if (itens.length === 0) return <p>Nenhum item encontrado.</p>;

  return (
    <ul>
      {itens.map((item) => (
        <li key={item._id ?? item.id}>
          {item.produto} - R$ {item.preco}
        </li>
      ))}
    </ul>
  );
}
