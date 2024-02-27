export async function getAllContactTypes() {
  return [
    {
      value: "email",
      label: "E-mail",
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Por favor, ingrese un e-mail valido"
    },
    {
      value: "telefono",
      label: "Telefono",
      pattern: /^\d{11}$/,
      errorMessage: "Por favor, ingrese un numero de telefono valido"
    }
  ]
}

