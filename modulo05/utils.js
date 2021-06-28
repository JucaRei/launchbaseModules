module.exports = {
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    // ainda não fez anivérsario
    // 11 - 12 = -1
    // 12 - 12 = 0
    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;

    // MÊS
    // 2019 - 1984 = 35
    // 11 - 12 = -1
    // 12 - 12 = 0
    // 11 - 10 = 1
    // DIA
    // 01 - 12 age -11
    // 12 - 12 = 0
    // 13 - 12 = 1
  },
  date: function (timestamp) {
    const date = new Date(timestamp);

    // yyyy
    const year = date.getUTCFullYear();

    // mm (vai de 0 à 11)
    const month = `0${date.getUTCMonth() + 1}`.slice(-2); // pega somente 2 digitos, se ouver mais ignora (no caso o 0)

    // dd (de 01 à 31)
    const day = `0${date.getUTCDate()}`.slice(-2);

    // UTC = universal

    // return yyyy-mm-dd
    return  {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
};

// 1573568256893
