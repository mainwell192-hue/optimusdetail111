'use strict';

const fs = require('fs');
const path = require('path');

const OUT = __dirname;

const S = {
  name: 'Optimus',
  tagline: 'детейлинг-студия',
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
  award: 'Премия 2ГИС — «Лучший детейлинг 2025»',
};

const nav = [
  ['index.html', 'Главная'],
  ['works.html', 'Работы'],
  ['about.html', 'О студии'],
  ['reviews.html', 'Отзывы'],
  ['contacts.html', 'Контакты'],
];

const services = [
  ['detailing.html', 'Детейлинг'],
  ['wash.html', 'Автомойка'],
  ['body.html', 'Кузовной ремонт'],
  ['works.html', 'Работы'],
];

const btn = (label, href, kind = 'light', attrs = '') =>
  `<a class="btn btn--${kind}" href="${href}"${attrs}>${label}</a>`;

const eyebrow = (text) =>
  `<p class="eyebrow"><span class="eyebrow__dot" aria-hidden="true"></span>${text}</p>`;

const sectionHead = (index, title, note = '') =>
  `<div class="section__head">
    <p class="index">${index}</p>
    <div class="section__head-text">
      <h2 class="h2">${title}</h2>
      ${note ? `<p class="section__note">${note}</p>` : ''}
    </div>
  </div>`;

const priceList = (rows) =>
  `<ul class="price-list">${rows
    .map(
      ([name, note, value]) =>
        `<li class="price-list__row">
          <div class="price-list__main">
            <span class="price-list__name">${name}</span>
            ${note ? `<span class="price-list__note">${note}</span>` : ''}
          </div>
          <span class="price-list__value">${value}</span>
        </li>`
    )
    .join('')}</ul>`;

const faq = (items) =>
  `<div class="faq">${items
    .map(
      ([q, a]) =>
        `<details class="faq__item"><summary class="faq__q">${q}</summary><p class="faq__a">${a}</p></details>`
    )
    .join('')}</div>`;

const infoList = (items) =>
  `<ul class="info-list">${items
    .map(([title, text]) => `<li><h3>${title}</h3><p>${text}</p></li>`)
    .join('')}</ul>`;

const header = (active) => {
  const isService = ['detailing.html', 'wash.html', 'body.html'].includes(active);
  const link = ([file, label]) =>
    `<a href="${file}"${file === active ? ' aria-current="page"' : ''}>${label}</a>`;
  const mainLinks = nav
    .map((item) => {
      if (item[0] === 'works.html') {
        return `<div class="nav__item nav__item--drop">
          <a href="detailing.html"${isService ? ' aria-current="page"' : ''}>Услуги</a>
          <div class="nav__drop">${services
            .map(([f, l]) => `<a href="${f}">${l}</a>`)
            .join('')}</div>
        </div>${link(item)}`;
      }
      return link(item);
    })
    .join('');

  const mobileLinks = nav
    .map(([f, l]) => `<a href="${f}"${f === active ? ' aria-current="page"' : ''}>${l}</a>`)
    .join('');

  return `<header class="header" data-header>
    <div class="header__inner container">
      <a class="brand" href="index.html" aria-label="Optimus — на главную">
        <span class="brand__name">OPTIMUS</span>
        <span class="brand__sub">детейлинг-студия</span>
      </a>
      <nav class="nav" aria-label="Основная навигация">${mainLinks}</nav>
      <a class="header__phone" href="${S.tel}">${S.phone}</a>
      ${btn('Записаться', S.tel, 'light', ' data-cta="header"')}
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-menu" data-burger>
        <span class="burger__line" aria-hidden="true"></span>
        <span class="burger__line" aria-hidden="true"></span>
        <span class="sr-only">Открыть меню</span>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-menu" data-menu aria-hidden="true">
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        ${mobileLinks}
        <span class="mobile-menu__label">Услуги</span>
        ${services.map(([f, l]) => `<a class="mobile-menu__sub" href="${f}">${l}</a>`).join('')}
      </nav>
      <div class="mobile-menu__foot">
        <a class="mobile-menu__phone" href="${S.tel}">${S.phone}</a>
        <div class="actions actions--tight">
          ${btn('WhatsApp', S.wa, 'ghost', ' target="_blank" rel="noopener"')}
          ${btn('Telegram', S.tg, 'ghost', ' target="_blank" rel="noopener"')}
        </div>
      </div>
    </div>
  </header>`;
};

