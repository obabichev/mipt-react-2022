// Types
console.log()
console.log("---------------- Types ----------------")

// number
console.log()
console.log("-------- number --------")

console.log("typeof 1", typeof 1)
console.log("typeof 1.1", typeof 1.1)
console.log("typeof 1.1 / 2", typeof (1.1 / 2))
console.log("typeof 1.1 / 0", typeof (1.1 / 0))
console.log("1.1 / 0", 1.1 / 0)

// string
console.log()
console.log("-------- string --------")
console.log("Hallo world");
console.log('typeof "Hallo world"', typeof "Hallo world")

// boolean
console.log()
console.log("-------- boolean --------")
console.log(true, false);
console.log("typeof false", typeof false)

// null
console.log()
console.log("-------- null --------")
console.log(null);
console.log({a: null});
console.log("typeof null", typeof null)

// undefined
console.log()
console.log("-------- undefiend --------")
console.log(undefined)
console.log({a: undefined})
console.log("typeof undefined", typeof undefined)

// Object
console.log()
console.log("-------- Object --------")
const obj1 = {}
const obj2 = new Object()
console.log("typeof obj1", typeof obj1)
console.log("typeof []", typeof [])

// == and ===
console.log()
console.log("-------- == and === --------")
console.log("1 == '1'", 1 == '1')
console.log("1 === '1'", 1 === '1')
const value = 123;
console.log("value === 123", value == "123")

const obj = {}
obj.field = 123
// obj = {b: 100} // Error
console.log('[obabichev]', {obj});

// let and const (and var)
console.log()
console.log("-------- let and const (and var) --------")
let var1 = 123;
const var2 = 123;

// var2 = 456; // Error
var1 += 100;
console.log('[obabichev]', {var1});

// var vs let/const
console.log()
console.log("-------- var vs let/const --------")

if (true) {
    const abc = 123;
    console.log('[obabichev]', {abc});
}
if (true) {
    var abcd;
    var abcd;
    abcd = 123
    abcd = 456
    console.log('[obabichev]', {abcd});
}
console.log('[obabichev]', {abcd});

// let testRedefine; // Error
// let testRedefine; // Error

// const testConst; // Error
// testConst = 567; // Error

let a = 123;
if (true) {
    let b = 456;
    console.log('[obabichev]', {a});
}
// console.log('[obabichev]', {b}); // Error


// cast magic
console.log()
console.log("-------- Cast magic --------")

console.log({}.toString())
console.log("{} + {}", typeof ({} + {}))
console.log("[] + []", typeof ([] + []))
console.log("{} + []", {} + [])
console.log('[] + {}', [] + {})

// Destructuring
console.log()
console.log("---------------- Destructuring ----------------")

const obj3 = {
    field1: 10,
    field2: 20,
    nested: {
        field3: 30,
        field4: 40
    },
    field5: 50,
    field6: 60,
    field7: 70,
};

// const field1 = obj3.field1;
// const field2 = obj3.field2;
let {field1: field10, field2: field20, nested, ...rest} = obj3;
field10 = 1000;
console.log("field1", field10);
console.log("field2", field20);
// console.log("nested", nested);
// console.log("field3", field3);
nested.field5 = 50;
nested.field3 = nested.field3 + 100;
// nested.field3 += 100;
let valueFromNested = nested.field3;
valueFromNested += 1000;
console.log('[obabichev]', {valueFromNested});

// const rest = {}
// rest.field5 = obj3.field5
//     ...

obj3.field5 = null

console.log("obj3", obj3)
console.log("rest", rest);

// const rest = {
//     "field5": obj3.field5
// }

// Clone object
console.log()
console.log("-------- Clone object --------")

const obj4 = {
    field1: 10,
    nested: {
        field2: 20
    }
}

const {...cloneObj4} = obj4

obj4.field1 = 100;
obj4.nested.field2 = 200;

console.log("obj4", obj4)
console.log("cloneObj4", cloneObj4)


// Structuring
console.log()
console.log("-------- Structuring --------")

const field1 = 900;
const field2 = 1800;
const field3 = 2700;

const otherObject = {
    field1: 1,
    field5: 5,
    nested: {
        field6: 6,
        field7: 7,
        field1: "nested 1"
    }
}

const obj5 = {
    field1,
    field2,
    field3,
    newField1:
    field1,
    field1: "filed1",
    ...otherObject,
    nested: {
        ...otherObject.nested
    }
}
otherObject.nested.field1 += " CHANGED"
console.log('[obabichev] obj5', obj5);

// Change fields
console.log()
console.log("-------- Change fields vlaue --------")
const obj6 = {a: 10, b: 20}
const obj7 = {...obj6, b: 30}

// obj -> json -> obj
console.log()
console.log("-------- obj -> json -> obj --------")
const obj8 = {a: 1, b: 2}
const jsonObj8 = JSON.stringify(obj8)
console.log('[obabichev]', {jsonObj8});
const obj8FromJson = JSON.parse(jsonObj8);
console.log('[obabichev]', {obj8FromJson});
console.log('[obabichev] obj8FromJson === obj8', obj8FromJson === obj8);

console.log('[obabichev] {} === {}', {} === {});


// Arrays
console.log()
console.log("---------------- Arrays ----------------")

console.log('[obabichev]', {typeOfArray: typeof []});

const arr = [1, 2, 3, null, undefined, [1, 2, 3], {}]
console.log('[obabichev]', {arr});

arr.push("end 1")
arr.push("end 2")
console.log('[obabichev] arr.pop()', arr.pop());
console.log('[obabichev]', {arr});

console.log('[obabichev]', {length: arr.length});

arr[20] = "INDEX 20"
console.log('[obabichev]', {arr});
console.log('[obabichev]', {length: arr.length});
console.log('[obabichev] Object.keys(arr)', Object.keys(arr));
// console.log('[obabichev] arr[1000]', arr[1000]);


// Loops
console.log()
console.log("-------- loops --------")

// for (let i = 0; i < 10; i++) {
//     console.log('[obabichev]', {i});
// }

// while(true)
// do
//     console.log('[obabichev]', {});
// while (true)

// for in

for (let key in arr) {
    console.log('[obabichev]', {key});
}

for (let key of arr) {
    console.log('[obabichev]', {key});
}

label1: while (true) {
    for (let i = 0; i < 10; i++) {
        break label1;
    }
}

// For each
console.log()
console.log("-------- .forEach --------");

[1, 2, 3].forEach((item) => {
    console.log('[obabichev]', {item});
})

const mapped = [1, 2, 3].reverse()
    .map(element => element * 2)
    .map(element => element - 2)
    .filter(element => element > 0)
    .reduce((collector, element) => collector + element, 0)

console.log('[obabichev]', {mapped});


const originalArray = [1, 2, 3]
originalArray.reverse();
console.log('[obabichev]', {originalArray});

// Array destructure
console.log()
console.log("-------- Array destructuring --------")

const arr2 = [1, 2, 3, 4, 5]
const [el1, , el2, ...restArr] = arr2;
console.log('[obabichev]', {el1});
console.log('[obabichev]', {el2});
console.log('[obabichev]', {restArr});

const last = arr2[arr2.length - 1]
console.log('[obabichev]', {last});

const flattenArray = [1, 2, 3, ...[4, 5, 6, ...[7, 8, 9, ...[10, 11, 12]]]];
console.log('[obabichev]', {flattenArray});

const s = "qwe"
s[1] = "z"

console.log('[obabichev]', s);