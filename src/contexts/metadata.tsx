import ContextFactory from "./utils";

interface IMetadataContext {
  author: string;
  githubUrl: string;
}

export const [useMetadata, MetadataProvider] = ContextFactory<IMetadataContext>();
