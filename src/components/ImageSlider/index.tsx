import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";
import Bullet from "../Bullet";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  const snapToInterval = useRef(0);

  const handleLayout = (event: any) => {
    snapToInterval.current = event.nativeEvent.layout.width;
  };

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={item.id} active={imageIndex === index} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper onLayout={handleLayout}>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
        snapToInterval={snapToInterval.current}
        decelerationRate="fast"
      />
    </Container>
  );
}

export default ImageSlider;
