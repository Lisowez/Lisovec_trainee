//Как исправить "одни пятёрки"?

// var result = [];
// for (let i = 0; i < 5; i++) {
//     result[i] = function () {
//         console.log(i);
//     };
// }
// result[0](); //5
// result[1](); //5
// result[2](); //5
// result[3](); //5
// result[4](); //5

//заменил var на let!!!

//////////////////////////////////////////////////

function getGroup() {
  let students = [];
  for (let i = 0; i < 10; i++) {
    students[i] = function () {
      console.log(i);
    };
  }
  return students;
}
//
// let group = getGroup();
//
// group[0](); // 10 как исправить на 0
// group[5](); // 10                  5

//поменял цикл и внес let i в него!!!

//////////////////////////////////////////////////

// Напишите функцию multiply, должна принимать произвольное количество аргументов и возвращать их произведение.
function multiply(argument) {
  let accum = argument;
  const foo = (num) => {
    num ?? 1;
    accum *= num;
    return foo;
  };
  foo.valueOf = () => accum;
  foo.toString = () => accum.toString();
  return foo;
}
// const result2 = multiply(5)(2)(3);
// console.log(Number(result2)); // 30

// const result1 = multiply(2)(3)(4);
// console.log(result1); // Вывод: 24
// const result2 = multiply(2)(3)(4)(5);
// console.log(result2); // Вывод: 120

// const result1 = multiply(2)(3)(4);
//
// // Пример использования:
// const result1 = multiply(2)(4);
// console.log(result1); // Вывод: 8
//
// const result2 = multiply(5)(2)(3);
// console.log(result2); // Вывод: 30

/////////////////////////
// Написать функцию getUniqArray(arr), которая на вход принимает массив чисел и
// возвращает массив уникальных чисел.
//     Если аргумент arr состоит не из чисел, тогда функция должна выбросить ошибку.
//     Текст ошибки: "В getUniqArray был передан невалидный параметр. Аргумент arr
// должен быть массивом чисел".

function namegetUniqArray(arr) {
  let uniqueNumberSet = new Set(arr);
  let uniqueNumberArr = Array.from(uniqueNumberSet);
  if (
    uniqueNumberArr.filter((x) => {
      return typeof x !== "number" || !isNaN(x);
    }).length > 0
  ) {
    return new Error(
      "В getUniqArray был передан невалидный параметр. Аргумент arr должен быть массивом чисел"
    );
  } else {
    return uniqueNumberArr;
  }
}
