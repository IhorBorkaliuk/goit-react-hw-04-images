import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { StyledApp } from "./AppStyled";
import { GlobalNormalize } from "./Styled/GlobalNormalize";
import { useState } from "react";


export function App () {

const [query, setQuery] = useState('')

 const updateQuery = () => {
setQuery(query)
 };

    return (
      <StyledApp>
        <SearchBar onSubmit={updateQuery} />
        <ImageGallery query={query} />
        <GlobalNormalize />
      </StyledApp>
    );
  }
