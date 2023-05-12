import React from "react";

import { Container } from "./styles";

interface Props {
  active?: boolean;
}

function Bullet({ active = false }: Props) {
  return <Container active={active} />;
}

export default Bullet;
