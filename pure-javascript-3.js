// Offtop about clouosers

const offtopAboutClousers = () => {
    const createCounter = () => {
        let value = 10;

        return {
            get: () => value,
            inc: () => {
                value++
            }
        }
    }

    const counter = createCounter();
    const counter1 = createCounter();
    const counter2 = createCounter();
    counter.inc()
    counter.value = 100;
    console.log('[obabichev]', counter.get());
}

// Promise API

const promiseAPI = () => {
    // pending -> resolved
    //         -> rejected


    const promise1 = new Promise((resolve, reject) => {
        setTimeout(function () {
            // resolve("This is timeout promise")
            // reject(Error("Error in setTimeout"))
            // throw Error("Throw inside promise")
        }, 1000)
    })

    console.log('[obabichev]', {promise1});


    promise1
        .then((result) => {
            console.log("promise1 finished successfully", {result})
            console.log('[obabichev]', {promise1});
        })
        .catch((err) => {
            console.log("promise1 was rejected", {err})
            console.log('[obabichev]', {promise1});
        })

}

const sleep = (result, timeout = 1000) =>
    new Promise((resolve, reject) => setTimeout(() => {
        // const p = new Promise(resolve => {
        //     resolve("I am strange promise returned from another promise")
        // })
        resolve(result)
    }, timeout));

const promiseChain = () => {


    sleep(1)
        .then((result) => {
            console.log(`[obabichev] sleep finished ${result}`);

            const promise = sleep(123, 5000)
                .then((r) => console.log(`[obabichev] sleep finished ${r}`))

            return 123;
        })
        .then((result) => {
            console.log(`[obabichev] sleep finished ${result}`);
        })
        .then(() => {
            return 123;
        })
        .catch(err => {
            console.log('[obabichev]', {err});
            // err.then(result => {
            //     console.log("Result of nested pomise in catch is " + result)
            // })
        })
}

const promiseAll = () => {
    const getDelayed = (result, timeout = 1000) =>
        new Promise((resolve, reject) => setTimeout(() => {
            resolve(result)
        }, timeout));

    const p1 = getDelayed(1, 100)
    const p2 = getDelayed(2, 200)
    const p3 = getDelayed(3, 300)

    const promisesArr = [p1, p2, p3]

    const resolveAll = (promises, cb) => {
        const results = []
        let count = 0
        promises.forEach((p, i) => p.then(r => {
            results[i] = r
            count++
            console.log('[obabichev]', {results});
            if (count === promises.length) {
                cb(results)
            }
        }))
    }

    resolveAll(promisesArr, (result) => {
        console.log('[obabichev]', {result});
    })

    const allPromise = Promise.all(promisesArr)
    allPromise.then(resultAllPromise => {
        const self = allPromise
        console.log('[obabichev] [[PromiseResult]]', self["[[PromiseResult]]"]);
        console.log('[obabichev]', {resultAllPromise});
    })
}

const creatingNewPromisesWithThen = () => {
    Promise.resolve()
        .then(() => {
            throw Error()
        })

    const p = new Promise(r => r())
    const p2 = p.then(() => {
        throw new Error("Errrrror")
        return new Promise.resolve(555)
    })
    p2.catch(result => {
        console.log('[obabichev]', {p2, result});
    })
    console.log('[obabichev]', {p2});


    console.log('[obabichev] p === p2', p === p2);
}

// promiseAll()

const promiseRate = () => {
    const p1 = sleep(1, 100)
    const p2 = sleep(2, 200)
    Promise.race([p2, p1])
        .then(result => {
            console.log('[obabichev]', {result});
        })
}


const cancellablePromise = () => {

    const cancellablePromise = (promise, cb) => {
        let globalResolve = null
        const cancel = new Promise((resolve, reject) => {
            console.log('[obabichev] step 1');
            globalResolve = resolve;
        })
        console.log('[obabichev] step 2');
        Promise.race([promise, cancel])
            .then(result => cb(result))

        return globalResolve;
    }

    const s = sleep(100, 1000)
    const cancel = cancellablePromise(s, (result) => {
        console.log('[obabichev]', {result});
    })

    console.log('[obabichev]', {cancel});
    setTimeout(() => {
        cancel("cancel")
    }, 100)
}
cancellablePromise()
