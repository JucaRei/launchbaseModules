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
};

// 1573568256893
