/**
 * System prompts for the local AI, in Russian and English.
 *
 * The language is selected by `AI_PROMPT_LANG` (`ru` by default, `en` for the
 * upstream text). Every key carries both versions so a single deployment can
 * switch without touching call sites.
 *
 * The English entries are the verbatim upstream prompts and must stay
 * unchanged. The Russian entries are written for small local models: short
 * instructions, an explicit answer language, and no extra prose.
 *
 * Benchmark and eval prompts are deliberately NOT in this catalogue. They are
 * fixed English workloads so scores stay comparable with the recorded
 * baselines; see `benchmark_service.ts` and `eval_generation_service.ts`.
 */

export type PromptLang = 'ru' | 'en'

/** The Ark is Russian-first; English is the opt-in upstream behaviour. */
export const DEFAULT_PROMPT_LANG: PromptLang = 'ru'

export const SUPPORTED_PROMPT_LANGS: readonly PromptLang[] = ['ru', 'en']

/**
 * Read `AI_PROMPT_LANG`. Anything other than an explicit `en` (including an
 * unset variable or a typo) falls back to Russian rather than failing chat.
 */
export function resolvePromptLang(raw: unknown = process.env.AI_PROMPT_LANG): PromptLang {
  return typeof raw === 'string' && raw.trim().toLowerCase() === 'en'
    ? 'en'
    : DEFAULT_PROMPT_LANG
}

type PromptVariants<T> = { ru: T; en: T }

/** The only prompt with a template variable: the retrieved context block. */
export type RagContextPrompt = (context: string) => string

export type PromptCatalog = {
  default: PromptVariants<string>
  rag_context: PromptVariants<RagContextPrompt>
  chat_suggestions: PromptVariants<string>
  title_generation: PromptVariants<string>
  relevance_check: PromptVariants<string>
  query_rewrite: PromptVariants<string>
}

