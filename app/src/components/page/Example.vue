<script setup>
const items = {
  qr1: {
    img: {
      src: '/example/base-qr-text-frame.png',
      alt: '3d модель qr-кода с подписью'
    },
    text: 'QR-код в котором закодирован адрес сайта. Подпись добавлена на случай, если нет возможности отсканировать qr-код.',
    tags: [
      'Основа',
      'QR-код',
      'Текст',
      'Рамка',
    ]
  },
  key1: {
    img: {
      src: '/example/base-text-key-frame.png',
      alt: ''
    },
    text: 'Брелок для ключей с надписью. Можно добавить свое имя, крутую надпись или номер телефона. Отверстие слева.',
    tags: [
      'Основа',
      'Текст',
      'Отверстие',
      'Рамка',
    ]
  },
  key2: {
    img: {
      src: '/example/base-icon-key-frame.png',
      alt: ''
    },
    text: 'Брелок для ключей с иконкой. Размер иконки обычно 85-90% от базового размера. Отверстие сверху слева и рамка толщиной в 1 мм.',
    tags: [
      'Основа',
      'Иконка',
      'Отверстие',
      'Рамка',
    ]
  },
}
</script>

<template lang="pug">
  .container.is-fluid
    .box
      h1.title.is-2 Примеры STL моделей 3d
      p.subtitle.is-4 Примеры 3д моделей демонстрируют возможности генератора.

      .columns
        .column.is-half
          article.message
            .message-body
              | Современный тренд: QR-код на 3d принтере. Квадратная или прямоугольная карточка с вашим QR-кодом. Закодировать можно любую информацию и добавить подпись по желанию.

    .columns
      .column.is-one-third
        article.card
          .card-header
            p.card-header-title Что можно закодировать
          .card-content
            .content
              ul
                li Номер телефона
                li Ссылку на сайт
                li Ссылку на страницу оплаты
                li Ссылки на страницы в социальных сетях
                li Почтовый адрес
                li Адрес электронной почты
                li Код оплаты СБП (для магазинов)
                li ИНН, СНИЛС, номер паспорта
                li WIFI (кафе, ресторан)
                li Памятное событие
      .column.is-one-third
        article.card
          .card-header
            p.card-header-title Где использовать
          .card-content
            .content
              ul
                li В автомобиль под стекло
                li Брелок на ключи
                li Ребкнку в карман
                li Пожилым людям в карман
                li Курьерам
                li Животным на ошейник
                li Рекламная акция или информирование
                li Оригинальный подарок
      .column.is-one-third
        article.card
          .card-header
            p.card-header-title Для чего кодировать в QR-код
          .card-content
            .content
              ul
                li Мгновенный перенос данных в телефон
                li НАдежный физический носитель данных
                li Много информации в небольшом формате

    .columns.is-desktop
      .column(v-for="item in items")
        .box
          article.media
            .media-left
              figure.image.is-128x128
                img(:src="item.img.src" :alt="item.img.alt")
            .media-content
              .content
                p {{ item.text }}
                .tags
                  span.tag(v-for="tag in item.tags")
                   | {{ tag }}
</template>

<style scoped>

</style>
