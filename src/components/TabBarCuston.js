import React, { useEffect } from 'react';
import styled from 'styled-components/native';

const Safe =  styled.SafeAreaView`
    height:80px;;
`;
const Container = styled.View`
    background-color:#FFF;
    flex:1;
    flex-direction:row;
`;
const Texto = styled.Text`

`;

const CustonTabBarButton = styled.TouchableOpacity`
    flex:1;
    justify-content:center;
    align-items:center;
    
`;


const TabBarCuston = (props) =>{
   
    return(
        <Safe>
            <Container>
                {props.items.map((i,k)=>{
                    return(
                        <CustonTabBarButton key={k} onPress={()=>props.navigation.navigate(i.route)}>
                            <Texto>{i.text}</Texto>
                        </CustonTabBarButton>
                    )
                })}
            </Container>
        </Safe>
    )
}
export default TabBarCuston;