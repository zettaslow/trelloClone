import React from "react"
import { CardContainer } from "./styles"

export interface CardProps {
    text: string
    index: number // So far, the book forgot to mention this was needed as a prop to the Card component.
}

export const Card = ({ text }: CardProps) => {
    return <CardContainer>{text}</CardContainer>
};