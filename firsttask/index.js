const fivaa = (number) => {
  let maxDuplication = number;
  let numberToDuplicate = number + 1;

  for (let i = number - 1; i >= 0; i--) {
    let result = '';
    result = i.toString() + i.toString();

    for (let j = 0; j < maxDuplication; j++) {
      result += numberToDuplicate.toString();
    }

    console.log(result);
    numberToDuplicate--;
    maxDuplication--;
  }
}

fivaa(5);