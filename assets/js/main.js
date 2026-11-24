(() => {
  const header = document.querySelector('[data-header]');

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-menu]');

  if (burger && menu) {
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';

      if (open) {
        const first = menu.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    };

    burger.addEventListener('click', () => {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  const contactCard = document.querySelector('.contact-side .contact-card');

  if (contactCard) {
    const setContactTop = () => {
      if (window.innerWidth <= 980) {
        contactCard.style.top = '';
        return;
      }

      contactCard.style.top = `${Math.max(16, window.innerHeight - contactCard.offsetHeight - 24)}px`;
    };

    setContactTop();
    window.addEventListener('resize', setContactTop);
    window.addEventListener('load', setContactTop);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setContactTop);
    }
  }

  const CART_KEY = 'optimusCart';
  let cart = [];

  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (Array.isArray(saved)) cart = saved.filter((item) => typeof item === 'string');
  } catch (error) {
    cart = [];
  }

  const saveCart = () => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      /* localStorage может быть недоступен, работаем в памяти */
    }
  };

  const syncCartUI = () => {
    document.querySelectorAll('.price-add').forEach((button) => {
      const name = button.dataset.service;
      const added = cart.includes(name);

      button.classList.toggle('is-added', added);
      button.setAttribute('aria-pressed', String(added));
      button.textContent = added ? '−' : '+';
      button.setAttribute(
        'aria-label',
        `${added ? 'Убрать услугу' : 'Добавить услугу'}: ${name}`
      );
    });

    document.querySelectorAll('[data-cart-count]').forEach((element) => {
      element.textContent = String(cart.length);
    });
  };

  document.querySelectorAll('.price-add').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.service;
      const index = cart.indexOf(name);

      if (index >= 0) {
        cart.splice(index, 1);
      } else {
        cart.push(name);
      }

      saveCart();
      syncCartUI();
    });
  });

  syncCartUI();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    );

    document
      .querySelectorAll('main > section:not(.hero):not(.page-hero)')
      .forEach((element) => {
        element.classList.add('reveal');
        observer.observe(element);

        if (element.getBoundingClientRect().top < window.innerHeight) {
          element.classList.add('is-visible');
        }
      });
  }

  document.querySelectorAll('.faq__item').forEach((item) => {
    const button = item.querySelector('.faq__q');
    if (!button) return;

    button.addEventListener('click', () => {
      button.setAttribute(
        'aria-expanded',
        String(button.getAttribute('aria-expanded') !== 'true')
      );
    });
  });

  const booking = document.querySelector('[data-booking]');

  if (booking) {
    const services = Array.from(booking.querySelectorAll('[data-service-check]'));
    const date = booking.querySelector('#booking-date');
    const dateDisplay = booking.querySelector('#booking-date-display');
    const time = booking.querySelector('#booking-time');
    const timeSlots = Array.from(booking.querySelectorAll('[data-time-slot]'));
    const message = booking.querySelector('#booking-text');
    const telegram = booking.querySelector('#booking-tg');
    const whatsapp = booking.querySelector('#booking-wa');
    const copy = booking.querySelector('#booking-copy');
    const status = booking.querySelector('[data-booking-status]');
    const hint = status ? status.textContent : '';

    services.forEach((checkbox) => {
      checkbox.checked = cart.includes(checkbox.value);
    });

    const selectedServices = () => services.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

    const formatDate = (value) => {
      if (!value) return '';
      const parsed = new Date(`${value}T12:00:00`);
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
        .format(parsed)
        .replace(/\s*г\.$/, '');
    };

    const updateDateDisplay = () => {
      dateDisplay.textContent = date.value ? formatDate(date.value) : 'Выберите дату';
    };

    const update = () => {
      const selected = selectedServices();
      const valid = Boolean(selected.length && date.value && time.value);
      let text = '';

      if (valid) {
        text = [
          'Здравствуйте! Хочу записаться в Optimus.',
          '',
          'Услуги:',
          ...selected.map((service) => `• ${service}`),
          '',
          `Дата: ${formatDate(date.value)}`,
          `Время: ${time.value}`,
          '',
          'Подскажите, пожалуйста, стоимость и свободно ли это время.',
        ].join('\n');

        const encoded = encodeURIComponent(text);
        telegram.href = `https://t.me/dtlg_optimus?text=${encoded}`;
        whatsapp.href = `https://wa.me/79126451984?text=${encoded}`;
        telegram.removeAttribute('aria-disabled');
        whatsapp.removeAttribute('aria-disabled');
        telegram.tabIndex = 0;
        whatsapp.tabIndex = 0;
        copy.disabled = false;
      } else {
        text = 'Выберите услуги, дату и время, и текст заявки появится здесь.';
        telegram.href = '#';
        whatsapp.href = '#';
        telegram.setAttribute('aria-disabled', 'true');
        whatsapp.setAttribute('aria-disabled', 'true');
        telegram.tabIndex = -1;
        whatsapp.tabIndex = -1;
        copy.disabled = true;
      }

      message.value = text;
    };

    services.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        cart = selectedServices();
        saveCart();
        update();
      });
    });

    const dateTrigger = booking.querySelector('#booking-date-trigger');
    const calendar = booking.querySelector('#booking-calendar');
    const calendarMonth = booking.querySelector('[data-calendar-month]');
    const calendarDays = booking.querySelector('[data-calendar-days]');
    const calendarPrev = booking.querySelector('[data-calendar-prev]');
    const calendarNext = booking.querySelector('[data-calendar-next]');
    const today = new Date();
    let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);

    today.setHours(0, 0, 0, 0);

    const pad = (value) => String(value).padStart(2, '0');
    const isoDate = (value) => `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;

    const closeCalendar = () => {
      calendar.hidden = true;
      dateTrigger.setAttribute('aria-expanded', 'false');
    };

    const renderCalendar = () => {
      const label = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' })
        .format(viewDate)
        .replace(/\s*г\.$/, '');
      calendarMonth.textContent = label.charAt(0).toUpperCase() + label.slice(1);
      calendarPrev.disabled = viewDate <= new Date(today.getFullYear(), today.getMonth(), 1);
      calendarDays.innerHTML = '';

      const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
      const offset = (first.getDay() + 6) % 7;
      const days = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();

      for (let index = 0; index < offset; index += 1) {
        const blank = document.createElement('span');
        blank.className = 'calendar__blank';
        calendarDays.appendChild(blank);
      }

      for (let day = 1; day <= days; day += 1) {
        const current = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'calendar__day';
        button.textContent = String(day);
        button.disabled = current < today;

        if (date.value === isoDate(current)) {
          button.classList.add('is-selected');
        }

        button.addEventListener('click', () => {
          date.value = isoDate(current);
          updateDateDisplay();
          update();
          closeCalendar();
        });

        calendarDays.appendChild(button);
      }
    };

    if (dateTrigger && calendar) {
      dateTrigger.addEventListener('click', () => {
        if (!calendar.hidden) {
          closeCalendar();
          return;
        }

        const selected = date.value ? new Date(`${date.value}T12:00:00`) : today;
        viewDate = new Date(selected.getFullYear(), selected.getMonth(), 1);
        renderCalendar();
        calendar.hidden = false;
        dateTrigger.setAttribute('aria-expanded', 'true');
      });

      calendarPrev.addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() - 1);
        renderCalendar();
      });

      calendarNext.addEventListener('click', () => {
        viewDate.setMonth(viewDate.getMonth() + 1);
        renderCalendar();
      });

      document.addEventListener('click', (event) => {
        if (calendar.hidden) return;
        if (calendar.contains(event.target) || dateTrigger.contains(event.target)) return;
        closeCalendar();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeCalendar();
      });
    }

    timeSlots.forEach((slot) => {
      slot.addEventListener('click', () => {
        const value = slot.dataset.timeSlot;
        const selected = time.value === value;

        time.value = selected ? '' : value;
        timeSlots.forEach((item) => {
          item.setAttribute('aria-pressed', String(!selected && item === slot));
        });
        update();
      });
    });

    updateDateDisplay();

    [telegram, whatsapp].forEach((link) => {
      link.addEventListener('click', (event) => {
        if (link.getAttribute('aria-disabled') === 'true') event.preventDefault();
      });
    });

    copy.addEventListener('click', async () => {
      if (copy.disabled) return;

      try {
        await navigator.clipboard.writeText(message.value);
      } catch (error) {
        message.focus();
        message.select();
        document.execCommand('copy');
      }

      if (status) {
        status.textContent = 'Текст скопирован.';
        window.setTimeout(() => {
          status.textContent = hint;
        }, 2200);
      }
    });

    booking.addEventListener('submit', (event) => event.preventDefault());
    update();
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
