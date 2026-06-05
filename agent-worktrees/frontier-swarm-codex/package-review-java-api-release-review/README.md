# @shapeshift-labs/frontier-lang-java

Java source-language importer package for Frontier Lang semantic source documents.

Wraps the compiler Java AST native importer with package-level metadata, import helpers, and semantic sidecar generation for javac/JDT/JavaParser-shaped ASTs.

## Usage

```js
import { importJavaSource, createJavaSemanticImportSidecar } from '@shapeshift-labs/frontier-lang-java';

const imported = await importJavaSource({
  sourcePath: 'src/Todo.java',
  sourceText: "package demo;\npublic class Todo { public void addTodo(String title) {} }\n",
  ast: {
    kind: 'CompilationUnit',
    types: [{
      kind: 'ClassDeclaration',
      name: { identifier: 'Todo' },
      members: [{
        kind: 'MethodDeclaration',
        name: { identifier: 'addTodo' },
        type: { name: 'void' },
        parameters: [{ kind: 'Parameter', name: { identifier: 'title' }, type: { name: 'String' } }]
      }]
    }]
  }
});

const sidecar = await createJavaSemanticImportSidecar({
  sourcePath: 'src/Todo.java',
  sourceText: "package demo;\npublic class Todo { public void addTodo(String title) {} }\n",
  ast: {
    kind: 'CompilationUnit',
    types: [{
      kind: 'ClassDeclaration',
      name: { identifier: 'Todo' },
      members: [{
        kind: 'MethodDeclaration',
        name: { identifier: 'addTodo' },
        type: { name: 'void' },
        parameters: [{ kind: 'Parameter', name: { identifier: 'title' }, type: { name: 'String' } }]
      }]
    }]
  }
});

console.log(imported.metadata.astFormat);
console.log(sidecar.symbols.map((symbol) => symbol.name));
```

This package expects a caller-owned parser AST, parser module, or parser function. It records exact-parser-AST metadata and semantic sidecars for merge review; it does not claim full type, build-system, macro, generator, or runtime semantics unless those are provided as evidence.

## API

- `createJavaNativeImporterAdapter(options)`: create the package-level native importer adapter.
- `importJavaSource(input, options)`: import source plus a native AST into a Frontier native import result.
- `createJavaSemanticImportSidecar(input, options)`: import source and return a semantic import sidecar suitable for swarm merge evidence.
- `JavaLanguagePackage`: package metadata for release-train and coordinator tooling.

## Benchmarks

Run the package-local benchmark with:

```sh
npm run bench
```

These measurements exercise only this package's importer wrapper and semantic sidecar helpers.
