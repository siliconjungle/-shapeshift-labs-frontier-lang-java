import { performance } from 'node:perf_hooks';
import { importJavaSource } from '../dist/index.js';

const iterations = 100;
const started = performance.now();
let symbols = 0;
for (let i = 0; i < iterations; i += 1) {
  const ast = {
    kind: 'CompilationUnit',
    types: [{ kind: 'ClassDeclaration', name: { identifier: `Todo${i}` }, members: [{ kind: 'MethodDeclaration', name: { identifier: `addTodo${i}` }, type: { name: 'void' }, parameters: [] }] }]
  };
  const imported = await importJavaSource({
    sourcePath: `src/Todo${i}.java`,
    sourceText: `package demo; public class Todo${i} { public void addTodo${i}() {} }`,
    ast
  });
  symbols += imported.semanticIndex.symbols.length;
}
const elapsedMs = performance.now() - started;
console.log(JSON.stringify({
  package: '@shapeshift-labs/frontier-lang-java',
  iterations,
  elapsedMs: Number(elapsedMs.toFixed(3)),
  importsPerSecond: Number((iterations / (elapsedMs / 1000)).toFixed(2)),
  symbols
}, null, 2));
