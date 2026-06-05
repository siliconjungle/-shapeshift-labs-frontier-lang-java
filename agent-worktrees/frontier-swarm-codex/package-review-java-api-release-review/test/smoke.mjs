import assert from 'node:assert/strict';
import {
  JavaLanguagePackage,
  JavaParserAstFormat,
  JavaSourceLanguage,
  createJavaNativeImporterAdapter,
  importJavaSource,
  createJavaSemanticImportSidecar
} from '../dist/index.js';

const ast = {
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
};

const adapter = createJavaNativeImporterAdapter();
assert.equal(adapter.language, JavaSourceLanguage);
assert.equal(JavaLanguagePackage.parserAstFormat, JavaParserAstFormat);

const imported = await importJavaSource({
  sourcePath: 'src/Todo.java',
  sourceText: "package demo;\npublic class Todo { public void addTodo(String title) {} }\n",
  ast
});

assert.equal(imported.adapter.parser, 'javac');
assert.equal(imported.metadata.astFormat, 'java-ast');
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'addTodo' && symbol.kind === 'method'), true);
assert.equal(imported.metadata.nativeImportLossSummary.exactAst, true);

const sidecar = await createJavaSemanticImportSidecar({
  sourcePath: 'src/Todo.java',
  sourceText: "package demo;\npublic class Todo { public void addTodo(String title) {} }\n",
  ast
}, { id: 'java-sidecar', regionPrefix: 'java' });

assert.equal(sidecar.id, 'java-sidecar');
assert.equal(sidecar.symbols.some((symbol) => symbol.name === 'addTodo'), true);
console.log('@shapeshift-labs/frontier-lang-java smoke ok');
