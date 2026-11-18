/**
 * English dictionary — the source of truth for translation keys.
 *
 * Add a new string here first, then add the Russian counterpart in ru.ts.
 * TypeScript will fail the build when ru.ts misses a key from this file.
 */
export type PluralForms = {
  one: string
  few: string
  many: string
  other: string
}

export interface TranslationDictionary {
  [key: string]: string | PluralForms | TranslationDictionary
}

export const en = {
  app: {
    name: 'Kovcheg',
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading…',
    error: 'Error',
    retry: 'Retry',
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    settings: 'Settings',
    language: 'Language',
    russian: 'Русский',
    english: 'English',
    apply: 'Apply',
    confirm: 'Confirm',
    submit: 'Submit',
    installed: 'Installed',
    selected: 'Selected',
    downloading: 'Downloading',
    failed: 'Failed',
    noDownload: 'No download',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    refresh: 'Refresh',
    download: 'Download',
    upload: 'Upload',
    install: 'Install',
    start: 'Start',
    stop: 'Stop',
    open: 'Open',
    copy: 'Copy',
    copied: 'Copied',
    copyToClipboard: 'Copy to Clipboard',
    openGitHubIssue: 'Open a GitHub Issue',
    debugInfo: 'Debug Info',
    noRecords: 'No records found',
    title: 'Title',
    name: 'Name',
    author: 'Author',
    summary: 'Summary',
    updated: 'Updated',
    size: 'Size',
    actions: 'Actions',
    collapseRow: 'Collapse row',
    expandRow: 'Expand row',
    dismissAlert: 'Dismiss alert',
    moreInformation: 'More information',
    downloadComplete: 'Download complete',
    estimatedSpeed: 'Est. Speed: {speed}',
    switchToDayOps: 'Switch to Day Ops',
    switchToNightOps: 'Switch to Night Ops',
    dayOps: 'Day Ops',
    nightOps: 'Night Ops',
    fadingImageAlt: 'Fading image',
    welcome: 'Welcome, {name}!',
    files: {
      one: '{count} file',
      few: '{count} files',
      many: '{count} files',
      other: '{count} files',
    },
    items: {
      one: '{count} item',
      few: '{count} items',
      many: '{count} items',
      other: '{count} items',
    },
    notAvailable: 'N/A',
    clear: 'Clear',
    loadMore: 'Load More',
    continue: 'Continue',
    searchIn: 'Search in:',
    all: 'All',
    noMatches: 'No matches',
    aiAssistant: 'AI Assistant',
  },
  nav: {
    home: 'Home',
    backToHome: 'Back to Home',
    commandCenter: 'Command Center',
    easySetup: 'Easy Setup',
    supplyDepot: 'Supply Depot',
    benchmark: 'Benchmark',
    contentExplorer: 'Content Explorer',
    contentManager: 'Content Manager',
    creatorPacks: 'Creator Packs',
    maps: 'Maps',
    mapsManager: 'Maps Manager',
    drugReference: 'Drug Reference',
    serviceLogs: 'Service Logs & Metrics',
    updates: 'Check for Updates',
    system: 'System',
    advanced: 'Advanced',
    apiReference: 'API Reference',
    support: 'Support the Project',
    legal: 'Legal Notices',
    settings: 'Settings',
    docs: 'Docs',
  },
  layout: {
    logoAlt: 'Project NOMAD Logo',
    footerBrand: 'Project NOMAD™ Command Center v{version}',
    closeSidebar: 'Close sidebar',
    debugInfoDescription:
      'This is non-sensitive system info you can share when reporting issues. No passwords, IPs, or API keys are included.',
    debugBrowserInfo: 'Browser: {userAgent}',
  },
  home: {
    mapsDescription: 'View offline maps',
    drugReferenceDescription: 'Offline FDA drug labels. Search by drug name or by symptom',
    easySetupDescription:
      'Not sure where to start? Use the setup wizard to quickly configure your NOMAD!',
    supplyDepotDescription: 'Browse and install curated apps, or add your own Docker container',
    docsDescription: 'Read Project NOMAD manuals and guides',
    settingsDescription: 'Configure your NOMAD settings',
    updateAvailableTitle: 'An update is available for Project NOMAD!',
    goToSettings: 'Go to Settings',
    benchmarkRerunTitle: 'Your benchmark can be re-scored with Score v2',
    benchmarkRerunMessage:
      "We've upgraded the benchmark scoring system. Re-run your benchmark to get an updated Score v2 result on the community leaderboard.",
    rerunBenchmark: 'Re-run benchmark',
    linkTileTitle: 'A shortcut you added. NOMAD does not manage this.',
    startHere: 'Start here!',
    poweredBy: 'Powered by {name}',
    accessApplication: 'Access the {name} application',
    opensInNewTab: 'Opens in a new tab',
    editLink: 'Edit this link',
    removeLink: 'Remove this link',
    addLink: 'Add a Link',
    addLinkDescription: 'A shortcut to something else on your network',
    removeLinkFailed: 'Failed to remove this link.',
  },
  about: {
    title: 'About',
    hello: 'Hello from About!',
  },
  docs: {
    title: 'Documentation',
  },
  whatsNew: {
    title: "What's new in v{version}",
    highlightCreatorPacks:
      'Creator Packs - install curated video packs from your favorite creators and watch them fully offline.',
    highlightMedicationReference:
      'Medication Reference - offline FDA drug-label lookup for quick, reliable medication information.',
    highlightBenchmarkScore:
      'Benchmark Score v2 - a rebuilt scoring model, with live telemetry while the test runs and your score revealed at the end.',
    highlightNomadMd:
      'NOMAD.md - give your AI assistant standing instructions it follows in every conversation.',
    highlightKnowledgeBase:
      'Knowledge Base collections - group what the assistant searches by subject, so answers stay on topic.',
    seeReleaseNotes: 'See release notes',
  },
  easySetup: {
    title: 'Easy Setup Wizard',
    completeTitle: 'Easy Setup Wizard Complete',
    noInternetTitle: 'No Internet Connection',
    noInternetMessage:
      "You'll need an internet connection to proceed. Please connect to the internet and try again.",
    steps: {
      progress: 'Progress',
      apps: 'Apps',
      maps: 'Maps',
      content: 'Content',
      creatorPacks: 'Creator Packs',
      ai: 'AI',
      review: 'Review',
    },
    capabilities: {
      information: {
        name: 'Information Library',
        technicalName: 'Kiwix',
        description:
          'Offline access to Wikipedia, medical references, how-to guides, and encyclopedias',
        features: {
          completeWikipedia: 'Complete Wikipedia offline',
          medicalReferences: 'Medical references and first aid guides',
          diyGuides: 'DIY repair guides and how-to content',
          gutenberg: 'Project Gutenberg books and literature',
        },
      },
      education: {
        name: 'Education Platform',
        technicalName: 'Kolibri',
        description: 'Interactive learning platform with video courses and exercises',
        features: {
          khanAcademy: 'Khan Academy math and science courses',
          k12: 'K-12 curriculum content',
          exercises: 'Interactive exercises and quizzes',
          progress: 'Progress tracking for learners',
        },
      },
      ai: {
        technicalName: 'Ollama',
        description:
          'Local AI chat that runs entirely on your hardware - no internet required',
        features: {
          private: 'Private conversations that never leave your device',
          offline: 'No internet connection needed after setup',
          help: 'Ask questions, get help with writing, brainstorm ideas',
          localModels: 'Runs on your own hardware with local AI models',
        },
      },
    },
    step1: {
      title: 'What do you want NOMAD to do?',
      subtitle: 'Select the capabilities you need. You can always add more later.',
      allInstalled: 'All available capabilities are already installed!',
      manageApps: 'Manage Apps',
      coreCapabilities: 'Core Capabilities',
      remoteOllama: 'Use remote Ollama instance',
      remoteOllamaPlaceholder: 'http://192.168.1.100:11434',
      lookingForMore: 'Looking for more apps?',
      moreAppsDescription:
        'Notes, data tools, and the full catalog of add-on apps are available any time in Supply Depot.',
      openSupplyDepot: 'Open Supply Depot',
      turnOffAiConfirm:
        'Turning off AI will discard your AI model picks, indexing policy, and remote Ollama configuration. Continue?',
    },
    notifications: {
      internetRequired: 'You must have an internet connection to complete the setup.',
      remoteOllamaFailed: 'Failed to configure remote Ollama.',
      completed: 'Setup wizard completed! Your selections are being processed.',
      error: 'An error occurred during setup. Some items may not have been processed.',
    },
    step2: {
      title: 'Choose Map Regions',
      subtitle:
        'Select map region collections to download for offline use. You can always download more regions later.',
      mapsManagerHint:
        'Only need a specific country, or want the whole world? Individual countries and a full global map can be installed any time from the',
      mapsManager: 'Maps Manager',
      empty: 'No map collections available at this time.',
    },
    step3: {
      title: 'Choose Content',
      subtitleInformation: 'Select content categories for offline knowledge.',
      subtitleGeneric: 'Configure content for your selected capabilities.',
      additionalContent: 'Additional Content',
      additionalContentHint: 'Curated collections for offline reference',
      empty:
        'No content-based capabilities selected. You can skip this step or go back to select capabilities that require content.',
    },
    creatorPacks: {
      title: 'Stock Creator Packs',
      subtitle:
        'Branded video collections from creators, downloaded for offline viewing in Kiwix.',
      empty: 'No creator packs available right now.',
    },
    aiStep: {
      title: 'Configure {name}',
      subtitle: 'Choose models to download and set how {name} handles new content.',
      models: 'AI Models',
      modelsHint: 'Select models to download for offline AI',
      recommendedFor: 'Recommended for: {tier}',
      remoteSelectedTitle: 'Remote Ollama selected',
      remoteSelectedMessage:
        'Models are managed on the remote machine. You can add models from Settings > AI Assistant after setup, note this is only supported when using Ollama, not LM Studio and other OpenAI API software.',
      size: 'Size: {size}',
      supportsImages: 'Supports images',
      empty: 'No recommended AI models available at this time.',
      autoIndexTitle: 'Auto-index new content for {name}?',
      autoIndexDescription:
        'When you add new ZIMs, documents, or curated content, should {name} index them automatically so it can search them while answering your questions?',
      always: 'Yes, always',
      manual: 'Ask me first',
      autoIndexHint: 'You can change this any time from the Knowledge Base panel inside AI Chat.',
    },
    review: {
      title: 'Review Your Selections',
      subtitle: 'Review your choices before starting the setup process.',
      noSelectionsTitle: 'No Selections Made',
      noSelectionsMessage:
        "You haven't selected anything to install or download. You can go back to make selections or go back to the home page.",
      capabilities: 'Capabilities to Install',
      mapCollections: {
        one: 'Map Collection to Download ({count})',
        few: 'Map Collections to Download ({count})',
        many: 'Map Collections to Download ({count})',
        other: 'Map Collections to Download ({count})',
      },
      creatorPacks: {
        one: 'Creator Pack to Install ({count})',
        few: 'Creator Packs to Install ({count})',
        many: 'Creator Packs to Install ({count})',
        other: 'Creator Packs to Install ({count})',
      },
      contentCategories: {
        one: 'Content Category ({count})',
        few: 'Content Categories ({count})',
        many: 'Content Categories ({count})',
        other: 'Content Categories ({count})',
      },
      aiModels: {
        one: 'AI Model to Download ({count})',
        few: 'AI Models to Download ({count})',
        many: 'AI Models to Download ({count})',
        other: 'AI Models to Download ({count})',
      },
      autoIndexSetting: 'Auto-index Setting',
      autoIndexAlwaysBefore: 'New content will be ',
      autoIndexAlwaysStrong: 'indexed automatically',
      autoIndexAlwaysAfter: ' as it arrives so {name} can search it.',
      autoIndexManualBefore: 'New content will ',
      autoIndexManualStrong: 'wait for you to opt in',
      autoIndexManualAfter: ' from the Knowledge Base panel before {name} indexes it.',
      readyTitle: 'Ready to Start',
      readyMessage:
        "Click 'Complete Setup' to begin installing apps and downloading content. This may take some time depending on your internet connection and the size of the downloads.",
      summary: {
        capabilities: {
          one: '{count} capability',
          few: '{count} capabilities',
          many: '{count} capabilities',
          other: '{count} capabilities',
        },
        mapRegions: {
          one: '{count} map region',
          few: '{count} map regions',
          many: '{count} map regions',
          other: '{count} map regions',
        },
        contentCategories: {
          one: '{count} content category',
          few: '{count} content categories',
          many: '{count} content categories',
          other: '{count} content categories',
        },
        creatorPacks: {
          one: '{count} creator pack',
          few: '{count} creator packs',
          many: '{count} creator packs',
          other: '{count} creator packs',
        },
        aiModels: {
          one: '{count} AI model selected',
          few: '{count} AI models selected',
          many: '{count} AI models selected',
          other: '{count} AI models selected',
        },
      },
      cancelGoHome: 'Cancel & Go to Home',
      completeSetup: 'Complete Setup',
      sizeGb: '{size} GB',
    },
    complete: {
      appActivity: 'App Installation Activity',
      backgroundTitle: 'Running in the Background',
      backgroundMessage:
        'Feel free to leave this page at any time - your app installs and downloads will continue in the background! Please note, the Information Library (if installed) may be unavailable until all initial downloads complete.',
      goHome: 'Go to Home',
      noInternetMessage:
        "It looks like you're not connected to the internet. Installing apps and downloading content will require an internet connection.",
    },
  },
  tierSelection: {
    selectTierHint:
      'Select a tier based on your storage capacity and needs. Higher tiers include all content from lower tiers.',
    includes: '(includes {name})',
    additionalResources: {
      one: '{count} additional resource',
      few: '{count} additional resources',
      many: '{count} additional resources',
      other: '{count} additional resources',
    },
    plusEverythingIn: ' (plus everything in {name})',
    resourcesIncluded: {
      one: '{count} resource included',
      few: '{count} resources included',
      many: '{count} resources included',
      other: '{count} resources included',
    },
    embeddingAdditionalStorage:
      'of additional storage if these are indexed for the AI Assistant',
    embeddingUnknownFiles: '(estimate excludes some files we have no prior data for)',
    policyYour: 'Your ',
    policyAutoIndex: 'Auto-index',
    policySettingIs: ' setting is ',
    policyAlways: 'Always',
    policyAlwaysAfter:
      ', so these files will be indexed automatically once downloaded. You can change this in the Knowledge Base settings.',
    policyManual: 'Manual',
    policyManualAfter:
      ', so these files will sit unindexed until you opt in from the Knowledge Base settings.',
    footerHint:
      'You can change your selection at any time. Click Submit to confirm your choice.',
  },
  wikipediaSelector: {
    title: 'Wikipedia',
    subtitle: 'Select your preferred Wikipedia package',
    downloading: 'Downloading Wikipedia... This may take a while for larger packages.',
    failed: 'Wikipedia download failed. Select a package and try again.',
    remove: 'Remove Wikipedia',
    downloadSelected: 'Download Selected',
  },
  curatedCollectionCard: {
    allItemsDownloaded: 'All items downloaded',
    itemsAndSize: 'Items: {items} | Size: {size}',
  },
  categoryCard: {
    indexingSuffix: ' (indexing)',
    downloadingSuffix: ' (downloading)',
    tiersAvailable: {
      one: '{count} tier available',
      few: '{count} tiers available',
      many: '{count} tiers available',
      other: '{count} tiers available',
    },
    clickToChoose: ' - Click to choose',
    sizeRange: 'Size: {min} - {max}',
  },
  storage: {
    title: 'Storage',
    selectedDelta: '(+{size} selected)',
    current: 'Current ({size})',
    selected: 'Selected (+{size})',
    exceeds: 'Exceeds available space by {size}',
    freeRemaining: '{size} will remain free',
  },
  installActivityFeed: {
    title: 'Installation Activity',
  },
  creatorPackCard: {
    videosAndSize: {
      one: '{count} video · {size}',
      few: '{count} videos · {size}',
      many: '{count} videos · {size}',
      other: '{count} videos · {size}',
    },
    updateAvailable: 'Update available',
    uninstall: 'Uninstall pack',
  },
  creatorPacks: {
    startedInstalling: 'Started installing "{name}"',
    startInstallError: 'An error occurred while starting the install.',
    uninstalled: 'Uninstalled "{name}"',
    uninstallError: 'An error occurred while uninstalling.',
    title: 'Creator Packs',
    subtitle: 'Branded video collections from creators, for offline viewing',
    pageDescription:
      'Install branded video collections from creators. Packs download in the background and play offline through Kiwix.',
    unavailable: "Creator Packs aren't available on this build.",
    empty: 'No creator packs available.',
    installModalTitle: 'Install {name}?',
    installModalFallbackTitle: 'Install Creator Pack',
    updatePack: 'Update pack',
    installPack: 'Install pack',
    videosFromCreator: {
      one: '{count} video from {creator}, about {size}.',
      few: '{count} videos from {creator}, about {size}.',
      many: '{count} videos from {creator}, about {size}.',
      other: '{count} videos from {creator}, about {size}.',
    },
    backgroundNote: 'It will download in the background and appear in Kiwix when ready.',
    licensed: 'Licensed content — personal use, not for redistribution.',
    viewLicense: 'View license',
    uninstallModalTitle: 'Uninstall {name}?',
    uninstallModalFallbackTitle: 'Uninstall Creator Pack',
    uninstallPack: 'Uninstall pack',
    uninstallDescription:
      'This removes the downloaded videos ({size}) from this NOMAD. You can reinstall the pack anytime.',
  },
  zim: {
    subtitle: 'Manage your stored content files.',
    hideUploader: 'Hide Uploader',
    uploadZimFile: 'Upload ZIM File',
    rescanLibrary: 'Rescan Library',
    rescanTooltip:
      'Rebuild the Kiwix library index from the files on disk. Use this after manually adding ZIM files outside of NOMAD.',
    uploadDescription:
      'Upload a ZIM file from your browser. Files up to 20 GB are supported. For best results upload from the same machine or over a stable LAN connection. Larger files should be copied directly to the storage volume.',
    uploadComplete: {
      one: 'Upload complete. {count} new book added to the library.',
      few: 'Upload complete. {count} new books added to the library.',
      many: 'Upload complete. {count} new books added to the library.',
      other: 'Upload complete. {count} new books added to the library.',
    },
    uploadUpToDate: 'Upload complete. Library is up to date.',
    rescanFound: {
      one: 'Found {count} new book. Library now has {total}.',
      few: 'Found {count} new books. Library now has {total}.',
      many: 'Found {count} new books. Library now has {total}.',
      other: 'Found {count} new books. Library now has {total}.',
    },
    rescanUpToDate: {
      one: 'Library is up to date ({count} book).',
      few: 'Library is up to date ({count} books).',
      many: 'Library is up to date ({count} books).',
      other: 'Library is up to date ({count} books).',
    },
    confirmDeleteTitle: 'Confirm Delete?',
    confirmDeleteMessage:
      'Are you sure you want to delete {name}? This action cannot be undone.',
    kiwixNotInstalled:
      'The Kiwix application is not installed. Please install it to view downloaded ZIM files',
  },
  zimExplorer: {
    subtitle: 'Browse and download content for offline reading!',
    noInternetTitle: 'No internet connection. You may not be able to download files.',
    kiwixNotInstalled:
      'The Kiwix application is not installed. Please install it to view downloaded content files.',
    curatedContent: 'Curated Content',
    forceRefreshCollections: 'Force Refresh Collections',
    additionalContent: 'Additional Content',
    additionalContentHint: 'Curated collections for offline reference',
    noCategories: 'No curated content categories available.',
    browseLibraryTitle: 'Browse the Kiwix Library',
    manageLibraries: 'Manage Custom Libraries',
    addCustomLibrary: 'Add Custom Library',
    source: 'Source',
    defaultSource: 'Default (Kiwix)',
    searchPlaceholder: 'Search available ZIM files...',
    allLanguages: 'All languages',
    details: {
      publisher: 'Publisher',
      category: 'Category',
      articles: 'Articles',
      media: 'Media',
      issued: 'Issued',
      file: 'File',
    },
    browseErrorTitle: 'Could not fetch directory listing from this URL.',
    browseErrorMessage:
      'The server may not support directory browsing, or the URL may be incorrect.',
    emptyDirectory: 'No directories or ZIM files found at this location.',
    manageLibrariesDescription:
      'Add Kiwix mirrors or other ZIM file sources for faster downloads.',
    builtIn: '(built-in)',
    removeLibrary: 'Remove library',
    libraryName: 'Library Name',
    libraryNamePlaceholder: 'e.g., Debian Mirror',
    baseUrl: 'Base URL',
    baseUrlPlaceholder: 'e.g., https://cdimage.debian.org/mirror/kiwix.org/zim/',
    addLibrarySubmit: 'Add Library',
    confirmDownloadTitle: 'Confirm Download?',
    confirmDownloadBefore: 'Are you sure you want to download ',
    confirmDownloadAfter:
      '? It may take some time for it to be available depending on the file size and your internet connection. The Kiwix application will be restarted after the download is complete.',
    confirmCustomDownloadBefore: 'Are you sure you want to download ',
    confirmCustomDownloadAfter:
      '? The Kiwix application will be restarted after the download is complete.',
    startedDownloading: 'Started downloading "{name}"',
    startDownloadFailed: 'Failed to start download.',
    startDownloadsError: 'An error occurred while starting downloads.',
    wikipediaRemoved: 'Wikipedia removed successfully',
    wikipediaDownloadStarted: 'Wikipedia download started',
    wikipediaSelectionFailed: 'Failed to change Wikipedia selection',
    wikipediaSelectionError: 'An error occurred while changing Wikipedia selection',
    collectionsRefreshed: 'Successfully refreshed content collections.',
    libraryAdded: 'Custom library added.',
    libraryAddFailed: 'Failed to add custom library.',
    libraryRemoved: 'Custom library removed.',
  },
  zimUploader: {
    uploadFailed: 'Upload failed',
    duplicateName: 'A ZIM file with that name already exists',
    oneWikipedia: 'Only one Wikipedia file can be uploaded at a time',
    note: 'ZIM files only. Large files (up to 20 GB) are supported. For best results, upload from the same machine or over a stable LAN connection. Larger files should be copied directly to the storage volume',
  },
  gpuPassthrough: {
    forceReinstallFailed: 'Force reinstall failed',
    reinstallSuccess:
      '{name} is being reinstalled with GPU support. This page will reload shortly.',
    reinstallFailed: 'Failed to reinstall: {error}',
    reinstallTitle: 'Reinstall {name}?',
    reinstallConfirm: 'Reinstall',
    reinstallDescription:
      'This will recreate the {name} container with GPU support enabled. Your downloaded models will be preserved. The service will be briefly unavailable during reinstall.',
    amdHsaMessage:
      "Your system has an AMD GPU, but {name} is running on CPU only. Reinstalling won't fix this: the GPU{gpu} isn't on ROCm's supported list and needs a GFX version override.",
    vendorMessage:
      "Your system has {vendor} GPU, but {name} can't access it. AI is running on CPU only, which is significantly slower.",
    vendorAmd: 'an AMD',
    vendorNvidia: 'an NVIDIA',
    notAccessibleTitle: 'GPU Not Accessible to {name}',
    fixGfxOverride: 'Fix: Set GFX Override',
    fixReinstall: 'Fix: Reinstall {name}',
    saveOverrideFailed: 'Failed to save the GFX override: {error}',
    setOverrideTitle: 'Set AMD GFX Override',
    saveAndReinstall: 'Save and Reinstall',
    rocmDescription:
      'ROCm ships GPU kernels for a fixed list of AMD chips. Integrated Radeon GPUs outside that list run on CPU unless ROCm treats them as a supported chip, set through HSA_OVERRIDE_GFX_VERSION.',
    example1: 'Radeon 780M / 760M (gfx1103): 11.0.0',
    example2: 'Radeon 680M / 660M and other RDNA 2 iGPUs (gfx1031 to gfx1036): 10.3.0',
    detectedGpu: 'Detected GPU: {gpu}. Current override: {override}.',
    notReported: 'not reported by Ollama',
    none: 'none',
    recommendedForGpu: ' Recommended for this GPU: {value}.',
    gfxOverrideLabel: 'GFX version override',
    gfxOverridePlaceholder: '11.0.0',
    saveRecreates:
      'Saving recreates the {name} container with this override. Downloaded models are preserved.',
  },
  activeDownloads: {
    title: 'Active Downloads',
    speedZero: '0 B/s',
    speedBytes: '{value} B/s',
    speedKb: '{value} KB/s',
    speedMb: '{value} MB/s',
    failed: 'Download failed',
    dismissFailed: 'Dismiss failed download',
    retryDownload: 'Retry download',
    retrying: 'Retrying...',
    openPage: 'Open resource download page',
    downloadPage: 'Download page',
    keep: 'Keep',
    cancelDownload: 'Cancel download',
    waiting: 'Waiting...',
    downloading: 'Downloading...',
    noData: 'No data received for {minutes}m...',
    empty: 'No active downloads',
  },
  kbGuardrail: {
    title: 'Confirm large AI indexing operation',
    descriptionBefore: 'Indexing this batch for the AI Assistant will use approximately ',
    descriptionAfter: ' of disk space for embeddings, on top of the raw downloads.',
    freeWarning:
      "That's more than 10% of your remaining free disk space ({size} free). Embedding can take several hours and is hard to interrupt cleanly once started.",
    manualHintBefore:
      "If you'd rather review per-item before indexing, cancel here and switch your Auto-index setting to ",
    manualHintStrong: 'Manual',
    manualHintAfter: ' from the Knowledge Base panel.',
    proceedAnyway: 'Proceed anyway',
  },
  chat: {
    openChat: 'Open chat',
    conversationsAria: 'Chat conversations',
    newChat: 'New Chat',
    noPreviousChats: 'No previous chats',
    openFullChat: 'Open Full Chat',
    modelsAndSettings: 'Models & Settings',
    knowledgeBase: 'Knowledge Base',
    clearHistory: 'Clear History',
    clearHistoryTitle: 'Clear All Chat History?',
    clearHistoryConfirm: 'Clear All',
    clearHistoryMessage:
      'Are you sure you want to delete all chat sessions? This action cannot be undone and all conversations will be permanently deleted.',
    startConversation: 'Start a conversation',
    startDescription:
      'Interact with your installed language models directly in the Command Center.',
    suggestionsHeading: 'Suggestions:',
    suggestionsHint:
      'Need some inspiration? Enable chat suggestions in settings to get started with example prompts.',
    thinking: 'Thinking',
    inputPlaceholder: 'Type your message to {name}... (Shift+Enter for new line)',
    image: {
      attach: 'Attach images',
      attached: 'Attached images',
      remove: 'Remove {name}',
      maxImages: 'You can attach up to {count} images.',
      unsupported: '{name} is not supported. Use JPEG, PNG, or WebP.',
      tooLarge: '{name} exceeds the 8 MB per-image limit.',
      onlyFirst: {
        one: 'Only the first {count} selected image(s) were attached.',
        few: 'Only the first {count} selected image(s) were attached.',
        many: 'Only the first {count} selected image(s) were attached.',
        other: 'Only the first {count} selected image(s) were attached.',
      },
      describeDefault: 'Describe the attached image.',
    },
    message: {
      reasoning: 'Reasoning',
      thoughtFor: 'Thought for {seconds}s',
      truncated: 'This answer hit the length limit and was cut off.',
      sources: 'Sources',
    },
    modelSwitch: {
      title: 'Switch to {name}?',
      confirm: 'Switch & New Chat',
      before: 'Switching to ',
      after: ' will start a new chat. Your current conversation stays available in the sidebar.',
    },
    header: {
      remoteDisconnected: 'Remote Disconnected',
      remoteConnected: 'Remote Connected',
      model: 'Model:',
      loadingModels: 'Loading models...',
      noModelsInstalled: 'No models installed',
      knowledgeBase: 'Knowledge Base:',
      kbTooltip:
        'When on, the assistant searches your knowledge base for relevant documents before answering. Turning this off is faster and lighter on hardware, which helps when your knowledge base is small or empty. This is the same setting as in AI Assistant settings.',
      thinking: 'Thinking:',
      thinkingTooltip:
        'When on, this model works through its reasoning before answering. Slower, but often better on tricky questions. Your choice is remembered for this model; the default for other models is set in AI Assistant settings.',
      openSidebar: 'Open conversation sidebar',
      closeSidebar: 'Close conversation sidebar',
      closeChat: 'Close chat',
    },
    errors: {
      emptyResponse: 'Sorry, I could not generate a response.',
      requestFailed: 'Sorry, there was an error processing your request. Please try again.',
      startFailed: 'Sorry, there was an error starting this chat. Please try again.',
    },
    nomadMd: {
      template: `# NOMAD.md

<!--
This file holds custom instructions for your AI assistant. Everything here is
sent to the assistant as a system prompt on every chat — use it to set persona,
tone, priorities, and standing rules.

It is also stored on disk at storage/NOMAD.md, so you can edit it directly.
Replace this template with your own instructions, then click Save.
-->

## About me

- (e.g. I'm setting up an off-grid homestead in a cold climate.)

## How the assistant should respond

- Be concise and practical.
- Prioritize safety and proven methods.
`,
      saveFailed: 'Failed to save NOMAD.md.',
      saved: 'NOMAD.md saved. It applies to new messages.',
      yourAssistant: 'your AI assistant',
      subtitle: 'Custom instructions passed to {name} as a system prompt on every chat.',
      tipBefore: 'Tip: this file is also stored on disk at ',
      tipAfter: ' and can be edited directly.',
    },
  },
  models: {
    headTitle: '{name} Settings | Project NOMAD',
    pageDescription:
      "Easily manage the {name}'s settings and installed models. We recommend starting with smaller models first to see how they perform on your system before moving on to larger ones.",
    dependenciesMissing:
      "{name}'s dependencies are not installed. Please install them to manage AI models.",
    chatSuggestions: 'Chat Suggestions',
    chatSuggestionsDescription: 'Display AI-generated conversation starters in the chat interface',
    flashAttention: 'Flash Attention',
    flashAttentionDescription:
      'Enables OLLAMA_FLASH_ATTENTION=1 for improved memory efficiency. Disable if you experience instability. Takes effect after reinstalling the AI Assistant.',
    autoThinking: 'Use thinking automatically when a model supports it',
    autoThinkingDescription:
      'Sets the default for models that can think. You can still turn thinking on or off for an individual model in the chat window.',
    kbRetrieval: 'Knowledge Base Retrieval',
    kbRetrievalDescription:
      'Search your knowledge base for relevant documents before answering. Turn this off to save memory and speed up replies when your knowledge base is small or empty. This is the same switch as the one in the chat window.',
    assistantName: 'Assistant Name',
    assistantNameHelp:
      'Give your AI assistant a custom name that will be used in the chat interface and other areas of the application.',
    assistantNamePlaceholder: 'AI Assistant',
    tasksModel: 'Tasks Model',
    tasksModelHelp:
      'Small, fast model used for background work like chat titles and suggestions. Leave this set to the chat model to use whichever model the chat is using. Avoid reasoning models here — they are slow at short, aesthetic tasks.',
    useChatModel: 'Use the chat model',
    notInstalled: '{name} (not installed)',
    kbRelevance: 'Knowledge Base Relevance',
    kbRelevanceHelp:
      'How closely a knowledge-base passage has to match your question before it is used in an answer. Stricter settings keep unrelated passages out; too strict and genuinely useful ones get dropped too. When nothing clears the bar, the assistant answers from its own knowledge instead.',
    relevanceOff: 'Off — use every passage retrieved',
    relevanceLenient: 'Lenient',
    relevanceBalanced: 'Balanced (recommended)',
    relevanceStrict: 'Strict',
    customValue: 'Custom ({value})',
    relevanceCheck: 'Double-check knowledge base matches',
    relevanceCheckDescription:
      'Before answering, ask the Tasks Model whether the passages found are actually about your question, and leave them out (and uncited) when they are not. Helps most with large libraries like Wikipedia or Project Gutenberg, where something always looks similar. Needs a capable Tasks Model (about 8B parameters or larger); smaller models reject too many good matches. Adds a short delay to every reply.',
    responseStyle: 'Response Style',
    responseStyleHelp:
      "How adventurous the assistant is when picking its next word. Auto follows whatever the model's author recommended and fills in the rest, and suits most people. Focused gives shorter, steadier, more repeatable answers and is the better choice for looking things up. Creative varies its wording more, at some cost to accuracy.",
    responseStyleAuto: 'Auto (recommended)',
    responseStyleFocused: 'Focused (factual, repeatable)',
    responseStyleCreative: 'Creative (varied, exploratory)',
    responseStyleOff: 'Backend defaults (send nothing)',
    contextWindow: 'Context Window',
    contextWindowHelp:
      'How much conversation and knowledge-base context each reply can consider. Auto sizes this per model from its trained limit and your available memory. Choosing a value sets an upper limit — it can lower the window to save memory, but never raises it beyond what a model supports.',
    autoRecommended: 'Auto (recommended)',
    contextTokens: '{value} tokens',
    currentlyInEffect:
      'Currently in effect: {windows}. Changes take effect for new conversations.',
    installedModels: 'Installed Models',
    noModelsInstalled: 'No models installed. Browse the model catalog below to get started.',
    columnModel: 'Model',
    columnParameters: 'Parameters',
    columnDiskSize: 'Disk Size',
    columnAction: 'Action',
    remoteConnection: 'Remote Connection',
    remoteConnectionDescriptionBefore:
      'Connect to any OpenAI-compatible API server — Ollama, LM Studio, llama.cpp, and others are all supported. For remote Ollama instances, the host must be started with ',
    remoteConnectionDescriptionAfter: '.',
    remoteUrlLabel: 'Remote Ollama/OpenAI API URL',
    remoteUrlPlaceholder:
      'http://192.168.1.100:11434  (or :1234 for OpenAI API Compatible Apps)',
    saveAndTest: 'Save & Test',
    title: 'Models',
    downloadOnlyOllama: 'Model downloading is only supported when using a Ollama backend.',
    downloadOnlyOllamaMessage:
      'If you are connected to an OpenAI API host (e.g. LM Studio), please download models directly in that application.',
    searchPlaceholder: 'Search language models..',
    refreshModels: 'Refresh Models',
    estimatedPulls: 'Estimated Pulls',
    lastUpdated: 'Last Updated',
    tag: 'Tag',
    inputType: 'Input Type',
    contextSize: 'Context Size',
    modelSize: 'Model Size',
    remoteOllamaConfigureFailed: 'Failed to configure remote Ollama.',
    remoteOllamaCleared: 'Remote Ollama configuration cleared.',
    remoteOllamaClearFailed: 'Failed to clear remote Ollama.',
    listRefreshed: 'Model list refreshed from remote.',
    downloadStarted: 'Model download initiated for {name}. It may take some time to complete.',
    installFailed: 'There was an error installing the model: {name}. Please try again.',
    deleted: 'Model deleted: {name}.',
    deleteFailed: 'There was an error deleting the model: {name}. Please try again.',
    confirmDeleteTitle: 'Delete Model?',
    confirmDeleteMessage:
      'Are you sure you want to delete this model? You will need to download it again if you want to use it in the future.',
    settingUpdated: 'Setting updated successfully.',
    settingUpdateFailed: 'There was an error updating the setting. Please try again.',
  },
  activeModelDownloads: {
    title: 'Active Model Downloads',
    cancelTitle: 'Cancel Download?',
    cancelConfirm: 'Cancel Download',
    keepDownloading: 'Keep Downloading',
    stopBefore: 'Stop downloading ',
    stopAfter: '?',
    keepData:
      'Any data already downloaded will remain on disk. If you re-download this model later, it will resume from where it left off rather than starting over.',
    cancelTooltip: 'Cancel download',
    downloading: 'Downloading...',
    empty: 'No active model downloads',
    speedZero: '0 B/s',
    speedBytes: '{value} B/s',
    speedKb: '{value} KB/s',
    speedMb: '{value} MB/s',
  },
  vision: {
    unsupported:
      'This model cannot use images. Choose a model marked “Supports images” in Models & Settings.',
    unknown:
      'NOMAD cannot confirm whether this model accepts images. You can try an image, but the request will fail if the model is text-only. {notice}',
    temporaryNotice:
      'Images are sent only with this request. They are not saved and will disappear after you send them or reload this page.',
  },
  chatStream: {
    genericError: 'The model encountered an error. Please try again.',
  },
  kbJobHealth: {
    waiting: 'Waiting',
    waitingAria: 'Job is queued and waiting to start',
    healthy: 'Active',
    healthyAria: 'Job is embedding at a normal rate',
    slow: 'Slow',
    slowAria: 'Job has not made progress for at least 2 minutes',
    stalled: 'Stalled',
    stalledAria: 'Job has not made progress for at least 5 minutes',
    failed: 'Failed',
    failedAria: 'Job failed',
    justNow: 'just now',
    secondsAgo: {
      one: '{count}s ago',
      few: '{count}s ago',
      many: '{count}s ago',
      other: '{count}s ago',
    },
    minutesAgo: {
      one: '{count}m ago',
      few: '{count}m ago',
      many: '{count}m ago',
      other: '{count}m ago',
    },
    hoursAgo: {
      one: '{count}h ago',
      few: '{count}h ago',
      many: '{count}h ago',
      other: '{count}h ago',
    },
  },
  knowledgeBase: {
    title: 'Knowledge Base',
    unavailableTitle: 'Knowledge Base unavailable:',
    unavailableMessage: 'The Qdrant vector database is offline.',
    starting: 'Starting…',
    startQdrant: 'Start Qdrant',
    collectionLabel: 'Collection:',
    upload: 'Upload',
    whyUploadTitle: 'Why upload documents to your Knowledge Base?',
    integrationTitle: '{name} Knowledge Base Integration',
    integrationBody:
      'When you upload documents to your Knowledge Base, NOMAD processes and embeds the content, making it directly accessible to {name}. This allows {name} to reference your specific documents during conversations, providing more accurate and personalized responses based on your uploaded data.',
    ocrTitle: 'Enhanced Document Processing with OCR',
    ocrBody:
      'NOMAD includes built-in Optical Character Recognition (OCR) capabilities, allowing it to extract text from image-based documents such as scanned PDFs or photos. This means that even if your documents are not in a standard text format, NOMAD can still process and embed their content for AI access.',
    libraryTitle: 'Information Library Integration',
    libraryBody:
      'NOMAD will automatically discover and extract any content you save to your Information Library (if installed), making it instantly available to {name} without any extra steps.',
    autoIndexTitle: 'Auto-index new content for AI?',
    autoIndexDescription:
      'Indexed content typically uses 5–10× the original file size on disk. Changes apply to new content added after this setting changes.',
    ingestPolicyAria: 'Ingest policy',
    always: 'Always',
    manual: 'Manual',
    processingQueue: 'Processing Queue',
    cleanUpFailed: 'Clean Up Failed',
    cancelAllJobs: 'Cancel All Jobs',
    cancelAllJobsTooltip:
      'Stop and clear every embedding job regardless of state, including stuck or in-progress ones. Deletes the uploaded source files for those jobs.',
    storedFiles: 'Stored Knowledge Base Files',
    uncategorized: 'Uncategorized',
    manageCollections: 'Manage Collections',
    resetRebuild: 'Reset & Rebuild',
    resetRebuildTooltip:
      'Drop the entire embeddings collection and re-embed everything from scratch. Permanently removes vectors for files no longer on disk. Destructive: requires typing RESET to confirm.',
    reembedAll: 'Re-embed All',
    reembedAllTooltip:
      'Re-embed every file on disk, replacing existing vectors file-by-file. Vectors for files no longer on disk are preserved. Use this if the chunker or embedding model has changed.',
    syncStorage: 'Sync Storage',
    syncStorageTooltip:
      "Scan storage for new files and queue any that haven't been embedded yet. Safe to run anytime; won't touch already-embedded content.",
    warningsUnavailable:
      "File warnings unavailable — couldn't read storage state. Retrying…",
    columns: {
      fileName: 'File Name',
      size: 'Size',
      uploaded: 'Uploaded',
      collection: 'Collection',
      active: 'Active',
    },
    state: {
      indexed: 'Indexed',
      notIndexed: 'Not Indexed',
      failed: 'Failed',
      stalled: 'Stalled',
    },
    warnings: {
      zeroChunks:
        'Embedded 0 chunks — this file has no text content. AI Assistant cannot reference it.',
      partialStall:
        'Only {embedded} of est. {expected} chunks embedded — ingestion may have stalled.',
    },
    managedByNomad: 'Managed by NOMAD',
    removeConfirm: 'Remove from knowledge base?',
    deleting: 'Deleting…',
    actionReembed: 'Re-embed',
    actionIndex: 'Index',
    actionRetry: 'Retry',
    view: 'View',
    notifications: {
      policyAlways: 'New content will be auto-indexed for AI.',
      policyManual: 'New content will wait for you to opt in.',
      policyFailed: 'Failed to update indexing policy.',
      collectionUpdated: 'Collection updated.',
      collectionUpdateFailed: 'Failed to update collection.',
      activeUpdated: 'Active state updated.',
      activeUpdateFailed: 'Failed to update active state.',
      collectionActiveUpdated: 'Collection active state updated.',
      collectionActiveUpdateFailed: 'Failed to update collection active state.',
      fileRemoved: 'File removed from knowledge base.',
      fileDeleteFailed: 'Failed to delete file.',
      fileQueued: 'File queued for embedding.',
      fileQueueFailed: 'Failed to queue file.',
      jobsCleaned: 'Failed jobs cleaned up.',
      jobsCleanFailed: 'Failed to clean up jobs.',
      allJobsCancelled: 'All embedding jobs cancelled.',
      jobsCancelFailed: 'Failed to cancel jobs.',
      qdrantStartFailed: 'Failed to start Qdrant.',
      storageSynced:
        'Storage synced successfully. If new files were found, they have been queued for processing.',
      storageSyncFailed: 'Failed to sync storage',
      reembedCompleted: 'Re-embed completed.',
      reembedFailed: 'Failed to re-embed knowledge base.',
      resetComplete: 'Reset complete.',
      resetFailed: 'Failed to reset knowledge base.',
    },
    uploadQueued: {
      one: '{count} file queued for processing.',
      few: '{count} files queued for processing.',
      many: '{count} files queued for processing.',
      other: '{count} files queued for processing.',
    },
    uploadFailed: 'Failed to upload: {name}',
    cancelAll: {
      title: 'Cancel All Embedding Jobs?',
      confirm: 'Cancel All Jobs',
      keep: 'Keep Jobs',
      messageBefore: 'This stops ',
      messageStrong: 'every',
      messageAfter:
        " embedding job — including ones still in progress or stuck — and clears the processing queue. The uploaded source files for those jobs are deleted, so you'll need to re-upload anything you still want indexed. Stored files that already finished embedding are not affected. Are you sure you want to proceed?",
    },
    sync: {
      title: 'Confirm Sync?',
      confirm: 'Confirm Sync',
      message:
        "This will scan the NOMAD's storage directories for any new files and queue them for processing. This is useful if you've manually added files to the storage or want to ensure everything is up to date. This may cause a temporary increase in resource usage if new files are found and being processed. Are you sure you want to proceed?",
    },
    reembedModal: {
      title: 'Re-embed All Documents?',
      confirm: 'Re-embed All',
      confirmPending: 'Re-embedding…',
      bodyBefore:
        'This will re-process every document currently in your knowledge base — about',
      bodyFiles: {
        one: '{count} file',
        few: '{count} files',
        many: '{count} files',
        other: '{count} files',
      },
      bodyAfter:
        '. For each file, NOMAD will delete the existing embeddings from Qdrant and queue a fresh embedding job using the current chunking and embedding model.',
      purposeTitle: 'What this is for',
      purposeBefore:
        'Use this when the embedding model or chunking logic has changed, or when you suspect stored vectors are stale. Files on disk are ',
      purposeNot: 'not',
      purposeAfterNot:
        ' deleted, and any orphan points whose source file is no longer present will be preserved untouched (see ',
      purposeAfterRebuild: ' if you want a fully clean slate).',
      warningTitle: 'Heads up',
      warningOne: {
        one: 'Embedding {count} file may take a long time, especially for large PDFs or ZIM archives.',
        few: 'Embedding {count} files may take a long time, especially for large PDFs or ZIM archives.',
        many: 'Embedding {count} files may take a long time, especially for large PDFs or ZIM archives.',
        other: 'Embedding {count} files may take a long time, especially for large PDFs or ZIM archives.',
      },
      warningTwo:
        'On systems without GPU acceleration, expect sustained high CPU usage for the duration.',
      warningThree:
        'Knowledge Base search results may be incomplete until every file finishes re-embedding.',
      warningFour:
        'If embed jobs are already in progress, this action will be refused — wait for the queue to drain first.',
    },
    resetModal: {
      title: 'Reset & Rebuild Knowledge Base?',
      confirm: 'Wipe & Rebuild',
      confirmPending: 'Resetting…',
      bodyLead: 'This will ',
      bodyStrong: 'permanently delete every point',
      bodyAfterStrong: ' in the',
      bodyAfterBefore: 'Qdrant collection and rebuild from the',
      bodyFiles: {
        one: '{count} file',
        few: '{count} files',
        many: '{count} files',
        other: '{count} files',
      },
      bodyAfterCount:
        ' currently on disk. The collection is dropped, recreated, and every file is re-queued for embedding.',
      differenceTitle: 'How this differs from Re-embed All',
      differenceOneBefore: 'Re-embed All',
      differenceOneAfter:
        ' replaces vectors file-by-file. Any orphan points (vectors whose source file was deleted from disk at some point) are preserved.',
      differenceTwoBefore: 'Reset & Rebuild',
      differenceTwoAfter: ' drops the entire collection. Orphan points are ',
      differenceTwoStrong: 'gone forever',
      differenceTwoTail: '. Only files currently on disk will exist in Qdrant afterwards.',
      destructiveTitle: 'This action is destructive and cannot be undone',
      destructiveOne:
        'Knowledge Base search will be empty until embedding finishes (potentially hours on CPU-only systems).',
      destructiveTwo:
        'For a few seconds during the reset, the Qdrant collection does not exist — any chat-with-RAG queries in that window may return a "collection not found" error. Avoid using chat until the rebuild has begun.',
      destructiveThree:
        'If embed jobs are already in progress, this action will be refused — wait for the queue to drain first.',
      typeBefore: 'Type ',
      typeAfter: ' to confirm:',
      typeMismatch: 'Type RESET exactly (uppercase, no spaces) to enable the confirm button.',
      resetPlaceholder: 'RESET',
    },
    reembedFileModal: {
      title: 'Re-embed this file?',
      confirm: 'Re-embed',
      confirmPending: 'Queuing…',
      bodyBefore: 'This will delete the existing embeddings for ',
      bodyAfter:
        ' and queue a fresh embedding job. The file on disk is not touched.',
      warningTitle: 'Heads up',
      warningOne:
        'For large ZIM archives this can take a long time, especially on CPU-only systems.',
      warningTwo:
        'Search results that referenced this file will be incomplete until the new embedding finishes.',
      warningThree:
        'If a job for this file is already running, the re-embed will be refused — wait for it to finish first.',
    },
    adminDocsGroup: {
      one: 'Project NOMAD documentation · {count} file',
      few: 'Project NOMAD documentation · {count} files',
      many: 'Project NOMAD documentation · {count} files',
      other: 'Project NOMAD documentation · {count} files',
    },
    collectionHeader: {
      one: '{name} · {count} file',
      few: '{name} · {count} files',
      many: '{name} · {count} files',
      other: '{name} · {count} files',
    },
    collectionCreate: '+ Create "{name}"',
    jobs: {
      title: 'Processing Queue',
      empty: 'No files are currently being processed',
      lastActivity: '· last activity {time}',
      chunks: {
        one: '· {count} chunk',
        few: '· {count} chunks',
        many: '· {count} chunks',
        other: '· {count} chunks',
      },
    },
    collections: {
      manageTitle: 'Manage Collections',
      description:
        "Rename or remove collections. Removing a collection doesn't delete any files — they're simply moved back to Uncategorized so you can re-sort them.",
      empty:
        'No collections yet. Assign a file to a collection from the Knowledge Base table to create one.',
      rename: 'Rename',
      confirmRemove: 'Remove "{name}"? Files move to Uncategorized.',
      renamed: 'Collection renamed.',
      renameFailed: 'Failed to rename collection.',
      removed: 'Collection removed.',
      removeFailed: 'Failed to remove collection.',
    },
    policyPrompt: {
      title: {
        one: 'Index your existing file for {name}?',
        few: 'Index your {count} existing files for {name}?',
        many: 'Index your {count} existing files for {name}?',
        other: 'Index your {count} existing files for {name}?',
      },
      description:
        'When indexed, {name} can reference them while answering your questions.',
      indexNow: 'Index existing content',
      maybeLater: 'Maybe later',
      started:
        '{name} will index your existing content. You can track progress in the Knowledge Base panel.',
      indexFailed: 'Could not start indexing. Try again from the Knowledge Base panel.',
      laterSaved:
        'Your content stays unindexed for now. You can opt in any time from the Knowledge Base panel.',
      laterFailed: 'Could not save your choice. Try again.',
    },
    viewer: {
      loading: 'Loading…',
      error: "Couldn't load file. It may have been moved or its type isn't viewable.",
    },
  },
  errors: {
    generic: 'Something went wrong',
    network: 'Network error. Check your connection and try again.',
    notFound: 'Page not found',
    server: 'Server error. Try again later.',
    serverErrorTitle: 'Server Error',
    pageDoesNotExist: 'This page does not exist.',
    debugInfoLoadFailed: 'Failed to load debug info. Please try again.',
    required: '{field} is required',
    timeout: 'The request timed out. Try again.',
    unknown: 'Unknown error',
    loadFailed: 'Failed to load data',
  },
  maps: {
    coordinatesPlaceholder: 'lat,lng',
    flyToCoordinates: 'Fly to coordinates',
    addMarkerAtCoordinates: 'Add marker at coordinates',
    hideCoordinates: 'Hide coordinates',
    showCoordinates: 'Show coordinates',
    manageMapRegions: 'Manage Map Regions',
    goToMapSettings: 'Go to Map Settings',
    discardMarkerChanges: 'Discard unsaved marker changes?',
    alertBaseAssetsMissing:
      'The base map assets have not been installed. Please download them first to enable map functionality.',
    alertWorldBasemapMissing:
      'The world base map has not been downloaded yet, so the map may appear blank outside downloaded regions. Connect this NOMAD to the internet and download it (~15 MB) from Map Settings.',
    alertNoRegions:
      'No map regions have been downloaded yet. Please download some regions to enable map functionality.',
    scale: {
      metric: 'Metric',
      imperial: 'Imperial',
      nautical: 'Nautical',
    },
    mapLibre: {
      attributionToggle: 'Toggle attribution',
      mapFeedback: 'Map feedback',
      fullscreenEnter: 'Enter fullscreen',
      fullscreenExit: 'Exit fullscreen',
      findMyLocation: 'Find my location',
      locationNotAvailable: 'Location not available',
      logoTitle: 'MapLibre logo',
      mapTitle: 'Map',
      markerTitle: 'Map marker',
      resetBearing: 'Reset bearing to north',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      popupClose: 'Close popup',
      feet: 'ft',
      meters: 'm',
      kilometers: 'km',
      miles: 'mi',
      nauticalMiles: 'nm',
    },
    markerPanel: {
      pins: 'Pins',
      savedLocations: 'Saved Locations',
      showSavedLocations: 'Show saved locations',
      closePanel: 'Close panel',
      searchPins: 'Search pins...',
      sortByName: 'Sort by name',
      sortByHue: 'Sort by hue',
      sortByIcon: 'Sort by icon',
      sortByVisibility: 'Sort by visibility',
      sortAsc: 'A → Z',
      sortDesc: 'Z → A',
      hueAsc: 'Hue ↑',
      hueDesc: 'Hue ↓',
      hiddenFirst: 'Hidden first',
      visibleFirst: 'Visible first',
      hideAll: 'Hide all',
      showAll: 'Show all',
      empty: 'Click anywhere on the map to drop a pin',
      noMatches: 'No pins match your search.',
      hidePin: 'Hide pin',
      showPin: 'Show pin',
      deletePin: 'Delete pin',
    },
    markerForm: {
      namePlaceholder: 'Name this location',
      notesPlaceholder: 'Add notes (optional)',
      customColor: 'Choose custom marker color',
      customIcon: 'Choose custom marker icon',
      saving: 'Saving...',
    },
    pinColors: {
      orange: 'Orange',
      red: 'Red',
      green: 'Green',
      blue: 'Blue',
      purple: 'Purple',
      yellow: 'Yellow',
    },
    markerIcons: {
      water: 'Water',
      waterStorage: 'Water storage',
      food: 'Food',
      grainOrCrops: 'Grain or crops',
      meatOrGame: 'Meat or game',
      fishing: 'Fishing',
      building: 'Building',
      camp: 'Camp',
      shelter: 'Shelter',
      entrance: 'Entrance',
      fire: 'Fire',
      garden: 'Garden',
      firstAid: 'First aid',
      hospital: 'Hospital',
      clinic: 'Clinic',
      medication: 'Medication',
      supplies: 'Supplies',
      ambulance: 'Ambulance',
      power: 'Power',
      solar: 'Solar',
      battery: 'Battery',
      antenna: 'Antenna',
      radio: 'Radio',
      network: 'Network',
      fuel: 'Fuel',
      vehicle: 'Vehicle',
      truck: 'Truck',
      machinery: 'Machinery',
      cacheOrSupplies: 'Cache or supplies',
      tools: 'Tools',
      highGround: 'High ground',
      woodland: 'Woodland',
      route: 'Route',
      rallyPoint: 'Rally point',
      hazard: 'Hazard',
      danger: 'Danger',
    },
  },
  mapsSettings: {
    baseMapDownloaded: 'Base map downloaded successfully.',
    baseMapDownloadFailed:
      'Could not download the base map. Please connect this NOMAD to the internet and try again.',
    globalMapQueued:
      'Global map download has been queued. This is a large file (~125 GB) and may take a while.',
    globalMapFailed: 'Failed to start the global map download. Please try again.',
    baseAssetsDownloaded: 'Base map assets downloaded successfully.',
    baseAssetsFailed:
      'An error occurred while downloading the base map assets. Please try again.',
    collectionQueued: 'Download for collection "{name}" has been queued.',
    downloadQueued: 'Download has been queued.',
    fileDeleted: '{name} has been deleted.',
    fileDeleteFailed: 'Failed to delete {name}. Please try again.',
    confirmDeleteTitle: 'Confirm Delete?',
    confirmDeleteMessage:
      'Are you sure you want to delete {name}? This action cannot be undone.',
    confirmDownloadTitle: 'Confirm Download?',
    collectionAlreadyDownloaded:
      'All resources in the collection "{name}" have already been downloaded.',
    confirmDownloadBefore: 'Are you sure you want to download ',
    confirmDownloadAfter:
      '? It may take some time for it to be available depending on the file size and your internet connection.',
    confirmGlobalMapTitle: 'Download Global Map?',
    confirmGlobalMapMessage:
      "This will download the full Protomaps global map ({size}, build {date}). Covers the entire planet so you won't need individual region files. Make sure you have enough disk space.",
    downloadQueuedWatch: 'Download queued. Watch progress below.',
    downloadMapFileTitle: 'Download Map File',
    suggestedUrlExample:
      'e.g. https://github.com/Crosstalk-Solutions/project-nomad-maps/raw/refs/heads/master/pmtiles/california.pmtiles',
    refreshedCollections: 'Successfully refreshed map collections.',
    subtitle: 'Manage your stored map files and explore new regions!',
    downloadBaseAssets: 'Download Base Assets',
    worldBasemapNotDownloadedTitle: 'World base map not downloaded',
    worldBasemapNotDownloadedMessage:
      "The low-zoom world base map (~15 MB) hasn't been downloaded yet, so the map appears blank outside any regions you've downloaded. Connect this NOMAD to the internet and download it once for offline use.",
    downloadBaseMap: 'Download Base Map',
    globalMapInstalledTitle: 'Global Map Installed',
    globalMapInstalledMessage:
      'Your global map build {date} ({size}) is stored locally and ready for offline use.',
    downloadLatestBuild: 'Download latest build',
    globalMapAvailableTitle: 'Global Map Coverage Available',
    globalMapAvailableMessage:
      'Download a complete worldwide map from Protomaps ({size}, build {date}). This is a large file but covers the entire planet — no individual region downloads needed.',
    downloadGlobalMap: 'Download Global Map',
    downloadByCountryTitle: 'Download by country or region',
    downloadByCountryMessage:
      "Pick the countries you actually need — from a single country to a whole continent — and we'll pull just those tiles from the global Protomaps archive. Much smaller than the full 125 GB global map.",
    chooseCountries: 'Choose Countries',
    curatedMapRegions: 'Curated Map Regions',
    forceRefreshCollections: 'Force Refresh Collections',
    noCuratedCollections: 'No curated collections available.',
    storedMapFiles: 'Stored Map Files',
    downloadCustomMapFile: 'Download a Custom Map File',
    columnName: 'Name',
    columnActions: 'Actions',
  },
  countryPicker: {
    title: 'Download map by country or region',
    startDownload: 'Start Download',
    searchPlaceholder: {
      one: 'Search {count} country...',
      few: 'Search {count} countries...',
      many: 'Search {count} countries...',
      other: 'Search {count} countries...',
    },
    clearAll: 'Clear all',
    quickPicks: 'Quick picks',
    noMatches: 'No countries match "{search}".',
    alreadyDownloaded:
      'Already downloaded — re-select to update with a different zoom',
    selectedCount: {
      one: '{count} selected',
      few: '{count} selected',
      many: '{count} selected',
      other: '{count} selected',
    },
    removeCountry: 'Remove {country}',
    maxZoomLabel: 'Max zoom level: ',
    zoomWorld: 'z{zoom} (world)',
    zoomStreet: 'z{zoom} (street)',
    zoomHint:
      'Lower zoom = smaller file, less detail. Zoom 15 shows individual streets; zoom 10 shows city-level detail.',
    estimating: 'Estimating size…',
    preflightTiles: {
      one: '{count} tile, ~{size}',
      few: '{count} tiles, ~{size}',
      many: '{count} tiles, ~{size}',
      other: '{count} tiles, ~{size}',
    },
    sourceBuild: '(source build {date})',
    pickCountryToEstimate: 'Pick at least one country to estimate size.',
    pickAtLeastOne: 'Pick at least one country before downloading.',
    stillEstimating: 'Still estimating size — hold on a moment.',
    estimateFailed: 'Estimate failed',
    downloadFailed: 'Download failed',
    preflightNoData: 'Preflight returned no data',
  },
  downloadURLModal: {
    description:
      "Enter the URL of the map region file you wish to download. The URL must be publicly reachable and end with .pmtiles. A preflight check will be run to verify the file's availability, type, and approximate size.",
    urlPlaceholder: 'Enter download URL...',
    runningPreflight: 'Running preflight check for URL: {url}',
    unknownError: 'An unknown error occurred during the preflight check.',
    passed: 'Preflight check passed. Filename: {filename}, Size: {size} MB',
    failed: 'Preflight check failed: {error}',
  },
} as const satisfies TranslationDictionary

export type EnDictionary = typeof en

/**
 * Mirrors the exact key tree of the English dictionary while replacing every
 * translated leaf (including plural forms) with a plain string. Used to type
 * ru.ts, so a missing key becomes a compile-time error.
 */
export type TranslationShape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends PluralForms
      ? PluralForms
      : T[K] extends Record<string, unknown>
        ? TranslationShape<T[K]>
        : never
}

export default en
