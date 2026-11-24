'use strict';

const fs = require('fs');
const path = require('path');

const OUT = __dirname;

const S = {
  phone: '+7 (912) 645-19-84',
  tel: 'tel:+79126451984',
  wa: 'https://wa.me/79126451984',
  tg: 'https://t.me/dtlg_optimus',
  address: 'Екатеринбург, Посадская улица, 3, 1 этаж',
  addressShort: 'Посадская, 3',
  map: 'https://2gis.ru/ekaterinburg/firm/70000001034290289',
  route: 'https://2gis.ru/ekaterinburg/directions/points/%7C60.569025%2C56.826236%3B70000001034290289',
  rating: '5,0',
  ratings: '59',
  reviews: '49',
  award: 'Премия 2ГИС «Лучший детейлинг 2025»',
};

const nav = [
  ['index.html', 'Главная'],
  ['services.html', 'Услуги'],
  ['works.html', 'Работы'],
  ['about.html', 'Студия'],
  ['contacts.html', 'Контакты'],
];

const pill = (label, href, kind = 'red', attrs = '') =>
  `<a class="pill pill--${kind}" href="${href}"${attrs}>${label}</a>`;

const label = (text) => `<span class="label">${text}</span>`;

const sectionHead = (title, note = '') =>
  `<div class="section-head">
    <h2 class="h2">${title}</h2>
    ${note ? `<p class="section-note">${note}</p>` : ''}
  </div>`;

const header = (active) => `<header class="header" data-header>
  <div class="header__inner container">
    <a class="brand" href="index.html" aria-label="Optimus, на главную">
      <span class="brand__name"><span class="brand__o">O</span>ptimus</span>
    </a>
    <nav class="nav" aria-label="Основная навигация">
      ${nav
        .map(
          ([f, l]) =>
            `<a href="${f}"${f === active ? ' aria-current="page"' : ''}>${l}</a>`
        )
        .join('')}
    </nav>
    <a class="header__phone" href="${S.tel}">${S.phone}</a>
    ${pill('Записаться', S.tel, 'red', ' data-cta="header"')}
    <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-menu" data-burger>
      <span class="burger__line" aria-hidden="true"></span>
      <span class="burger__line" aria-hidden="true"></span>
      <span class="sr-only">Открыть меню</span>
    </button>
  </div>
  <div class="mobile-menu" id="mobile-menu" data-menu aria-hidden="true">
    <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
      ${nav
        .map(
          ([f, l]) =>
            `<a href="${f}"${f === active ? ' aria-current="page"' : ''}>${l}</a>`
        )
        .join('')}
    </nav>
    <div class="mobile-menu__foot">
      <a class="mobile-menu__phone" href="${S.tel}">${S.phone}</a>
      <div class="mobile-menu__actions">
        ${pill('WhatsApp', S.wa, 'outline', ' target="_blank" rel="noopener"')}
        ${pill('Telegram', S.tg, 'outline', ' target="_blank" rel="noopener"')}
      </div>
    </div>
  </div>
</header>`;

const footer = () => `<footer class="footer">
  <div class="container footer__top">
    <div class="footer__brand">
      <a class="brand" href="index.html" aria-label="Optimus, на главную">
        <span class="brand__name"><span class="brand__o">O</span>ptimus</span>
      </a>
      <p>Полировка, химчистка, мойка и уход за автомобилем в Екатеринбурге.</p>
    </div>
    <nav class="footer__nav" aria-label="Навигация в подвале">
      <a href="services.html">Услуги</a>
      <a href="works.html">Работы</a>
      <a href="about.html">Студия</a>
      <a href="contacts.html">Контакты</a>
    </nav>
    <div class="footer__contacts">
      <address>${S.address}</address>
      <a class="footer__phone" href="${S.tel}">${S.phone}</a>
      <div class="footer__mess">
        <a href="${S.wa}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="${S.tg}" target="_blank" rel="noopener">Telegram</a>
      </div>
    </div>
  </div>
  <div class="container footer__bottom">
    <p>© <span data-year>2026</span> Optimus</p>

    <a href="privacy.html">Политика конфиденциальности</a>
  </div>
</footer>`;

