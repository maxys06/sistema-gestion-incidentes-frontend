export default class TipoContacto {
  constructor(id, tipo, regexString, mensajeError) {
    this.idTipoContacto = id;
    this.tipo = tipo;
    this.regex = new RegExp(regexString);
    this.mensajeError = mensajeError;
  }
}