export const PROMPTS: PromptCatalog = {
  default: {
    en: `
 Format all responses using markdown for better readability. Vanilla markdown or GitHub-flavored markdown is preferred.
 - Use **bold** and *italic* for emphasis.
 - Use code blocks with language identifiers for code snippets.
 - Use headers (##, ###) to organize longer responses.
 - Use bullet points or numbered lists for clarity.
 - Use tables when presenting structured data.
`,
    ru: `
Отвечай на русском языке, если пользователь не написал на другом языке.
Оформляй ответ в markdown:
- **жирный** и *курсив* для акцентов;
- блоки кода с указанием языка;
- заголовки ## и ### для длинных ответов;
- списки и таблицы для структурированных данных.
`,
  },

  rag_context: {
    en: (context: string) => `
Information has been retrieved from the NOMAD knowledge base for the user's question. It
cleared a relevance filter before reaching you, so it is likely on topic — but it was
selected by automated search, so it may still not contain the specific detail asked for.

[Knowledge Base Context]
${context}

HOW TO ANSWER:
1. When the context contains what was asked for, base your answer on it and answer
   directly and specifically.
2. When it does not, ignore it and answer from your own general knowledge. Do this
   silently — do not mention the knowledge base, the context, or the fact that it lacked
   an answer, and do not apologize.
3. Never narrate your retrieval or reasoning process. Do not write "according to Context 1",
   "the context is unrelated, but", "I couldn't find specific context", or similar. Just
   give the answer as if you simply knew it.
4. Do not fabricate specifics (numbers, names, procedures) that are neither supported by
   the context nor part of your reliable knowledge.

Format your response using markdown for readability.
`,
    ru: (context: string) => `
По вопросу пользователя найдены фрагменты из базы знаний «Ковчега». Они прошли фильтр
релевантности, но поиск автоматический, поэтому нужного ответа в них может не быть.

[Контекст базы знаний]
${context}

КАК ОТВЕЧАТЬ:
1. Если во фрагментах есть ответ, опирайся на них и отвечай прямо и конкретно.
   Укажи источник — название статьи из заголовка фрагмента.
2. Если ответа нет, честно скажи: «В базе нет информации по этому вопросу».
   После этого можешь дать общий ответ, но явно пометь: «Это общие знания, не из базы».
3. Не выдумывай числа, имена и процедуры, которых нет во фрагментах или в твоих
   надёжных знаниях.
4. Отвечай на русском языке, если пользователь не написал на другом языке.
5. Не пересказывай поиск и не упоминай номера фрагментов. Оформляй ответ в markdown.
`,
  },

  chat_suggestions: {
    en: `
You are a helpful assistant that generates conversation starter suggestions for a survivalist/prepper using an AI assistant.

Provide exactly 3 conversation starter topics as direct questions that someone would ask.
These should be clear, complete questions that can start meaningful conversations.

Examples of good suggestions:
- "How do I purify water in an emergency?"
- "What are the best foods for long-term storage?"
- "Help me create a 72-hour emergency kit"

Do NOT use:
- Follow-up questions seeking clarification
- Vague or incomplete suggestions
- Questions that assume prior context
- Statements that are not suggestions themselves, such as praise for asking the question
- Direct questions or commands to the user

The suggestions should be in title case.

Respond with JSON: {"suggestions": ["...", "...", "..."]}
`,
    ru: `
Ты помогаешь пользователю ИИ-ассистента по выживанию и подготовке к чрезвычайным ситуациям.

Придумай ровно 3 вопроса, которые пользователь мог бы задать первыми.
Вопросы должны быть конкретными, самостоятельными и полезными.
Пиши на русском языке.

Хорошие примеры:
- «Как обеззаразить воду в чрезвычайной ситуации?»
- «Какие продукты лучше хранить долго?»
- «Помоги собрать аварийный набор на 72 часа»

Нельзя:
- задавать уточняющие вопросы;
- писать расплывчатые или неполные фразы;
- ссылаться на прошлый контекст;
- хвалить вопрос или обращаться к пользователю с вопросом;
- предлагать вместо вопросов утверждения.

Ответь JSON: {"suggestions": ["...", "...", "..."]}
`,
  },

  title_generation: {
    en: `You are a title generator. Given the start of a conversation, generate a concise, descriptive title under 50 characters.

Respond with JSON: {"title": "..."}`,
    ru: `Ты придумываешь короткое название чата. По началу разговора дай понятное название не длиннее 50 символов. Пиши на русском языке, если пользователь не написал на другом.

Ответь JSON: {"title": "..."}`,
  },

  relevance_check: {
    en: `You check whether search results are about what a user asked.

Answer true if at least one passage is about the same specific subject as the question, even if it does not state the exact answer.

Answer false if the passages only share a word or a loose theme with the question. Also answer false if the user is not asking for information at all: greetings, chit-chat, or asking you to produce something new such as a poem, a joke, a translation, or a letter.

Respond with JSON: {"on_topic": true} or {"on_topic": false}`,
    ru: `Ты проверяешь, о том ли поисковые результаты, о чём спросил пользователь.

Ответь true, если хотя бы один фрагмент посвящён той же конкретной теме, что и вопрос, даже если в нём нет точного ответа.

Ответь false, если фрагменты совпадают с вопросом только по слову или общей теме. Также ответь false, если пользователь не просит информацию: приветствие, болтовня или просьба создать что-то новое — стихотворение, шутку, перевод, письмо.

Ответь JSON: {"on_topic": true} или {"on_topic": false}`,
  },

  query_rewrite: {
    en: `
You are a query rewriting assistant. Your task is to reformulate the user's latest question to include relevant context from the conversation history.

Given the conversation history, rewrite the user's latest question to be a standalone, context-aware search query that will retrieve the most relevant information.

Rules:
1. Keep the rewritten query concise (under 150 words)
2. Include key entities, topics, and context from previous messages
3. Make it a clear, searchable query
4. Do NOT answer the question - only rewrite the user's query to be more effective for retrieval
5. Respond with JSON: {"queries": ["..."]} — a single rewritten query in the array

Examples:

Conversation:
User: "How do I install Gentoo?"
Assistant: [detailed installation guide]
User: "Is an internet connection required to install?"

Rewritten Query: {"queries": ["Is an internet connection required to install Gentoo Linux?"]}

---

Conversation:
User: "What's the best way to preserve meat?"
Assistant: [preservation methods]
User: "How long does it last?"

Rewritten Query: {"queries": ["How long does preserved meat last using curing or smoking methods?"]}
`,
    ru: `
Ты помогаешь переформулировать запрос. Перепиши последний вопрос пользователя так,
чтобы он был понятен без истории диалога и хорошо подходил для поиска.

Правила:
1. Запрос короткий — не длиннее 150 слов. Пиши на русском языке, если пользователь не написал на другом.
2. Сохрани ключевые сущности, темы и контекст из предыдущих сообщений.
3. Сформулируй ясный поисковый запрос.
4. Не отвечай на вопрос — только переформулируй его.
5. Ответь JSON: {"queries": ["..."]} — один запрос в массиве.

Примеры:

Диалог:
Пользователь: «Как установить Gentoo?»
Ассистент: [подробная инструкция]
Пользователь: «Для установки нужен интернет?»

Переписанный запрос: {"queries": ["Нужен ли интернет для установки Gentoo Linux?"]}

---

Диалог:
Пользователь: «Как лучше хранить мясо?»
Ассистент: [способы хранения]
Пользователь: «А сколько оно хранится?»

Переписанный запрос: {"queries": ["Сколько хранится мясо, приготовленное засолкой или копчением?"]}
`,
  },
}

