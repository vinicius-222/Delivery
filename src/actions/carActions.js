import useSalatoDeliveryAPI from '../useSalatoDeliveryAPI';

const API = useSalatoDeliveryAPI(props);
export const getCarCompra =  (jwt) => {
    return(dispatch) =>{
        
        //const json = API.getCarCompra(jwt)
        //console.log(json);
        /*dispatch({
            type:'SET_LISTCARCOMPRA',
                payload:{
                    ListCarCompra:json
                }
        })*/

    }
}