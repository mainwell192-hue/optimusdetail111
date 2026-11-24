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
  ['about.html', 'Студия'],
  ['reviews.html', 'Отзывы'],
  ['contacts.html', 'Контакты'],
];

const services = [
  ['detailing.html', 'Детейлинг'],
  ['wash.html', 'Автомойка'],
  ['body.html', 'Кузовной ремонт'],
];

const btn = (label, href, kind = 'solid', attrs = '') =>
  `<a class="btn btn--${kind}" href="${href}"${attrs}>${label}</a>`;

const textLink = (label, href, attrs = '') =>
  `<a class="text-link" href="${href}"${attrs}>${label}</a>`;

const kicker = (text) => `<p class="kicker">${text}</p>`;

const sectionTitle = (text) => `<h2 class="section-title">${text}</h2>`;

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

const cleanList = (items) =>
  `<ul class="clean-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

const header = (active) => {
  const isService = ['detailing.html', 'wash.html', 'body.html'].includes(active);
  const mainLinks = nav
    .map((item) => {
      if (item[0] === 'works.html') {
        return `<div class="nav__item nav__item--drop">
          <a href="detailing.html"${isService ? ' aria-current="page"' : ''}>Услуги</a>
          <div class="nav__drop">${services
            .map(([f, l]) => `<a href="${f}">${l}</a>`)
            .join('')}</div>
        </div>${`<a href="${item[0]}"${item[0] === active ? ' aria-current="page"' : ''}>${item[1]}</a>`}`;
      }
      return `<a href="${item[0]}"${item[0] === active ? ' aria-current="page"' : ''}>${item[1]}</a>`;
    })
    .join('');

  return `<header class="header" data-header>
    <div class="header__inner container">
      <a class="brand" href="index.html" aria-label="Optimus — на главную">
        <span class="brand__name">OPTIMUS</span>
        <span class="brand__sub">детейлинг-студия</span>
      </a>
      <nav class="nav" aria-label="Основная навигация">${mainLinks}</nav>
      <a class="header__phone" href="${S.tel}">${S.phone}</a>
      <a class="header__cta" href="${S.tel}">Записаться</a>
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
        <span class="mobile-menu__label">Услуги</span>
        ${services
          .map(([f, l]) => `<a class="mobile-menu__sub" href="${f}">${l}</a>`)
          .join('')}
      </nav>
      <div class="mobile-menu__foot">
        <a class="mobile-menu__phone" href="${S.tel}">${S.phone}</a>
        <div class="actions">
          ${btn('WhatsApp', S.wa, 'outline', ' target="_blank" rel="noopener"')}
          ${btn('Telegram', S.tg, 'outline', ' target="_blank" rel="noopener"')}
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
    <nav class="footer__nav" aria-label="Навигация в подвале">
      <a href="detailing.html">Детейлинг</a>
      <a href="wash.html">Автомойка</a>
      <a href="body.html">Кузовной ремонт</a>
      <a href="works.html">Работы</a>
      <a href="about.html">Студия</a>
      <a href="reviews.html">Отзывы</a>
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
  <meta name="theme-color" content="#050505">
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

function ctaBlock(kickerText, title, text) {
  return `<section class="cta">
  <div class="container cta__inner">
    ${kicker(kickerText)}
    <h2 class="cta__title">${title}</h2>
    <p class="cta__text">${text}</p>
    <div class="cta__actions">
      ${btn('Позвонить', S.tel, 'solid')}
      ${btn('WhatsApp', S.wa, 'outline', ' target="_blank" rel="noopener"')}
      ${btn('Telegram', S.tg, 'outline', ' target="_blank" rel="noopener"')}
    </div>
  </div>
</section>`;
}

function pageHero({ kick, title, lead, img, alt }) {
  return `<section class="page-hero">
  <img class="page-hero__img" src="${img}" alt="${alt}" fetchpriority="high">
  <div class="page-hero__shade" aria-hidden="true"></div>
  <div class="container page-hero__content">
    ${kicker(kick)}
    <h1 class="page-hero__title">${title}</h1>
    <p class="page-hero__lead">${lead}</p>
  </div>
</section>`;
}

