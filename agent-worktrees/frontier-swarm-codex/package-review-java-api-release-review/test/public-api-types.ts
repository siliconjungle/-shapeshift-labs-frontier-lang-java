import {
  JavaLanguagePackage,
  createJavaNativeImporterAdapter,
  importJavaSource,
  createJavaSemanticImportSidecar
} from '../src/index.js';
import type {
  JavaSourceImportInput,
  JavaSourceImportOptions,
  JavaSemanticImportSidecarOptions
} from '../src/index.js';
import type { NativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

const adapter: NativeImporterAdapter = createJavaNativeImporterAdapter();
const input: JavaSourceImportInput = { sourceText: '', ast: {} };
const options: JavaSourceImportOptions = { adapterOptions: {} };
const sidecarOptions: JavaSemanticImportSidecarOptions = {
  id: 'sidecar',
  generatedAt: 1710000000000,
  regionPrefix: 'src',
  sidecarOptions: {
    id: 'nested-sidecar',
    generatedAt: 1710000000001
  }
};
const packageName: '@shapeshift-labs/frontier-lang-java' = JavaLanguagePackage.packageName;

void adapter;
void input;
void options;
void sidecarOptions;
void packageName;
void importJavaSource(input, options);
void createJavaSemanticImportSidecar(input, sidecarOptions);
