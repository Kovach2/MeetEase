import React from 'react'
import { Toaster } from "react-hot-toast";

export default function MyToaster() {
  return (
    <Toaster
        position={"bottom-center"}
        toastOptions={{
            duration: 3500,
            style:{
                background: "#FCEDB2",
                color: "#000000",
                fontFamily: "robotoBlack",
                textAlign: "center",
                paddingTop: "10px",
                paddingBottom: "10px"
            }
        }}
    />
  )
}