const layout = ({ file, title, description, body, jsonld = '' }) => `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#000000">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/css/style.css?v=13">
  <noscript><style>.faq__panel{grid-template-rows:1fr}.faq__panel-inner{opacity:1}</style></noscript>
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  ${jsonld}
</head>
<body>
  <a class="skip-link" href="#main">Перейти к содержанию</a>
  ${header(file)}
  <main id="main">
    ${body}
  </main>
  ${footer()}
  <script src="assets/js/main.js?v=13"></script>
</body>
</html>`;

const SERVICES = [
  ['Полировка кузова', 'от 15 000 ₽'],
  ['Химчистка салона', 'от 10 000 ₽'],
  ['Предпродажная подготовка', 'от 18 000 ₽'],
  ['Мойка кузова', 'от 2 000 ₽'],
  ['Комплексная мойка', 'от 2 500 ₽'],
  ['Кварцевое покрытие', 'от 1 000 ₽'],
  ['Твёрдый воск', 'от 3 500 ₽'],
  ['Ремонт вмятин', 'по запросу'],
];

const priceRows = (rows, withAdd = false) =>
  `<ul class="price-rows">${rows
    .map(
      ([name, note, value]) =>
        `<li class="price-row${withAdd ? ' price-row--add' : ''}">
          <div>
            <span class="price-row__name">${name}</span>
            ${note ? `<span class="price-row__note">${note}</span>` : ''}
          </div>
          <span class="price-row__value">${value}</span>
          ${withAdd ? `<button class="price-add" type="button" data-service="${name}" aria-pressed="false" aria-label="Добавить услугу: ${name}">+</button>` : ''}
        </li>`
    )
    .join('')}</ul>`;

const priceModule = (rows, note, foot = '', withAdd = false) => `<div class="module module--dark">
  ${sectionHead('Цены')}
  ${priceRows(rows, withAdd)}
  <p class="fineprint fineprint--dark">${note}</p>
  ${foot ? `<div class="module__foot">${foot}</div>` : ''}
</div>`;

const ctaBand = (title, text, img) => `<section class="cta-band">
  <img src="${img}" alt="" aria-hidden="true">
  <div class="cta-band__shade" aria-hidden="true"></div>
  <div class="container cta-band__content">
    <h2 class="cta-band__title">${title}</h2>
    <p class="cta-band__text">${text}</p>
    <div class="cta-band__actions">
      ${pill('Позвонить', S.tel, 'red')}
      ${pill('WhatsApp', S.wa, 'outline', ' target="_blank" rel="noopener"')}
      ${pill('Telegram', S.tg, 'outline', ' target="_blank" rel="noopener"')}
    </div>
  </div>
</section>`;

