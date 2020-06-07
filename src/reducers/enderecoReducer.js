const initialState = {
    MeusEnderecos:[],
    EnderecoAtivo:[],
    GeoEndereco:[],
    visibleBalon:false,
    PolygonCordenates:[],
    MapCameraLocation:{}
}

export default (state = initialState, action) =>{
    
    switch(action.type){
        case 'SET_MEUSENDERECOS':
            return {...state, MeusEnderecos:action.payload.MeusEnderecos};
            break;
        case 'SET_ENDERECOATIVO':
            return {...state, EnderecoAtivo:action.payload.EnderecoAtivo};
            break;
        case 'SET_GEOENDERECO':
            return {...state, GeoEndereco:action.payload.GeoEndereco};
            break;
        case 'SET_POLYGONCORDENATES':
            return {...state, PolygonCordenates:action.payload.PolygonCordenates};
            break;
        case 'SET_MAPCAMERALOCATION':
            return {...state, MapCameraLocation:action.payload.MapCameraLocation};
            break;
        case 'SET_VISIBLEBALON':
            return {...state, visibleBalon:action.payload.visibleBalon};
            break;
    }   

    return state;
}