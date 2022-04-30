/**
 * Function declaration
 */

function func1() {
    console.log("Hello from func1()")
    func2()
}

function func1() { // Interesting, but we can redefine function
    console.log("Hello from func1() one more time")
}

func1()
func1 = 123;


function func2() {
    console.log("Hello from func2()")

    func3()

    function func3() {
        console.log("Hello from func3()")
    }
}

// func3() -- error


/**
 * Function expression
 */

// func5() --error

// function5() -- error

const func5 = function function5() {
    console.log("Hello from func5()")
}

// func5()

const abc = 123;
// abc() -- error


/**
 * Arrow functions
 */

// self callable function (must not be arrow function)
(() => {
    console.log('self callable function')
})()

const func6 = () => {
    console.log('Hello from func6()')
}

func6();


/**
 * Function arguments
 */

function func7(a, b, c) {
    console.log('[obabichev]', {a, b, c});
    return a + b + c
}

console.log('[obabichev] func7(1, 2, 3)', func7(1, 2, 3));
console.log('[obabichev] func7()', func7());
console.log('[obabichev] func7(1, 2, 3, 4)', func7(1, 2, 3, 4));

function func8(a, b, ...c) {
    console.log('[obabichev] func8', {a, b, c});
    console.log('[obabichev] func8', arguments); // arguments parameter is not accessible in arrow functions
}

// function func8(a) {} // There is not function overloading

func8(1, 2, 3, 4, 5, 6, 7)
func8(1)


/**
 * Context
 */

function func9() {
    console.log('[obabichev]', this);
}

/**
 * 1. Global object
 */
func9()

/**
 * 2. Invocation via dot
 */
const obj1 = {
    a: 1,
    b: 2,
    c: 3,
    field1: {
        d: 4,
        e: 5,
        func10: function () {
            console.log("obj1.func10()", this);
        },
        arrowFunc: () => {
            console.log("obj1.arrowFunc()", this);
            return this;
        }
    }
}

obj1.field1.func10()
obj1.field1.arrowFunc()

const _func10 = obj1.field1.func10;
_func10()
const _arrowFunc = obj1.field1.arrowFunc;
const resultArrowFunction = _arrowFunc();
console.log('[obabichev]', {resultArrowFunction});

const obj2 = {
    obj2: true,
    func11: _func10
}
obj2.func11()


/**
 * 3. Call via 'new' keyword (touching OOP)
 */

function CustomObject(a) {
    this.a = a
    console.log(this);

    return 123 // Makes sense only if called without new operator
}

const customObject = new CustomObject("a value");
console.log('[obabichev]', {customObject});

// CustomObject(123)

function manualConstructor(a) {
    const result = {}

    result.a = a

    return result;
}


/**
 * 4. call, apply, bind
 */

function func12(a, b, c) {
    console.log('[obabichev]', {a, b, c});
    console.log('[obabichev] func12()::this', this);
}

func12.apply({customContext: true}, [1, 3, 2])
func12.call({customContext: true}, 1, 3, 2)

const wrappedFunc12 = func12.bind({customBindContext: true})
wrappedFunc12()

const obj5 = {
    f: wrappedFunc12
}
obj5.f.call({changedContext: '123'}, 10, 20, 30)


/**
 * Small example of context binding
 */

const clicker = {
    listener: null,
    setListener(l) {
        this.listener = l
    },
    click() {
        this.listener()
    }
}

const counter = {
    amount: 0,
    handleClick: () => {
        console.log('[obabichev]arrow context', this);
        this.amount++
    }
}

clicker.setListener(counter.handleClick)
clicker.click()
console.log('[obabichev]', {counter});
console.log('[obabichev]', {clicker});

/**
 * Function as object
 */

function func20() {
    console.log('[obabichev]', {isItPossible: func20.anyField});
}

func20()
func20.anyField = 123;
func20()

function wrapperAnyField(f) {
    console.log('[obabichev]', {isItPossible: f.anyField});
}

wrapperAnyField(func20)


/**
 * Check context of arrow function
 */

function checkContext() {

    const arrowFunction = () => {
        console.log(this)
    }
    // arrowFunction();

    return arrowFunction;
}

const _resultArrowFunction = checkContext.call({testContext: 123})
console.log('[obabichev]', {_resultArrowFunction});
_resultArrowFunction.call({changeContextOfArrowFunction: true})

// new _resultArrowFunction() -- error


/**
 * Asynchronous programming
 */

console.log('[obabichev]', '-------------------------------------------------');

setTimeout(() => {
    console.log("Hello from setTimeout")
    // while (true){}
}, 2000)

setTimeout(() => {
    console.log("Hello from setTimeout")
    // while (true){}
}, 2000)

console.log('[obabichev]', "after set timeout");

function setCustomTimeout() {
    // ...
}

console.log('[obabichev]', {end: true});
// while (true) {
// }


// let count = 0
// const start = Date.now();
// setInterval(() => {
//     count++;
//     const diff = Date.now() - start
//     console.log('[obabichev]', {count, diff, average: diff / count});
// }, 100)

/**
 * Callback hell
 */

setTimeout(() => {
    setTimeout(() => {
        setTimeout(() => {
            try {
                setTimeout(() => {
                    try {
                        throw Error("not catchable error");
                    } catch(error) {

                    }
                }, 100)
                throw Error("not catchable error");
            } catch (error) {
                console.log('[obabichev]', {error});
            }
        }, 100)
    }, 100)
}, 100)


/**
 * Promise API...
 */