const home = `
<section class="hero">
  <video class="hero__video" autoplay muted loop playsinline poster="assets/img/photo-2.jpg" aria-hidden="true">
    <source src="assets/video/hero-v3.mp4" type="video/mp4">
  </video>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="container hero__content">
    ${label('Екатеринбург · Посадская, 3')}
    <h1 class="hero__title">Детейлинг<br>без спешки.</h1>
    <p class="hero__copy">Полировка, химчистка и уход за автомобилем.</p>
    <div class="hero__actions">
      ${pill('Записаться', S.tel, 'red')}
      ${pill('Смотреть работы', 'works.html', 'outline')}
    </div>
  </div>
  <div class="hero__capsule">
    <span class="hero__score">${S.rating}</span>
    <span class="hero__score-label">${S.ratings} оценок<br>${S.reviews} отзывов</span>
    ${pill('2ГИС', S.map, 'red', ' target="_blank" rel="noopener"')}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('Услуги', 'Три направления: от регулярной мойки до работы с кузовом.')}
    <div class="media-grid">
      <a class="media-card media-card--wide" href="services.html#detailing">
        <img src="assets/img/photo-interior.jpg" alt="Салон после детейлинга">
        <div class="media-card__content">
          <span class="media-card__label">Детейлинг</span>
          <span class="media-card__meta">Полировка · химчистка · предпродажная подготовка</span>
          <span class="media-card__price">от 10 000 ₽</span>
        </div>
      </a>
      <a class="media-card" href="services.html#wash">
        <img src="assets/img/photo-wash.jpg" alt="Мойка кузова активной пеной">
        <div class="media-card__content">
          <span class="media-card__label">Автомойка</span>
          <span class="media-card__meta">Комплексная мойка · воск · кварц</span>
          <span class="media-card__price">от 2 000 ₽</span>
        </div>
      </a>
      <a class="media-card media-card--split" href="services.html#body">
        <div class="media-card__media"><img src="assets/img/photo-body.jpg" alt="Mercedes после кузовного ремонта"></div>
        <div class="media-card__content media-card__content--solid">
          <span class="media-card__label">Кузовной ремонт</span>
          <span class="media-card__meta">Ремонт вмятин · полировка. Покраску и другие работы уточняйте.</span>
          <span class="media-card__price">по запросу</span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="container">
    ${priceModule(
      [
        ['Детейлинг', 'Полировка, химчистка, предпродажная', 'от 10 000 ₽'],
        ['Автомойка', 'Комплексная мойка', 'от 2 500 ₽'],
        ['Кузовной ремонт', 'Вмятины и полировка', 'по запросу'],
      ],
      'Полный список на странице услуг. Не является публичной офертой.',
      pill('Все цены', 'services.html', 'red')
    )}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="module module--dark">
      <div class="module__score-line">
        <span class="module__score">${S.rating}</span>
        <span class="module__score-label">${S.ratings} оценок · ${S.reviews} отзывов<br>на 2ГИС</span>
      </div>
      <p class="module__quote">«Как из салона»: так результат чаще всего описывают в отзывах.</p>
      <p class="module__source">Рейтинг подтверждён. ${S.award}.</p>
      <div class="tile-grid">
        <div class="tile"><span class="tile__label">Результат</span><p>Автомобиль выглядит свежим; в отзывах повторяется сравнение «как из салона».</p></div>
        <div class="tile"><span class="tile__label">Отношение</span><p>Отмечают внимательность и бережное отношение к машине и к клиенту.</p></div>
        <div class="tile"><span class="tile__label">Цена</span><p>Клиенты называют цены адекватными уровню работ.</p></div>
      </div>
      <div class="module__foot">${pill('Читать на 2ГИС', S.map, 'red', ' target="_blank" rel="noopener"')}</div>
    </div>
  </div>
</section>

${ctaBand('Запишитесь.', 'Позвоните или напишите. Подскажем по услугам и времени.', 'assets/img/photo-wash.jpg')}
`;

