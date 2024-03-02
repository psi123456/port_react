import React from "react";

//이미지 컴포넌트
function ImageComponent(props){
    const {src, altText, wid, hei} = props;
    return(
            <img src = {src} alt = {altText} width = {wid} heigth ={hei}/>
    ); // altText 이미지가 없을때 출력
}
export default ImageComponent;