const footer = () => `<footer class="footer">
  <div class="container footer__top">
    <div class="footer__brand">
      <a class="brand" href="index.html" aria-label="Optimus — на главную">
        <span class="brand__name">OPTIMUS</span>
        <span class="brand__sub">детейлинг-студия</span>
      </a>
      <p>Полировка, химчистка, мойка и уход за автомобилем в Екатеринбурге.</p>
    </div>
    <div>
      <h3 class="footer__title">Услуги</h3>
      <ul class="footer__list">${services
        .map(([f, l]) => `<li><a href="${f}">${l}</a></li>`)
        .join('')}</ul>
    </div>
    <div>
      <h3 class="footer__title">Студия</h3>
      <ul class="footer__list">
        <li><a href="about.html">О студии</a></li>
        <li><a href="works.html">Работы</a></li>
        <li><a href="reviews.html">Отзывы</a></li>
        <li><a href="contacts.html">Контакты</a></li>
      </ul>
    </div>
    <div>
      <h3 class="footer__title">Связаться</h3>
      <address class="footer__address">${S.address}</address>
      <a class="footer__phone" href="${S.tel}">${S.phone}</a>
      <div class="footer__mess">
        <a href="${S.wa}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="${S.tg}" target="_blank" rel="noopener">Telegram</a>
      </div>
    </div>
  </div>
  <div class="container footer__bottom">
    <p>© <span data-year>2026</span> Optimus</p>
    <p>Данные и фотографии: карточка 2ГИС, 24.11.2026</p>
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
  <link rel="stylesheet" href="assets/css/style.css">
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
  <script src="assets/js/main.js"></script>
</body>
</html>`;

const home = `
<section class="hero">
  <div class="hero__text container">
    ${eyebrow('Детейлинг-студия · Екатеринбург')}
    <h1 class="display">Возвращаем кузову вид, а салону — свежесть.</h1>
    <p class="lead">Полировка, химчистка, мойка и уход за автомобилем. Посадская, 3 — Верх-Исетский район.</p>
    <div class="actions">
      ${btn('Записаться', S.tel, 'light')}
      ${btn('Смотреть работы', 'works.html', 'ghost')}
    </div>
  </div>
  <div class="hero__media">
    <div class="hero__frame">
      <img src="assets/img/photo-3.jpg" alt="Капли воды на синем кузове автомобиля после ухода" fetchpriority="high">
      <p class="hero__caption"><span>01</span> Кузов после ухода</p>
    </div>
  </div>
</section>

<section class="proof" aria-label="Данные карточки 2ГИС">
  <div class="container proof__grid">
    <div><span class="proof__value">${S.rating}</span><span class="proof__label">рейтинг на 2ГИС</span></div>
    <div><span class="proof__value">${S.ratings}</span><span class="proof__label">оценок</span></div>
    <div><span class="proof__value">${S.reviews}</span><span class="proof__label">отзывов</span></div>
    <div><span class="proof__value proof__value--award">2025</span><span class="proof__label">${S.award}</span></div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('01', 'Услуги', 'Полный цикл ухода — от регулярной мойки до подготовки автомобиля к продаже.')}
    <ul class="ledger">
      <li><a class="ledger__row" href="detailing.html">
        <span class="ledger__num">01</span>
        <span class="ledger__title">Детейлинг</span>
        <span class="ledger__desc">Полировка, химчистка салона, предпродажная подготовка</span>
        <span class="ledger__price">от 10 000 ₽</span>
        <span class="ledger__arrow" aria-hidden="true">↗</span>
      </a></li>
      <li><a class="ledger__row" href="wash.html">
        <span class="ledger__num">02</span>
        <span class="ledger__title">Автомойка</span>
        <span class="ledger__desc">Комплексная и бесконтактная мойка, воск, кварц, двигатель</span>
        <span class="ledger__price">от 2 000 ₽</span>
        <span class="ledger__arrow" aria-hidden="true">↗</span>
      </a></li>
      <li><a class="ledger__row" href="body.html">
        <span class="ledger__num">03</span>
        <span class="ledger__title">Кузовной ремонт</span>
        <span class="ledger__desc">Ремонт вмятин, полировка кузова</span>
        <span class="ledger__price">по запросу</span>
        <span class="ledger__arrow" aria-hidden="true">↗</span>
      </a></li>
      <li><a class="ledger__row" href="detailing.html">
        <span class="ledger__num">04</span>
        <span class="ledger__title">Оклейка и тонирование</span>
        <span class="ledger__desc">Нанесение плёнки, тонирование автостёкол</span>
        <span class="ledger__price">по запросу</span>
        <span class="ledger__arrow" aria-hidden="true">↗</span>
      </a></li>
    </ul>
    <p class="fineprint">Начальные цены — по карточке 2ГИС, прайс обновлён 4 февраля 2026. Не является публичной офертой.</p>
  </div>
</section>

<section class="band">
  <div class="band__frame">
    <img src="assets/img/photo-2.jpg" alt="Синий Audi RS3 крупным планом в студии" loading="lazy">
  </div>
  <div class="band__caption container">
    <p class="band__title">Свет. Линии. Кузов.</p>
    <p class="band__note">Фрагмент работы студии</p>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('02', 'В студии', 'Небольшая студия — поэтому к каждой машине внимательнее.')}
    ${infoList([
      ['До двух автомобилей', 'Одновременно в работе — не больше двух машин.'],
      ['Зал ожидания', 'Можно подождать внутри, пока автомобиль готовят.'],
      ['Wi-Fi и чай', 'Для клиентов студии.'],
      ['Запись', 'По телефону, в WhatsApp или Telegram.'],
    ])}
  </div>
</section>

<section class="section section--surface">
  <div class="container">
    ${sectionHead('03', 'Что отмечают клиенты', 'По 49 отзывам и 59 оценкам на 2ГИС.')}
    <div class="themes">
      <article class="theme"><h3>Результат</h3><p>Автомобиль выглядит свежим — в отзывах повторяется сравнение «как из салона».</p></article>
      <article class="theme"><h3>Отношение</h3><p>Отмечают внимательность и бережное отношение к машине и к клиенту.</p></article>
      <article class="theme"><h3>Цена</h3><p>Клиенты называют цены адекватными уровню работ.</p></article>
      <article class="theme"><h3>Возвращаются</h3><p>Многие приезжают снова и рекомендуют студию знакомым.</p></article>
    </div>
    <p class="fineprint">Тексты отзывов не переносим на сайт — читайте их в <a href="${S.map}" target="_blank" rel="noopener">карточке 2ГИС</a>.</p>
  </div>
</section>

${ctaBlock('04', 'Запишитесь на удобное время.', 'Позвоните или напишите — подскажем по услугам и стоимости.')}
`;