const home = `
<section class="hero">
  <video class="hero__video" autoplay muted loop playsinline poster="assets/img/photo-2.jpg" aria-hidden="true">
    <source src="assets/video/hero.mp4" type="video/mp4">
  </video>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="container hero__content">
    ${kicker('Екатеринбург · Посадская, 3')}
    <h1 class="hero__title">Детейлинг<br>без спешки.</h1>
    <p class="hero__sub">Полировка, химчистка и уход за автомобилем. Студия на две машины — без конвейера.</p>
    <div class="hero__actions">
      ${btn('Записаться', S.tel, 'solid')}
      ${textLink('Смотреть работы', 'works.html')}
    </div>
  </div>
  <div class="container hero__meta">
    <p><strong>${S.rating}</strong> · ${S.ratings} оценок · ${S.reviews} отзывов</p>
    <p>2ГИС · Премия «Лучший детейлинг 2025»</p>
  </div>
</section>

<section class="statement">
  <div class="container statement__inner">
    ${kicker('Студия')}
    <p class="statement__text">Две машины одновременно. Никакого конвейера — только время, свет и внимание к линиям.</p>
    <p class="statement__meta">${S.rating} на 2ГИС · ${S.ratings} оценок · ${S.reviews} отзывов · ${S.award}</p>
  </div>
</section>

<section class="services">
  <div class="container">
    <div class="services__head">
      ${sectionTitle('Услуги')}
      <p class="services__note">От регулярной мойки до подготовки к продаже. Начальные цены — по карточке 2ГИС.</p>
    </div>
    <div class="service-list">
      <a class="service" href="detailing.html">
        <span class="service__name">Детейлинг</span>
        <span class="service__meta">Полировка · химчистка · предпродажная подготовка</span>
        <span class="service__price">от 10 000 ₽</span>
      </a>
      <a class="service" href="wash.html">
        <span class="service__name">Автомойка</span>
        <span class="service__meta">Комплексная мойка · воск · кварц · двигатель</span>
        <span class="service__price">от 2 000 ₽</span>
      </a>
      <a class="service" href="body.html">
        <span class="service__name">Кузовной ремонт</span>
        <span class="service__meta">Ремонт вмятин · полировка</span>
        <span class="service__price">по запросу</span>
      </a>
      <a class="service" href="detailing.html">
        <span class="service__name">Оклейка и тонирование</span>
        <span class="service__meta">Плёнка · тонирование автостёкол</span>
        <span class="service__price">по запросу</span>
      </a>
    </div>
    <p class="fineprint">Прайс обновлён 4 февраля 2026. Не является публичной офертой.</p>
  </div>
</section>

<section class="band">
  <img src="assets/img/photo-2.jpg" alt="Кузов автомобиля крупным планом в студии">
  <div class="band__shade" aria-hidden="true"></div>
  <div class="container band__caption">
    <p class="band__title">Свет. Линии. Кузов.</p>
    <p class="band__note">Фрагмент работы студии</p>
  </div>
</section>

<section class="split">
  <div class="split__media">
    <img src="assets/img/photo-1.jpg" alt="Салон автомобиля после детейлинга">
  </div>
  <div class="split__body">
    ${kicker('В студии')}
    <h2 class="split__title">Студия,<br>а не поток.</h2>
    <p class="split__text">До двух автомобилей одновременно. Можно подождать внутри: зал ожидания, Wi-Fi и чай.</p>
    ${cleanList([
      'Запись по телефону, в WhatsApp или Telegram',
      'Оплата картой, наличными, переводом и по QR-коду',
      'Посадская, 3 — Верх-Исетский район',
    ])}
  </div>
</section>

<section class="quote">
  <div class="container">
    <p class="quote__text">«Как из салона» — так результат чаще всего описывают в отзывах.</p>
    <div class="quote__foot">
      <p class="quote__source">${S.reviews} отзывов · ${S.rating} на 2ГИС</p>
      ${textLink('Читать отзывы', 'reviews.html')}
    </div>
  </div>
</section>

<section class="cta-image">
  <img src="assets/img/photo-3.jpg" alt="" aria-hidden="true">
  <div class="cta-image__shade" aria-hidden="true"></div>
  <div class="container cta-image__content">
    <h2 class="cta-image__title">Запишитесь.</h2>
    <p class="cta-image__text">Позвоните или напишите — подскажем по услугам и времени.</p>
    <div class="cta-image__actions">
      ${btn('Позвонить', S.tel, 'solid')}
      ${btn('WhatsApp', S.wa, 'outline', ' target="_blank" rel="noopener"')}
      ${btn('Telegram', S.tg, 'outline', ' target="_blank" rel="noopener"')}
    </div>
    <a class="cta-image__phone" href="${S.tel}">${S.phone}</a>
  </div>
</section>
`;

