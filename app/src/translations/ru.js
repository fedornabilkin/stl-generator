export default {
  //
  //  Local name of the language
  //
  languageLocalName: 'Русский',

  //
  // General
  //
  title: '3D Генератор STL',
  subtitle: 'Экспорт QR кода или текста в формате STL для 3D печати',
  preview: 'Просмотр',
  controlsHint: 'Можно вращать',
  autoRotation: 'Автоповорот',
  changeLanguage: 'Изменить язык',
  contributeTranslation: 'Contribute a translation',
  generateButton: 'Создать 3D модель',
  scrollDownForGuide: 'Scroll down for a guide on how to print your QR code.',
  printabilityWarning: 'Warning for 3D printability',
  printabilityWarningBody: 'At least one edge of the smallest element in the 3D model is very small: {dimensions}. Depending on your setup, this could make printing harder.',
  supportMe: 'Поддержать проект',
  viewOnGithub: 'GitHub',
  shareButtonTitle: 'Share this page',
  file: 'файл',
  no: 'нет',
  yes: 'да',
  top: 'сверху',
  bottom: 'снизу',
  left: 'слева',
  right: 'справа',
  content: 'контент',
  min: 'min',
  max: 'max',
  thankYou: 'Thank you very much for the support. You rock!',
  promotionTitle: 'Want to start a new hobby? Looking for a second/third 3d printer?',
  promotionSubtitle: 'Here are some recommended 3d printers and 3d printer accessories to get you covered. If you want to support the development of this tool please consider using the links below to buy on AliExpress.',
  corner: 'corner',
  isGenerating: 'Генерация 3D модели...',
  headerShareNotice: 'Ссылка на 3D',
  copyExistingQRCode: 'Copy an existing QR Code',
  holdQRCodeInView: 'Hold the QR Code into view of the camera',
  decodedQRCodeData: 'Decoded QR Code data',

  //
  // QR Code Options Panel
  //
  qrCodeOptionsTitle: 'Данные для QR кода',
  qrCodeTextPlaceholder: 'Текст для QR кода. Например - vsqr.ru',
  errorCorrection: 'Коррекция ошибки',
  errorCorrectionHelp: 'Чем выше уровень коррекции ошибок, тем плотнее QR-код.',
  optionalFieldsHint: 'Не все поля обязательны для заполнения.',
  // Wifi
  ssidPlaceholder: 'Название Wifi сети',
  password: 'Пароль',
  passwordPlaceholder: 'Пароль Wifi сети',
  security: 'Безопасность',
  hidden: 'Скрыть',
  hiddenText: 'Скрывает SSID',
  // E-Mail
  recipient: 'Получатель',
  recipientPlaceholder: 'Адрес, на который должна приходить почта',
  subject: 'Тема',
  subjectPlaceholder: 'Тема электронного письма',
  body: 'Сообщение',
  bodyPlaceholder: 'Текст сообщения электронного письма',
  // Contact
  contact: 'Контакты',
  yourName: 'ФИО',
  firstname: 'Имя',
  lastname: 'Фамилия',
  organization: 'Организация',
  organizationPlaceHolder: 'ООО vsqr',
  role: 'Должность',
  rolePlaceHolder: 'Главный генератор',
  numbers: 'Номера',
  cellphone: 'Мобильный',
  phone: 'Телефон',
  faxPlaceHolder: 'факс',
  emailPlaceHolder: 'email@mail.ru',
  street: 'Улица',
  streetPlaceHolder: 'ул. Ленина',
  city: 'Город',
  postcodePlaceHolder: '123456',
  cityPlaceHolder: 'г. Москва',
  state: 'Штат',
  statePlaceHolder: '',
  countryPlaceHolder: 'Россия',
  sitePlaceHolder: 'vsqr.ru',
  // SMS
  phonePlaceholder: 'Номер получателя',
  smsMessage: 'Сообщение',
  smsMessagePlaceholder: 'Текст SMS сообщения',

  //
  // Spotify Options Panel
  //
  spotifyOptions: 'Spotify Code Options',
  spotifyUri: 'Spotify URI/Link',
  spotifyUriHelp: 'You can get the Spotify URI for a track/album/playlist/user from Spotify by clicking "Share" and then "URI".',
  spotifyCodeHeightInfo: 'Spotify Codes have a fixed aspect ratio of 4:1',

  //
  // 3D Model Options Panel
  //
  modelOptions: 'Настройки 3D модели',
  base: 'Основа',
  baseActive: 'Основной слой',
  baseActiveLabel: 'Другие слои используют данные основы, даже если отключить.',
  width: 'Ширина',
  height: 'Высота',
  depth: 'Глубина',
  cornerRadius: 'Радиус угла',

  border: 'Рамка',
  borderAroundBase: 'Добавить рамку на основу.',

  margin: 'Отступ',
  block: 'Block',
  style: 'Style',
  shape: 'Форма',
  rectangle: 'rectangle',
  roundedRectangle: 'rounded rectangle',
  square: 'квадрат',
  round: 'круг',
  size: 'Размер',
  blockSizeHelp: `
  90% оставляет зазор между черными блоками, а 105% соединяет черные блоки и упрощает печать.
  Перед печатью надо отсканировать и убедиться, что все работает, как надо.
  Если не уверен, можно оставить 100%`,
  icon: 'Иконка',
  noIcon: 'Без иконки',
  errorCorrectionChange: 'Уровень коррекции ошибки будет увеличен при использовании иконки.',
  iconSizeHelp: `
  Размер иконки относительно общей ширины базовой модели.
  Слишком большой значок может сделать QR-код нечитаемым.`,
  text: 'Текст',
  textOnEdge: 'Добавить текст.',
  placement: 'Расположить',
  theText: 'Regular line\n*Italic line*\n**Bold line**\n***Italic & Bold line***',
  fontInfoText: 'Меняй шрифт для каждой строки:',
  italicInfoText: '*курсив*',
  boldInfoText: '**жирный**',

  cityMode: 'QR-город',
  cityModeText: 'Случайная высота черных блоков.',
  qrHelp: 'Настройка для QR-кода',
  invert: 'Invert',
  invertText: 'Inverts the structure of the code',

  keychain: 'Брелок',
  keychainHelp: 'Добавить отверстие.',
  mirrorHoles: 'Зеркально',
  mirrorHolesHelp: 'Отразить зеркально.',
  keychainHoleDiameter: 'Диаметр',

  magnet: 'Углубление',
  magnetHelp: 'Добавить углубление для магнита или NFC-метки с обратной стороны модели.',

  nfcIndentation: 'NFC/RFID',
  nfcIndentationHelp: 'Adds an indentation on the bottom side of the base where one can insert an NFC/RFID tag.',
  indentation: 'Indentation',
  nfcIndentationHiddenHelp: 'Creates a cavity inside the base with a 1mm offset from the bottom of the base. This allows you to firmly embed the NFC tag inside the 3d print itself. Pause printing before the closing layer, insert the tag, then resume printing. Make sure that the indentation depth is slightly larger than the tag itself and adjust base depth accordingly.',

  //
  // Export Settings
  //
  exportTypeHelp: 'В большинстве случаев режим binary не доставляет проблем.',
  exportSeparatePartsHelp: 'Если хочется получить элементы по частям.',
  separateParts: 'Разделить',
  saveAsButton: 'STL',
  saveAsImageButton: 'PNG',

  expSettings: 'Настройки экспорта',
  expTypeLabel: 'Тип файла',
  expMultipleLabel: 'По частям',
  expStlButton: 'Скачать STL',
  expPngButton: 'PNG',

  expList: 'Последние проекты',
  expListTableImg: 'Миниатюра',
  expListTableLink: 'Ссылка на проект',
  expListTableDate: 'Дата загрузки',
  expListLoadItem: 'Загрузить',

  /**
   * Export modal
   */
  expModalTitle: 'Экспорт STL',
  expMotivationText: 'Сейчас легко и просто можно денежно поддержать проект. Например этот.',
  expYourDownloadWillStartIn: 'Загрузка начнется через',
  expUnit: 'сек',
  expYourDownloadWillStartNow: 'Загрузка началась.',
  expThankYouSupportProject: 'Спасибо за поддержку и использование проекта.',

  /**
   * Monetization
   */
  moneySupportProject: 'Поддержать проект',
  moneyThankYou: 'Спасибо.',

  /**
   * Share
   */
  socialEmail: 'Отправить электронную почту',
  socTelegram: 'Отправить в телеграм',
  socVk: 'Поделиться вконтакте',
  socOk: 'Поделиться в одноклассники',
  socFacebook: 'Поделиться в фейсбук',
  socInstagram: '',
  socLinkedin: '',
  socWhatsapp: '',
  socTwitter: 'Твитнуть',
  socTiktok: '',
  socReddit: 'Отправить в реддит',
  socPinterest: 'Закрепить это',
  socPocket: 'Добавить в покет',
  socCopyLink: 'Скопировать ссылку',

  //
  // Print Guide
  // with HTML Tags included!
  //
  printGuideTitle: '3D Print Guide',
  printGuideSubtitle: 'How to print a dual color QR code with a single extruder 3d printer?',
  printGuideWIPInfo: 'This guide is a work in progress.',
  printGuideIntro: `
  You can print multi colored objects even with a single extruder by swapping the filament at specific layers.<br/>
  We can use this method to print the base of our QR code and the actual QR code part on the top in two different colors.<br/>
  This technique is what makes 3d printable QR codes possible in the first place.<br/>
  The process is different depending on the slicer software you are using.<br/>
  In this guide I will focus on Cura and PrusaSlicer only and I am taking no responsibility whatsoever if you somehow damage your printer in the process.<br/>`,
  printGuideSupportWarningTitle: 'Keep in mind: Not all printers/firmwares support the necessary functionality!',
  printGuideSupportWarningMessage: `
  This is meant as a general guide, as I can't provide a writeup on every printer/firmware combination out there.<br/>
  I recommend doing a small test print first. If you are having problems getting this to work, please search online if your specific printer model supports the <strong>M600</strong> G-Code command for filament changing.<br/>`,
  printGuideGenerateQRCode: 'Generating the QR code',
  printGuideGenerateQRCodeSteps: `
  <li>Select the type of QR code you want to generate under "QR Code Options".</li>
  <li>Fill out the necessary fields.</li>
  <li>Configure the 3d model under "3D Model Options".</li>
  <li>Click on "Generate 3D Model"</li>
  <li>Save the stl file via the "Save As STL" button in the top right.</li>`,
  printGuideVersionDisclaimer: 'Version {version}, your experience can differ.',
  // Cura
  printGuideCuraStep1: `
  Slice the model and locate the layer where the color change should happen.<br/>
  In my case this is at layer 16.<br/>`,
  printGuideCuraStep2: `
  <li>Go to "Extensions -> Post Processing -> Modify G-Code".</li>
  <li>Click on "Add a script" then select "Filament Change".</li>
  <li>In the Filament Change settings, set the "Layer" value to your layer number from step 1.</li>
  <li>Re-Slice your model. The icon left of the "Slice" button indicates an active Post Processing script.</li>`,
  // PrusaSlicer
  printGuidePrusaSlicerStep1: `
  Slice the model and locate the layer where the color change should happen.<br/>
  In my case this is at layer 11.<br/>`,
  printGuidePrusaSlicerStep2: `
  <li>Click on the little plus sign right of the layer selection bar.</li>
  <li>PrusaSlicer gives you a nice preview where you can see the different colors to verify that you selected the right layer. The qr code parts should have a different color than the base</li>
  <li>Re-Slice your model.</li>`,
  printGuideStep3: `
  You can now print the model as usual.<br/>
  The 3d printer will pause on the specified layer and move to the origin of the print bed.
  Now you can swap the filament and restart the print job from your printers menu.`,

};
