import styles from "./HomePage.module.css"
import image from "../assets/waldo1.jpg"
import { useState } from "react";

export default function HomePage() {

    let offsetTop;
    let offsetLeft;

    function handleImageClick(e) {

        offsetTop = e.target.offsetTop;
        offsetLeft = e.target.offsetLeft;

        const pageX = e.clientX;
        const pageY = e.clientY;

        const x = pageX - offsetLeft;
        const y = pageY - offsetTop;

        console.log("x: ", x)
        console.log("y: ", y)
        console.log("pageX: ", pageX)
        console.log("pageY: ", pageY)

        // console.log(x, y)
        console.log(e)

        const dot = document.createElement("div");
        dot.style.borderRadius = "50%";
        dot.style.backgroundColor = "black";
        dot.style.width = "30px";
        dot.style.height = "30px";
        dot.style.position = "absolute";
        dot.style.left = `${pageX - 30 / 2}px`; // im placing the top left of the circle (div) so i need to half both the height and length that its been pushed away with so that its the middle, just like a circumference and a radius
        dot.style.top = `${pageY - 30 / 2}px`;
        e.target.offsetParent.appendChild(dot);
    };


    return (
        <div id={styles.wrapper}>
            <div id={styles.waldoImageContainer}>
                <img onClick={handleImageClick} src={image} alt="a where's waldo image" id={styles.waldoImage} />
            </div>
        </div>  
    )
};