const detailing = `
${pageHero({
  kick: 'Услуга',
  title: 'Детейлинг',
  lead: 'Полировка, химчистка и предпродажная подготовка. Работаем с кузовом и салоном, а не только с внешним блеском.',
  img: 'assets/img/photo-1.jpg',
  alt: 'Салон автомобиля после ухода',
})}

<section class="page-section">
  <div class="container">
    ${kicker('Цены')}
    ${priceList([
      ['Полировка кузова', 'Восстановление блеска и удаление следов мойки', 'от 15 000 ₽'],
      ['Химчистка салона', 'Чистка салона и восстановление свежести', 'от 10 000 ₽'],
      ['Предпродажная подготовка', 'Комплекс работ перед продажей автомобиля', 'от 18 000 ₽'],
    ])}
    <p class="fineprint">Прайс обновлён 4 февраля 2026. Значения — «от», не являются публичной офертой. Керамические покрытия и другие работы — по запросу.</p>
  </div>
</section>

<section class="band band--short">
  <img src="assets/img/photo-2.jpg" alt="Кузов автомобиля после полировки">
  <div class="band__shade" aria-hidden="true"></div>
  <div class="container band__caption">
    <p class="band__title">Работа с кузовом</p>
    <p class="band__note">Полировка · подготовка · покрытие</p>
  </div>
</section>

<section class="page-section page-section--split">
  <div class="container page-section__grid">
    <div>${kicker('Что входит')}</div>
    <div>
      ${cleanList([
        'Полировка кузова — блеск и удаление следов неправильной мойки',
        'Химчистка салона — ткань, кожа, ковры и багажник',
        'Предпродажная подготовка — комплекс перед продажей',
        'Керамические покрытия и другие работы — по запросу',
      ])}
    </div>
  </div>
</section>

<section class="page-section">
  <div class="container">
    ${kicker('Вопросы')}
    ${faq([
      ['Нужна ли предварительная запись?', 'Да. В студии одновременно принимают до двух автомобилей, поэтому лучше согласовать время заранее — по телефону или в мессенджере.'],
      ['Сколько стоит полировка?', 'От 15 000 ₽ по прайсу 2ГИС. Точная стоимость зависит от состояния кузова — её подтверждают при записи.'],
      ['Есть ли гарантия на работы?', 'Условия гарантии уточняйте напрямую у студии по телефону: на сайте они не заявлены, чтобы не обещать лишнего.'],
    ])}
  </div>
</section>

${ctaBlock('Запись', 'Обсудим ваш автомобиль.', 'Расскажите, что нужно сделать, — подскажем по услуге и времени.')}
`;