function ctaBlock(index, title, text) {
  return `<section class="cta">
  <div class="container cta__inner">
    <p class="index">${index}</p>
    <h2 class="h2 h2--cta">${title}</h2>
    <p class="cta__text">${text}</p>
    <div class="actions">
      ${btn('Позвонить', S.tel, 'light')}
      ${btn('WhatsApp', S.wa, 'ghost', ' target="_blank" rel="noopener"')}
      ${btn('Telegram', S.tg, 'ghost', ' target="_blank" rel="noopener"')}
    </div>
    <p class="cta__address">${S.addressShort} · ${S.phone}</p>
  </div>
</section>`;
}

const pageHero = ({ kicker, title, lead, img, alt, flip = false }) => `<section class="page-hero${flip ? ' page-hero--flip' : ''}">
  <div class="page-hero__text container">
    ${eyebrow(kicker)}
    <h1 class="display display--page">${title}</h1>
    <p class="lead">${lead}</p>
    <div class="actions">
      ${btn('Записаться', S.tel, 'light')}
      ${btn('Цены', '#prices', 'ghost')}
    </div>
  </div>
  <div class="page-hero__media">
    <img src="${img}" alt="${alt}" fetchpriority="high">
  </div>
</section>`;

const detailing = `
${pageHero({
  kicker: 'Услуга · детейлинг',
  title: 'Детейлинг',
  lead: 'Полировка кузова, химчистка салона и предпродажная подготовка. Работаем с кузовом и салоном, а не только с внешним блеском.',
  img: 'assets/img/photo-1.jpg',
  alt: 'Салон автомобиля после ухода',
})}

<section class="section" id="prices">
  <div class="container">
    ${sectionHead('01', 'Цены', 'Начальные цены по карточке 2ГИС. Точную стоимость уточняйте при записи.')}
    ${priceList([
      ['Полировка кузова', 'Восстановление блеска и удаление следов мойки', 'от 15 000 ₽'],
      ['Химчистка салона', 'Чистка салона и восстановление свежести', 'от 10 000 ₽'],
      ['Предпродажная подготовка', 'Комплекс работ перед продажей автомобиля', 'от 18 000 ₽'],
    ])}
    <p class="fineprint">Прайс обновлён 4 февраля 2026. Указанные значения — «от», не являются публичной офертой. Керамические покрытия и другие работы — по запросу.</p>
  </div>
</section>

<section class="section section--surface">
  <div class="container split">
    <div>
      ${sectionHead('02', 'Что входит')}
      ${infoList([
        ['Полировка кузова', 'Возвращает глубину цвета и убирает следы неправильной мойки.'],
        ['Химчистка салона', 'Ткань, кожа, ковры и багажник — по состоянию автомобиля.'],
        ['Предпродажная подготовка', 'Комплекс, чтобы автомобиль выглядел лучше перед продажей.'],
      ])}
    </div>
    <div class="split__media">
      <img src="assets/img/photo-5.jpg" alt="Чёрный автомобиль после мойки" loading="lazy">
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('03', 'Вопросы', 'Если чего-то нет в списке — позвоните, уточним.')}
    ${faq([
      ['Нужна ли предварительная запись?', 'Да, запись есть. В студии одновременно принимают до двух автомобилей, поэтому лучше согласовать время заранее — по телефону или в мессенджере.'],
      ['Сколько стоит полировка?', 'От 15 000 ₽ по прайсу 2ГИС. Точная стоимость зависит от состояния кузова — её подтверждают при записи.'],
      ['Есть ли гарантия на работы?', 'Условия гарантии уточняйте напрямую у студии по телефону. На сайте они не заявлены, чтобы не обещать лишнего.'],
    ])}
  </div>
</section>

${ctaBlock('04', 'Обсудим ваш автомобиль.', 'Расскажите, что нужно сделать, — подскажем по услуге и времени.')}
`;

