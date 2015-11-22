var validatorsHandler = function(error) {
  var response = '';

  switch (true) {
    //check firstName
    case (error.indexOf('firstName') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Имя'!" });
          return response;
          break;
        case (error.indexOf('pattern') > -1):
          response = JSON.stringify({ "status": 400, "message": "Имя должно содержать только буквы русского алфавита!" });
          return response;
          break;
        case (error.indexOf('least 3') > -1):
          response = JSON.stringify({ "status": 400, "message": "Имя должно содержать не менее 3 символов!" });
          return response;
          break;
        case (error.indexOf('equal to 15') > -1):
          response = JSON.stringify({ "status": 400, "message": "Имя должно содержать не более 15 символов!" });
          return response;
          break;
      }
      break;

    //check lastName
    case (error.indexOf('lastName') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Фамилия'!" });
          return response;
          break;
        case (error.indexOf('pattern') > -1):
          response = JSON.stringify({ "status": 400, "message": "Фамилия должна содержать только буквы русского алфавита!" });
          return response;
          break;
        case (error.indexOf('least 5') > -1):
          response = JSON.stringify({ "status": 400, "message": "Фамилия должна содержать не менее 5 символов!" });
          return response;
          break;
        case (error.indexOf('equal to 20') > -1):
          response = JSON.stringify({ "status": 400, "message": "Фамилия должна содержать не более 20 символов!" });
          return response;
          break;
      }
      break;

    //check phoneNumber
    case (error.indexOf('phoneNumber') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Номер телефона'!" });
          return response;
          break;
        case (error.indexOf('pattern') > -1):
          response = JSON.stringify({ "status": 400, "message": "Номер телефона должен содержать только цифры и начинаться с '8'!" });
          return response;
          break;
        case (error.indexOf('must be 10') > -1):
          response = JSON.stringify({ "status": 400, "message": "Номер телефона должен иметь длину 11 цифр!" });
          return response;
          break;
      }
      break;

    //check phoneCode
    case (error.indexOf('phoneCode') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Код подтверждения'!" });
          return response;
          break;
        case (error.indexOf('pattern') > -1):
          response = JSON.stringify({ "status": 400, "message": "Код подтверждения должен содержать только цифры!" });
          return response;
          break;
        case (error.indexOf('must be 4') > -1):
          response = JSON.stringify({ "status": 400, "message": "Код подтверждения должен иметь длину 4 символа!" });
          return response;
          break;
      }
      break;

    //check password
    case (error.indexOf('password') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Пароль'!" });
          return response;
          break;
        case (error.indexOf('alpha-numeric') > -1):
          response = JSON.stringify({ "status": 400, "message": "Пароль должен содержать только буквы английского алфавита, цифры!" });
          return response;
          break;
      }
      break;

    //check title
    case (error.indexOf('title') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Заголовок'!" });
          return response;
          break;
        case (error.indexOf('equal to 15') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заголовок должно содержать не более 15 символов!" });
          return response;
          break;
        case (error.indexOf('least 5') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заголовок содержать не менее 5 символов!" });
          return response;
          break;
      }
      break;

    //check description
    case (error.indexOf('description') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Описание'!" });
          return response;
          break;
        case (error.indexOf('equal to 160') > -1):
          response = JSON.stringify({ "status": 400, "message": "Описание должно содержать не более 160 символов!" });
          return response;
          break;
        case (error.indexOf('least 10') > -1):
          response = JSON.stringify({ "status": 400, "message": "Описание содержать не менее 10 символов!" });
          return response;
          break;
      }
      break;

    //check officialParam
    case (error.indexOf('eventsStatus') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Не выбран тип новости!" });
          return response;
          break;
        case (error.indexOf('pattern') > -1):
          response = JSON.stringify({ "status": 400, "message": "Неверный параметр новости!" });
          return response;
          break;
      }
      break;

    //check destination
    case (error.indexOf('destination') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Откуда'!" });
          return response;
          break;
        case (error.indexOf('equal to 50') > -1):
          response = JSON.stringify({ "status": 400, "message": "Поле 'откуда' должно содержать не более 50 символов!" });
          return response;
          break;
        case (error.indexOf('least 10') > -1):
          response = JSON.stringify({ "status": 400, "message": "Поле 'откуда' должно содержать не менее 5 символов!" });
          return response;
          break;
      }
      break;

    //check departure
    case (error.indexOf('departure') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Куда'!" });
          return response;
          break;
        case (error.indexOf('equal to 50') > -1):
          response = JSON.stringify({ "status": 400, "message": "Поле 'Куда' должно содержать не более 50 символов!" });
          return response;
          break;
        case (error.indexOf('least 10') > -1):
          response = JSON.stringify({ "status": 400, "message": "Поле 'Куда' должно содержать не менее 5 символов!" });
          return response;
          break;
      }
      break;

    //check note
    case (error.indexOf('note') > -1):
      switch (true) {
        case (error.indexOf('equal to 50') > -1):
          response = JSON.stringify({ "status": 400, "message": "Поле 'примечание' должно содержать не более 100 символов!" });
          return response;
          break;
      }
      break;

    //check payment
    case (error.indexOf('payment') > -1):
      switch (true) {
        case (error.indexOf('to be empty') > -1):
          response = JSON.stringify({ "status": 400, "message": "Заполните поле 'Стоимость'!" });
          return response;
          break;
        case (error.indexOf('pattern') > -1):
          response = JSON.stringify({ "status": 400, "message": "Стоимость должна содержать только цифры!" });
          return response;
          break;
        case (error.indexOf('equal to 4') > -1):
          response = JSON.stringify({ "status": 400, "message": "Введите стоимость, не большую четырехзначного числа!" });
          return response;
          break;
      }
      break
  }
};

module.exports = validatorsHandler;
