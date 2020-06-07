const initialState = {
    IdProduto:'',
    NmProduto:'',
    VlProduto:0,
    LinkImage:'',
    DsProdutoSite:'',
    ListCarCompra:[],
    Endereco:'',
    QtProdutoCar:0,
    NmSearchProduto:'',
    ListProduto:[],
    Loading:false,
    RouteName:'Category',
    TpEntrega:'Entrega',
    VlTotalProduto:0,
    ListFormaDePagamento:[],
    ListProductsCategory:[],
    ListCategory:[],
    NmCategoria:'',
    IdCategoria:0
};

export default (state = initialState, action) => {
    let arr = state.ListCarCompra;
    switch(action.type) {
        case 'SET_IDPRODUTO':
            return { ...state, IdProduto:action.payload.IdProduto };
            break;
        case 'SET_NMPRODUTO':
            return { ...state, NmProduto:action.payload.NmProduto};
            break;
        case 'SET_VLPRODUTO':
            return { ...state, VlProduto:action.payload.VlProduto};
            break;
        case 'SET_LINKIMAGE':
            return { ...state, LinkImage:action.payload.LinkImage};
            break;
        case 'SET_DSPRODUTOSITE':
            return { ...state, DsProdutoSite:action.payload.DsProdutoSite};
            break;
        case 'SET_LISTCARCOMPRA':
            return { ...state, ListCarCompra:action.payload.ListCarCompra};
            break;
        case 'CHANGE_LISTCARCOMPRA':
            arr[action.payload.ListCarCompra.key].QtPedida = action.payload.ListCarCompra.QtPedida;
            arr[action.payload.ListCarCompra.key].VlTotal = action.payload.ListCarCompra.VlTotal;
            state.ListCarCompra = [];
            return { ...state, ListCarCompra:state.ListCarCompra.concat(arr)};
            break;
        case 'PUSH_LISTCARCOMPRA':
            return { ...state, ListCarCompra:state.ListCarCompra.concat(action.payload.ListCarCompra)};
            break;
        case 'DELETE_LISTCARCOMPRA':
            arr.splice(action.payload.ListCarCompra.key,1);
            state.ListCarCompra = [];
            return { ...state, ListCarCompra:state.ListCarCompra.concat(arr)};
            break;
        case 'INCREMENT_LISTCARCOMPRA':
            arr[action.payload.ListCarCompra.key].QtPedida++;
            arr[action.payload.ListCarCompra.key].VlTotal = arr[action.payload.ListCarCompra.key].VlUnitario  *  arr[action.payload.ListCarCompra.key].QtPedida;
            state.ListCarCompra = [];
            return { ...state, ListCarCompra:state.ListCarCompra.concat(arr)};
            break;
        case 'DECREMENT_LISTCARCOMPRA':
            arr[action.payload.ListCarCompra.key].QtPedida--;
            arr[action.payload.ListCarCompra.key].VlTotal = arr[action.payload.ListCarCompra.key].VlUnitario  *  arr[action.payload.ListCarCompra.key].QtPedida;
            state.ListCarCompra = [];
            return { ...state, ListCarCompra:state.ListCarCompra.concat(arr)};
            break;
        case 'SET_ENDERECO':
            return { ...state, Endereco:action.payload.Endereco};
            break;
        case 'SET_QTPRODUTOCAR':
            return { ...state, QtProdutoCar:action.payload.QtProdutoCar};
            break;
        case 'SET_NMSEARCHPRODUTO':
            return { ...state, NmSearchProduto:action.payload.NmSearchProduto};
            break;
        case 'SET_LISTPRODUTOS':
            return { ...state, ListProduto:action.payload.ListProduto};
            break;
        case 'SET_LOADING':
            return { ...state, Loading:action.payload.Loading};
            break;
        case 'SET_ROUTENAME':
            return { ...state, RouteName:action.payload.RouteName};
            break;
        case 'SET_TPENTREGA':
            return { ...state, TpEntrega:action.payload.TpEntrega};
            break;
        case 'SET_VLTOTALPRODUTOS':
            return { ...state, VlTotalProduto:action.payload.VlTotalProduto};
            break;
        case 'SET_LISTFORMADEPAGAMENTO':
            return { ...state, ListFormaDePagamento:action.payload.ListFormaDePagamento};
            break;
        case 'SET_LISTPRODUCTSCATEGORY':
            return { ...state, ListProductsCategory:action.payload.ListProductsCategory};
            break;
        case 'SET_LISTCATEGORY':
            return { ...state, ListCategory:action.payload.ListCategory};
            break;
        case 'SET_NMCATEGORIA':
            return { ...state, NmCategoria:action.payload.NmCategoria};
            break;
        case 'SET_IDCATEGORIA':
            return { ...state, IdCategoria:action.payload.IdCategoria};
            break;
    }

    return state;
}