const wash = `
${pageHero({
  kick: 'Услуга',
  title: 'Автомойка',
  lead: 'Комплексная и бесконтактная мойка, защитные составы и уход за кузовом. Запись — по телефону или в мессенджере.',
  img: 'assets/img/photo-3.jpg',
  alt: 'Капли воды на кузове после мойки',
})}

<section class="page-section">
  <div class="container">
    ${kicker('Цены')}
    ${priceList([
      ['Мойка кузова', 'Базовая мойка', 'от 2 000 ₽'],
      ['Комплексная мойка', 'Кузов и салон', 'от 2 500 ₽'],
      ['Лёгкое кварцевое покрытие', 'После мойки', 'от 1 000 ₽'],
      ['Твёрдый воск', 'Защита и блеск', 'от 3 500 ₽'],
    ])}
    <p class="fineprint">Прайс обновлён 4 февраля 2026. Не является публичной офертой; актуальную стоимость уточняйте при записи.</p>
  </div>
</section>

<section class="page-section page-section--split">
  <div class="container page-section__grid">
    <div>${kicker('В студии')}</div>
    <div>
      ${cleanList([
        'Бесконтактная мойка — щадящий режим для кузова',
        'Мойка двигателя — по запросу',
        'До двух автомобилей одновременно, без конвейера',
        'Зал ожидания, Wi-Fi и чай для клиентов',
      ])}
    </div>
  </div>
</section>

<section class="band band--short">
  <img src="assets/img/photo-2.jpg" alt="Кузов после мойки">
  <div class="band__shade" aria-hidden="true"></div>
  <div class="container band__caption">
    <p class="band__title">Мойка и уход</p>
    <p class="band__note">Кузов · салон · защита</p>
  </div>
</section>

<section class="page-section">
  <div class="container">
    ${kicker('Вопросы')}
    ${faq([
      ['Нужно ли записываться?', 'Запись возможна и рекомендуется: одновременно в студии до двух автомобилей. Позвоните или напишите в мессенджер.'],
      ['Чем отличается кварцевое покрытие от воска?', 'Это разные составы для защиты и блеска кузова после мойки. Что подойдёт вашей машине — уточните у студии.'],
    ])}
  </div>
</section>

${ctaBlock('Запись', 'Запишитесь на мойку.', 'Согласуем время и уточним, что нужно автомобилю.')}
`;

const body = `
${pageHero({
  kick: 'Услуга',
  title: 'Кузовной ремонт',
  lead: 'Ремонт вмятин и полировка кузова. Покраску и другие работы уточняйте по телефону — на сайте не обещаем то, что нужно подтвердить.',
  img: 'assets/img/photo-2.jpg',
  alt: 'Кузов автомобиля крупным планом',
})}

<section class="page-section">
  <div class="container">
    ${kicker('Работы')}
    ${priceList([
      ['Ремонт вмятин', 'Возможность и способ ремонта уточняйте', 'по запросу'],
      ['Полировка кузова', 'Восстановление блеска', 'от 15 000 ₽'],
    ])}
    <p class="fineprint">Покраска и другие кузовные работы в прайсе 2ГИС не указаны. Не заявляем их как услугу — уточняйте по телефону.</p>
  </div>
</section>

<section class="page-section page-section--split">
  <div class="container page-section__grid">
    <div>${kicker('Подход')}</div>
    <div>
      <p class="page-lead">Сначала осмотр и оценка повреждения. Потом — согласованный объём работ и время.</p>
      ${cleanList([
        'Стоимость зависит от размера и расположения повреждения',
        'Полировка выполняется отдельно или в составе детейлинга',
        'Запись — по телефону или в мессенджере',
      ])}
    </div>
  </div>
</section>

<section class="band band--short">
  <img src="assets/img/photo-4.jpg" alt="Кузовной ремонт" style="object-position:50% 100%">
  <div class="band__shade" aria-hidden="true"></div>
  <div class="container band__caption">
    <p class="band__title">Кузов</p>
    <p class="band__note">Вмятины · полировка</p>
  </div>
</section>

<section class="page-section">
  <div class="container">
    ${kicker('Вопросы')}
    ${faq([
      ['Можно ли оценить ремонт по фото?', 'Уточните у студии: позвоните или напишите в WhatsApp/Telegram. Точную оценку обычно дают после осмотра.'],
      ['Делаете ли покраску?', 'В карточке 2ГИС покраска не указана как услуга. Этот вопрос нужно подтвердить напрямую у студии.'],
    ])}
  </div>
</section>

${ctaBlock('Запись', 'Расскажите о повреждении.', 'Подскажем, что можно сделать и когда приехать.')}
`;

