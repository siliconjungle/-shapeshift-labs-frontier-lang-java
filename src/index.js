import {
  NativeImportLanguageProfiles,
  createJavaAstNativeImporterAdapter,
  createSemanticImportSidecar,
  createUniversalCapabilityMatrix,
  runNativeImporterAdapter
} from '@shapeshift-labs/frontier-lang-compiler';

export const JavaSourceLanguage = 'java';
export const JavaParser = 'javac';
export const JavaParserAstFormat = 'java-ast';
export const JavaSupportedExtensions = Object.freeze(['.java']);

export const JavaLanguagePackage = Object.freeze({
  packageName: '@shapeshift-labs/frontier-lang-java',
  version: '0.1.6',
  sourceLanguage: JavaSourceLanguage,
  parser: JavaParser,
  parserAstFormat: JavaParserAstFormat,
  supportedExtensions: JavaSupportedExtensions,
  compilerPackage: '@shapeshift-labs/frontier-lang-compiler',
  compilerVersion: '0.2.47'
});

export const JavaCapabilityLanguageProfiles = Object.freeze(
  NativeImportLanguageProfiles.filter((profile) => profile.language === JavaSourceLanguage)
);

export { createJavaAstNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export function createJavaNativeImporterAdapter(options = {}) {
  return createJavaAstNativeImporterAdapter(options);
}

export function createJavaLanguageCapabilityMatrix(options = {}) {
  const languages = options.languages ?? JavaCapabilityLanguageProfiles;
  const adapters = options.adapters ?? [createJavaNativeImporterAdapter(options.importerOptions ?? {})];
  return createUniversalCapabilityMatrix({ ...options, languages, adapters });
}

function mergeAdapterOptions(input = {}, options = {}) {
  const adapterOptions = {
    ...(options.adapterOptions ?? {}),
    ...(input.adapterOptions ?? {})
  };
  for (const alias of ['ast', 'compilationUnit', 'unit', 'sourceFile']) {
    if (Object.prototype.hasOwnProperty.call(input, alias)) {
      adapterOptions[alias] = input[alias];
    }
  }
  return adapterOptions;
}

function pickSidecarOptions(options = {}) {
  if (options.sidecarOptions) {
    return options.sidecarOptions;
  }
  const picked = {};
  for (const key of ['id', 'generatedAt', 'regionPrefix']) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      picked[key] = options[key];
    }
  }
  return picked;
}

export async function importJavaSource(input = {}, options = {}) {
  const importerOptions = {
    ...(options.importerOptions ?? {}),
    ...(input.importerOptions ?? {})
  };
  const adapter = input.adapter ?? createJavaNativeImporterAdapter(importerOptions);
  return runNativeImporterAdapter(adapter, {
    sourceText: input.sourceText ?? '',
    sourcePath: input.sourcePath,
    sourceHash: input.sourceHash,
    language: input.language ?? options.language ?? JavaSourceLanguage,
    parser: input.parser ?? options.parser ?? JavaParser,
    parserVersion: input.parserVersion ?? options.parserVersion,
    adapterOptions: mergeAdapterOptions(input, options),
    adapterMetadata: {
      packageName: JavaLanguagePackage.packageName,
      ...(options.adapterMetadata ?? {}),
      ...(input.adapterMetadata ?? {})
    },
    evidence: input.evidence,
    metadata: input.metadata
  });
}

export async function createJavaSemanticImportSidecar(input = {}, options = {}) {
  const importResult = await importJavaSource(input, options);
  return createSemanticImportSidecar(importResult, pickSidecarOptions(options));
}
