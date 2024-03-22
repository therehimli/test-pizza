const nameInput = document.querySelector(".form__input--name");
const phoneInput = document.querySelector(".form__input--phone");
const addressInput = document.querySelector(".form__input--address");
const formElement = document.querySelector(".footer__form");
const pizzaList = document.querySelector(".content__menu--list");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".btn--close");
let images = document.querySelectorAll(".pizza-list--image");
const fullImage = document.querySelector(".full-image");
const pizzas = [
  {
    img: "assets/images/Layer 2.png",
    title: "Мясная Делюкс",
    description:
      "Пепперони, лук, бекон, томатная паста, колбаски, перец, грибы,соус чили, ананасы",
  },
  {
    img: "assets/images/Layer 3.png",
    title: "Морская Премиум",
    description: "Перец, сыр, креветки, кальмары, мидии, лосось",
  },
  {
    img: "assets/images/Layer 4.png",
    title: "Бекон и Сосиски",
    description: "Бекон, сыр, сосиски, ананас, томатная паста",
  },
  {
    img: "assets/images/Layer 5.png",
    title: "Куриная Делюкс",
    description:
      "Курица, ананас, сыр Пепперони, соус для пиццы, томатная паста",
  },
  {
    img: "assets/images/Layer 6.png",
    title: "Барбекю Премиум",
    description:
      "Свинина BBQ, соус Барбкею, сыр, курица, соус для пиццы, соус чили",
  },
  {
    img: "assets/images/Layer 7.png",
    title: "Пепперони Дабл",
    description: "Пепперони, сыр, колбаса 2 видов: обжаренная и вареная",
  },
  {
    img: "assets/images/Layer 8.png",
    title: "Куриное трио",
    description:
      "Жареная курица, Тушеная курица, Куриные наггетсы, перец, сыр, грибы",
  },
  {
    img: "assets/images/Layer 9.png",
    title: "Сырная",
    description: "Сыр Джюгас, Сыр с плесенью, Сыр Моцарелла, Сыр секретный",
  },
];

pizzaList.innerHTML = pizzas
  .map(
    (pizza) => `
       <li class="pizza-list--item">
  <img
    class="pizza-list--image"
    src="${pizza.img}"
    alt="Пицца Морская Премиум"
  />
  <h3 class="pizza-list--title">${pizza.title}</h3>
  <p class="pizza-list--description">
    ${pizza.description}
  </p>
  <button class="pizza-list--button btn">В корзину</button>
</li>
    `
  )
  .join(""); // Объединяем элементы массива в одну строку без разделителя

nameInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const newValue = value.replace(/\./g, ""); // Удаляем точки из значения поля

  if (value !== newValue) {
    event.target.value = newValue;
    // Если значение изменилось, устанавливаем новое значение без точек
  }
});

formElement.addEventListener("submit", async (event) => {
  event.preventDefault(); // Отменяем отправку формы по умолчанию

  const phonePattern = /^([+]?[0-9\s-\(\)]{3,25})*$/i; // Регулярное выражение для проверки номера телефона

  if (
    // Проверяем, есть ли пустое значение в поле имени, адреса и номера телефона
    nameInput.value === "" ||
    phoneInput.value === "" ||
    addressInput.value === "" ||
    // Проверяем, соответствует ли номер телефона указанному формату
    !phonePattern.test(phoneInput.value)
  ) {
    alert(
      "Пожалуйста, заполните все обязательные поля и введите телефонный номер в формате 123-456-7890"
    );
    return;
  }

  const formData = {
    name: nameInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
  };

  // Отправляем AJAX-запрос при помощи fetch
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Обрабатываем ошибку запроса
      throw new Error(`Ошибка ${response.status}`);
    }

    // Если данные успешно отправлены, то отображаем попап и очищаем поля
    nameInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
    popup.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
});

// При нажатии на кнопку закрытия, скрываем попап
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Устанавливаем фоновое изображение при клике на него
images = document.querySelectorAll(".content__menu--list img");
images.forEach((img) => {
  img.addEventListener("click", function () {
    fullImage.style.backgroundImage = "url(" + img.src + ")";
    fullImage.style.display = "block";
  });
});
