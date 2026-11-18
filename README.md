<div align="center">

# Ковчег

### Автономный офлайн-сервер знаний, карт России и локального ИИ для русскоязычных пользователей

</div>

> [!IMPORTANT]
> **Ковчег — неофициальный форк [Project NOMAD](https://github.com/Crosstalk-Solutions/project-nomad) от Crosstalk Solutions. Проект не связан с Crosstalk Solutions и не поддерживается ими. Project NOMAD — название апстрима.**
>
> Оригинальный README апстрима сохранён без изменений: [README.en.md](README.en.md).

## Что это и для кого

«Ковчег» — русскоязычный форк Project NOMAD, автономного офлайн-сервера знаний и образования. Он разворачивается на собственном оборудовании и даёт доступ через браузер к библиотеке, учебным материалам, картам и локальному искусственному интеллекту — в том числе без постоянного подключения к интернету.

Проект предназначен для русскоязычных пользователей, которым нужен автономный сервер знаний: для дома, учебной аудитории, небольшой команды или работы в местах с нестабильной связью.

«Ковчег» находится в активной разработке. Часть отличий от апстрима уже реализована в ветке `ru-main`; готового русского установщика пока нет.

## Чем отличается от апстрима

### Уже сделано

- **Карты.** В стилях карт подписи берутся из `name:ru` с откатом на `name` и `name:en` ([admin/app/utils/map_style_lang.ts](admin/app/utils/map_style_lang.ts)). Страны в выборе сортируются по русскому названию ([CountryPickerModal.tsx](admin/inertia/components/CountryPickerModal.tsx)). Каталог карт `maps.json` по умолчанию берётся из форка; прямой URL задаётся через `MAPS_SPEC_URL`, а репозиторий готовых PMTiles — через `MAPS_ASSETS_REPO` (по умолчанию пока апстримовый). План нарезки России по федеральным округам — [docs/maps-federal-districts.md](docs/maps-federal-districts.md).
- **Коллекции.** Все каталоги коллекций (`kiwix-categories.json`, `wikipedia.json`, `creator-packs.json`, `maps.json`) строятся от `COLLECTIONS_BASE_URL` и по умолчанию берутся из `collections/` форка ([admin/constants/collection_sources.ts](admin/constants/collection_sources.ts)). В [collections/wikipedia.json](collections/wikipedia.json) — 6 вариантов русской Википедии, от ~230 МБ до ~37 ГБ. В [collections/kiwix-categories.json](collections/kiwix-categories.json) — категория «Русский язык» с 16 ZIM-архивами: Викисловарь, Викицитатник, Викиучебник, Викигид, Викитека, Викиверситет, Викидия (Vikidia), тематические подборки Википедии, Stack Overflow на русском и другие.
- **Локальный ИИ.** Подбор русскоязычных моделей Ollama по железу — ступени CPU, 6, 8 и 16 ГБ видеопамяти (qwen3, qwen2.5, gemma3, phi4-mini), с ориентиром на ноутбуки ([admin/constants/ollama_ru.ts](admin/constants/ollama_ru.ts)). Системные промпты на русском; RAG прямо говорит, если в базе нет ответа ([admin/constants/prompts.ts](admin/constants/prompts.ts)). `AI_PROMPT_LANG=ru` по умолчанию.
- **Интерфейс.** Механизм перевода без внешних зависимостей ([admin/inertia/i18n](admin/inertia/i18n), [docs/i18n.md](docs/i18n.md)), русский язык по умолчанию. Перевод экранов идёт поэтапно.

### В работе / планы

- Перевод всех экранов интерфейса.
- Готовые файлы карт России по федеральным округам.
- Русскоязычный установщик, зеркала и установка с локальных носителей.

## Дорожная карта

| Этап | Содержание | Статус |
|------|------------|--------|
| 1 | База репозитория, README, лицензия | Готово |
| 2 | Карты РФ (подписи, каталог, план нарезки по ФО) | Частично (нарезка файлов впереди) |
| 3 | Русские коллекции (Википедия, ZIM) | Готово |
| 4 | Локальный ИИ на русском (модели, промпты) | Готово |
| 5 | Перевод интерфейса | В работе |
| 6 | Русский установщик и офлайн-установка | Запланирован |

## Настройка

Переменные необязательны: пустое значение означает значение по умолчанию.

| Переменная | Назначение | По умолчанию |
|------------|------------|--------------|
| `COLLECTIONS_BASE_URL` | Базовый URL каталогов коллекций: `kiwix-categories.json`, `wikipedia.json`, `creator-packs.json`, `maps.json`. | `https://raw.githubusercontent.com/sarichanton/kovcheg/ru-main/collections/` |
| `MAPS_SPEC_URL` | Прямой URL каталога карт `maps.json`; имеет приоритет над `COLLECTIONS_BASE_URL`. | `https://raw.githubusercontent.com/sarichanton/kovcheg/ru-main/collections/maps.json` |
| `MAPS_ASSETS_REPO` | GitHub-репозиторий `owner/repo` с готовыми PMTiles и базовыми ассетами карт. | `Crosstalk-Solutions/project-nomad-maps` (апстрим) |
| `AI_PROMPT_LANG` | Язык системных промптов локального ИИ: `ru` или `en`. | `ru` |

## Установка

Пока «Ковчег» устанавливается теми же шагами, что и апстрим: Debian/Ubuntu на архитектуре x86_64 с Docker. Пошаговые инструкции — в [README.en.md](README.en.md#installation--quickstart), разделы **Quick Install (Debian-based OS Only)** и **Advanced Installation**.

Русскоязычный установщик, зеркала и установка с локальных носителей — этап 6 дорожной карты. Отдельного установщика «Ковчега» пока нет.

## Лицензия

«Ковчег» распространяется под [Apache License 2.0](LICENSE). Копирайт апстрима — Crosstalk Solutions LLC — сохраняется; изменения форка помечаются в файле [NOTICE](NOTICE) и истории Git.

Данные OpenStreetMap, используемые в картах, распространяются на условиях ODbL. Шрифты распространяются на условиях SIL OFL. Лицензии сторонних компонентов сохраняются за их правообладателями.

## Участие

Issues и pull requests приветствуются в репозитории [sarichanton/kovcheg](https://github.com/sarichanton/kovcheg). Если вы предлагаете изменение, пожалуйста, кратко опишите задачу, которую оно решает, и затронутые разделы.