const wash = `
${pageHero({
  kicker: 'Услуга · автомойка',
  title: 'Автомойка',
  lead: 'Комплексная и бесконтактная мойка, защитные составы и уход за кузовом. Запись — по телефону или в мессенджере.',
  img: 'assets/img/photo-3.jpg',
  alt: 'Капли воды на кузове после мойки',
})}

<section class="section" id="prices">
  <div class="container">
    ${sectionHead('01', 'Цены', 'Начальные цены по карточке 2ГИС. Прайс обновлён 4 февраля 2026.')}
    ${priceList([
      ['Мойка кузова', 'Базовая мойка', 'от 2 000 ₽'],
      ['Комплексная мойка', 'Кузов и салон', 'от 2 500 ₽'],
      ['Лёгкое кварцевое покрытие', 'После мойки', 'от 1 000 ₽'],
      ['Твёрдый воск', 'Защита и блеск', 'от 3 500 ₽'],
    ])}
    <p class="fineprint">Не является публичной офертой. Актуальную стоимость уточняйте при записи.</p>
  </div>
</section>

<section class="section section--surface">
  <div class="container">
    ${sectionHead('02', 'Что есть в студии')}
    ${infoList([
      ['Бесконтактная мойка', 'Щадящий режим для кузова.'],
      ['Мойка двигателя', 'По запросу.'],
      ['До двух автомобилей', 'Одновременно, без конвейера.'],
      ['Зал ожидания', 'Wi-Fi и чай для клиентов.'],
    ])}
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('03', 'Вопросы')}
    ${faq([
      ['Нужно ли записываться?', 'Запись возможна и рекомендуется: одновременно в студии до двух автомобилей. Позвоните или напишите в мессенджер.'],
      ['Чем отличается кварцевое покрытие от воска?', 'Это разные составы для защиты и блеска кузова после мойки. Что подойдёт вашей машине — уточните у студии.'],
    ])}
  </div>
</section>

${ctaBlock('04', 'Запишитесь на мойку.', 'Согласуем время и уточним, что нужно автомобилю.')}
`;

