export const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  export const rgMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{1})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  export const CEPMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  export const TELMask = value =>{
    return value
      .replace(/\D/g,'') 
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})\d+?$/, '$1')
  }

  export const CELMask = value =>{
    return value
      .replace(/\D/g,'') 
      .replace(/(\d{2})(\d)/,'($1) $2')
      .replace(/(\9)(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})\d+?$/, '$1')
  }

  export const MoneyMask = value => {
    let t =  value;
    t = t.replace(/[\D]+/g,'');
    t = t.replace(/([0-9]{2})$/g, ".$1");
    if (t.length > 6){
      t = t.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1.$2");
    }
    return t
  }

  export const RemoveSinaisGraficos = value => {
    return value
      .replace(/(\.)(\d)/g, '$2')
      .replace(/(\-)(\d)/g, '$2')
      .replace(/(\s)(\d)/g, '$2')
      .replace(/(\()(\d)/g, '$2')
      .replace(/(\))(\d)/g, '$2')
  }