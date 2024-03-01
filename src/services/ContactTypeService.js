let contactTypes = [

  {
    value: "telefono",
    label: "Telefono",
    pattern: {
      value: /^\d{11}$/,
      message: "Por favor, ingrese un numero de telefono valido de no mas de 11 digitos."
    },
    required: {value: true, message: "Por favor, ingrese un numero de telefono.",}
  },
  {
    value: "email",
    label: "E-mail",

    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Por favor, ingrese un e-mail valido."
    },

    required: {
      value: true,
      message: "Por favor, ingrese un e-mail."
    }

  }

]

export async function getAllContactTypes() {
  return contactTypes
}

export function getContactTypeByValue(value) {
  let contact = contactTypes.find(c => c.value == value);
  return contact
}


