
        // Переменная для карусели
        let currentSlide = 0;
        let slideInterval;

        // Навбар при скролле
        let lastScrollTop = 0;
        const navbar = document.getElementById('navbar');

        // mobile menu toggle (preserve scroll position)
        let _scrollPos = 0;
        function toggleMenu() {
            const menu = document.getElementById('navMenu');
            const body = document.body;
            const opening = !menu.classList.contains('active');
            if (opening) {
                _scrollPos = window.pageYOffset || document.documentElement.scrollTop;
                body.style.top = `-${_scrollPos}px`;
            } else {
                body.style.top = '';
                window.scrollTo(0, _scrollPos);
            }
            menu.classList.toggle('active');
            body.classList.toggle('menu-open');
        }

        // ensure menu closes when resizing to large screen
        window.addEventListener('resize', function() {
            const menu = document.getElementById('navMenu');
            const body = document.body;
            if (window.innerWidth > 768 && menu.classList.contains('active')) {
                menu.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.top = '';
            }
        });

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });

        // Функция переключения страниц
        function showPage(pageName) {
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = 'none';
            });
            
            document.getElementById(pageName + '-page').style.display = 'block';
            
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            document.querySelectorAll('.nav-menu a').forEach(link => {
                if (link.textContent.toLowerCase().includes(pageName) || 
                    (pageName === 'home' && link.textContent === 'Главная') ||
                    (pageName === 'partners' && link.textContent === 'Сотрудничество')) {
                    link.classList.add('active');
                }
            });
            
            // close mobile menu if open
            const menu = document.getElementById('navMenu');
            const body = document.body;
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
            
            window.scrollTo(0, 0);
            
            if (pageName === 'about') {
                startCarousel();
            } else {
                stopCarousel();
            }
        }

        function startCarousel() {
            stopCarousel();
            slideInterval = setInterval(nextSlide, 4000);
        }

        function stopCarousel() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }

        function nextSlide() {
            const slides = document.querySelectorAll('#about-page .carousel-slide');
            const dots = document.querySelectorAll('#about-page .carousel-dot');
            
            if (slides.length === 0) return;
            
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function changeSlide(index) {
            const slides = document.querySelectorAll('#about-page .carousel-slide');
            const dots = document.querySelectorAll('#about-page .carousel-dot');
            
            if (slides.length === 0) return;
            
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            stopCarousel();
            startCarousel();
        }

        const reveals = document.querySelectorAll('.reveal');
        
        function checkReveal() {
            reveals.forEach(reveal => {
                const revealTop = reveal.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (revealTop < windowHeight - 100) {
                    reveal.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', checkReveal);
        checkReveal();

        // Модальные окна (функции остаются без изменений)
        function openLegalModal(type) {
            const modal = document.getElementById('infoModal');
            const title = document.getElementById('modalTitle');
            const body = document.getElementById('modalBody');
            
            const legalInfo = {
                ip: { title: 'Индивидуальный предприниматель', content: '<h4>ИП Павлов Евгений Робертович</h4><p>Основной вид деятельности: отделочные работы, ремонт помещений, строительные услуги.</p>' },
                ogrn: { title: 'ОГРНИП', content: '<h4>ОГРНИП 325280000047362</h4><p>Регистрирующий орган: Управление Федеральной налоговой службы по Амурской области.</p>' },
                inn: { title: 'ИНН', content: '<h4>ИНН 282100679869</h4><p>Индивидуальный номер налогоплательщика.</p>' },
                address: { title: 'Юридический адрес', content: '<h4>675000, г.о. Благовещенск, с. Белогорье, ул. Заозерная, д. 29/1</h4><p>Почтовый адрес для корреспонденции.</p>' },
                fns: { title: 'Налоговый орган', content: '<h4>Управление Федеральной налоговой службы по Амурской области</h4><p>Адрес: 675000, г. Благовещенск, ул. Ленина, 105</p>' },
                bank: { title: 'Банковские реквизиты', content: '<h4>ФИЛИАЛ "ХАБАРОВСКИЙ" АО "АЛЬФА-БАНК"</h4><p>БИК: 040813770</p><p>Кор. счёт: 30101810800000000770</p>' }
            };
            
            title.textContent = legalInfo[type].title;
            body.innerHTML = legalInfo[type].content;
            modal.classList.add('active');
        }

        function openInfoModal(type) {
            const modal = document.getElementById('infoModal');
            const title = document.getElementById('modalTitle');
            const body = document.getElementById('modalBody');
            
            const info = {
                'payment': { title: 'Оплата', content: '<h4>Способы оплаты:</h4><ul><li>Наличный расчет</li><li>Безналичный перевод</li><li>Оплата банковской картой</li><li>Поэтапная оплата</li></ul>' },
                'delivery': { title: 'Доставка', content: '<h4>Доставка материалов:</h4><p>Мы организуем доставку всех необходимых материалов на объект. Складские запасы позволяют начать работу без задержек.</p>' },
                'guarantee': { title: 'Гарантии', content: '<h4>Наши гарантии:</h4><ul><li>Гарантия на работы - 3 года</li><li>Фиксированная смета без доплат</li><li>Соблюдение сроков</li><li>Чистота и порядок</li></ul>' }
            };
            
            title.textContent = info[type].title;
            body.innerHTML = info[type].content;
            modal.classList.add('active');
        }

        function openPartnerModal(partner) {
            const modal = document.getElementById('infoModal');
            const title = document.getElementById('modalTitle');
            const body = document.getElementById('modalBody');
            
            const partners = {
                gazprom: { title: 'Газпром', content: '<h4>Амурский ГПЗ</h4><p>Выполнение отделочных работ на объектах газоперерабатывающего завода. Соблюдение высоких стандартов качества и промышленной безопасности.</p>' },
                fenix: { title: 'Феникс Строй', content: '<h4>Феникс Строй</h4><p>Многолетнее партнерство. Отделка жилых комплексов по ул. Ленина, 127. Капитальные ремонты и отделка под ключ.</p>' },
                amurstroy: { title: 'АмурСтройИнвест', content: '<h4>АмурСтройИнвест</h4><p>Отделка коммерческой недвижимости. Объекты по ул. 50 лет Октября, 45. Выполнение сложных архитектурных решений.</p>' },
                vostok: { title: 'СК "Восток"', content: '<h4>Строительная компания "Восток"</h4><p>Совместные проекты по ул. Горького, 156. Отделка жилых помещений и капитальные ремонты.</p>' },
                dalspec: { title: 'Дальспецстрой', content: '<h4>Дальспецстрой</h4><p>Промышленные объекты на Игнатьевском шоссе, 18. Специализированные покрытия и антикоррозийная защита.</p>' },
                belvektor: { title: 'Белвекторстрой', content: '<h4>Белвекторстрой</h4><p>Отделка по ул. Забурхановская, 96. Декоративные покрытия и премиальная отделка.</p>' },
                stroypartner: { title: 'Стройпартнер ДВ', content: '<h4>Стройпартнер ДВ</h4><p>Объекты по ул. Театральная, 14А. Комплексная отделка и фасадные работы.</p>' },
                pik: { title: 'ПИК Благовещенск', content: '<h4>Специализированный застройщик</h4><p>Отделка новостроек. Типовые и индивидуальные проекты. Работа с крупными жилыми комплексами города.</p>' }
            };
            
            title.textContent = partners[partner].title;
            body.innerHTML = partners[partner].content;
            modal.classList.add('active');
        }

        function openBannedModal(social) {
            const modal = document.getElementById('infoModal');
            const title = document.getElementById('modalTitle');
            const body = document.getElementById('modalBody');
            
            title.textContent = 'Instagram';
            body.innerHTML = `
                <div class="banned-social">
                    <i class="fas fa-frown"></i>
                    <p>Деятельность компании Meta (Instagram и Facebook) запрещена на территории Российской Федерации</p>
                    <small>Мы сожалеем, но доступ к данной социальной сети ограничен</small>
                </div>
            `;
            modal.classList.add('active');
        }

        function openServiceModal(service) {
            const modal = document.getElementById('infoModal');
            const title = document.getElementById('modalTitle');
            const body = document.getElementById('modalBody');
            
            const services = {
                demolition: { title: 'Демонтажные работы', description: 'Полный комплекс работ по демонтажу конструкций и покрытий. Подготовка помещения к новому ремонту.', features: ['Демонтаж стен и перегородок любой сложности', 'Удаление старых покрытий (плитка, линолеум, паркет)', 'Снятие обоев и краски', 'Демонтаж сантехники и электропроводки', 'Вывоз и утилизация строительного мусора'], tools: 'Перфораторы, отбойные молотки, болгарки, шуруповерты, ломы, зубила' },
                walls: { title: 'Отделка стен', description: 'Комплексная отделка стен любой сложности. От черновой подготовки до финишного декоративного покрытия.', features: ['Шпаклевка и выравнивание стен', 'Грунтование для лучшего сцепления', 'Премиальная покраска (водоэмульсионные, акриловые краски)', 'Поклейка любых видов обоев', 'Декоративная штукатурка (венецианская, фактурная)'], tools: 'Шпатели, кельмы, валики, кисти, правило, уровень, шлифовальная машинка' },
                ceilings: { title: 'Отделка потолков', description: 'Профессиональная отделка потолков любой сложности. Создаем идеально ровные и красивые потолки.', features: ['Шпаклевка и выравнивание потолков', 'Покраска потолков без разводов', 'Монтаж натяжных потолков (ПВХ, тканевые)', 'Многоуровневые потолки из гипсокартона', 'Монтаж точечных светильников и подсветки'], tools: 'Шпатели, валики с телескопической ручкой, краскопульт, тепловая пушка (для натяжных)' },
                floors: { title: 'Укладка напольных покрытий', description: 'Качественная подготовка основания и укладка любых напольных покрытий.', features: ['Стяжка пола (цементная, полусухая, самовыравнивающаяся)', 'Гидроизоляция во влажных помещениях', 'Укладка плитки и керамогранита', 'Подготовка основания под любые покрытия'], tools: 'Правило, уровень, маячки, шпатели, плиткорез, болгарка' }
            };
            
            let featuresHTML = '<h4>Виды работ:</h4><ul>';
            services[service].features.forEach(f => {
                featuresHTML += `<li><i class="fas fa-check"></i> ${f}</li>`;
            });
            featuresHTML += '</ul>';
            
            title.textContent = services[service].title;
            body.innerHTML = `<p>${services[service].description}</p>${featuresHTML}<h4>Используемый инструмент:</h4><p style="color: rgba(255,255,255,0.7);">${services[service].tools}</p>`;
            modal.classList.add('active');
        }

        function openDetailModal(detail, event) {
            if (event) event.stopPropagation();
            const modal = document.getElementById('infoModal');
            const title = document.getElementById('modalTitle');
            const body = document.getElementById('modalBody');
            
            const details = {
                demolition_walls: { title: 'Демонтаж стен и перегородок', description: 'Профессиональный демонтаж стен и перегородок любой сложности.', process: ['Отключение коммуникаций в зоне работ', 'Защита пола и оставшихся конструкций', 'Демонтаж перфоратором или отбойным молотком', 'Аккуратное удаление перегородок', 'Зачистка примыканий от остатков раствора'], tools: 'Перфоратор с пикой, отбойный молоток, кувалда, лом, зубило, болгарка с алмазным диском', note: '💡 Возможен демонтаж с сохранением материалов (например, кирпича)' },
                demolition_cover: { title: 'Демонтаж старых покрытий', description: 'Удаление всех видов старых покрытий со стен, пола и потолка.', process: ['Снятие обоев (ручное, паро- или химическое)', 'Удаление старой краски', 'Демонтаж керамической плитки', 'Снятие линолеума, паркета, ламината', 'Удаление старой штукатурки при необходимости'], tools: 'Шпатели, скребки, перфоратор, строительный фен, химические смывки, парогенератор', note: '💡 Используем специальные составы для размягчения старых покрытий' },
                demolition_trash: { title: 'Вывоз и утилизация мусора', description: 'Организованный вывоз строительного мусора любого объема.', process: ['Сбор и сортировка мусора', 'Упаковка в мешки или контейнеры', 'Погрузка и вывоз транспортом', 'Утилизация отходов', 'Финишная уборка помещения'], tools: 'Спецтехника, грузовой транспорт, контейнеры, мешки для мусора', note: '💡 Работаем быстро и аккуратно, соблюдаем экологические нормы' },
                demolition_sanitary: { title: 'Демонтаж сантехники', description: 'Аккуратный демонтаж сантехнического оборудования.', process: ['Перекрытие воды', 'Отключение сантехники от коммуникаций', 'Демонтаж унитазов, ванн, раковин', 'Удаление старых труб при необходимости', 'Подготовка к установке новой сантехники'], tools: 'Разводные ключи, отвертки, болгарка, перфоратор', note: '💡 Возможно сохранение оборудования' },
                demolition_electric: { title: 'Демонтаж электропроводки', description: 'Безопасный демонтаж старой электропроводки.', process: ['Обесточивание помещения', 'Проверка отсутствия напряжения', 'Демонтаж розеток, выключателей', 'Извлечение проводов из штроб', 'Демонтаж распределительных коробок'], tools: 'Индикатор напряжения, отвертки, пассатижи, зубило, перфоратор', note: '💡 Работы только после отключения электричества' },
                walls_putty: { title: 'Шпаклевка и выравнивание стен', description: 'Качественная подготовка стен к финишной отделке.', process: ['Очистка стен от пыли', 'Грунтование', 'Нанесение стартовой шпаклевки', 'Шлифовка', 'Нанесение финишной шпаклевки', 'Финишная шлифовка'], tools: 'Шпатели, правило, уровень, терка, шлифмашинка', note: '💡 2-4 слоя шпаклевки' },
                walls_paint: { title: 'Премиальная покраска стен', description: 'Профессиональная покраска стен премиальными красками.', process: ['Подготовка поверхности', 'Грунтование стен', 'Оклейка малярным скотчем', 'Нанесение первого слоя', 'Просушка', 'Нанесение второго слоя'], tools: 'Валик, кисти, ванночка, телескопическая ручка, скотч', note: '💡 Краски премиум-класса' },
                walls_wallpaper: { title: 'Поклейка обоев', description: 'Профессиональная поклейка всех видов обоев.', process: ['Подготовка и грунтование стен', 'Нарезка полотен', 'Приготовление клея', 'Поклейка полотен', 'Прикатка', 'Обрезка излишков'], tools: 'Малярный стол, нож, шпатель, валик для швов, отвес', note: '💡 Бумажные - внахлест, плотные - встык' },
                walls_plaster: { title: 'Декоративная штукатурка', description: 'Создание уникальных фактурных покрытий.', process: ['Подготовка и грунтование', 'Колеровка материала', 'Нанесение первого слоя', 'Формирование рисунка', 'Нанесение второго слоя', 'Лессировка'], tools: 'Венецианская кельма, шпатели, губки, щетки, валики, гладилки', note: '💡 Имитация камня, дерева, ткани, металла' },
                walls_primer: { title: 'Грунтование стен', description: 'Обязательный этап подготовки стен перед отделкой.', process: ['Очистка стен', 'Выбор грунтовки', 'Нанесение первого слоя', 'Просушка', 'Нанесение второго слоя'], tools: 'Валик, кисть, ванночка', note: '💡 Снижает впитываемость, предотвращает плесень' },
                ceilings_putty: { title: 'Шпаклевка потолков', description: 'Выравнивание потолков под покраску.', process: ['Очистка потолка', 'Грунтование', 'Заделка стыков', 'Нанесение стартового слоя', 'Шлифовка', 'Финишное шпаклевание'], tools: 'Шпатели, правило, терка, шлифмашинка, уровень', note: '💡 Особое внимание стыкам плит' },
                ceilings_paint: { title: 'Покраска потолков', description: 'Качественная покраска потолков без разводов.', process: ['Подготовка и шпаклевка', 'Грунтование', 'Покраска первым слоем', 'Просушка', 'Покраска вторым слоем'], tools: 'Валик с ручкой, кисть, ванночка, стремянка', note: '💡 Красить до отделки стен' },
                ceilings_stretch: { title: 'Натяжные потолки', description: 'Монтаж современных натяжных потолков.', process: ['Замер', 'Монтаж багета', 'Прогрев помещения', 'Заправка полотна', 'Установка освещения'], tools: 'Тепловая пушка, лазерный уровень, шуруповерт', note: '💡 Тканевые - без нагрева' },
                ceilings_multilevel: { title: 'Многоуровневые потолки', description: 'Сложные конструкции из гипсокартона.', process: ['Проектирование', 'Монтаж каркаса', 'Установка ГКЛ', 'Шпаклевка', 'Покраска', 'Монтаж подсветки'], tools: 'Лазерный уровень, шуруповерт, ножницы по металлу, шпатели, правило', note: '💡 Зонирование пространства' },
                ceilings_light: { title: 'Монтаж подсветки', description: 'Установка точечных светильников и LED лент.', process: ['Разметка', 'Прокладка проводки', 'Установка закладных', 'Подключение', 'Монтаж светильников'], tools: 'Индикатор, отвертки, пассатижи, стремянка', note: '💡 В деревянных домах - металлические трубы' },
                floors_screed: { title: 'Стяжка пола', description: 'Выравнивание пола под финишное покрытие.', process: ['Очистка и грунтование', 'Установка маяков', 'Укладка демпферной ленты', 'Заливка стяжки', 'Выравнивание', 'Высыхание'], tools: 'Правило, уровень, маячки, бетономешалка, мастерок', note: '💡 Высыхание: цементная - 28 дней, полусухая - 7 дней' },
                floors_tile: { title: 'Укладка плитки', description: 'Профессиональная укладка керамической плитки.', process: ['Подготовка основания', 'Разметка', 'Нанесение клея', 'Укладка плитки', 'Контроль уровня', 'Затирка швов'], tools: 'Плиткорез, уровень, шпатели, крестики, киянка', note: '💡 Качественный плиточный клей' },
                floors_porcelain: { title: 'Укладка керамогранита', description: 'Укладка крупноформатного керамогранита.', process: ['Идеально ровное основание', 'Специальный клей', 'Разметка', 'Система выравнивания', 'Контроль уровня', 'Затирка швов'], tools: 'Плиткорез, уровень, система выравнивания, зубчатый шпатель, киянка', note: '💡 Усиленное основание' },
                floors_waterproof: { title: 'Гидроизоляция пола', description: 'Защита пола от влаги.', process: ['Очистка и грунтование', 'Обработка углов', 'Нанесение обмазочной', 'Укладка рулонной', 'Проверка герметичности', 'Устройство стяжки'], tools: 'Кисти, валики, шпатели', note: '💡 Обязательна перед плиткой' }
            };
            
            if (!details[detail]) return;
            
            let processHTML = '<h4>Процесс:</h4><ul>';
            details[detail].process.forEach(p => {
                processHTML += `<li><i class="fas fa-check"></i> ${p}</li>`;
            });
            processHTML += '</ul>';
            
            title.textContent = details[detail].title;
            body.innerHTML = `<p>${details[detail].description}</p>${processHTML}<h4>Инструменты:</h4><p style="color: rgba(255,255,255,0.7);">${details[detail].tools}</p><p style="color: #C5A572; margin-top: 15px;"><i class="fas fa-info-circle"></i> ${details[detail].note}</p>`;
            modal.classList.add('active');
        }

        function openJobModal(job) {
            const modal = document.getElementById('infoModal');
            const title = document.getElementById('modalTitle');
            const body = document.getElementById('modalBody');
            
            const jobs = {
                master: { title: 'Мастер отделочных работ', description: 'Требуется опытный мастер в Благовещенске.', requirements: ['Опыт от 3 лет', 'Знание современных материалов', 'Наличие инструмента', 'Ответственность'], conditions: ['Полный день', 'Работа по Амурской области', 'Официально', 'Премии'] },
                plasterer: { title: 'Штукатур-маляр', description: 'Требуется штукатур-маляр.', requirements: ['Опыт от 2 лет', 'Владение техниками', 'Качественный инструмент', 'Внимательность'], conditions: ['Работа по Благовещенску', 'Официально', 'Оплата проезда', 'Гибкий график'] },
                designer: { title: 'Дизайнер интерьеров', description: 'Ищем креативного дизайнера.', requirements: ['Портфолио', 'Владение 3D Max', 'Знание материалов', 'Креативность'], conditions: ['Гибкий график', 'Процент от проектов', 'Интересные задачи', 'Работа в команде'] },
                prorab: { title: 'Прораб', description: 'Требуется прораб.', requirements: ['Опыт от 3 лет', 'Знание технологий', 'Организаторские способности', 'Ответственность'], conditions: ['Полный день', 'Официально', 'Служебный автомобиль', 'Премии'] }
            };
            
            let requirementsHTML = '<h4>Требования:</h4><ul>';
            jobs[job].requirements.forEach(r => {
                requirementsHTML += `<li><i class="fas fa-check"></i> ${r}</li>`;
            });
            requirementsHTML += '</ul>';
            
            let conditionsHTML = '<h4>Условия:</h4><ul>';
            jobs[job].conditions.forEach(c => {
                conditionsHTML += `<li><i class="fas fa-check"></i> ${c}</li>`;
            });
            conditionsHTML += '</ul>';
            
            title.textContent = jobs[job].title;
            body.innerHTML = `<p>${jobs[job].description}</p>${requirementsHTML}${conditionsHTML}<p style="color: #C5A572; margin-top: 20px;"><i class="fas fa-envelope"></i> Резюме: hr@21vek.blg.ru</p>`;
            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('infoModal').classList.remove('active');
        }

        window.addEventListener('click', function(e) {
            const modal = document.getElementById('infoModal');
            if (e.target === modal) {
                closeModal();
            }
        });

        showPage('home');
    
