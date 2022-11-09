const form = document.forms.questionnaireForm;
const fieldsetArray = document.getElementsByTagName("fieldset");
const submitButton = document.querySelector(".submit");
const thankPhrase = document.querySelector(".thank-phrase");

function formChecking(fieldset) {
  let result = [];
  const errorArr = [];

  for (let i = 0; i < fieldset.elements.length; i++) {
    if (
      (fieldset.elements[i].nodeName === "INPUT" &&
        fieldset.elements[i].id === "phone") ||
      (fieldset.elements[i].nodeName === "INPUT" &&
        fieldset.elements[i].id === "name")
    ) {
      if (fieldset.elements[i].value !== "") {
        errorArr.push(true);
        result.push(fieldset.elements[i].value);
      }
    } else if (fieldset.elements[i].nodeName === "INPUT") {
      if (fieldset.elements[i].checked) {
        errorArr.push(true);
        result.push(fieldset.elements[i].value);
      }
    } else if (fieldset.elements[i].nodeName === "TEXTAREA") {
      if (fieldset.elements[i].value !== "") {
        errorArr.push(true);
        result.push(fieldset.elements[i].value);
      }
    }
  }

  if (errorArr.includes(true)) {
    return result;
  }
}

function showingErrorBorder(field) {
  for (let i = 0; i < field.children.length; i++) {
    if (field.children[i].nodeName === "LABEL") {
      field.children[i].lastElementChild.classList.add("error-border_checkbox");
    } else if (field.children[i].nodeName === "TEXTAREA") {
      field.children[i].classList.add("error-border_text");
    } else if (field.children[i].nodeName === "INPUT") {
      field.children[i].classList.add("error-border_input");
    }
  }
}

function hidingErrorBorder(field) {
  for (let i = 0; i < field.children.length; i++) {
    if (field.children[i].nodeName === "LABEL") {
      field.children[i].lastElementChild.classList.remove(
        "error-border_checkbox"
      );
    } else if (field.children[i].nodeName === "TEXTAREA") {
      field.children[i].classList.remove("error-border_text");
    } else if (field.children[i].nodeName === "INPUT") {
      field.children[i].classList.remove("error-border_input");
    }
  }
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const errorElementsArray = [];
  let finalResult = {};
  for (let i = 0; i < fieldsetArray.length; i++) {
    if (formChecking(fieldsetArray[i])) {
      // Скрыть ошибку незаполненных полей
      hidingErrorBorder(fieldsetArray[i]);

      // Скрыть текст ошибки
      fieldsetArray[
        i
      ].previousElementSibling.lastElementChild.style.visibility = "hidden";

      // Вывод объекта с финальным результатом
      finalResult[`${fieldsetArray[i].name}`] = `${formChecking(
        fieldsetArray[i]
      ).join(",")}`;
    } else {
      // Показать незаполненные поля
      showingErrorBorder(fieldsetArray[i]);
      // Показать текст ошибки
      fieldsetArray[
        i
      ].previousElementSibling.lastElementChild.style.visibility = "visible";

      // Массив элементов с ошибками
      errorElementsArray.push(
        fieldsetArray[i].previousElementSibling.firstElementChild
      );

      // Скролл к 1 элементу с ошибкой
      errorElementsArray[0].scrollIntoView({ behavior: "smooth" });
    }
  }

  if (errorElementsArray.length === 0) {
    submitButton.value = "Отправлено";
    thankPhrase.style.visibility = "visible";
  } else e.preventDefault();
  console.log(finalResult);
});
