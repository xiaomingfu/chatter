import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graph/schema.ts",
  documents: ["../app/src/lib/graph/**/*.ts"],
  generates: {
    "src/graph/types.ts": {
      preset: "near-operation-file",
      presetConfig: { extension: ".generated.ts" },
      plugins: ["typescript", "typescript-resolvers"],
    },
    "../app/src/lib/graph/types.ts": {
      preset: "client",
      presetConfig: { extension: ".generated.ts" },
      plugins: ["typescript", "typescript-operations"],
    },
  },
};
export default config;
