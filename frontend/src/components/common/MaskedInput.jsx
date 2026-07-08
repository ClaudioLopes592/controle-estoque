function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function aplicarMascara(tipo, valor) {
  const numeros = somenteNumeros(valor);

  switch (tipo) {
    case "cpf":
      return numeros
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2")
        .substring(0, 14);

    case "cnpj":
      return numeros
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .substring(0, 18);

    case "cpf_cnpj":
      if (numeros.length <= 11) {
        return aplicarMascara("cpf", numeros);
      }

      return aplicarMascara("cnpj", numeros);

    case "telefone":
      if (numeros.length <= 10) {
        return numeros
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2")
          .substring(0, 14);
      }

      return numeros
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);

    case "cep":
      return numeros.replace(/^(\d{5})(\d)/, "$1-$2").substring(0, 9);

    default:
      return valor;
  }
}

export default function MaskedInput({
  value,

  onChange,

  mascara,

  className = "form-control",

  placeholder = "",
}) {
  function alterar(e) {
    const valor = aplicarMascara(
      mascara,

      e.target.value,
    );

    onChange(valor);
  }

  return (
    <input
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={alterar}
    />
  );
}
