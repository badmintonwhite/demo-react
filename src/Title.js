import React from "react";

export default function Title({ maintitle, subtitle }) {
  return (
    <h1
      style={{
        textAlign: "center",
      }}
    >
      {maintitle}
      {subtitle}
    </h1>
  );
}
