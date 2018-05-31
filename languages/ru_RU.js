const Language = require('../base/Language');
const DAYSOFWEEK = {
    SUNDAY: {
        SHORT: 'Вс',
        LONG: 'Воскресенье'
    },
    MONDAY: {
        SHORT: 'Пон',
        LONG: 'Понедельник'
    },
    TUESDAY: {
        SHORT: 'Вт',
        LONG: 'Вторник'
    },
    WEDNESDAY: {
        SHORT: 'Ср',
        LONG: 'Среда'
    },
    THURSDAY: {
        SHORT: 'Чт',
        LONG: 'Четверг'
    },
    FRIDAY: {
        SHORT: 'Пт',
        LONG: 'Пятница'
    },
    SATURDAY: {
        SHORT: 'Суб',
        LONG: 'Суббота'
    }
};
const TIMES = {
    DAY: {
        PLURAL: 'дня(ей)',
        SING: 'день',
        SHORT_PLURAL: 'д-й',
        SHORT_SING: 'д'
    },
    HOUR: {
        PLURAL: 'часа(ов)',
        SING: 'час',
        SHORT_PLURAL: 'чч',
        SHORT_SING: 'ч'
    },
    MINUTE: {
        PLURAL: 'минут(ы)',
        SING: 'минута',
        SHORT_PLURAL: 'мм',
        SHORT_SING: 'мин'
    },
    SECOND: {
        PLURAL: 'секунд(ы)',
        SING: 'секунда',
        SHORT_PLURAL: 'сс',
        SHORT_SING: 'сек'
    }
};

function getDay(day, type) {
    return DAYSOFWEEK[`${day}`][`${type}`];
}

function getTime(unit, type) {
    return TIMES[`${unit}`][`${type}`];
}