const body = `
${pageHero({
  kicker: 'Услуга · кузов',
  title: 'Кузовной ремонт',
  lead: 'Ремонт вмятин и полировка кузова. Покраску и другие работы уточняйте по телефону — на сайте не обещаем то, что нужно подтвердить.',
  img: 'assets/img/photo-4.jpg',
  alt: 'Чёрный автомобиль после кузовных работ',
})}

<section class="section" id="prices">
  <div class="container">
    ${sectionHead('01', 'Работы', 'Стоимость зависит от повреждения — её называют после осмотра.')}
    ${priceList([
      ['Ремонт вмятин', 'Возможность и способ ремонта уточняйте', 'по запросу'],
      ['Полировка кузова', 'Восстановление блеска', 'от 15 000 ₽'],
    ])}
    <p class="fineprint">Покраска и другие кузовные работы в прайсе 2ГИС не указаны. Не заявляем их как услугу — уточняйте по телефону.</p>
  </div>
</section>

<section class="section section--surface">
  <div class="container split">
    <div>
      ${sectionHead('02', 'Что важно знать')}
      ${infoList([
        ['Оценка по состоянию', 'Стоимость ремонта зависит от размера и расположения повреждения.'],
        ['Полировка', 'Выполняется как самостоятельная услуга или в составе детейлинга.'],
        ['Запись', 'Позвоните или пришлите описание — согласуем осмотр.'],
      ])}
    </div>
    <div class="split__media">
      <img src="assets/img/photo-2.jpg" alt="Кузов автомобиля крупным планом" loading="lazy">
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead('03', 'Вопросы')}
    ${faq([
      ['Можно ли оценить ремонт по фото?', 'Уточните у студии: позвоните или напишите в WhatsApp/Telegram. Точную оценку обычно дают после осмотра.'],
      ['Делаете ли покраску?', 'В карточке 2ГИС покраска не указана как услуга. Этот вопрос нужно подтвердить напрямую у студии.'],
    ])}
  </div>
</section>

${ctaBlock('04', 'Расскажите о повреждении.', 'Подскажем, что можно сделать и когда приехать.')}
`;

const works = `
<section class="section section--top">
  <div class="container">
    ${eyebrow('Работы · фрагменты')}
    <h1 class="display display--page">Работы</h1>
    <p class="lead lead--wide">Несколько кадров из карточки студии. Это фрагменты, а не полная галерея: остальные фотографии — в 2ГИС.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="mosaic">
      <figure class="mosaic__item mosaic__item--tall">
        <img src="assets/img/photo-3.jpg" alt="Кузов автомобиля с каплями воды" loading="lazy">
        <figcaption>Кузов после ухода</figcaption>
      </figure>
      <figure class="mosaic__item">
        <img src="assets/img/photo-2.jpg" alt="Передняя часть синего автомобиля" loading="lazy">
        <figcaption>Кузов и детали</figcaption>
      </figure>
      <figure class="mosaic__item">
        <img src="assets/img/photo-1.jpg" alt="Салон автомобиля" loading="lazy">
        <figcaption>Салон</figcaption>
      </figure>
      <figure class="mosaic__item mosaic__item--wide">
        <img src="assets/img/photo-4.jpg" alt="Чёрный автомобиль после мойки" loading="lazy">
        <figcaption>Мойка и уход</figcaption>
      </figure>
    </div>
    <p class="fineprint">Фотографии: карточка Optimus на 2ГИС. Подписи описывают кадр, а не заявляют конкретный процесс. Полная галерея — <a href="${S.map}" target="_blank" rel="noopener">в 2ГИС</a>.</p>
  </div>
</section>

${ctaBlock('01', 'Хотите так же?', 'Запишитесь — обсудим, что нужно вашему автомобилю.')}
`;

