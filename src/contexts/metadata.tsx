import {createContext, useContext} from "react";

interface IMetadataContext {
  author: string;
  githubUrl: string;
}

const MetadataContext = createContext<IMetadataContext | null>(null);

export function useMetadata() {
  return useContext(MetadataContext);
}

export default MetadataContext;
