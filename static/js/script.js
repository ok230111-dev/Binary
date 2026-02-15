

document.addEventListener('DOMContentLoaded', function () {

  // Burger
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      this.classList.toggle('active');
      document.querySelector('.navigation').classList.toggle('open');
    });
  }

  const burgerCity = document.querySelector('.burger_city');
  if (burgerCity) {
    burgerCity.addEventListener('click', function () {
      this.classList.toggle('active');
      document.querySelector('.navigation').classList.toggle('open');
    });
  }

  const sendButton = document.getElementById('sendButton');
  if (sendButton) {
    sendButton.addEventListener('click', handleConversion);
  }

  const inputData = document.getElementById('inputData');
  if (inputData) {
    inputData.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleConversion();
      }
    });
  }

});

// Функція для обробки введених даних
async function handleConversion() {
  const input = document.getElementById('inputData').value.trim(); // Отримуємо дані з input

  if (!input) {
    document.getElementById('response').textContent = 'Please enter some data!';
    return;
  }

  try {
    const response = await fetch('/process-data', {
      method: 'POST', // HTTP-метод
      headers: {
        'Content-Type': 'application/json', // Тип даних
      },
      body: JSON.stringify({ data: input }), // Перетворюємо дані у формат JSON
    });

    if (!response.ok) {
      throw new Error('Error from Server');
    }

    const result = await response.json(); // Очікуємо відповідь у форматі JSON
    document.getElementById('response').textContent = `${result.message}`;
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('response').textContent = 'Oh no, error!';
  }
};

