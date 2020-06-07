import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingArea = styled.View`
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    opacity:0.5;
    justify-content:center;
    align-items:center;
    background-color:${props=>props.background};
`;

const Loading = (props) =>{
    return(
        <LoadingArea background={props.background ? props.background : 'transparent'}>
            <ActivityIndicator  size="large" color="#CCC"/>
        </LoadingArea>
    )
}

export default Loading;