const services = `
<section class="page-head">
  <div class="container">
    ${label('Услуги · Екатеринбург')}
    <h1 class="page-head__title">Услуги</h1>
    <p class="page-head__lead">Детейлинг, мойка и кузовной ремонт в одной студии. Точную стоимость подтверждают при записи.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <article class="feature" id="detailing">
      <div class="feature__media"><img src="assets/img/photo-interior.jpg" alt="Салон после детейлинга"></div>
      <div class="feature__body">
        ${label('Детейлинг')}
        <h2 class="h2 h2--card">Полировка, химчистка, подготовка к продаже</h2>
        <p class="body-text">Работаем с кузовом и салоном: убираем следы мойки, возвращаем блеск, приводим салон в порядок.</p>
        <ul class="plain">
          <li>Полировка кузова: от 15 000 ₽</li>
          <li>Химчистка салона: от 10 000 ₽</li>
          <li>Предпродажная подготовка: от 18 000 ₽</li>
          <li>Керамические покрытия: по запросу</li>
        </ul>
        <div class="feature__foot">
          <span class="feature__price">от 10 000 ₽</span>
          ${pill('Записаться', S.tel, 'red')}
        </div>
      </div>
    </article>

    <article class="feature feature--reverse" id="wash">
      <div class="feature__media"><img src="assets/img/photo-wash.jpg" alt="Мойка кузова активной пеной"></div>
      <div class="feature__body">
        ${label('Автомойка')}
        <h2 class="h2 h2--card">Мойка, воск и кварцевое покрытие</h2>
        <p class="body-text">Комплексная и бесконтактная мойка, мойка двигателя, защитные составы после мойки.</p>
        <ul class="plain">
          <li>Мойка кузова: от 2 000 ₽</li>
          <li>Комплексная мойка: от 2 500 ₽</li>
          <li>Кварцевое покрытие: от 1 000 ₽</li>
          <li>Твёрдый воск: от 3 500 ₽</li>
        </ul>
        <div class="feature__foot">
          <span class="feature__price">от 2 000 ₽</span>
          ${pill('Записаться', S.tel, 'red')}
        </div>
      </div>
    </article>

    <article class="feature" id="body">
      <div class="feature__media"><img src="assets/img/photo-body.jpg" alt="Mercedes после кузовного ремонта"></div>
      <div class="feature__body">
        ${label('Кузовной ремонт')}
        <h2 class="h2 h2--card">Вмятины и полировка</h2>
        <p class="body-text">Стоимость зависит от повреждения, её называют после осмотра. Покраску и другие работы уточняйте по телефону.</p>
        <ul class="plain">
          <li>Ремонт вмятин: по запросу</li>
          <li>Полировка кузова: от 15 000 ₽</li>
          <li>Оклейка плёнкой и тонирование: по запросу</li>
        </ul>
        <div class="feature__foot">
          <span class="feature__price">по запросу</span>
          ${pill('Уточнить', S.tel, 'red')}
        </div>
      </div>
    </article>
  </div>
</section>

<section class="section section--paper">
  <div class="container">
    ${priceModule(
      SERVICES.map(([name, price]) => [name, '', price]),
      'Не является публичной офертой.',
      `<span class="cart-note">В заявке: <span data-cart-count>0</span> · <a href="contacts.html">Оформить</a></span>`,
      true
    )}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('Вопросы', 'Если чего-то нет в списке, позвоните, уточним.')}
    <div class="faq">
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">Нужна ли предварительная запись?</button>
        <div class="faq__panel"><div class="faq__panel-inner"><p class="faq__a">Да. Лучше согласовать время заранее по телефону или в мессенджере.</p></div></div>
      </div>
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">Сколько стоит полировка?</button>
        <div class="faq__panel"><div class="faq__panel-inner"><p class="faq__a">От 15 000 ₽. Точная стоимость зависит от состояния кузова, её подтверждают при записи.</p></div></div>
      </div>
      <div class="faq__item">
        <button class="faq__q" type="button" aria-expanded="false">Есть ли гарантия на работы?</button>
        <div class="faq__panel"><div class="faq__panel-inner"><p class="faq__a">Условия гарантии уточняйте напрямую у студии по телефону.</p></div></div>
      </div>

    </div>
  </div>
</section>

${ctaBand('Обсудим ваш автомобиль.', 'Расскажите, что нужно сделать, и подскажем по услуге и времени.', 'assets/img/photo-2.jpg')}
`;

const works = `
<section class="page-head">
  <div class="container">
    ${label('Работы · 2ГИС')}
    <h1 class="page-head__title">Работы</h1>

  </div>
</section>

<section class="section section--paper">
  <div class="container">
    <div class="works-grid">
      <figure class="work-card"><img src="assets/img/photo-lada.jpg" alt="Автомобиль Lada"><figcaption>Кузов</figcaption></figure>
      <figure class="work-card"><img src="assets/img/photo-wash.jpg" alt="Мойка кузова активной пеной"><figcaption>Мойка и уход</figcaption></figure>
      <figure class="work-card"><img src="assets/img/photo-interior.jpg" alt="Салон после детейлинга"><figcaption>Салон</figcaption></figure>
      <figure class="work-card"><img src="assets/img/photo-pink.jpg" alt="Кузов автомобиля" style="object-position:50% 55%"><figcaption>Кузов</figcaption></figure>
    </div>

  </div>
</section>

${ctaBand('Хотите так же?', 'Запишитесь. Обсудим, что нужно вашему автомобилю.', 'assets/img/photo-interior.jpg')}
`;

