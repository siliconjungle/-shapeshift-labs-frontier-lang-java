import assert from 'node:assert/strict';
import { importJavaSource, createJavaSemanticImportSidecar } from '../dist/index.js';

for (let i = 0; i < 40; i += 1) {
  const ast = {
    kind: 'CompilationUnit',
    types: [{ kind: 'ClassDeclaration', name: { identifier: `Todo${i}` }, members: [{ kind: 'MethodDeclaration', name: { identifier: `addTodo${i}` }, type: { name: 'void' }, parameters: [] }] }]
  };
  const imported = await importJavaSource({
    sourcePath: `src/Todo${i}.java`,
    sourceText: `package demo; public class Todo${i} { public void addTodo${i}() {} }`,
    ast
  });
  assert.equal(imported.metadata.astFormat, 'java-ast');
  assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === `addTodo${i}`), true);
  const sidecar = await createJavaSemanticImportSidecar({
    sourcePath: `src/Todo${i}.java`,
    sourceText: `package demo; public class Todo${i} { public void addTodo${i}() {} }`,
    ast
  }, { id: `java-fuzz-${i}` });
  assert.equal(sidecar.imports.length, 1);
}

console.log('@shapeshift-labs/frontier-lang-java fuzz ok');
