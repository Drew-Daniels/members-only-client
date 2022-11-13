import ContextFactory from "./utils";

interface MetadataContext {
  title: string;
  author: string;
  githubUrl: string;
}

export const [useMetadata, MetadataProvider] = ContextFactory<MetadataContext>();
