import {
  JavaLanguagePackage,
  createJavaNativeImporterAdapter,
  createJavaLanguageCapabilityMatrix,
  importJavaSource,
  createJavaSemanticImportSidecar
} from '../src/index.js';
import type {
  JavaLanguageCapabilityMatrixOptions,
  JavaSourceImportInput,
  JavaSourceImportOptions,
  JavaSemanticImportSidecarOptions
} from '../src/index.js';
import type { NativeImporterAdapter, UniversalCapabilityMatrix } from '@shapeshift-labs/frontier-lang-compiler';

const adapter: NativeImporterAdapter = createJavaNativeImporterAdapter();
const input: JavaSourceImportInput = { sourceText: '', ast: {} };
const options: JavaSourceImportOptions = { adapterOptions: {} };
const capabilityOptions: JavaLanguageCapabilityMatrixOptions = { targets: ['typescript'] };
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
const capability: UniversalCapabilityMatrix = createJavaLanguageCapabilityMatrix(capabilityOptions);

void adapter;
void input;
void options;
void capabilityOptions;
void capability;
void sidecarOptions;
void packageName;
void importJavaSource(input, options);
void createJavaSemanticImportSidecar(input, sidecarOptions);
