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