const about = `
<section class="photo-hero">
  <img class="photo-hero__img" src="assets/img/photo-spray.jpg" alt="Пульверизаторы и составы для детейлинга">
  <div class="photo-hero__shade" aria-hidden="true"></div>
  <div class="container photo-hero__content">
    <span class="label label--light">Екатеринбург</span>
    <h1 class="photo-hero__title">Студия</h1>
    <p class="photo-hero__lead">Небольшая детейлинг-студия на Посадской, 3. Зал ожидания и внимание к деталям.</p>
    <div class="photo-hero__facts">
      <span><strong>${S.rating}</strong> на 2ГИС</span>
      <span>${S.ratings} оценок, ${S.reviews} отзывов</span>
      <span>${S.award}</span>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="container">
    <div class="module module--dark">
      ${sectionHead('Коротко', 'Что важно знать перед визитом.')}
      <div class="tile-grid">
        <div class="tile"><span class="tile__label">Рейтинг</span><p class="tile__value">${S.rating}</p><p>${S.ratings} оценок, ${S.reviews} отзывов на 2ГИС.</p></div>

        <div class="tile"><span class="tile__label">2025</span><p class="tile__value">2ГИС</p><p>Премия «Лучший детейлинг 2025».</p></div>
      </div>
      <p class="module__source">Адрес: ${S.address}. Запись по телефону, в WhatsApp или Telegram.</p>
    </div>
  </div>
</section>

${ctaBand('Приезжайте на Посадскую, 3.', 'Позвоните, подскажем по услугам, времени и маршруту.', 'assets/img/photo-2.jpg')}
`;

const reviews = `
<section class="page-head">
  <div class="container">
    ${label('Отзывы · 2ГИС')}
    <div class="reviews-head">
      <h1 class="page-head__title reviews-head__value">${S.rating}</h1>
      <p class="reviews-head__meta">${S.ratings} оценок · ${S.reviews} отзывов<br>рейтинг подтверждён</p>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="container">
    <div class="module module--dark">
      <p class="module__quote module__quote--large">«Как из салона»: так результат чаще всего описывают в отзывах.</p>
      <p class="module__source">${S.award}. Все ${S.reviews} отзывов в карточке 2ГИС.</p>
      <div class="tile-grid">
        <div class="tile"><span class="tile__label">Результат</span><p>Автомобиль выглядит свежим; в отзывах повторяется сравнение «как из салона».</p></div>
        <div class="tile"><span class="tile__label">Отношение</span><p>Отмечают внимательность и бережное отношение к машине.</p></div>
        <div class="tile"><span class="tile__label">Цена</span><p>Цены называют адекватными уровню работ.</p></div>
      </div>
      <div class="module__foot">
        ${pill('Читать в 2ГИС', S.map, 'red', ' target="_blank" rel="noopener"')}
      </div>
    </div>
    <p class="fineprint">Мы не переносим тексты отзывов на сайт: это чужие слова, их нужно читать в источнике.</p>
  </div>
</section>

${ctaBand('Лучше один раз увидеть.', 'Приезжайте на осмотр или запишитесь на услугу.', 'assets/img/photo-interior.jpg')}
`;