const about = `
<section class="section section--top">
  <div class="container">
    <div class="about__head">
      <div>
        ${eyebrow('О студии · Екатеринбург')}
        <h1 class="display display--page">Небольшая студия с большим вниманием к деталям.</h1>
      </div>
      <p class="about__lead">Optimus — детейлинг-студия на Посадской, 3. Полировка, химчистка, мойка и уход за автомобилем.</p>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container split split--about">
    <div class="split__text">
      <p class="body-text">В студии одновременно принимают до двух автомобилей. Это не поток: у команды есть время на осмотр, подготовку и работу с деталями.</p>
      <p class="body-text">На 2ГИС у студии ${S.rating} при ${S.ratings} оценках и ${S.reviews} отзывах. В 2025 году — ${S.award.toLowerCase()}.</p>
      <p class="body-text">Для клиентов есть зал ожидания, Wi-Fi и чай. Записаться можно по телефону, в WhatsApp или Telegram.</p>
      <div class="actions">
        ${btn('Записаться', S.tel, 'light')}
        ${btn('Контакты', 'contacts.html', 'ghost')}
      </div>
    </div>
    <div class="split__media split__media--tall">
      <img src="assets/img/photo-1.jpg" alt="Салон автомобиля после детейлинга" loading="lazy">
    </div>
  </div>
</section>

<section class="section section--surface">
  <div class="container">
    ${sectionHead('01', 'Коротко')}
    ${infoList([
      ['Адрес', 'Посадская улица, 3, 1 этаж. Верх-Исетский район, Юго-Западный микрорайон.'],
      ['Рейтинг', S.rating + ' на 2ГИС: ' + S.ratings + ' оценок, ' + S.reviews + ' отзывов.'],
      ['Премия', 'Премия 2ГИС — «Лучший детейлинг 2025».'],
      ['Формат', 'До двух автомобилей одновременно, зал ожидания, запись.'],
    ])}
  </div>
</section>

${ctaBlock('02', 'Приезжайте на Посадскую, 3.', 'Позвоните — подскажем по услугам, времени и маршруту.')}
`;

const reviews = `
<section class="section section--top">
  <div class="container">
    ${eyebrow('Отзывы · 2ГИС')}
    <div class="reviews__head">
      <h1 class="display display--page">${S.rating}</h1>
      <div class="reviews__meta">
        <p class="lead">Рейтинг на 2ГИС: ${S.ratings} оценок, ${S.reviews} отзывов. Рейтинг подтверждён.</p>
        <div class="actions">
          ${btn('Читать отзывы', S.map, 'ghost', ' target="_blank" rel="noopener"')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="themes themes--four">
      <article class="theme"><h3>Результат</h3><p>Автомобиль выглядит свежим; в отзывах повторяется сравнение «как из салона».</p></article>
      <article class="theme"><h3>Отношение</h3><p>Клиенты отмечают внимательность и бережное отношение к машине.</p></article>
      <article class="theme"><h3>Цена</h3><p>Цены называют адекватными уровню работ.</p></article>
      <article class="theme"><h3>Повторные визиты</h3><p>Многие возвращаются и рекомендуют студию.</p></article>
    </div>
    <p class="fineprint">Мы не переносим тексты отзывов на сайт: это чужие слова, их нужно читать в источнике. Все ${S.reviews} отзывов — <a href="${S.map}" target="_blank" rel="noopener">в карточке 2ГИС</a>.</p>
  </div>
</section>

${ctaBlock('01', 'Лучше один раз увидеть.', 'Приезжайте на осмотр или запишитесь на услугу.')}
`;

const contacts = `
<section class="section section--top">
  <div class="container">
    ${eyebrow('Контакты · Екатеринбург')}
    <h1 class="display display--page">Посадская, 3.</h1>
    <p class="lead lead--wide">Первый этаж, Верх-Исетский район. Позвоните или напишите — согласуем услугу и время.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container contacts">
    <div class="contacts__col">
      <h2 class="h3">Связаться</h2>
      <a class="contact-line" href="${S.tel}"><span>Телефон</span><strong>${S.phone}</strong></a>
      <a class="contact-line" href="${S.wa}" target="_blank" rel="noopener"><span>WhatsApp</span><strong>Написать</strong></a>
      <a class="contact-line" href="${S.tg}" target="_blank" rel="noopener"><span>Telegram</span><strong>@dtlg_optimus</strong></a>
      <p class="fineprint">Сообщения в мессенджерах — самый быстрый способ уточнить стоимость и время.</p>
    </div>
    <div class="contacts__col">
      <h2 class="h3">Студия</h2>
      <address class="contacts__address">${S.address}</address>
      <p class="body-text">Открытие в 10:00. Полный график уточняйте по телефону: на карточке 2ГИС указано только время открытия.</p>
      <div class="actions">
        ${btn('Маршрут', S.route, 'light', ' target="_blank" rel="noopener"')}
        ${btn('Карточка 2ГИС', S.map, 'ghost', ' target="_blank" rel="noopener"')}
      </div>
    </div>
  </div>
</section>

<section class="section section--surface">
  <div class="container">
    ${sectionHead('01', 'Перед визитом')}
    ${infoList([
      ['Запись', 'Позвоните или напишите: в студии до двух автомобилей одновременно.'],
      ['Что уточнить', 'Услугу, стоимость, время и сколько автомобиль будет в работе.'],
      ['Оплата', 'Карта, наличные, банковский перевод, перевод с карты, QR-код.'],
    ])}
  </div>
</section>

${ctaBlock('02', 'Ждём вас на Посадской, 3.', 'Позвоните — ответим на вопросы и согласуем время.')}
`;