const works = `
<section class="page-head">
  <div class="container">
    ${kicker('Работы · фрагменты')}
    <h1 class="page-head__title">Работы</h1>
    <p class="page-head__lead">Несколько кадров из карточки студии. Это фрагменты, а не полная галерея: остальные фотографии — в 2ГИС.</p>
  </div>
</section>

<section class="mosaic">
  <div class="container mosaic__grid">
    <figure class="mosaic__item mosaic__item--large">
      <img src="assets/img/photo-3.jpg" alt="Кузов автомобиля с каплями воды" loading="lazy">
      <figcaption>Кузов после ухода</figcaption>
    </figure>
    <figure class="mosaic__item mosaic__item--offset">
      <img src="assets/img/photo-2.jpg" alt="Передняя часть автомобиля" loading="lazy">
      <figcaption>Кузов и детали</figcaption>
    </figure>
    <figure class="mosaic__item">
      <img src="assets/img/photo-1.jpg" alt="Салон автомобиля" loading="lazy">
      <figcaption>Салон</figcaption>
    </figure>
    <figure class="mosaic__item mosaic__item--wide">
      <img src="assets/img/photo-4.jpg" alt="Чёрный автомобиль после мойки" loading="lazy" style="object-position:50% 75%">
      <figcaption>Мойка и уход</figcaption>
    </figure>
  </div>
</section>

<section class="page-section page-section--tight">
  <div class="container">
    <p class="fineprint">Фотографии: карточка Optimus на 2ГИС. Подписи описывают кадр, а не заявляют конкретный процесс. Полная галерея — <a href="${S.map}" target="_blank" rel="noopener">в 2ГИС</a>.</p>
  </div>
</section>

${ctaBlock('Запись', 'Хотите так же?', 'Запишитесь — обсудим, что нужно вашему автомобилю.')}
`;

const about = `
${pageHero({
  kick: 'Студия · Екатеринбург',
  title: 'Студия',
  lead: 'Небольшая детейлинг-студия на Посадской, 3. Две машины одновременно, зал ожидания и внимание к деталям.',
  img: 'assets/img/photo-2.jpg',
  alt: 'Кузов автомобиля в студии',
})}

<section class="page-section page-section--split">
  <div class="container page-section__grid">
    <div>${kicker('О нас')}</div>
    <div>
      <p class="page-lead">В студии одновременно принимают до двух автомобилей. Это не поток: у команды есть время на осмотр, подготовку и работу с деталями.</p>
      <p class="body-text">На 2ГИС у студии ${S.rating} при ${S.ratings} оценках и ${S.reviews} отзывах. В 2025 году студия получила премию 2ГИС «Лучший детейлинг 2025».</p>
      <p class="body-text">Для клиентов есть зал ожидания, Wi-Fi и чай. Записаться можно по телефону, в WhatsApp или Telegram.</p>
    </div>
  </div>
</section>

<section class="band band--short">
  <img src="assets/img/photo-1.jpg" alt="Салон автомобиля">
  <div class="band__shade" aria-hidden="true"></div>
  <div class="container band__caption">
    <p class="band__title">Салон</p>
    <p class="band__note">Детали, которые видно</p>
  </div>
</section>

<section class="page-section">
  <div class="container">
    ${kicker('Коротко')}
    ${cleanList([
      'Адрес: Посадская улица, 3, 1 этаж — Верх-Исетский район',
      'Рейтинг: ' + S.rating + ' на 2ГИС, ' + S.ratings + ' оценок, ' + S.reviews + ' отзывов',
      'Премия 2ГИС «Лучший детейлинг 2025»',
      'До двух автомобилей одновременно, зал ожидания, запись',
    ])}
  </div>
</section>

${ctaBlock('Запись', 'Приезжайте на Посадскую, 3.', 'Позвоните — подскажем по услугам, времени и маршруту.')}
`;