const contacts = `
<section class="page-head">
  <div class="container">
    ${label('Контакты · Екатеринбург')}
    <h1 class="page-head__title">Посадская, 3</h1>
    <p class="page-head__lead">Первый этаж, Верх-Исетский район. Выберите услуги, дату и время. Кнопки ниже откроют Telegram или WhatsApp с готовым текстом заявки.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container contact-grid">
    <form class="booking booking--dark" data-booking>
      <div class="booking__head">
        <span class="label">Запись</span>
        <span class="booking__badge">Ответ в мессенджере</span>
      </div>
      <h2 class="h2 booking__title">Выберите услуги и время</h2>
      <p class="booking__lead">Можно выбрать несколько услуг. Стоимость подтвердим при записи.</p>

      <fieldset class="field field--services">
        <legend>Услуги <span>можно несколько</span></legend>
        <div class="service-options">
          ${SERVICES.map(([name, price]) => `<label class="service-option"><input type="checkbox" value="${name}" data-service-check><span class="service-option__check" aria-hidden="true"></span><span class="service-option__text"><strong>${name}</strong><em>${price}</em></span></label>`).join('')}
        </div>
      </fieldset>

      <div class="booking__when">
        <div class="date-card" data-calendar>
          <button class="date-card__trigger" type="button" id="booking-date-trigger" aria-expanded="false" aria-controls="booking-calendar">
            <span class="date-card__label">Дата</span>
            <span class="date-card__value" id="booking-date-display">Выберите дату</span>
            <span class="date-card__hint">Откроется календарь</span>
          </button>
          <div class="calendar" id="booking-calendar" hidden>
            <div class="calendar__head">
              <button class="calendar__nav" type="button" data-calendar-prev aria-label="Предыдущий месяц">‹</button>
              <span class="calendar__month" data-calendar-month></span>
              <button class="calendar__nav" type="button" data-calendar-next aria-label="Следующий месяц">›</button>
            </div>
            <div class="calendar__weekdays" aria-hidden="true"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div>
            <div class="calendar__days" data-calendar-days></div>
          </div>
          <input type="hidden" id="booking-date" name="date">
        </div>
        <div class="time-card">
          <span class="time-card__label">Время</span>
          <div class="time-slots" role="group" aria-label="Время">
            ${['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'].map((value) => `<button class="time-slot" type="button" data-time-slot="${value}" aria-pressed="false">${value}</button>`).join('')}
          </div>
          <input type="hidden" id="booking-time" name="time">
        </div>
      </div>

      <div class="field booking__preview">
        <label for="booking-text">Текст заявки</label>
        <textarea id="booking-text" rows="4" readonly></textarea>
      </div>

      <div class="booking__actions">
        <a class="pill pill--red" id="booking-tg" href="#" aria-disabled="true" target="_blank" rel="noopener">Telegram</a>
        <a class="pill pill--outline" id="booking-wa" href="#" aria-disabled="true" target="_blank" rel="noopener">WhatsApp</a>
        <button class="booking__copy" type="button" id="booking-copy" disabled>Скопировать текст</button>
      </div>

      <p class="booking__hint" data-booking-status aria-live="polite">Выберите услуги, дату и время. Кнопки станут активны. Заявка не отправляется с сайта: откроется мессенджер с готовым текстом.</p>
    </form>

    <div class="contact-side">
      <div class="module module--dark contact-card">
        <span class="label">Связаться</span>
        <a class="contact-phone" href="${S.tel}">${S.phone}</a>
        <div class="contact-actions">
          ${pill('WhatsApp', S.wa, 'outline', ' target="_blank" rel="noopener"')}
          ${pill('Telegram', S.tg, 'outline', ' target="_blank" rel="noopener"')}
        </div>
        <address class="contact-address">${S.address}</address>
        <p class="contact-meta">Открытие в 10:00. Полный график уточняйте по телефону.</p>
        <div class="contact-actions">
          ${pill('Маршрут', S.route, 'red', ' target="_blank" rel="noopener"')}
          ${pill('2ГИС', S.map, 'outline', ' target="_blank" rel="noopener"')}
        </div>
      </div>
    </div>
  </div>
</section>
`;