const privacy = `
<section class="section section--top">
  <div class="container container--narrow">
    ${eyebrow('Документы')}
    <h1 class="display display--page">Политика конфиденциальности</h1>
    <p class="fineprint">Редакция от 24 ноября 2026 года.</p>

    <div class="prose">
      <h2>1. Общие положения</h2>
      <p>Настоящая политика описывает, как детейлинг-студия Optimus (далее — студия) обрабатывает персональные данные посетителей сайта. Политика применяется только к этому сайту.</p>

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
      <p>${S.address}. Телефон: <a href="${S.tel}">${S.phone}</a>. WhatsApp и Telegram — по ссылкам в разделе «Контакты».</p>

      <h2>8. Изменения</h2>
      <p>Студия может обновлять политику. Актуальная редакция всегда размещена на этой странице.</p>
    </div>

    <p class="fineprint">Перед публикацией документ нужно проверить у юриста и дополнить реквизитами оператора.</p>
  </div>
</section>
`;

const jsonld = `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"AutoRepair","name":"Optimus","description":"Детейлинг-студия в Екатеринбурге","address":{"@type":"PostalAddress","streetAddress":"Посадская улица, 3","addressLocality":"Екатеринбург","postalCode":"620102","addressCountry":"RU"},"telephone":"+7 912 645-19-84","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"59"},"award":"Премия 2ГИС — «Лучший детейлинг 2025»","sameAs":["https://2gis.ru/ekaterinburg/firm/70000001034290289"]}
</script>`;

const pages = {
  'index.html': {
    title: 'Optimus — детейлинг-студия в Екатеринбурге',
    description: 'Детейлинг-студия Optimus на Посадской, 3: полировка, химчистка, мойка и уход за автомобилем. 5,0 на 2ГИС.',
    body: home,
    jsonld,
  },
  'detailing.html': {
    title: 'Детейлинг в Екатеринбурге — Optimus',
    description: 'Полировка кузова от 15 000 ₽, химчистка салона от 10 000 ₽, предпродажная подготовка от 18 000 ₽. Optimus, Посадская, 3.',
    body: detailing,
  },
  'wash.html': {
    title: 'Автомойка в Екатеринбурге — Optimus',
    description: 'Комплексная мойка от 2 500 ₽, мойка кузова от 2 000 ₽, кварц и воск. Optimus, Посадская, 3.',
    body: wash,
  },
  'body.html': {
    title: 'Кузовной ремонт — Optimus',
    description: 'Ремонт вмятин и полировка кузова в детейлинг-студии Optimus, Екатеринбург, Посадская, 3.',
    body: body,
  },
  'works.html': {
    title: 'Работы — Optimus',
    description: 'Фрагменты работ детейлинг-студии Optimus: кузов, салон, мойка. Полная галерея — в 2ГИС.',
    body: works,
  },
  'about.html': {
    title: 'О студии — Optimus',
    description: 'Optimus — детейлинг-студия на Посадской, 3 в Екатеринбурге. 5,0 на 2ГИС, премия «Лучший детейлинг 2025».',
    body: about,
  },
  'reviews.html': {
    title: 'Отзывы — Optimus',
    description: 'Рейтинг 5,0 на 2ГИС: 59 оценок и 49 отзывов о детейлинг-студии Optimus.',
    body: reviews,
  },
  'contacts.html': {
    title: 'Контакты — Optimus',
    description: 'Optimus, Екатеринбург, Посадская улица, 3. Телефон +7 (912) 645-19-84, WhatsApp, Telegram.',
    body: contacts,
  },
  'privacy.html': {
    title: 'Политика конфиденциальности — Optimus',
    description: 'Политика конфиденциальности сайта детейлинг-студии Optimus.',
    body: privacy,
  },
};

for (const [file, page] of Object.entries(pages)) {
  const html = layout({ file, ...page });
  fs.writeFileSync(path.join(OUT, file), html, 'utf8');
  console.log('written', file);
}