module.exports = class extends Language {
    constructor(...args) {
        super(...args);

        this.getDay = getDay;
        this.getTime = getTime;
        this.language = {
            // Default in case it can't find one.
            BASE_DEFAULT_MISSING: 'Попытка использования неизвестной строки. Если Вы видите это сообщение, передайте информацию разработчику для исправления.',

            // Base swgohBot.js file
            BASE_LAST_EVENT_NOTIFICATION: `\n\nПоследнее сообщение этого события. Создайте новое событие чтобы продолжать получать сообщения`,
            BASE_EVENT_STARTING_IN_MSG: (key, timeToGo) => `**${key}**\nНачало в ${timeToGo}`,

            // Base swgohAPI
            BASE_SWGOH_NO_ALLY: `Данный пользователь не зарегистрирован. Зарегистрируйтесь командой \`;register add <user> <allycode>\``,
            BASE_SWGOH_NOT_REG: (user) => `Данный пользователь не зарегистрирован. Зарегистрируйтесь командой \`;register add @${user} <allycode>\``,
            BASE_SWGOH_NO_USER: `Этот пользователь не зарегистрирован ни в одном списке.`,
            BASE_SWGOH_MISSING_CHAR: 'Для поиска введите имя персонажа',
            BASE_SWGOH_NO_CHAR_FOUND: (character) => `Ни одного результата для ${character}`,
            BASE_SWGOH_CHAR_LIST: (chars) => `Слишком много совпадений, уточните запрос. \nВот список ближайщих совпадений.\n\`\`\`${chars}\`\`\``,
            BASE_SWGOH_NO_ACCT: `Что-то не так. Убедитесь что Ваш аккаунт правильно синхронизирован`,

            // Generic (Not tied to a command)
            COMMAND_EXTENDED_HELP: (command) => `**Расширенная помощь по команде ${command.help.name}** \n**Usage**: ${command.help.usage} \n${command.help.extended}`,
            COMMAND_INVALID_BOOL: `Неправильное значение, попробуйте true или false`,
            COMMAND_MISSING_PERMS: `Не хватает прав.`,
            BASE_COMMAND_UNAVAILABLE: "This command is unavailable via private message. Please run this command in a guild.",
            BASE_COMMAND_HELP_HEADER: (name) => `Help for ${name}`,
            BASE_COMMAND_HELP_HEADER_CONT: (name) => `Продолжение помощи по команде ${name}`,
            BASE_COMMAND_HELP_HELP: (name) => {
                return {
                    action: "Показать помощь",
                    actionDesc: "Показать сообщение",
                    usage: `;${name} help`,
                    args: {}
                };
            },

            // Abilities Command 
            COMMAND_ABILITIES_NEED_CHARACTER: (prefix, usage) => `Нужен персонаж. Использование \`${prefix}${usage}\``,
            COMMAND_ABILITIES_INVALID_CHARACTER: (prefix, usage) => `Неправильный персонаж. Использование \`${prefix}${usage}\``,
            COMMAND_ABILITIES_COOLDOWN: (aCooldown) => `**Перезарядка способности:** ${aCooldown}\n`,
            COMMAND_ABILITIES_ABILITY: (aType, mat, cdString, aDesc) => `**Тип способности:** ${aType}     **Нужно для максимума:**  ${mat}\n${cdString}${aDesc}`,
            COMMAND_ABILITIES_ABILITY_CODE: (abilityName, type, tier, aDesc) => `### ${abilityName} ###\n* Тип способности: ${type}\n* Нужно для максимума: ${tier}\n* Описание: ${aDesc}\n\n`,
            COMMAND_ABILITIES_HELP: {
                description: "Показывает способности выбранного персонажа.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';abilities <characterName>',
                        args: {}
                    }
                ]
            },

            // Activities Command
            COMMAND_ACTIVITIES_SUNDAY: `== До сброса == \nComplete Arena Battles \nSave Cantina Energy \nSave Normal Energy\n\n== После сброса == \nSpend Cantina Energy \nSave Normal Energy`,
            COMMAND_ACTIVITIES_MONDAY: `== До сброса == \nSpend Cantina Energy \nSave Normal Energy \nSave Galactic War (unless reset available)\n\n== После сброса == \nSpend Normal Energy on Light Side Battles \nSave Galactic War (unless reset available)`,
            COMMAND_ACTIVITIES_TUESDAY: `== До сброса == \nSpend Normal Energy on Light Side Battles \nSave Galactic War\n\n== После сброса == \nComplete Galactic War Battles \nSave Normal Energy`,
            COMMAND_ACTIVITIES_WEDNESDAY: `== До сброса == \nComplete Galactic War Battles \nSave Normal Energy\n\n== После сброса == \nSpend Normal Energy on Hard Mode Battles`,
            COMMAND_ACTIVITIES_THURSDAY: `== До сброса == \nSpend Normal Energy on Hard Mode Battles \nSave Challenges\n\n== После сброса == \nComplete Challenges \nSave Normal Energy`,
            COMMAND_ACTIVITIES_FRIDAY: `== До сброса == \nComplete Challenges \nSave Normal Energy\n\n== После сброса == \nSpend Normal Energy on Dark Side Battles`,
            COMMAND_ACTIVITIES_SATURDAY: `== До сброса == \nSpend Normal Energy on Dark Side Battles \nSave Arena Battles \nSave Cantina Energy\n\n== После сброса == \nComplete Arena Battles \nSave Cantina Energy`,
            COMMAND_ACTIVITIES_ERROR: (prefix, usage) => `Неправильно указан день, использование \`${prefix}${usage}\``,
            COMMAND_ACTIVITIES_HELP: {
                description: "Показывает дневные задачи гильдии.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';activities [dayOfWeek]',
                        args: {}
                    }
                ]
            },

            // Arenarank Command
            COMMAND_ARENARANK_INVALID_NUMBER: `Необходимо ввести правильный ранг`,
            COMMAND_ARENARANK_BEST_RANK: `Поздравляем, вы добились максимума для себя!`,
            COMMAND_ARENARANK_RANKLIST: (currentRank, battleCount, plural, est, rankList) => `От ранга ${currentRank}, до ${battleCount} боя${plural} ${est}\nЛучшее чего можно достичь ${rankList}`,
            COMMAND_ARENARANK_HELP: {
                description: "приблизительно показывает высший ранг которого вы можете достичь если выиграете все бои.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';arenarank <currentRank>',
                        args: {}
                    }
                ]
            },

            // Challenges Command
            COMMAND_CHALLENGES_TRAINING: "Тренировочные дроиды",
            COMMAND_CHALLENGES_ABILITY : "Материалы способностей",
            COMMAND_CHALLENGES_BOUNTY  : "Охотник за головами",  
            COMMAND_CHALLENGES_AGILITY : "Модули способностей",   
            COMMAND_CHALLENGES_STRENGTH: "Модули силы",  
            COMMAND_CHALLENGES_TACTICS : "Модули тактики",   
            COMMAND_CHALLENGES_SHIP_ENHANCEMENT: "Дроиды улучшения кораблей",
            COMMAND_CHALLENGES_SHIP_BUILDING   : "Материалы пстройки кораблей",
            COMMAND_CHALLENGES_SHIP_ABILITY    : "Материалы способностей кораблей",
            COMMAND_CHALLENGES_MISSING_DAY: 'Необходимо указать день',
            COMMAND_CHALLENGES_DEFAULT: (prefix, usage) => `Неправильная дата, использование \`${prefix}${usage}\``,
            COMMAND_CHALLENGES_HELP: {
                description: "Показывает дневные задачи гильдии.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';challenges <dayOfWeek>',
                        args: {}
                    }
                ]
            },

            // Changelog Command (Help)
            COMMAND_CHANGELOG_HELP: {
                description: "Добавляет лог изменений в БД, и отправляет сообщение в конал с логом изменений.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'changelog <message>',
                        args: {
                            "message": "Используй [Updated], [Fixed], [Removed], и [Added] чтобы организовать изменения."
                        }
                    }
                ]
            },

            // Character gear Command
            COMMAND_CHARGEAR_NEED_CHARACTER: (prefix, usage) => `Нужен персонаж. Использование \`${prefix}${usage}\``,
            COMMAND_CHARGEAR_INVALID_CHARACTER: (prefix, usage) => `Неправильный персонаж. Использование \`${prefix}${usage}\``,
            COMMAND_CHARGEAR_GEAR_ALL: (name, gearString) => ` * ${name} * \n### Все необходимые модули ### \n${gearString}`,
            COMMAND_CHARGEAR_GEAR_NA: 'Этот модуль еще не внесен',
            COMMAND_CHARACTERGEAR_HELP: {
                description: "Показывает необходимые модули для выбранного персонажа / уровня",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'charactergear <character> [gearLvl]',
                        args: {}
                    }
                ]
            },

            // CharacterMods Command
            COMMAND_CHARMODS_STAT_NAMES: ({
                'UNIT_STAT_MAX_HEALTH_PERCENT_ADDITIVE': '% Здоровья',
                'UNIT_STAT_MAX_HEALTH': ' Здоровье',
                'UNIT_STAT_ACCURACY': '% Силы',
                'UNIT_STAT_CRITICAL_CHANCE_PERCENT_ADDITIVE': '% Шанса крит. удара',
                'UNIT_STAT_MAX_SHIELD_PERCENT_ADDITIVE': '% Защиты',
                'UNIT_STAT_MAX_SHIELD': ' Защита',
                'UNIT_STAT_CRITICAL_DAMAGE': '% Крит. урон',
                'UNIT_STAT_DEFENSE_PERCENT_ADDITIVE': '% Обороны',
                'UNIT_STAT_DEFENSE': ' Оборона',
                'UNIT_STAT_OFFENSE_PERCENT_ADDITIVE': '% Атаки',
                'UNIT_STAT_OFFENSE': ' Атака',
                'UNIT_STAT_RESISTANCE': '% Стойкости',
                'UNIT_STAT_SPEED': ' Скорость',
                'UNIT_STAT_EVASION_NEGATE_PERCENT_ADDITIVE': '% Точности',
                'UNIT_STAT_CRITICAL_NEGATE_CHANCE_PERCENT_ADDITIVE': '% Избегание крит. удара'
            }),
            COMMAND_CHARMODS_MOD_TYPES: ({
                'icon_buff_health': 'Здоровье',
                'icon_buff_accuracy': 'Сила',
                'icon_buff_speed': 'Скорость',
                'icon_buff_critical_damage': 'Крит. урон',
                'icon_buff_crit_chance': 'Шанс крит. удара',
                'icon_buff_armor': 'Защита',
                'icon_tenacity': 'Стойкость'
            }),
            COMMAND_CHARMODS_NO_MODS: (charName) => `Извините, не найдено ни одного модуля для ${charName}`,
            COMMAND_CHARMODS_MISSING_MODS: `Извините, не могу найти сейчас ваши модули. Подождите немного и попробуйте снова.`,
            COMMAND_CHARMODS_LAST_UPDATED: (lastUpdated) => `Моды обновлены: ${lastUpdated} дня(ей) назад`,
            COMMAND_CHARMODS_HELP: ({
                description: "Показывает модули устанволенные на выбранного персонажа.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';charactermods [user] <character>',
                        args: {
                            "user": "Добавляемый человек. (me | userID | mention)",
                            "character": "Персонаж для которого выполнить поиск."
                        }
                    }
                ]
            }),

            // Command Report Command
            COMMAND_COMMANDREPORT_HELP: ({
                description: "Показывает команды которые выполнялись за последние 10 дней",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';commandreport',
                        args: {}
                    }
                ]
            }),

            // Current Events Command
            COMMAND_CURRENTEVENTS_HEADER: "Календарь Событий сайта SWGoH",
            COMMAND_CURRENTEVENTS_DESC: (num) => `След. ${num} события(ий).\Внимание: *Даты указаны приблизительно.*`,
            COMMAND_CURRENTEVENTS_HELP: {
                description: "Показывает предстоящие события.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';currentevents [num]',
                        args: {
                            "num": "Какой число событий должно быть показано"
                        }
                    }
                ]
            },

            // Event Command (Create)
            COMMAND_EVENT_INVALID_ACTION: (actions) => `Доступные действия \`${actions}\`.`,
            COMMAND_EVENT_INVALID_PERMS: `Вы не являетесь администратором, или лидер сервера не настроил конфигурацию. \nВы не можете создавать или удалть события пока не настроена роль администратора.`,
            COMMAND_EVENT_ONE_REPEAT: 'Нельзя использовать `repeat` и `repeatDay` в одном событии. Выберите что-то одно',
            COMMAND_EVENT_INVALID_REPEAT: `Направильный формат повтора. Пример: \`5d3h8m\` для 5 дней, 3 часов, и 8 минут`,
            COMMAND_EVENT_USE_COMMAS: `Используйте числа разделенные запятыми для repeatDay. Пример: \`1,2,1,3,4\``,
            COMMAND_EVENT_INVALID_CHAN: `Недопустимый канал, попробуйте снова`,
            COMMAND_EVENT_CHANNEL_NO_PERM: (channel) => `Нет разрашения для отправки сообщений на канал ${channel}, выберите канал с разрешением`,
            COMMAND_EVENT_NEED_CHAN: `ОШИБКА: Необходимо настроить канал для отправки. Настройте \`announceChan\` для создания событий.`,
            COMMAND_EVENT_NEED_NAME: `Задайте имя события.`,
            COMMAND_EVENT_EVENT_EXISTS: `Событие с таким названием уже существует. Невозможно добавить опять.`,
            COMMAND_EVENT_NEED_DATE: `Необходимо задать дату события. Формат \`ДД/ММ/ГГГГ\`.`,
            COMMAND_EVENT_BAD_DATE: (badDate) => `${badDate} неверная дата. Формат \`ДД/ММ/ГГГГ\`.`,
            COMMAND_EVENT_NEED_TIME: `Необходимо добавить время события.`,
            COMMAND_EVEMT_INVALID_TIME: `Задайте правильное вермя события. Формат \`ЧЧ:ММ\`, 24-часовой ыормат. Без AM или PM`,
            COMMAND_EVENT_PAST_DATE: (eventDATE, nowDATE) => `Нельзя создать собвтие в прошлом. ${eventDATE} до ${nowDATE}`,
            COMMAND_EVENT_CREATED: (eventName, eventDate) => `Создано событие \`${eventName}\` на ${eventDate}`,
            COMMAND_EVENT_NO_CREATE: `Не удалось настроить событие, попробуйте позднее.`,
            COMMAND_EVENT_TOO_BIG:(charCount) => `Извините, имя события или сообщение слишком большие. Уменьшите их как минимум на ${charCount} символов.`,

            // Event Command (View)
            COMMAND_EVENT_TIME: (eventName, eventDate) => `**${eventName}** \n\nВремя события: ${eventDate}\n`,
            COMMAND_EVENT_TIME_LEFT: (timeLeft) => `Осталось: ${timeLeft}\n`,
            COMMAND_EVENT_CHAN: (eventChan) => `Отправляю на канал: ${eventChan}\n`,
            COMMAND_EVENT_SCHEDULE: (repeatDays) => `Расписание: ${repeatDays}\n`,
            COMMAND_EVENT_REPEAT: (eventDays, eventHours, eventMins) => `Повторяется каждые ${eventDays} дня(ей), ${eventHours} часа(ов), и ${eventMins} минут(ы)\n`,
            COMMAND_EVENT_MESSAGE: (eventMsg) => `Сообщение: \n\`\`\`md\n${eventMsg}\`\`\``,
            COMMAND_EVENT_UNFOUND_EVENT: (eventName) => `Извините, не могу найти событие \`${eventName}\``,
            COMMAND_EVENT_NO_EVENT: `На ттекущий момент нет событий.`,
            COMMAND_EVENT_SHOW_PAGED: (eventCount, PAGE_SELECTED, PAGES_NEEDED, eventKeys) => `Вот календарь событий для вашего сервера \n(${eventCount} всего событие(й) Страница ${PAGE_SELECTED}/${PAGES_NEEDED}: \n${eventKeys}`,
            COMMAND_EVENT_SHOW: (eventCount, eventKeys) => `Календарь событий вашего сервера \n(${eventCount} всего событие(й)${eventCount > 1 ? 's' : ''}): \n${eventKeys}`,

            // Event Command (Delete)
            COMMAND_EVENT_DELETE_NEED_NAME: `Укажите имя события для удаления.`,
            COMMAND_EVENT_DOES_NOT_EXIST: `Такого события не существует.`,
            COMMAND_EVENT_DELETED: (eventName) => `Удалено событие: ${eventName}`,

            // Event Command (Trigger)
            COMMAND_EVENT_TRIGGER_NEED_NAME: `Укажите имя события для запуска.`,

            // Event Command (Help)
            COMMAND_EVENT_HELP: {
                description: "Используется для создания, проверки и удаления событий.",
                actions: [
                    {
                        action: "Create",
                        actionDesc: 'Создать новое событие',
                        usage: ';event create <eventName> <eventDay> <eventTime> [eventMessage]',
                        args: {
                            "--repeat <repeatTime>": "Позволяет указать длительность события в формате 00d00h00m. Затем событие повторится.",
                            "--repeatDay <schedule>": "Позволяет задать дни недели для запуска события в формате 0,0,0,0,0.",
                            "--channel <channelName>": "Позволяет указать канал на котором оповестить о событии.",
                            "--countdown": "Задает обратный отсчет до запуска события."
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'Показывает все текущие события.',
                        usage: ';event view [eventName]',
                        args: {
                            "--min": "Показывает только названия событий",
                            "--page <page#>": "Позволяет выбрать страницу событий"
                        }
                    },
                    {
                        action: "Delete",
                        actionDesc: 'Позволяет удалить событие.',
                        usage: ';event delete <eventName>',
                        args: {}
                    },
                    {
                        action: "Trigger",
                        actionDesc: 'Запускает событие на указанном канале, оставляет событие без изменений.',
                        usage: ';event trigger <eventName>',
                        args: {}
                    }
                ]
            },

            // Faction Command
            COMMAND_FACTION_INVALID_CHAR: (prefix, usage) => `Неправльно указана фракция, использование \`${prefix}${usage}\``,
            COMMAND_FACTION_CODE_OUT: (searchName, charString) => `# Персонажи в фракции ${searchName} # \n${charString}`,
            COMMAND_FACTION_HELP: {
                description: "Показывает список персонажей указанной фракции.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'faction <faction>',
                        args: {
                            "faction": "Название фракции. \nВ том виде как указано в игре(на английском), например rebel, а не rebels"
                        }
                    }
                ]
            },

            // Guilds Command
            COMMAND_GUILDS_MORE_INFO: 'Получение информации о гильдии:',
            COMMAND_GUILDS_HELP: {
                description: "Показывает топ гильдии и всех кто зарегистрирован в вашей.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';guild [user]',
                        args: {
                            "user": "Способы идентификации гильдии. (mention | allyCode | guildName)"
                        }
                    }
                ]
            },

            // GuildSearch Command
            COMMAND_GUILDSEARCH_BAD_STAR: 'Можно только указать количество звезд от 1 до 7',
            COMMAND_GUILDSEARCH_MISSING_CHAR: 'Необходимо указать персонажа для поиска',
            COMMAND_GUILDSEARCH_NO_RESULTS: (character) => `Ни одного результат для ${character}`,
            COMMAND_GUILDSEARCH_CHAR_LIST: (chars) => `Слишком много срвпадений для текущего поиска, уточните запрос. \nВот список приблизительных результатов.\n\`\`\`${chars}\`\`\``,
            COMMAND_GUILDSEARCH_FIELD_HEADER: (tier, num, setNum='') => `${tier} Звезд (${num}) ${setNum.length > 0 ? setNum : ''}`,
            COMMAND_GUILDSEARCH_NO_CHAR_STAR: (starLvl) => `Похоже ни у кого в вашей гильдии нет этого персонажа с ${starLvl} звездой(ами).`,
            COMMAND_GUILDSEARCH_NO_CHAR: `Похоже ни у кого в вашей гильдии нет этого персонажа.`,
            COMMAND_GUILDSEARCH_HELP: {
                description: "Показывает количество звезд этого персонажа у каждого в вашей гильдии.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';guildsearch [user] <character> [-ships] [starLvl]',
                        args: {
                            "user": "Кого добавляете. (me | userID | mention)",
                            "character": "Персонаж которого нужно найти.",
                            "-ships": "Для поиска кораблей используйте `-s, -ship, or -ships`",
                            "starLvl": "Укажите количество звезд."
                        }
                    }
                ]
            },

            // Heists Command
            COMMAND_HEISTS_HEADER: "SWGoH Календарь Контрабанд",
            COMMAND_HEISTS_CREDIT: (date) => `**Кредиты** : ${date}\n`,
            COMMAND_HEISTS_DROID: (date) => `**Дроиды**  : ${date}\n`,
            COMMAND_HEISTS_NOT_SCHEDULED: "`Не запланировано`",
            COMMAND_HEISTS_HELP: {
                description: "Показывает предстоящие контрабанды.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';heists',
                        args: {}
                    }
                ]
            },
            

            // Help Command
            COMMAND_HELP_HEADER: (prefix) => `= Список команд =\n\n[Используйте ${prefix}help <commandname> для подробной информации]\n`,
            COMMAND_HELP_OUTPUT: (command, prefix) => `= ${command.help.name} = \n${command.help.description} \nАлиасы:: ${command.conf.aliases.join(", ")}\nИспользование:: ${prefix}${command.help.usage}`,
            COMMAND_HELP_HELP: {
                description: "Показывает доступные команды.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';help [command]',
                        args: {
                            "command": "Имя команды для получения информации."
                        }
                    }
                ]
            },

            // Info Command
            COMMAND_INFO_OUTPUT: (guilds) => ({
                "header": 'ИНФОРМАЦИЯ',
                "desc": ` \nРаботает на **${guilds}** серверах \n`,
                "links": {
                    "Пригласить": "Пригласить бота [здесь](http://swgohbot.com/invite)",
                    "Сервер поддержки": "Есть вопрос, хотите помочь, или просто интересуетесь, сервер поддержки бота [здесь](https://discord.gg/FfwGvhr)",
                    "Поддержите бота": "Исходный код на github [здесь](https://github.com/jmiln/SWGoHBot), открыт для сотрудничества. Если заинтересовались поддержите автора на Patreon [здесь](https://www.patreon.com/swgohbot)."
                }
            }),
            COMMAND_INFO_HELP: {
                description: "Показывает важные ссылки относящиеся к боту.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'info',
                        args: {}
                    }
                ]
            },

            COMMAND_MODS_CRIT_CHANCE_SET: "Шанс крит. x2",
            COMMAND_MODS_CRIT_DAMAGE_SET: "Крит. урон x4",
            COMMAND_MODS_SPEED_SET: "Скорость x4",
            COMMAND_MODS_TENACITY_SET: "Стойкость x2",
            COMMAND_MODS_OFFENSE_SET: "Атака x4",
            COMMAND_MODS_POTENCY_SET: "Сила x2",
            COMMAND_MODS_HEALTH_SET: "Здоросье x2",
            COMMAND_MODS_DEFENSE_SET: "Оборона x2",
            COMMAND_MODS_EMPTY_SET: " ",

            COMMAND_MODS_ACCURACY_STAT: "Accuracy",
            COMMAND_MODS_CRIT_CHANCE_STAT: "Шанс крит.",
            COMMAND_MODS_CRIT_DAMAGE_STAT: "Крит. урон",
            COMMAND_MODS_DEFENSE_STAT: "Защита",
            COMMAND_MODS_HEALTH_STAT: "Здоровье",
            COMMAND_MODS_OFFENSE_STAT: "Атака",
            COMMAND_MODS_PROTECTION_STAT: "Защита",
            COMMAND_MODS_POTENCY_STAT: "Сила",
            COMMAND_MODS_SPEED_STAT: "Скорость",
            COMMAND_MODS_TENACITY_STAT: "Стойкость",
            COMMAND_MODS_UNKNOWN: "Неизвестно",

            // Mods Command
            COMMAND_MODS_NEED_CHARACTER: (prefix, usage) => `Нужно указать персонажа. Использование \`${prefix}${usage}\``,
            COMMAND_MODS_INVALID_CHARACTER: (prefix, usage) => `Неправильно указан персонаж. Использование \`${prefix}${usage}\``,
            COMMAND_MODS_EMBED_STRING1: (square, arrow, diamond) => `\`Квадрат:   ${square}\`\n\`Стрелка:    ${arrow}\`\n\`Ромб:  ${diamond}\`\n`,
            COMMAND_MODS_EMBED_STRING2: (triangle, circle, cross) => `\`Треугольник: ${triangle}\`\n\`Круг:   ${circle}\`\n\`Крест:    ${cross}\`\n`,
            COMMAND_MODS_EMBED_OUTPUT: (modSetString, modPrimaryString) => `**### Наборы ###**\n${modSetString}\n**### Основные ###**\n${modPrimaryString}`,
            COMMAND_MODS_CODE_STRING1: (square, arrow, diamond) => `* Квадрат:   ${square}  \n* Стрелка:    ${arrow} \n* Ромб:  ${diamond}\n`,
            COMMAND_MODS_CODE_STRING2: (triangle, circle, cross) => `* Треугольник: ${triangle}\n* Круг:   ${circle}\n* Крест:    ${cross}`,
            COMMAND_MODS_CODE_OUTPUT: (charName, modSetString, modPrimaryString) => ` * ${charName} * \n### Наборы### \n${modSetString}\n### Основные ###\n${modPrimaryString}`,
            COMMAND_NO_MODSETS: "Нет наборов модулей для этого персонажа",
            COMMAND_MODS_HELP: {
                description: "Показывает возможные сочетания модулей для выбранного персонажа.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'mods <character>',
                        args: {
                            "character": "Персонаж для которого показать модули"
                        }
                    }
                ]
            },

            // Modsets command
            COMMAND_MODSETS_OUTPUT: `* Шанс крит. атаки:  2\n* Крит. урон:  4\n* Оборона:  2\n* Здоровье:   2\n* Атака:  4\n* Сила:  2\n* Скорость:    4\n* Стойкость: 2`,
            COMMAND_MODSETS_HELP: {
                description: "Показывает сколько каких модулей нужно для набора.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'modsets',
                        args: {}
                    }
                ]
            },

            // MyArena Command
            COMMAND_MYARENA_NO_USER: (user) => `Извините, не могу найти данные арены для пользователя ${user}. Убедитесь что ваш аакаунт синхронизирован`,
            COMMAND_MYARENA_NO_CHAR: 'Что-то пошло не так, не могу получить список ваших персонажей.',
            COMMAND_MYARENA_ARENA: (rank) => `Арена героев (Ранг: ${rank})`,
            COMMAND_MYARENA_FLEET: (rank) => `Арена кораблей (Ранг: ${rank})`,
            COMMAND_MYARENA_EMBED_HEADER: (playerName) => `Арена пользователя ${playerName}`,
            COMMAND_MYARENA_EMBED_FOOTER: (date) => `Дата обновления арены: ${date}`,
            COMMAND_MYARENA_HELP: {
                description: "Показывает текущее состояние арены пользователя и его отряд.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';myarena [user]',
                        args: {
                            "user": "Человек которого ищете. (me | userID | mention)"
                        }
                    }
                ]
            },

            // Nickname Command
            COMMAND_NICKNAME_SUCCESS: `Я изменил мой ник.`,
            COMMAND_NICKNAME_FAILURE: `Извините, но у меня нет разрешения на это.`,
            COMMAND_NICKNAME_TOO_LONG: 'Извините, размер ника не может превышать 32 символов',
            COMMAND_NICKNAME_HELP: {
                description: "Меняет имя бота на сервере.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';nickname <name>',
                        args: {
                            "name": "Имя на которое хотите сменить. Отсавьте пустым чтобы восстановить имя по умолчанию."
                        }
                    }
                ]
            },

            // Polls Command
            COMMAND_POLL_NO_ARG: 'You need to provide either an option to vote on, or an action (create/view/etc).',
            COMMAND_POLL_ALREADY_RUNNING: "Sorry, but you can only run one poll at a time. Please end the current one first.",
            COMMAND_POLL_MISSING_QUESTION: "You need to specify something to vote on.",
            COMMAND_POLL_TOO_FEW_OPT: "You need to have at least 2 options to vote on.",
            COMMAND_POLL_TOO_MANY_OPT: "You can only have up to 10 options to vote on.",
            COMMAND_POLL_CREATED: (name, prefix, poll) => `**${name}** has started a new poll:\nVote with \`${prefix}poll <choice>\`\n\n${poll}`,
            COMMAND_POLL_NO_POLL: "There is no poll in progress",
            COMMAND_POLL_FINAL: (poll) => `Final results for ${poll}`,
            COMMAND_POLL_FINAL_ERROR: (question) => `I couldn't delete **${question}**, please try again.`,
            COMMAND_POLL_INVALID_OPTION: "That is not a valid option.",
            COMMAND_POLL_SAME_OPT: (opt) => `You have already chosen **${opt}**`,
            COMMAND_POLL_CHANGED_OPT: (oldOpt, newOpt) => `You have changed your choice from **${oldOpt}** to **${newOpt}**`,
            COMMAND_POLL_REGISTERED: (opt) => `Choice for **${opt}** registered`,
            COMMAND_POLL_CHOICE: (opt, optCount, choice) => `\`[${opt}]\` ${choice}: **${optCount} vote${optCount === 1 ? '' : 's'}**\n`,
            COMMAND_POLL_HELP: {
                description: "Lets you start a poll with multiple options.",
                actions: [
                    {
                        action: "Create",
                        actionDesc: 'Create a new poll',
                        usage: ';poll create <question> | <opt1> | <opt2> | [...] | [opt10]',
                        args: {
                            "question": "The question that you're wanting feedback on.",
                            "opt": "The options that people can choose from"
                        }
                    },
                    {
                        action: "Vote",
                        actionDesc: 'Vote on the option that you choose',
                        usage: ';poll <choice>',
                        args: {
                            "choice": "The option that you choose."
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'See what the current tally of votes is.',
                        usage: ';poll view',
                        args: {}
                    },
                    {
                        action: "Close",
                        actionDesc: 'End the poll and show the final tally.',
                        usage: ';poll close',
                        args: {}
                    }
                ]
            },
            
            // Raidteams Command
            COMMAND_RAIDTEAMS_INVALID_RAID: (prefix, help) => `Invalid raid, usage is \`${prefix}${help.usage}\`\n**Example:** \`${prefix}${help.example}\``,
            COMMAND_RAIDTEAMS_INVALID_PHASE: (prefix, help) => `Invalid phase, usage is \`${prefix}${help.usage}\`\n**Example:** \`${prefix}${help.example}\``,
            COMMAND_RAIDTEAMS_PHASE_SOLO: 'Solo',
            COMMAND_RAIDTEAMS_PHASE_ONE: 'Phase 1',
            COMMAND_RAIDTEAMS_PHASE_TWO: 'Phase 2',
            COMMAND_RAIDTEAMS_PHASE_THREE: 'Phase 3',
            COMMAND_RAIDTEAMS_PHASE_FOUR: 'Phase 4',
            COMMAND_RAIDTEAMS_CHARLIST: (charList) => `**Characters:** \`${charList}\``,
            COMMAND_RAIDTEAMS_SHOWING: (currentPhase) => `Showing teams for ${currentPhase}`,
            COMMAND_RAIDTEAMS_NO_TEAMS: (currentPhase) => `Cannot find any teams under \`${currentPhase}\``,
            COMMAND_RAIDTEAMS_CODE_TEAMS: (raidName, currentPhase) => ` * ${raidName} * \n\n* Showing teams for ${currentPhase}\n\n`,
            COMMAND_RAIDTEAMS_CODE_TEAMCHARS: (raidTeam, charList) => `### ${raidTeam} ### \n* Characters: ${charList}\n`,
            COMMAND_RAIDTEAMS_HELP: {
                description: "Shows some teams that work well for each raid.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';raidteams <raid> <phase>',
                        args: {
                            "raid": "The raid that you want to see teams for. (aat|pit|sith)",
                            "phase": "The phase of the raid you want to see. (p1|p2|p3|p4|solo)"
                        }
                    }
                ]
            },
            
            // Randomchar Command
            COMMAND_RANDOMCHAR_INVALID_NUM: (maxChar) => `Sorry, but you need a number from 1-${maxChar} there.`,
            COMMAND_RANDOMCHAR_HELP: {
                description: "Picks up to 5 random characters to form a squad.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';randomchar [numberOfChars]',
                        args: {
                            "numberOfChars": "The number of characters that you want chosen"
                        }
                    }
                ]
            },

            // Register Command
            COMMAND_REGISTER_MISSING_ARGS: 'You need to supply a userID (mention or ID), and an ally code',
            COMMAND_REGISTER_MISSING_ALLY: 'You need to enter an ally code to link your account to.',
            COMMAND_REGISTER_INVALID_ALLY: (allyCode) => `Sorry, but ${allyCode} is not a valid ally code`,
            COMMAND_REGISTER_PLEASE_WAIT: 'Please wait while I sync your data.',
            COMMAND_REGISTER_FAILURE: 'Registration failed, please make sure your ally code is correct.',
            COMMAND_REGISTER_SUCCESS: (user) => `Registration for \`${user}\` successful!`,
            COMMAND_REGISTER_UPDATE_FAILURE: 'Something went wrong, make sure your registered ally code is correct',
            COMMAND_REGISTER_UPDATE_SUCCESS: (user) => `Profile updated for \`${user}\`.`,
            COMMAND_REGISTER_HELP: {
                description: "Register your ally code to your Discord ID, and sync your SWGoH profile.",
                actions: [
                    {
                        action: "Add",
                        actionDesc: 'Link your Discord profile to a SWGoH account',
                        usage: ';register add <user> <allyCode>',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)",
                            "allyCode": "Your ally code from in-game."
                        }
                    },
                    {
                        action: "Update",
                        actionDesc: 'Update/ resync your SWGoH data.',
                        usage: ';register update <user>',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)"
                        }
                    },
                    {
                        action: "Remove",
                        actionDesc: 'Unlink your Discord profile to a SWGoH account',
                        usage: ';register remove <user>',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)"
                        }
                    }
                ]
            },


            
            // Reload Command
            COMMAND_RELOAD_INVALID_CMD: (cmd) => `I cannot find the command: ${cmd}`,
            COMMAND_RELOAD_SUCCESS: (cmd) => `Successfully reloaded: ${cmd}`,
            COMMAND_RELOAD_FAILURE: (cmd, stackTrace) => `Command reload failed: ${cmd}\n\`\`\`${stackTrace}\`\`\``,
            COMMAND_RELOAD_HELP: {
                description: "Reloads the command file, if it's been updated or modified.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';reload <command>',
                        args: {
                            "command": "The command you're wanting to reload."
                        }
                    }
                ]
            },

            // Reload Data Command
            COMMAND_RELOADDATA_HELP: {
                description: "Reloads the selected file(s).",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';reloaddata <option>',
                        args: {
                            "option": "What you're wanting to reload ( commands | data | events | function )."
                        }
                    }
                ]
            },

            // Setconf Command
            COMMAND_SETCONF_MISSING_PERMS: `Sorry, but either you're not an admin, or your server leader has not set up the configs.`,
            COMMAND_SETCONF_MISSING_OPTION: `You must select a config option to change.`,
            COMMAND_SETCONF_MISSING_VALUE: `You must give a value to change that option to.`,
            COMMAND_SETCONF_ADMINROLE_MISSING_OPT: 'You must use `add` or `remove`.',
            COMMAND_SETCONF_ADMINROLE_NEED_ROLE: (opt) => `You must specify a role to ${opt}.`,
            COMMAND_SETCONF_ADMINROLE_MISSING_ROLE: (roleName) => `Sorry, but I cannot find the role ${roleName}. Please try again.`,
            COMMAND_SETCONF_ADMINROLE_ROLE_EXISTS: (roleName) => `Sorry, but ${roleName} is already there.`,
            COMMAND_SETCONF_ADMINROLE_NOT_IN_CONFIG: (roleName) => `Sorry, but ${roleName} is not in your config.`,
            COMMAND_SETCONF_ADMINROLE_SUCCESS: (roleName, action) => `The role ${roleName} has been ${action} your admin roles.`,
            COMMAND_SETCONF_WELCOME_NEED_CHAN: `Sorry, but but your announcement channel either isn't set or is no longer valid.\nGo set \`announceChan\` to a valid channel and try again.\``,
            COMMAND_SETCONF_TIMEZONE_NEED_ZONE: `Invalid timezone, look here https://en.wikipedia.org/wiki/List_of_tz_database_time_zones \nand find the one that you need, then enter what it says in the TZ column`,
            COMMAND_SETCONF_ANNOUNCECHAN_NEED_CHAN: (chanName) => `Sorry, but I cannot find the channel ${chanName}. Please try again.`,    
            COMMAND_SETCONF_ANNOUNCECHAN_NO_PERMS: `Sorry, but I don't have permission to send message there. Please either change the perms, or choose another channel.`,
            COMMAND_SETCONF_NO_KEY: (prefix) => `This key is not in the configuration. Look in "${prefix}showconf", or "${prefix}setconf help" for a list`,
            COMMAND_SETCONF_UPDATE_SUCCESS: (key, value) => `Guild configuration item ${key} has been changed to:\n\`${value}\``,
            COMMAND_SETCONF_NO_SETTINGS: `No guild settings found.`,
            COMMAND_SETCONF_INVALID_LANG: (value, langList) => `Sorry, but ${value} is not a currently supported language. \nCurrently supported languages are: \`${langList}\``,
            COMMAND_SETCONF_RESET: `Your config has been reset`,
            COMMAND_SETCONF_HELP: {
                description: "Используется для настройки бота",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';setconf <key> <value>',
                        args: {}
                    },
                    {
                        action: "adminRole",
                        actionDesc: 'The role that you want to be able to modify bot settings or set up events',
                        usage: ';setconf adminRole <add|remove> <role>',
                        args: {
                            'add':  'Add a role to the list',
                            'remove': 'Remove a role from the list'
                        }
                    },
                    {
                        action: "enableWelcome",
                        actionDesc: 'Toggles the welcome message on/ off.',
                        usage: ';setconf enableWelcome <true|false>',
                        args: {}
                    },
                    {
                        action: "welcomeMessage",
                        actionDesc: 'The welcome message to send if you have it enabled (Special variables below)',
                        usage: ';setconf welcomeMessage <message>',
                        args: {
                            '{{user}}':  "gets replaced with the new user's name.",
                            '{{userMention}}': "makes it mention the new user there."
                        }
                    },
                    {
                        action: "useEmbeds",
                        actionDesc: 'Toggles whether or not to use embeds as the output for some commands.',
                        usage: ';setconf useEmbeds <true|false>',
                        args: {}
                    },
                    {
                        action: "timezone",
                        actionDesc: 'Sets the timezone that you want all time related commands to use. Look here if you need a list https://goo.gl/Vqwe49.',
                        usage: ';setconf timezone <timezone>',
                        args: {}
                    },
                    {
                        action: "announceChan",
                        actionDesc: 'Sets the name of your announcements channel for events etc. Make sure it has permission to send them there.',
                        usage: ';setconf announceChan <channelName>',
                        args: {}
                    },
                    {
                        action: "useEventPages",
                        actionDesc: 'Sets it so event view shows in pages, rather than super spammy.',
                        usage: ';setconf useEventPages <true|false>',
                        args: {}
                    },
                    {
                        action: "reset",
                        actionDesc: 'Resets the config back to default (ONLY use this if you are sure)',
                        usage: ';setconf reset',
                        args: {}
                    }
                ]
            },

            // Shard times command
            COMMAND_SHARDTIMES_MISSING_USER: `I need a user, please enter "me", mention someone here, or input their Discord ID.`,
            COMMAND_SHARDTIMES_MISSING_ROLE: `Sorry, but you can only add yourself unless you have an admin role.`,
            COMMAND_SHARDTIMES_INVALID_USER: `Invalid user, please enter "me", mention someone here, or input their discord ID.`,
            COMMAND_SHARDTIMES_MISSING_TIMEZONE: `You need to enter a timezone.`,
            COMMAND_SHARDTIMES_INVALID_TIMEZONE: `Invalid timezone, look here https://en.wikipedia.org/wiki/List_of_tz_database_time_zones \nand find the one that you need, then enter what it says in the TZ column`,
            COMMAND_SHARDTIMES_USER_ADDED: `User successfully added!`,
            COMMAND_SHARDTIMES_USER_NOT_ADDED: `Something went wrong when with adding this user. Please try again.`,
            COMMAND_SHARDTIMES_REM_MISSING_PERMS: `Sorry, but you can only remove yourself unless you have an admin role.`,
            COMMAND_SHARDTIMES_REM_SUCCESS: `User successfully removed!`,
            COMMAND_SHARDTIMES_REM_FAIL: `Something went wrong when removing this user. Please try again.`,
            COMMAND_SHARDTIMES_REM_MISSING: `Sorry, but that user does not seem to be here.`,
            COMMAND_SHARDTIMES_SHARD_HEADER: `Shard payouts in:`,
            COMMAND_SHARDTIMES_HELP: {
                description: "Lists the time until the payouts of anyone registered.",
                actions: [
                    {
                        action: "Add",
                        actionDesc: 'Add a user to the shard tracker',
                        usage: ';shardtimes add <user> <timezone> [flag/emoji]',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)",
                            "timezone": "The zone that your account is based in",
                            "flag/emoji": "An optional emoji if you want it to show by your name"
                        }
                    },
                    {
                        action: "Remove",
                        actionDesc: 'Remove a user from the tracker',
                        usage: ';shardtimes remove <user>',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)"
                        }
                    },
                    {
                        action: "View",
                        actionDesc: 'Look at all the tracked times for you and your shardmates',
                        usage: ';shardtimes view',
                        args: {}
                    }
                ]
            },

            // Ships Command
            COMMAND_SHIPS_NEED_CHARACTER: (prefix, usage) => `Need a character or ship. Usage is \`${prefix}${usage}\``,
            COMMAND_SHIPS_INVALID_CHARACTER: (prefix, usage) => `Invalid character or ship. Usage is \`${prefix}${usage}\``,
            COMMAND_SHIPS_TOO_MANY: `I found more than one result from that search. Please try to be more specific.`,
            COMMAND_SHIPS_CREW: 'Crew',
            COMMAND_SHIPS_FACTIONS: 'Factions',
            COMMAND_SHIPS_ABILITIES: (abilities) => `**Ability Type:** ${abilities.type}   **Ability Cooldown:** ${abilities.abilityCooldown} \n${abilities.abilityDesc}`,
            COMMAND_SHIPS_CODE_ABILITES_HEADER: ` * Abilities *\n`,
            COMMAND_SHIPS_CODE_ABILITIES: (abilityName, abilities) => `### ${abilityName} ###\nAbility Type: ${abilities.type}   Ability Cooldown: ${abilities.abilityCooldown}\n${abilities.abilityDesc}\n\n`,
            COMMAND_SHIPS_HELP: {
                description: "Shows info about the selected ship.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: 'ship <ship|pilot>',
                        args: {
                            "ship|pilot": "The ship or pilot for the ship you want info on."
                        }
                    }
                ]
            },

            // Showconf Command
            COMMAND_SHOWCONF_OUTPUT: (configKeys, serverName) => `The following is the current configuration for ${serverName}: \`\`\`${configKeys}\`\`\``,
            COMMAND_SHOWCONF_HELP: {
                description: "Показывает настройки сервера.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';showconf',
                        args: {}
                    }
                ]
            },

            // Stats Command
            COMMAND_STATS_OUTPUT: (memUsage, cpuLoad, uptime, users, servers, channels, shardID) => `= STATISTICS (${shardID}) =\n
• Память       :: ${memUsage} Мб
• Загрузка ЦП  :: ${cpuLoad}%
• Время работы :: ${uptime}
• Пользователи :: ${users}
• Сервера      :: ${servers}
• Каналы       :: ${channels}`,
            COMMAND_STATS_HELP: {
                description: "Показывает статистику бота.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';stats',
                        args: {}
                    }
                ]
            },

            // Test command (in .gitignore)
            COMMAND_TEST_HELP: {
                description: "A command to test things out.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';test',
                        args: {}
                    }
                ]
            },

            // Time Command
            COMMAND_TIME_CURRENT: (time, zone) => `Current time is: ${time} in ${zone} time`,
            COMMAND_TIME_INVALID_ZONE: (time, zone) => `Invalid timezone, here's your guild's time ${time} in ${zone} time`,
            COMMAND_TIME_NO_ZONE: (time) => `Current time is: ${time} UTC time`,
            COMMAND_TIME_WITH_ZONE: (time, zone) => `Current time is: ${time} in ${zone} time`,
            COMMAND_TIME_HELP: {
                description: "Used to check the time with the guild's configured timezone.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';time [timezone]',
                        args: {
                            "timezone": "Optional if you want to see what time it is elsewhere"
                        }
                    }
                ]
            },

            // Updatechar Command
            COMMAND_UPDATECHAR_INVALID_OPT: (arg, usableArgs) => `Sorry, but ${arg} isn't a valid argument. Try one of these: ${usableArgs}`,
            COMMAND_UPDATECHAR_NEED_CHAR: `You need to specify a character to update.`,
            COMMAND_UPDATECHAR_WRONG_CHAR: (charName) => `Sorry, but your search for '${charName}' did not find any results. Please try again.`,
            COMMAND_UPDATECHAR_HELP: {
                description: "Update the info on a specified character.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';updatechar [gear|info|mods] [charater]',
                        args: {
                            "gear": "Update the gear for the character.",
                            "info": "Update the info for the character (Image link, abilities etc.)",
                            "mods": "Update the mods from crouchingrancor.com"
                        }
                    }
                ]
            },

            // UpdateClient Command
            COMMAND_UPDATECLIENT_HELP: {
                description: "Update the client for the SWGoHAPI.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';updateclient',
                        args: {}
                    }
                ]
            },

            // Zetas Command
            COMMAND_ZETA_NO_USER: `Sorry, but I don't have that user listed anywhere.`,
            COMMAND_ZETA_NO_ZETAS: 'You don\'t seem to have any abilities zetad.',
            COMMAND_ZETA_OUT_DESC: `\`${'-'.repeat(30)}\`\n\`[L]\` Leader | \`[S]\` Special | \`[U]\` Unique\n\`${'-'.repeat(30)}\``,
            COMMAND_ZETAS_HELP: {
                description: "Show the abilities that you have put zetas on.",
                actions: [
                    {
                        action: "",
                        actionDesc: '',
                        usage: ';zeta [user]',
                        args: {
                            "user": "The person you're adding. (me | userID | mention)"
                        }
                    }
                ]
            }
        };
    }
};