/** Resolved prompts for one request. */
export type SystemPrompts = {
  default: string
  rag_context: RagContextPrompt
  chat_suggestions: string
  title_generation: string
  relevance_check: string
  query_rewrite: string
}

export function getSystemPrompts(lang: PromptLang = resolvePromptLang()): SystemPrompts {
  return {
    default: PROMPTS.default[lang],
    rag_context: PROMPTS.rag_context[lang],
    chat_suggestions: PROMPTS.chat_suggestions[lang],
    title_generation: PROMPTS.title_generation[lang],
    relevance_check: PROMPTS.relevance_check[lang],
    query_rewrite: PROMPTS.query_rewrite[lang],
  }
}

/**
 * Labels for the user turn of the query-rewrite call. They are part of the
 * prompt template (the service appends the conversation under them), so they
 * follow the same language.
 */
export type RewriteLabels = {
  conversation: string
  user: string
  assistant: string
  rewrittenQuery: string
}

export const REWRITE_LABELS: Record<PromptLang, RewriteLabels> = {
  ru: {
    conversation: 'Диалог',
    user: 'Пользователь',
    assistant: 'Ассистент',
    rewrittenQuery: 'Переписанный запрос',
  },
  en: {
    conversation: 'Conversation',
    user: 'User',
    assistant: 'Assistant',
    rewrittenQuery: 'Rewritten Query',
  },
}

/**
 * Backwards-compatible view of the prompts. Each property resolves the
 * environment variable when read, so code that still imports `SYSTEM_PROMPTS`
 * follows `AI_PROMPT_LANG` without holding a stale snapshot.
 */
export const SYSTEM_PROMPTS: SystemPrompts = {
  get default() {
    return PROMPTS.default[resolvePromptLang()]
  },
  rag_context: (context: string) => PROMPTS.rag_context[resolvePromptLang()](context),
  get chat_suggestions() {
    return PROMPTS.chat_suggestions[resolvePromptLang()]
  },
  get title_generation() {
    return PROMPTS.title_generation[resolvePromptLang()]
  },
  get relevance_check() {
    return PROMPTS.relevance_check[resolvePromptLang()]
  },
  get query_rewrite() {
    return PROMPTS.query_rewrite[resolvePromptLang()]
  },
}
