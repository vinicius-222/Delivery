const initialState = {
    jwt:'',
    name:'',
    hash:'',
    infoUsuario:[],
    infoLojas:[]
};

export default (state = initialState, action) => {
    //let infoUsuario = [...state.infoUsuario];

    switch(action.type) {
        case 'SET_NAME':
            return { ...state, name:action.payload.name };
            break;
        case 'SET_JWT':
            return { ...state, jwt:action.payload.jwt};
            break;
        case 'SET_HASH':
            return { ...state, hash:action.payload.hash};
            break;
       /* case 'SET_NMPESSOA':
            infoUsuario[0].NmPessoa = action.payload.NmPessoa;
            return { ...state, infoUsuario};
            break;
        case 'SET_CPF':
            infoUsuario[0].CdCPF_CNPJ = action.payload.CdCPF_CNPJ;
            return {...state, infoUsuario};
            break;
        case 'SET_RG':
            infoUsuario[0].NrIdentidade = action.payload.NrIdentidade;
            return {...state, infoUsuario};
            break;
        case 'SET_DTNASCIMENTO':
            infoUsuario[0].DtNascimento = action.payload.DtNascimento;
            return {...state, infoUsuario};
            break;
        case 'SET_TPESTADOCIVIL':
            infoUsuario[0].TpEstadoCivil = action.payload.TpEstadoCivil;
            return {...state, infoUsuario};
            break;
        case 'SET_TPSEXO':
            infoUsuario[0].TpSexo = action.payload.TpSexo;
            return {...state, infoUsuario};
            break;
        case 'SET_DSTELEFONECOBRANCA':
            nfoUsuario[0].DsTeleFoneCobranca = action.payload.DsTeleFoneCobranca;
            return {...state, infoUsuario};
            break;*/
        case 'SET_INFOUSUARIO':
            return{...state, infoUsuario:action.payload.infoUsuario};
            break;
        case 'SET_INFOLOJAS':
            return{...state, infoLojas:action.payload.infoLojas};
            break;
    }
   
    return state;
}