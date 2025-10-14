document.getElementById('sendButton').addEventListener('click', handleConversion);

document.getElementById('inputData').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Зупиняємо стандартну поведінку (перезавантаження сторінки)
    handleConversion(); // Викликаємо функцію обробки введених даних
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
}

// Обробка кліків на банерах
const img_santa = document.getElementById('img_santa');
if (img_santa) {
  img_santa.addEventListener('click', function () {
    window.location.href = 'https://letter-to-santa-95663.web.app/';
  });
}

const img_binary = document.getElementById('img_binary');
if (img_binary) {
  img_binary.addEventListener('click', function () {
    window.location.href = '/';
  });
}
