// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
console.log("1");
setTimeout(() => console.log("2"), 1);
let promiseNew = new Promise((resolve) => {
  console.log("3");
  resolve();
});
promiseNew.then(() => console.log("4"));
setTimeout(() => console.log("5"));
console.log("6");

// 1 3 6 4 5 2

//////////////////////////////
// 2)
let promiseTree = new Promise((resolve, reject) => {
  resolve("a");
  console.log("1");
  setTimeout(() => {
    console.log("2");
  }, 0);
  console.log("3");
});

// 1 3 2

/////////////////////////
// 3)
let promiseTwo = new Promise((resolve, reject) => {
  resolve("a");
});
promiseTwo
  .then((res) => {
    return res + "b";
  })
  .then((res) => {
    return res + "с";
  })
  .finally((res) => {
    return res + "!!!!!!!";
  })
  .catch((res) => {
    return res + "d";
  })
  .then((res) => {
    console.log(res);
  });

// abc

/////////////////////////////
// 4)
function doSmth() {
  return Promise.resolve("123");
}
doSmth()
  .then(function (a) {
    console.log("1", a); //
    return a;
  })
  .then(function (b) {
    console.log("2", b);
    return Promise.reject("321");
  })
  .catch(function (err) {
    console.log("3", err);
  })
  .then(function (c) {
    console.log("4", c);
    return c;
  });

// 1 123
// 2 123
// 3 321
// 4 undefinde

///////////////////////////
// 5)
console.log("1");
setTimeout(function () {
  console.log("2");
}, 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// 1 4 3 2

////////////////////////////
//7)
async function a() {
  console.log("a");
}

console.log("1");

(async function () {
  console.log("f1");
  await a();
  console.log("f2");
})();
console.log("2");

// 1 f1 a 2 f2

////////////////////////////////
//8)
console.log(1);

setTimeout(() => console.log(2));

async function func() {
  console.log(3);

  await new Promise((resolve) => {
    console.log(4);
    resolve();
    console.log(5);
  })
    .then(() => console.log(6))
    .then(() => console.log(7));

  console.log(8);
}

setTimeout(() => console.log(9));

func();

console.log(10);

// 1 3 4 5 10 6 7 8 2 9

///////////////////////////////////
// 9)*
// function foo(callback) {
//   setTimeout(() => {
//     callback("A");
//   }, Math.random() * 100);
// }
// function bar(callback) {
//   setTimeout(() => {
//     callback("B");
//   }, Math.random() * 100);
// }
// function baz(callback) {
//   setTimeout(() => {
//     callback("C");
//   }, Math.random() * 100);
// }

// foo(console.log)
// bar(console.log)
// baz(console.log)

function foo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("A");
    }, Math.random() * 100);
  });
}

function bar() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("B");
    }, Math.random() * 100);
  });
}

function baz() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("C");
    }, Math.random() * 100);
  });
}

function promisification(func) {
  return function () {
    return new Promise((resolve) => {
      return func(resolve);
    });
  };
}

function allFuncCall() {
  Promise.all([
    promisification(foo),
    promisification(bar),
    promisification(baz),
  ]).then((res) => res.forEach((result) => console.log(result)));
}

allFuncCall();

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))

///////////////
// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
// function resolveAfter2Seconds(x) {
//     console.log(`Какой Х пришёл -> ${x}`)
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x); //
//         }, 5000);
//     });
// }
// async function add1(x) {
//     console.log('add1 Hello')
//     const a = await resolveAfter2Seconds(20);
//     const b = await resolveAfter2Seconds(30);
//     console.log('add1 Bye')
//     return x + a + b;
// }
// add1(10).then(console.log);

// (add1 Hello Какой Х пришёл -> 20) =>  (через 5сек  Какой Х пришёл -> 30) => (через 5 сек  add1 Bye  60)

function resolveAfter2Seconds(x) {
  console.log(`Какой Х пришёл -> ${x}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 5000);
  });
}

function add1(x) {
  console.log("add1 Hello"); // сразу add1 Hello
  return resolveAfter2Seconds(20).then((a) => {
    // тут  Какой Х пришёл -> 20, так как он еще синхронный, потом после 5 секунд происходит резолв, после чего срабатывает следующий вызов функции resolveAfter2Seconds(30)
    return resolveAfter2Seconds(30).then((b) => {
      //тут Какой Х пришёл -> 30 , так как он еще синхронный, потом после 5 секунд происходит резолв, после чего срабатывает весь остальной код по порядку
      console.log("add1 Bye");
      return x + a + b;
    });
  });
}

add1(10).then(console.log);