const reviews = `
<section class="page-head page-head--reviews">
  <div class="container">
    ${kicker('Отзывы · 2ГИС')}
    <div class="reviews__head">
      <p class="reviews__value">${S.rating}</p>
      <div>
        <p class="reviews__meta">${S.ratings} оценок · ${S.reviews} отзывов · рейтинг подтверждён</p>
        ${textLink('Читать в 2ГИС', S.map, ' target="_blank" rel="noopener"')}
      </div>
    </div>
  </div>
</section>

<section class="quote quote--reviews">
  <div class="container">
    <p class="quote__text">«Как из салона» — так результат чаще всего описывают в отзывах.</p>
  </div>
</section>

<section class="page-section">
  <div class="container">
    <div class="review-lines">
      <div class="review-line"><h2>Результат</h2><p>Автомобиль выглядит свежим; в отзывах повторяется сравнение «как из салона».</p></div>
      <div class="review-line"><h2>Отношение</h2><p>Клиенты отмечают внимательность и бережное отношение к машине.</p></div>
      <div class="review-line"><h2>Цена</h2><p>Цены называют адекватными уровню работ.</p></div>
      <div class="review-line"><h2>Возвращаются</h2><p>Многие приезжают снова и рекомендуют студию.</p></div>
    </div>
    <p class="fineprint">Тексты отзывов не переносим на сайт: это чужие слова, их нужно читать в источнике. Все ${S.reviews} отзывов — <a href="${S.map}" target="_blank" rel="noopener">в карточке 2ГИС</a>.</p>
  </div>
</section>

${ctaBlock('Запись', 'Лучше один раз увидеть.', 'Приезжайте на осмотр или запишитесь на услугу.')}
`;

const contacts = `
${pageHero({
  kick: 'Контакты',
  title: 'Посадская, 3',
  lead: 'Первый этаж, Верх-Исетский район. Позвоните или напишите — согласуем услугу и время.',
  img: 'assets/img/photo-1.jpg',
  alt: 'Салон автомобиля',
})}

<section class="page-section">
  <div class="container contacts">
    <div class="contacts__main">
      <a class="contacts__phone" href="${S.tel}">${S.phone}</a>
      <div class="contacts__mess">
        ${btn('WhatsApp', S.wa, 'outline', ' target="_blank" rel="noopener"')}
        ${btn('Telegram', S.tg, 'outline', ' target="_blank" rel="noopener"')}
      </div>
      <p class="fineprint">Сообщения в мессенджерах — самый быстрый способ уточнить стоимость и время.</p>
    </div>
    <div class="contacts__side">
      <address class="contacts__address">${S.address}</address>
      <p class="body-text">Открытие в 10:00. Полный график уточняйте по телефону: на карточке 2ГИС указано только время открытия.</p>
      <div class="contacts__actions">
        ${btn('Маршрут', S.route, 'solid', ' target="_blank" rel="noopener"')}
        ${textLink('Карточка 2ГИС', S.map, ' target="_blank" rel="noopener"')}
      </div>
    </div>
  </div>
</section>

<section class="page-section page-section--tight">
  <div class="container">
    ${cleanList([
      'Запись: в студии до двух автомобилей одновременно',
      'Уточните услугу, стоимость, время и сколько автомобиль будет в работе',
      'Оплата: карта, наличные, банковский перевод, перевод с карты, QR-код',
    ])}
  </div>
</section>

${ctaBlock('Запись', 'Ждём вас на Посадской, 3.', 'Позвоните — ответим на вопросы и согласуем время.')}
`;

const privacy = `
<section class="page-head page-head--doc">
  <div class="container container--narrow">
    ${kicker('Документы')}
    <h1 class="page-head__title page-head__title--small">Политика конфиденциальности</h1>
    <p class="fineprint">Редакция от 24 ноября 2026 года.</p>
  </div>
</section>

<section class="page-section page-section--tight">
  <div class="container container--narrow prose">
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
    title: 'Студия — Optimus',
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
  fs.writeFileSync(path.join(OUT, file), layout({ file, ...page }), 'utf8');
  console.log('written', file);
}