const privacy = `
<section class="section section--paper section--doc">
  <div class="container container--narrow">
    ${label('Документы')}
    <h1 class="doc-title">Политика конфиденциальности</h1>
    <p class="fineprint">Редакция от 24 ноября 2026 года.</p>
    <div class="prose prose--ink">
      <h2>1. Общие положения</h2>
      <p>Настоящая политика описывает, как детейлинг-студия Optimus (далее студия) обрабатывает персональные данные посетителей сайта. Политика применяется только к этому сайту.</p>
      <h2>2. Какие данные обрабатываются</h2>
      <p>Сайт не содержит форм сбора персональных данных и не подключает аналитические или рекламные сервисы. При обращении по телефону, в WhatsApp или Telegram вы сами передаёте данные, необходимые для ответа: имя, номер телефона, сведения об автомобиле и запросе.</p>
      <h2>3. Цели обработки</h2>
      <p>Данные используются только для ответа на обращение, согласования услуги, времени визита и стоимости работ. Студия не передаёт их третьим лицам, кроме случаев, предусмотренных законом.</p>
      <h2>4. Правовые основания</h2>
      <p>Обработка осуществляется на основании согласия, которое вы даёте, обращаясь в студию, и в целях исполнения договора об оказании услуг.</p>
      <h2>5. Сроки и хранение</h2>
      <p>Данные хранятся столько, сколько необходимо для ответа на обращение и выполнения работ, либо в сроки, установленные законом. Вы можете запросить удаление данных, связавшись со студией.</p>
      <h2>6. Права посетителя</h2>
      <p>Вы вправе запросить информацию об обработке своих данных, их уточнение, блокирование или удаление, а также отозвать согласие. Для этого свяжитесь со студией по телефону или в мессенджере.</p>
      <h2>7. Контакты</h2>
      <p>${S.address}. Телефон: <a href="${S.tel}">${S.phone}</a>.</p>
      <h2>8. Изменения</h2>
      <p>Студия может обновлять политику. Актуальная редакция всегда размещена на этой странице.</p>
      <p class="fineprint">Перед публикацией документ нужно проверить у юриста и дополнить реквизитами оператора.</p>
    </div>
  </div>
</section>
`;

const jsonld = `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"AutoRepair","name":"Optimus","description":"Детейлинг-студия в Екатеринбурге","address":{"@type":"PostalAddress","streetAddress":"Посадская улица, 3","addressLocality":"Екатеринбург","postalCode":"620102","addressCountry":"RU"},"telephone":"+7 912 645-19-84","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"59"},"award":"Премия 2ГИС «Лучший детейлинг 2025»","sameAs":["https://2gis.ru/ekaterinburg/firm/70000001034290289"]}
</script>`;

const pages = {
  'index.html': {
    title: 'Optimus | детейлинг-студия в Екатеринбурге',
    description: 'Детейлинг-студия Optimus на Посадской, 3: полировка, химчистка, мойка и уход за автомобилем. 5,0 на 2ГИС.',
    body: home,
    jsonld,
  },
  'services.html': {
    title: 'Услуги | Optimus',
    description: 'Детейлинг, автомойка и кузовной ремонт в Optimus: полировка от 15 000 ₽, химчистка от 10 000 ₽, мойка от 2 000 ₽.',
    body: services,
  },
  'works.html': {
    title: 'Работы | Optimus',
    description: 'Фрагменты работ детейлинг-студии Optimus: кузов, салон, мойка.',
    body: works,
  },
  'about.html': {
    title: 'Студия | Optimus',
    description: 'Optimus, детейлинг-студия на Посадской, 3 в Екатеринбурге. 5,0 на 2ГИС, премия «Лучший детейлинг 2025».',
    body: about,
  },
  'contacts.html': {
    title: 'Контакты | Optimus',
    description: 'Optimus, Екатеринбург, Посадская улица, 3. Телефон +7 (912) 645-19-84, WhatsApp, Telegram.',
    body: contacts,
  },
  'privacy.html': {
    title: 'Политика конфиденциальности | Optimus',
    description: 'Политика конфиденциальности сайта детейлинг-студии Optimus.',
    body: privacy,
  },
};

for (const [file, page] of Object.entries(pages)) {
  fs.writeFileSync(path.join(OUT, file), layout({ file, ...page }), 'utf8');
  console.log('written', file);
}









