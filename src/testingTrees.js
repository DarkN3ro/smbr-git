import * as fsTree from '@hexlet/immutable-fs-trees';
import _ from 'lodash';
import path from 'path';

/*const tree = fsTree.mkdir('/', [
    fsTree.mkdir('src', [
        fsTree.mkfile('bashrec'),
        fsTree.mkfile('consul.cfg'),
    ]),
    fsTree.mkfile('hexletrc'),
    fsTree.mkdir('bin', [
        fsTree.mkfile('ls'),
        fsTree.mkfile('cat'),
    ]),
]);
//console.log(tree);
*/
/*const dfs = (tree) => {
    console.log(fsTree.getName(tree));
    if(fsTree.isFile(tree)) {
        return;
    }
    const children = fsTree.getChildren(tree);
    children.forEach(dfs);
};
dfs(tree); */

/*const chandeOwner = (tree, owner) => {
    const name = fsTree.getName(tree);
    const newMeta = _.cloneDeep(fsTree.getMeta(tree));
    newMeta.owner = owner;
    if (fsTree.isFile(tree) && (name.charAt(0) === 'c')) {
            console.log(fsTree.mkfile(name, newMeta));
            return fsTree.mkfile(name, newMeta)
    }
    const children = fsTree.getChildren(tree);

    const newChildren = children.map((child) => chandeOwner(child, owner));
    const newTree = fsTree.mkdir(name, newChildren, newMeta);
    return newTree;
};
chandeOwner(tree, 'owner');
*/

//--------

/*const tree = fsTree.mkdir('/', [
    fsTree.mkdir('src', [
        fsTree.mkfile('bashrc'),
        fsTree.mkfile('consul.cfg'),
    ]),
    fsTree.mkfile('hexletrc'),
    fsTree.mkdir('bin', [
        fsTree.mkfile('ls'),
        fsTree.mkfile('cat'),
    ]),
]);
console.log(tree);

const getNodesCount = (tree) => {
if (fsTree.isFile(tree)) {
    return 1;
}

const children = fsTree.getChildren(tree);
const getCoin = children.map(getNodesCount);
//console.log(getCoin);  
return 1 + _.sum(getCoin);
};

//getNodesCount(tree);

console.log(getNodesCount(tree)); */

//---------

/*const tree = fsTree.mkdir('/', [
    fsTree.mkdir('src', [
        fsTree.mkdir('apache'),
        fsTree.mkdir('nginx', [
          fsTree.mkfile('nginx.conf', {size: 800}),
        ]),
        fsTree.mkdir('consul', [
          fsTree.mkfile('config.json', {size: 1200}),
          fsTree.mkfile('data', {size: 8200}),
          fsTree.mkfile('raft', {size: 80}),
        ]),
    ]),
      fsTree.mkfile('hosts', {size: 3500}),
      fsTree.mkfile('resolve', { size: 1000}),
]);

const getWeightFiles = (tree) => {
const newMeta = fsTree.getMeta(tree);
if (fsTree.isFile(tree)) {
    console.log(newMeta.size);
    return newMeta.size;
}
const children = fsTree.getChildren(tree);
const getCoin = children.map(getWeightFiles);
return _.sum(getCoin);
};
console.log(getWeightFiles(tree));

const du = (tree) => {
const children = fsTree.getChildren(tree);
const result = [];
children.filter(fsTree.isDirectory)
result.push(children.map((child) => [fsTree.getName(child), getWeightFiles(child)]).sort(([, size1], [, size2]) => size2 - size1));
return result.flat();
};

console.log(du(tree));
console.log(du(fsTree.getChildren(tree)[0]));*/

const tree = fsTree.mkdir('/', [
    fsTree.mkdir('src', [
        fsTree.mkdir('apache'),
        fsTree.mkdir('nginx', [
          fsTree.mkfile('nginx.conf', {size: 800}),
        ]),
        fsTree.mkdir('consul', [
          fsTree.mkfile('config.json', {size: 1200}),
          fsTree.mkfile('data', {size: 8200}),
          fsTree.mkfile('raft', {size: 80}),
          fsTree.mkdir('back'),
        ]),
    ]),
      fsTree.mkdir('logs'),
      fsTree.mkfile('resolve', { size: 1000}),
]);

const findFilesByname = (tree, substr) => {
    let result = [];
    const iter = (node, acc) => {
        const name = fsTree.getName(node);
        const children = fsTree.getChildren(node);
        if (fsTree.isFile(node)) {
            const filePath = path.join(acc, name);
            if (name.includes(substr)) {
                return result.push(filePath);
            }
        } else {
            const newAcc = path.join(acc, name);
            children.forEach(child => iter(child, newAcc));
        }
    };
    iter(tree, '');
    return result;
};

console.log(findFilesByname(tree, 'so'));
