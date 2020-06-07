import qs from 'qs';
import { StackActions, NavigationActions } from 'react-navigation';
import { SignOut } from './helpers/AuthHandler';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { MapsAPI } from './config';

//const URL = 'http://192.168.1.65';
const URL = 'http://138.99.15.234:20003';
const BASEAPI = URL+'/backEndSalato/';
export const BASEAPIIMAGE = URL+'/images/';

const apiFetchFile = async (endpoint, body) => {
    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        body
    });
    const json = await res.json();

    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }
    return json;
}
const apiFetchPost = async (endpoint, body, props) => {

    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();
    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 

        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }

    return json;
}
const apiFetchPostSignin = async (endpoint, body, props) => {

    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    return json;
}
const apiFetchGet = async (endpoint, body = [], props) => {

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();
    
    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }
    return json;
}
const apiFetchGetEnd = async (endpoint, body = []) => {
   
    const res = await fetch(`${endpoint}`);
    const json = await res.json();

    return json;
}
const apiFetchDelete = async (endpoint, body = []) => {
    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body:JSON.stringify(body)
    });
    
    const json = await res.json();

    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        return (dispatch) =>{
            dispatch({
                type:'SET_JWT',
                    payload:{
                        jwt:''
                    }
            });
        }
    }
    return json;
}
const apiFetchPut = async (endpoint, body = [], props) => {
    /*if (body.jwt){
        let jwt = AsyncStorage.getItem('jwt');
        if(jwt) {
            body.jwt = jwt;
        }
    }

    if (body.hash){
        let hash = AsyncStorage.getItem('hash');
        if(hash) {
            body.hash = hash;
        }
    }*/

    const res = await fetch(BASEAPI+endpoint, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();
    if (json.error){
        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Login'})
            ]
        })); 
        
        SignOut();
    }

    return json;
} 
const useSalatoDeliveryAPI = (props) => ({    

    signin:async(email, pass) => {
       const json = await apiFetchPostSignin(
            '/user/getlogin',
            {email, pass},
            props
       )
       return json;
    },

    signup:async(NmPessoa, DsLogin, pass) => {
       const json = await apiFetchPostSignin(
           '/user/new_recordClient',
           {NmPessoa, DsLogin, pass},
           props
       )
       return json;
    },

    getRequestPrice:(distance) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:''
                };

                json.price = distance * 3;

                resolve(json);
            }, 1000);
        });
    },

    findDriver:(options) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:''
                };

                json.driver = {
                    name:'Gabriel Medina',
                    avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTD7KQgGrjEypO18u-rlm_-kSNnaSGXTH3dBTKV4jQVA72Qqizf',
                    stars:4,
                    carName:'Honda Civic',
                    carColor:'Branco',
                    carPlate:'AAA-0000'
                };

                resolve(json);
            }, 3000);
        });
    },

    setRating:(rating)=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:''
                };

                resolve(json);
            }, 1000);
        }); 
    },

    getCategoria:async (jwt, hash)=>{
        const json = await apiFetchGet(
            '/pedidos/getGrupoProduto',
            {jwt, hash}
        )
        return json;
    },

    getProdutoBanner:async (NmProduto, IdPreco, per_pages, StPaginaInicial, offset, idGrupoProduto, IdProduto) => {
        const json = await apiFetchGet(
            '/pedidos/getProdutoBanner',
            {NmProduto, IdPreco, per_pages, StPaginaInicial, offset, idGrupoProduto, IdProduto}
        )
        return json;
    },

    getCarCompra:async (jwt, hash) => {
        const json = await apiFetchGet(
            '/pedidos/getCarCompra',
            {jwt,hash},
            props
        )
        return json;
        
    },

    getGrupoProduto:async () => {
        const json = await apiFetchGet(
            '/pedidos/getGrupoProduto'
        )
        return json;
    },

    senEmail:async (NmPessoa, DsEmail, DsMsg, DsAssunto) => {
        const json = await apiFetchPost(
            '/user/sendemail',
            {NmPessoa, DsEmail, DsMsg, DsAssunto}
        )
        return json;
    },

    insertCarCompra:async (jwt, hash, IdProduto, QtProduto) => {
        const json = await apiFetchPost(
            '/pedidos/InsertCarCompras',
            {jwt, hash, IdProduto, QtProduto},
            props
        )
        return json;
    },

    deleteCarCompra:async (jwt,hash, IdProduto) => {
        const json = await apiFetchDelete(
            '/pedidos/deleteCarCompra',
            {jwt, hash, IdProduto},
            props
        )
        return json;
    },

    updateCarCompra:async (jwt, hash, IdProduto, QtProduto) => {
        const json = await apiFetchPut(
            '/pedidos/InsertCarCompras',
            {jwt, hash, IdProduto, QtProduto},
            props
        )

        return json;
    },

    getCountCar:async (jwt, hash) => {
        const json = await apiFetchGet(
            '/pedidos/InsertCarCompras',
            {jwt, hash},
            props
        )
        return json;
    },

    getEnderecoCEP:async (cep) => {
        const json = await apiFetchGetEnd(
            'http://cep.republicavirtual.com.br/web_cep.php?cep=' + cep +'&formato=json'
        )
        return json;
    },

    getEndereco:async (jwt) => {
        const json = await apiFetchGet(
            '/user/getEndereco',
            {"jwt":jwt}
        )
        return json;
    },

    getCode:async(TableName, FieldName) =>{
        const json = await apiFetchGet(
            '/pedidos/GetCode',
            {TableName,FieldName}
        )
        return json;
    },

    insertEndereco:async (jwt, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, TpEndereco = '', 
                          NmEndereco = '', DsPontoDeReferencia = '', NmDestinatario = '',Latitude, Longitude, Distancia, Tempo, Valor) => {
        const json = await apiFetchPost(
            '/user/insertEndereco',
            {jwt, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, TpEndereco, 
            NmEndereco, DsPontoDeReferencia, NmDestinatario, Latitude, Longitude, Distancia, Tempo, Valor},
            props
        )
        return json;
    },

    updateEndereco:async (jwt, IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega, 
                          TpEndereco = '', NmEndereco = '', DsPontoDeReferencia = '', NmDestinatario = '',
                          Latitude, Longitude, Distancia, Tempo, Valor) => {
        const json = await apiFetchPut(
            '/user/updateEndereco',
            {jwt, IdEndereco, DsLogradouro, DsBairro, DsCidade, NrNumero, DsCEP, CdUF, StEntrega, 
            TpEndereco, NmEndereco, DsPontoDeReferencia, NmDestinatario, Latitude, Longitude, Distancia, Tempo, Valor},
            props
        )
        
        return json;
    },

    updateStEndereco:async (jwt, IdEndereco, StEntrega) => {
        const json = await apiFetchPost(
            '/user/updateStEndereco',
            {jwt, IdEndereco, StEntrega},
            props
        )
        return json;
    },

    deleteEndereco:async (jwt, IdEndereco, hash) => {
        const json = await apiFetchDelete(
            '/user/delEndereco',
            {jwt, IdEndereco, hash}
        )
        return json;
    },

    getFormaDePagamento:async (jwt, hash) =>{
       const json = await apiFetchGet(
            '/pedidos/getFormaPagamento',
            {jwt,hash},
            props
       )
       return json;
    },

    getUsuario:async (jwt, hash) => {
        const json = await apiFetchGet(
            '/user/getUsuario',
            {jwt, hash},
            props
        )
        return json;
    },

    updatePass:async (jwt, hash, email, pass, newPass) =>{
        const json = await apiFetchPost(
            '/user/updatePass',
            {jwt, hash, email, pass, newPass},
            props
        )
        return json;
    },

    getCurrentLocation:async()=>{
        return new Promise((resolve, reject)=>{
            Geocoder.init(MapsAPI, {language:'pt-br'});
            Geolocation.getCurrentPosition(async(info) => {
                const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);
                const numero = geo.results[0].address_components[0].long_name;
                const Logradouro = geo.results[0].address_components[1].long_name;
                const Bairro = geo.results[0].address_components[2].long_name;
                const Cidade = geo.results[0].address_components[3].long_name;
                const UF = geo.results[0].address_components[4].short_name;
                const Pais = geo.results[0].address_components[5].short_name;
                const CEP = geo.results[0].address_components[6].short_name;
                const EnderecoActivo = `${Logradouro}, ${numero} - ${Bairro} , ${Cidade} / ${UF} - CEP:${CEP}`;

                resolve([Logradouro, numero, Bairro, Cidade, UF, CEP]);
            })
        })
    },

    getPositionEndereco:async(CdCEP)=>{
        const json = await Geocoder.from(CdCEP);
        return json.results[0]
    },

    getAreaEntrega:async()=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const end = [
                    {
                        latitude: -22.666489,
                        longitude: -43.039147
                    },
                    {
                        latitude: -22.671901,
                        longitude: -43.034527
                    },
                    {
                        latitude: -22.667332, 
                        longitude: -43.025091
                    },
                    {
                        latitude: -22.661063, 
                        longitude:-43.024608
                    },
                    {
                        latitude: -22.651241,
                        longitude:  -43.021947
                    },
                    {
                        latitude: -22.639438, 
                        longitude: -43.028127
                    },
                    {
                        latitude: -22.638408, 
                        longitude:  -43.033191
                    },
                    {
                        latitude: -22.646884,
                        longitude:  -43.043919
                    },
                    {
                        latitude: -22.651399,
                        longitude:  -43.051601
                    },
                    {
                        latitude:  -22.659558,
                        longitude:  -43.051430
                    }, 
                ]
                resolve (end);
            },500);
        })
    },

    getRequestPrice:async(Distnce) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                let VlDistanciaPadrao = 2.370;
                let Price = {
                    error:''
                };
                let p; 
                if (Distnce <= VlDistanciaPadrao){
                    Price.valor = 5.00;
                }else{
                    let r = Distnce - VlDistanciaPadrao;
                    p = 3 * r;
                    Price.valor = p + 5.00;
                }
                resolve(Price);
            },1000 )
        })
    },

    getLocationLoja:async() => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const loja = {
                    center:{ 
                        latitude: -22.657147932062127,
                        longitude:-43.03820516914129
                    },
                    zoom:14,
                    pitch:0,
                    altitude:0,
                    heading:0
                }
                resolve(loja);
            },500);
        })
    },
    
    sendPedidoDeVenda:async(IdPedidoDeVenda, CdChamada, DtPedido, DtEntrega, IdEmpresa, VlPedido,TpPedido, IdCondicaoPagamento, VlTotalPedido,itensPedido, DsObservacao, jwt) => {
        const json = await apiFetchPost(
            '/pedidovenda/sendPedidosDelivery',
            {
                "IdPedidoDeVenda":IdPedidoDeVenda,
                "CdChamada":CdChamada,
                "DtPedido":DtPedido,
                "DtEntrega":DtEntrega,
                "IdEmpresa":IdEmpresa,
                "VlPedido":VlPedido,
                "TpPedido":TpPedido,
                "IdCondicaoPagamento":IdCondicaoPagamento,
                "VlTotalPedido":VlTotalPedido,
                "itensPedido":itensPedido,
                "DsObservacao":DsObservacao,
                "jwt":jwt
            },
            props
        )
        return json;
    },

    getClienteDelivery:async (jwt,hash) =>{
        const json = await apiFetchGet(
            '/cliente/ClienteDelivery',
            {jwt,hash},
            props
        )
        return json;
    },
    
    updateClienteDelivery:async (jwt, hash , CdChamada, NmPessoa, CdCPF_CNPJ, DsTeleFoneCobranca, DsFaxCobranca, DtNascimento, TpEstadoCivil, NrIdentidade, TpSexo )=>{
        const json = await apiFetchPut(
            '/cliente/ClienteDelivery',
            {jwt, hash, CdChamada, NmPessoa, CdCPF_CNPJ, DsTeleFoneCobranca, DsFaxCobranca, DtNascimento, TpEstadoCivil, NrIdentidade, TpSexo},
            props
        
        )
        return json;
    },

    getPedidosDelivery:async(jwt, hash) =>{
        const json = await apiFetchGet(
            '/pedidovenda/getPedidosDelivery',
            {jwt, hash},
            props
        )
        return json;
    },

    insertRecuperaSenha:async(email) => {
        const json = await apiFetchPost(
            '/user/handleRecuperaSenha',
            {email}
        )
        return json;
    },
    
});

export default useSalatoDeliveryAPI;