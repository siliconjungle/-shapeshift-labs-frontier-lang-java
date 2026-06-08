import type {
  JavaAstNativeImporterAdapterOptions,
  NativeImporterAdapter,
  NativeImporterAdapterImportResult,
  NativeImportLanguageProfile,
  SemanticImportSidecar,
  SemanticImportSidecarOptions,
  UniversalCapabilityMatrix,
  UniversalCapabilityMatrixOptions
} from '@shapeshift-labs/frontier-lang-compiler';

export declare const JavaSourceLanguage: 'java';
export declare const JavaParser: 'javac';
export declare const JavaParserAstFormat: 'java-ast';
export declare const JavaSupportedExtensions: readonly string[];

export interface JavaLanguagePackageMetadata {
  readonly packageName: '@shapeshift-labs/frontier-lang-java';
  readonly version: '0.1.10';
  readonly sourceLanguage: 'java';
  readonly parser: 'javac';
  readonly parserAstFormat: 'java-ast';
  readonly supportedExtensions: readonly string[];
  readonly compilerPackage: '@shapeshift-labs/frontier-lang-compiler';
  readonly compilerVersion: '0.2.68';
}

export declare const JavaLanguagePackage: JavaLanguagePackageMetadata;
export declare const JavaCapabilityLanguageProfiles: readonly NativeImportLanguageProfile[];

export { createJavaAstNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export interface JavaSourceImportInput {
  readonly sourceText?: string;
  readonly sourcePath?: string;
  readonly sourceHash?: string;
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly adapter?: NativeImporterAdapter;
  readonly importerOptions?: JavaAstNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
  readonly evidence?: readonly unknown[];
  readonly metadata?: Record<string, unknown>;
  readonly ast?: unknown;
  readonly compilationUnit?: unknown;
  readonly unit?: unknown;
  readonly sourceFile?: unknown;
}

export interface JavaSourceImportOptions {
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly importerOptions?: JavaAstNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
}

export interface JavaSemanticImportSidecarOptions extends JavaSourceImportOptions {
  readonly sidecarOptions?: SemanticImportSidecarOptions;
  readonly id?: string;
  readonly generatedAt?: number;
  readonly regionPrefix?: string;
}

export interface JavaLanguageCapabilityMatrixOptions extends UniversalCapabilityMatrixOptions {
  readonly importerOptions?: JavaAstNativeImporterAdapterOptions;
}

export declare function createJavaNativeImporterAdapter(options?: JavaAstNativeImporterAdapterOptions): NativeImporterAdapter;
export declare function createJavaLanguageCapabilityMatrix(options?: JavaLanguageCapabilityMatrixOptions): UniversalCapabilityMatrix;
export declare function importJavaSource(input?: JavaSourceImportInput, options?: JavaSourceImportOptions): Promise<NativeImporterAdapterImportResult>;
export declare function createJavaSemanticImportSidecar(input?: JavaSourceImportInput, options?: JavaSemanticImportSidecarOptions): Promise<SemanticImportSidecar>;
