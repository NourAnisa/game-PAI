/**
 * Game Edukasi PAI (Pendidikan Agama Islam)
 * Bank Data Kurikulum PAI:
 * 1. Al-Qur'an & Tajwid
 * 2. Aqidah & Rukun Iman
 * 3. Fiqih & Rukun Islam
 * 4. SKI (Sejarah Kebudayaan Islam & 25 Nabi)
 * 5. Akhlak Terpuji & Adab Islami
 */

const PAI_DATA = {
    islands: [
        {
            id: 'quran',
            name: 'Pulau Al-Qur\'an & Tajwid',
            icon: '📖',
            badge: 'Kalamullah',
            themeColor: 'from-emerald-600 to-teal-800',
            accentColor: '#10B981',
            desc: 'Jelajahi keindahan firman Allah, sambung ayat surat pendek, dan asah kemampuan tajwid.',
            levels: [
                {
                    id: 'quran_1',
                    title: 'Tafsir & Makna Surat Pendek',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Surat Al-Fatihah sering disebut sebagai "Ummul Qur\'an" yang artinya...',
                            options: ['Induk / Inti Al-Qur\'an', 'Penutup Al-Qur\'an', 'Surat Terpanjang', 'Wahyu Terakhir'],
                            answer: 0,
                            explanation: 'Al-Fatihah disebut Ummul Qur\'an karena memuat pokok-pokok ajaran Al-Qur\'an secara menyeluruh.'
                        },
                        {
                            q: 'Kandungan utama dari Surat Al-Ikhlas adalah menegaskan tentang...',
                            options: ['Keesaan Allah (Tauhid)', 'Hukum Waris', 'Perang Badar', 'Tata Cara Haji'],
                            answer: 0,
                            explanation: 'Surat Al-Ikhlas merupakan intisari aqidah tauhid murni bahwa Allah itu Maha Esa dan tidak beranak maupun diperanakkan.'
                        },
                        {
                            q: 'Surat Al-Falaq dan An-Nas sering disebut sebagai "Al-Mu\'awwidzatain", yaitu surat untuk...',
                            options: ['Memohon perlindungan kepada Allah dari kejahatan', 'Memohon rezeki berlimpah', 'Doa bepergian jauh', 'Doa memulai belajar'],
                            answer: 0,
                            explanation: 'Al-Mu\'awwidzatain artinya dua surat perlindungan dari berbagai kejahatan makhluk, sihir, dan bisikan setan.'
                        },
                        {
                            q: 'Dalam Surat Al-\'Ashr, Allah menegaskan bahwa manusia berada dalam kerugian, KECUALI orang yang...',
                            options: ['Beriman, beramal saleh, dan saling menasihati dalam kebenaran & kesabaran', 'Memiliki harta benda yang melimpah', 'Memiliki kedudukan tinggi di masyarakat', 'Berumur panjang dan bertubuh kuat'],
                            answer: 0,
                            explanation: 'Surat Al-\'Ashr ayat 2-3 menegaskan keselamatan manusia ada pada iman, amal saleh, dan saling berwasiat dalam kebenaran dan kesabaran.'
                        },
                        {
                            q: 'Arti dari nama surat "Al-Kautsar" adalah...',
                            options: ['Nikmat yang berlimpah', 'Waktu Fajar', 'Pertolongan Allah', 'Masa yang Lampau'],
                            answer: 0,
                            explanation: 'Al-Kautsar bermakna nikmat yang banyak/berlimpah yang dianugerahkan Allah SWT kepada Nabi Muhammad SAW.'
                        }
                    ]
                },
                {
                    id: 'quran_2',
                    title: 'Detektif Hukum Tajwid',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Apabila ada Nun Mati (نْ) atau Tanwin (ـًـٍـٌ) bertemu dengan huruf Hamzah (ء), Ha (هـ), \'Ain (ع), Ghain (غ), Ha (ح), Kha (خ), hukum bacaannya adalah...',
                            options: ['Idzhar Halqi (Dibaca Jelas)', 'Idgham Bighunnah (Dilebur dengan Dengung)', 'Iqlab (Diganti bunyi M)', 'Ikhfa Haqiqi (Disamarkan)'],
                            answer: 0,
                            explanation: 'Idzhar Halqi terjadi jika nun mati/tanwin bertemu 6 huruf halq (tenggorokan), dibaca tegas dan jelas tanpa mendengung.'
                        },
                        {
                            q: 'Hukum bacaan Iqlab terjadi apabila Nun Mati atau Tanwin bertemu dengan huruf...',
                            options: ['Ba (ب)', 'Mim (م)', 'Wau (و)', 'Khaf (ك)'],
                            answer: 0,
                            explanation: 'Huruf Iqlab hanya ada satu yaitu Ba (ب). Bunyi nun mati atau tanwin digantikan menjadi bunyi mim (م) disertai dengungan.'
                        },
                        {
                            q: 'Huruf-huruf Idgham Bighunnah terangkum dalam singkatan kata...',
                            options: ['Ya - Nun - Mim - Wau (Yanmu)', 'Lam dan Ra', 'Baju Di Toko', 'Hamzah dan Ha'],
                            answer: 0,
                            explanation: 'Huruf Idgham Bighunnah ada 4: Ya (ي), Nun (ن), Mim (م), Wau (و), yang sering disingkat YANMU.'
                        },
                        {
                            q: 'Jika Nun Mati atau Tanwin bertemu dengan huruf Lam (ل) atau Ra (ر), maka dibaca...',
                            options: ['Idgham Bilaghunnah (Melebur Tanpa Dengung)', 'Idzhar Syafawi', 'Ikhfa Syafawi', 'Qalqalah Sugra'],
                            answer: 0,
                            explanation: 'Idgham Bilaghunnah meleburkan suara nun mati/tanwin ke dalam huruf lam atau ra tanpa suara dengung.'
                        },
                        {
                            q: 'Huruf Qalqalah (memantul) berjumlah 5 huruf yang terangkum dalam istilah...',
                            options: ['Baju Ditoko (ب - ج - د - ط - ق)', 'Yanmu (ي - ن - م - و)', 'Halqiyah (ء - ه - ع - ح)', 'Syamsiyah (ت - ث - د - ذ)'],
                            answer: 0,
                            explanation: 'Qalqalah artinya memantul, hurufnya adalah Ba, Jim, Dal, Tha, dan Qaf (Qutbu Jadin / BaJu DiToKo).'
                        }
                    ]
                },
                {
                    id: 'quran_3',
                    title: 'Susun Urutan Ayat Surat Al-Ikhlas',
                    type: 'sequence',
                    instruction: 'Urutkan ayat-ayat Surat Al-Ikhlas berikut ini dari ayat pertama hingga ayat keempat:',
                    items: [
                        { id: 1, text: 'قُلْ هُوَ اللّٰهُ اَحَدٌۚ', translation: '1. Katakanlah (Muhammad): "Dialah Allah, Yang Maha Esa."' },
                        { id: 2, text: 'اَللّٰهُ الصَّمَدُۚ', translation: '2. Allah tempat meminta segala sesuatu.' },
                        { id: 3, text: 'لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ', translation: '3. (Allah) tidak beranak dan tidak pula diperanakkan.' },
                        { id: 4, text: 'وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ', translation: '4. Dan tidak ada sesuatu yang setara dengan Dia.' }
                    ]
                }
            ]
        },
        {
            id: 'aqidah',
            name: 'Pulau Aqidah & Rukun Iman',
            icon: '💎',
            badge: 'Keyakinan Hati',
            themeColor: 'from-amber-600 to-yellow-800',
            accentColor: '#F59E0B',
            desc: 'Kukuhkan fondasi keimanan kepada Allah, Malaikat, Kitab, Rasul, Hari Kiamat, dan Qadha-Qadhar.',
            levels: [
                {
                    id: 'aqidah_1',
                    title: 'Mengenal 6 Rukun Iman',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Rukun Iman yang ketiga dalam ajaran agama Islam adalah iman kepada...',
                            options: ['Kitab-kitab Allah', 'Malaikat Allah', 'Hari Kiamat', 'Rasul-rasul Allah'],
                            answer: 0,
                            explanation: 'Urutan Rukun Iman: (1) Allah, (2) Malaikat, (3) Kitab-Kitab Allah, (4) Rasul-Rasul Allah, (5) Hari Akhir, (6) Qadha & Qadhar.'
                        },
                        {
                            q: 'Kitab suci Al-Qur\'an diturunkan oleh Allah SWT kepada Rasul penutup para Nabi, yaitu...',
                            options: ['Nabi Muhammad SAW', 'Nabi Isa AS', 'Nabi Musa AS', 'Nabi Daud AS'],
                            answer: 0,
                            explanation: 'Al-Qur\'an diturunkan kepada Nabi Muhammad SAW; Injil kepada Nabi Isa; Taurat kepada Nabi Musa; Zabur kepada Nabi Daud.'
                        },
                        {
                            q: 'Malaikat yang bertugas menyampaikan wahyu kepada para Nabi dan Rasul adalah...',
                            options: ['Malaikat Jibril', 'Malaikat Mikail', 'Malaikat Israfil', 'Malaikat Izrail'],
                            answer: 0,
                            explanation: 'Malaikat Jibril bertugas membawa wahyu; Mikail pembagi rezeki; Israfil peniup terompet sangkakala; Izrail pencabut nyawa.'
                        },
                        {
                            q: 'Meyakini bahwa segala ketentuan baik dan buruk yang terjadi di alam semesta telah ditetapkan oleh Allah disebut iman kepada...',
                            options: ['Qadha dan Qadhar (Takdir)', 'Malaikat Pencatat', 'Hari Pembalasan', 'Kitab Samawi'],
                            answer: 0,
                            explanation: 'Iman kepada Qadha dan Qadhar adalah meyakini rencana dan takdir ketetapan Allah SWT yang Maha Bijaksana.'
                        },
                        {
                            q: 'Malaikat yang bertugas meniup sangkakala pada hari kiamat adalah...',
                            options: ['Malaikat Israfil', 'Malaikat Ridwan', 'Malaikat Malik', 'Malaikat Raqib'],
                            answer: 0,
                            explanation: 'Malaikat Israfil bertugas meniup sangkakala sebanyak dua kali (tanda kiamat dan hari kebangkitan).'
                        }
                    ]
                },
                {
                    id: 'aqidah_2',
                    title: 'Cahaya Asmaul Husna',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Nama indah Allah "Ar-Rahman" memiliki arti...',
                            options: ['Maha Pengasih bagi seluruh alam', 'Maha Merajai Kerajaan Semesta', 'Maha Suci dari segala cela', 'Maha Pemberi Kesejahteraan'],
                            answer: 0,
                            explanation: 'Ar-Rahman artinya Maha Pengasih kepada seluruh makhluk di dunia tanpa terkecuali.'
                        },
                        {
                            q: 'Asmaul Husna "Al-Quddus" artinya...',
                            options: ['Maha Suci', 'Maha Perkasa', 'Maha Mengetahui', 'Maha Mendengar'],
                            answer: 0,
                            explanation: 'Al-Quddus artinya Maha Suci dari segala kekurangan, cacat, dan keserupaan dengan makhluk-Nya.'
                        },
                        {
                            q: 'Asmaul Husna "Al-Khaliq" mengandung pengertian bahwa Allah adalah...',
                            options: ['Maha Pencipta segala sesuatu', 'Maha Pemberi Ampunan', 'Maha Mengatur Waktu', 'Maha Memelihara Bumi'],
                            answer: 0,
                            explanation: 'Al-Khaliq bermakna Maha Pencipta yang menciptakan segala alam semesta dari tiada menjadi ada.'
                        },
                        {
                            q: 'Ketika kita berbuat kebaikan secara sembunyi-sembunyi, kita yakin Allah melihat perbuatan kita karena Allah memiliki sifat...',
                            options: ['Al-Bashir (Maha Melihat)', 'Al-Mutakabbir', 'Al-Jabbar', 'Al-Wasi\''],
                            answer: 0,
                            explanation: 'Al-Bashir artinya Allah Maha Melihat segala perbuatan hamba-Nya di manapun dan kapanpun.'
                        },
                        {
                            q: 'Jumlah nama-nama indah dan agung (Asmaul Husna) milik Allah yang masyhur disebutkan dalam hadits berjumlah...',
                            options: ['99 Nama', '25 Nama', '114 Nama', '77 Nama'],
                            answer: 0,
                            explanation: 'Dalam hadits Rasulullah SAW diriwayatkan bahwa Allah memiliki 99 nama yang indah (Asmaul Husna).'
                        }
                    ]
                },
                {
                    id: 'aqidah_3',
                    title: 'Sifat Wajib & Mustahil Para Rasul',
                    type: 'match',
                    instruction: 'Cocokkan sifat wajib bagi para Rasul dengan artinya yang tepat:',
                    pairs: [
                        { left: 'Sidiq', right: 'Benar / Jujur dalam perkataan & perbuatan' },
                        { left: 'Amanah', right: 'Dapat dipercaya memegang tanggung jawab' },
                        { left: 'Tabligh', right: 'Menyampaikan wahyu Allah kepada umat' },
                        { left: 'Fathonah', right: 'Cerdas dan bijaksana dalam berpikir' }
                    ]
                }
            ]
        },
        {
            id: 'fiqih',
            name: 'Pulau Fiqih & Rukun Islam',
            icon: '🕌',
            badge: 'Tiang Ibadah',
            themeColor: 'from-blue-600 to-indigo-900',
            accentColor: '#3B82F6',
            desc: 'Pahami tuntunan ibadah praktis sehari-hari: wudhu, sholat 5 waktu, puasa, zakat, dan haji.',
            levels: [
                {
                    id: 'fiqih_1',
                    title: 'Rukun Islam & Sholat 5 Waktu',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Rukun Islam yang kedua dan merupakan tiang agama adalah...',
                            options: ['Mendirikan Sholat 5 Waktu', 'Mengucapkan Dua Kalimat Syahadat', 'Menunaikan Zakat', 'Melaksanakan Ibadah Haji'],
                            answer: 0,
                            explanation: 'Rasulullah SAW bersabda: "Sholat adalah tiang agama, barangsiapa mendirikannya maka ia telah menegakkan agama."'
                        },
                        {
                            q: 'Jumlah rakaat sholat fardhu dalam sehari semalam secara keseluruhan berjumlah...',
                            options: ['17 Rakaat', '15 Rakaat', '20 Rakaat', '12 Rakaat'],
                            answer: 0,
                            explanation: 'Subuh (2) + Dzuhur (4) + Ashar (4) + Maghrib (3) + Isya (4) = 17 rakaat.'
                        },
                        {
                            q: 'Gerakan berpindah dari posisi ruku\' menuju berdiri tegak kembali dalam sholat disebut...',
                            options: ['I\'tidal', 'Sujud', 'Takbiratul Ihram', 'Tasyahud'],
                            answer: 0,
                            explanation: 'I\'tidal adalah gerakan bangkit dan berdiri tegak lurus sejenak setelah ruku\' seraya membaca tahmid.'
                        },
                        {
                            q: 'Puasa Ramadhan diwajibkan bagi setiap muslim yang beriman. Firman Allah tentang kewajiban puasa termaktub dalam Al-Qur\'an surat...',
                            options: ['Al-Baqarah ayat 183', 'Ali \'Imran ayat 102', 'An-Nur ayat 35', 'Al-Ma\'idah ayat 3'],
                            answer: 0,
                            explanation: 'Surat Al-Baqarah ayat 183: "Yaa ayyuhallaziina aamanuu kutiba \'alaikumush-shiyaamu..."'
                        },
                        {
                            q: 'Zakat yang wajib dikeluarkan oleh setiap muslim menjelang berakhirnya bulan suci Ramadhan dinamakan...',
                            options: ['Zakat Fitrah', 'Zakat Maal (Harta)', 'Zakat Emas', 'Waqaf Saham'],
                            answer: 0,
                            explanation: 'Zakat Fitrah berfungsi menyucikan jiwa orang yang berpuasa dan membantu kaum dhuafa menyambut Idul Fitri.'
                        }
                    ]
                },
                {
                    id: 'fiqih_2',
                    title: 'Urutan Berwudhu yang Benar',
                    type: 'sequence',
                    instruction: 'Susun urutan tata cara berwudhu yang benar dan runtut berikut ini:',
                    items: [
                        { id: 1, text: 'Niat & Membasuh Telapak Tangan', translation: 'Langkah 1: Berniat dan mencuci kedua telapak tangan hingga bersih.' },
                        { id: 2, text: 'Berkumur & Membasuh Lubang Hidung', translation: 'Langkah 2: Berkumur-kumur serta menghirup air ke hidung 3x.' },
                        { id: 3, text: 'Membasuh Muka / Wajah', translation: 'Langkah 3: Membasuh seluruh permukaan wajah dari batas rambut hingga dagu.' },
                        { id: 4, text: 'Membasuh Kedua Tangan hingga Siku', translation: 'Langkah 4: Membasuh tangan kanan lalu kiri dari ujung jari sampai siku.' },
                        { id: 5, text: 'Mengusap Sebagian Kepala & Telinga', translation: 'Langkah 5: Mengusap rambut/kepala dan membasuh kedua daun telinga.' },
                        { id: 6, text: 'Membasuh Kedua Kaki hingga Mata Kaki', translation: 'Langkah 6: Mencuci kedua kaki sampai kedua mata kaki dengan tertib.' }
                    ]
                },
                {
                    id: 'fiqih_3',
                    title: 'Hukum Thaharah & Air Bersuci',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Air yang suci dan dapat digunakan untuk mensucikan hadas maupun najis (air mutlak) contohnya adalah...',
                            options: ['Air hujan, air sumur, dan air sungai mengalir', 'Air teh manis hangat', 'Air kelapa murni', 'Air kopi susu'],
                            answer: 0,
                            explanation: 'Air mutlak adalah air murni alami seperti air hujan, sumur, laut, sungai, salju, dan embun yang belum berubah sifatnya.'
                        },
                        {
                            q: 'Najis berat (Mughalladhah) seperti terkena jilatan anjing atau babi disucikan dengan cara dibasuh sebanyak...',
                            options: ['7 kali basuhan, salah satunya dicampur debu tanah suci', '1 kali basuh air mengalir', 'Cukup dilap dengan kain kering', '3 kali disiram air mawar'],
                            answer: 0,
                            explanation: 'Sesuai hadits Rasulullah SAW, najis mughalladhah wajib dicuci 7 kali, dan salah satunya menggunakan air yang dicampur tanah/debu suci.'
                        },
                        {
                            q: 'Cara bersuci menggantikan wudhu atau mandi wajib ketika tidak ada air atau sedang sakit parah dinamakan...',
                            options: ['Tayamum (menggunakan debu suci)', 'Istinja\'', 'Tahallul', 'Mandi Sunnah'],
                            answer: 0,
                            explanation: 'Tayamum merupakan rukhshah (keringanan) dari Allah untuk bersuci menggunakan debu bersih saat berhalangan memakai air.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ski',
            name: 'Pulau Sejarah Islam & 25 Nabi',
            icon: '📜',
            badge: 'Jejak Peradaban',
            themeColor: 'from-purple-600 to-indigo-950',
            accentColor: '#8B5CF6',
            desc: 'Pelajari keteladanan para Nabi, Rasul Ulul Azmi, dan kepemimpinan Khulafaur Rasyidin.',
            levels: [
                {
                    id: 'ski_1',
                    title: 'Keteladanan 5 Rasul Ulul Azmi',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Gelar "Ulul Azmi" diberikan kepada para Rasul yang memiliki keistimewaan berupa...',
                            options: ['Ketabahan, kesabaran, dan tekad luar biasa dalam berdakwah', 'Kekayaan materi yang paling melimpah', 'Wilayah kekuasaan kerajaan terluas', 'Keturunan yang paling banyak'],
                            answer: 0,
                            explanation: 'Ulul Azmi adalah gelar bagi 5 Rasul yang memiliki keteguhan hati, kesabaran tanpa batas, dan perjuangan dakwah amat berat.'
                        },
                        {
                            q: 'Berikut ini adalah nama-nama Rasul yang termasuk ke dalam kelompok Ulul Azmi (NIMIM), yaitu...',
                            options: ['Nuh AS, Ibrahim AS, Musa AS, Isa AS, Muhammad SAW', 'Adam AS, Idris AS, Hud AS, Sholeh AS, Luth AS', 'Yusuf AS, Ya\'qub AS, Ishaq AS, Ismail AS, Syu\'aib AS', 'Daud AS, Sulaiman AS, Ayyub AS, Harun AS, Zakaria AS'],
                            answer: 0,
                            explanation: '5 Rasul Ulul Azmi disingkat NIMIM: Nuh AS, Ibrahim AS, Musa AS, Isa AS, dan Muhammad SAW.'
                        },
                        {
                            q: 'Mukjizat agung yang diberikan Allah kepada Nabi Musa AS saat dikejar oleh bala tentara Fir\'aun adalah...',
                            options: ['Membelah Laut Merah dengan tongkatnya', 'Membangun kapal bahtera besar di atas bukit', 'Mampu berbicara saat masih bayi', 'Api yang menyala menjadi dingin dan menyelamatkan'],
                            answer: 0,
                            explanation: 'Atas izin Allah, Nabi Musa memukulkan tongkatnya ke Laut Merah hingga terbelah menjadi jalan kering yang menyelamatkan Bani Israil.'
                        },
                        {
                            q: 'Nabi Ibrahim AS dijuluki dengan gelar "Khalilullah" yang artinya...',
                            options: ['Kekasih Allah', 'Hamba yang Berbicara dengan Allah', 'Bapak Para Petani', 'Pemimpin Seluruh Malaikat'],
                            answer: 0,
                            explanation: 'Khalilullah artinya Kekasih Allah SWT, gelar kehormatan bagi Nabi Ibrahim AS atas ketundukan iman dan tauhidnya.'
                        },
                        {
                            q: 'Peristiwa perjalanan agung Rasulullah SAW dari Masjidil Haram ke Masjidil Aqsha lalu naik ke Sidratul Muntaha dinamakan...',
                            options: ['Isra\' Mi\'raj', 'Fathu Makkah', 'Hijrah ke Yatsrib', 'Perjanjian Hudaibiyah'],
                            answer: 0,
                            explanation: 'Peristiwa Isra\' Mi\'raj adalah perjalanan menerima perintah ibadah sholat 5 waktu langsung dari Allah SWT.'
                        }
                    ]
                },
                {
                    id: 'ski_2',
                    title: 'Mengenal Khulafaur Rasyidin',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Khalifah pertama yang memimpin kaum muslimin setelah wafatnya Nabi Muhammad SAW adalah...',
                            options: ['Abu Bakar Ash-Shiddiq RA', 'Umar bin Khattab RA', 'Utsman bin Affan RA', 'Ali bin Abi Thalib RA'],
                            answer: 0,
                            explanation: 'Abu Bakar RA adalah sahabat terdekat Nabi dan khalifah pertama yang terkenal jujur dan dermawan.'
                        },
                        {
                            q: 'Sahabat Nabi yang dijuluki "Al-Faruq" (Pembeda antara yang haq dan yang bathil) adalah...',
                            options: ['Umar bin Khattab RA', 'Utsman bin Affan RA', 'Ali bin Abi Thalib RA', 'Bilal bin Rabah RA'],
                            answer: 0,
                            explanation: 'Umar bin Khattab RA diberi julukan Al-Faruq oleh Rasulullah SAW karena ketegasan dan keberaniannya membela Islam.'
                        },
                        {
                            q: 'Jasa besar Khalifah Utsman bin Affan RA yang dampaknya kita nikmati hingga hari ini adalah...',
                            options: ['Membukukan dan menyeragamkan mushaf Al-Qur\'an', 'Mendirikan angkatan pos pertama', 'Membangun baitul maal pertama', 'Membuat penanggalan Hijriyah'],
                            answer: 0,
                            explanation: 'Khalifah Utsman menyatukan pembacaan Al-Qur\'an dalam satu mushaf standar yang dikenal sebagai Mushaf Utsmani.'
                        },
                        {
                            q: 'Sahabat yang merupakan sepupu sekaligus menantu Rasulullah SAW dan terkenal sangat cerdas serta dijuluki pintu gerbang ilmu adalah...',
                            options: ['Ali bin Abi Thalib RA', 'Zaid bin Tsabit RA', 'Ibnu Abbas RA', 'Khalid bin Walid RA'],
                            answer: 0,
                            explanation: 'Rasulullah SAW bersabda: "Aku adalah kotanya ilmu dan Ali adalah pintu gerbangnya."'
                        }
                    ]
                },
                {
                    id: 'ski_3',
                    title: 'Kisah Mukjizat Para Nabi',
                    type: 'match',
                    instruction: 'Cocokkan nama Nabi dengan mukjizat utamanya berikut ini:',
                    pairs: [
                        { left: 'Nabi Nuh AS', right: 'Membuat Bahtera Besar penyelamat dari Banjir Bandang' },
                        { left: 'Nabi Sulaiman AS', right: 'Bisa memahami bahasa hewan dan menguasai angin serta jin' },
                        { left: 'Nabi Daud AS', right: 'Dapat melunakkan besi dengan tangan dan bersuara merdu membaca Zabur' },
                        { left: 'Nabi Isa AS', right: 'Mampu menyembuhkan orang buta & kusta atas izin Allah' }
                    ]
                }
            ]
        },
        {
            id: 'akhlak',
            name: 'Pulau Akhlak Mulia & Adab',
            icon: '🌟',
            badge: 'Budi Pekerti',
            themeColor: 'from-rose-600 to-pink-900',
            accentColor: '#F43F5E',
            desc: 'Praktikkan tata krama Islami: birrul walidain, kejujuran, amanah, dan toleransi dalam kehidupan nyata.',
            levels: [
                {
                    id: 'akhlak_1',
                    title: 'Adab Islami Sehari-Hari',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Adab makan dan minum yang diajarkan oleh Rasulullah SAW adalah...',
                            options: ['Membaca bismillah, duduk dengan tenang, dan menggunakan tangan kanan', 'Makan sambil berjalan tergesa-gesa', 'Menggunakan tangan kiri tanpa membaca doa', 'Meniup makanan panas terus menerus'],
                            answer: 0,
                            explanation: 'Rasulullah SAW bersabda kepada Umar bin Abi Salamah: "Wahai anak muda, bacalah bismillah, makanlah dengan tangan kananmu dan makanlah yang terdekat darimu."'
                        },
                        {
                            q: 'Perilaku berbakti kepada kedua orang tua dalam ajaran Islam dinamakan...',
                            options: ['Birrul Walidain', 'Ukhuwah Islamiyah', 'Hubbul Wathan', 'Silaturahmi'],
                            answer: 0,
                            explanation: 'Birrul Walidain adalah kewajiban utama seorang anak untuk menyayangi, mendoakan, dan menghormati ayah bundanya.'
                        },
                        {
                            q: 'Sikap rela menerima dengan ikhlas apa yang telah dianugerahkan Allah SWT serta menjauhkan diri dari sifat serakah dinamakan...',
                            options: ['Qana\'ah', 'Takabur', 'Riya\'', 'Hasad'],
                            answer: 0,
                            explanation: 'Qana\'ah adalah merasa cukup dan bersyukur atas rezeki halal yang diberikan Allah SWT.'
                        },
                        {
                            q: 'Menepati janji dan menyampaikan titipan barang orang lain tanpa menguranginya merupakan wujud sikap terpuji...',
                            options: ['Amanah', 'Khianat', 'Namimah', 'Ghibah'],
                            answer: 0,
                            explanation: 'Amanah artinya dapat dipercaya dan bertanggung jawab menjalankan segala tugas serta menjaga titipan.'
                        },
                        {
                            q: 'Ketika ada tetangga yang berbeda suku atau keyakinan sedang membutuhkan pertolongan, sikap kita yang tepat adalah...',
                            options: ['Menolongnya dengan tulus dan sopan (Toleransi & Tasamuh)', 'Mengacuhkannya karena berbeda keyakinan', 'Mengejek adat istiadatnya', 'Menyuruh orang lain saja'],
                            answer: 0,
                            explanation: 'Islam mengajarkan berbuat baik, bersikap adil, dan tolong-menolong dalam kebaikan kepada sesama manusia.'
                        }
                    ]
                },
                {
                    id: 'akhlak_2',
                    title: 'Studi Kasus Detektif Budi Pekerti',
                    type: 'quiz',
                    questions: [
                        {
                            q: 'Kasus 1: Ahmad menemukan dompet berisi uang di halaman sekolah saat jam istirahat. Sikap paling jujur dan islami yang harus dilakukan Ahmad adalah...',
                            options: ['Menyerahkan dompet tersebut kepada guru piket / kantor TU agar diumumkan ke pemiliknya', 'Mengambil uangnya untuk jajan bersama teman sekelas', 'Menyembunyikannya di dalam tas tanpa bilang siapa-siapa', 'Membuang dompetnya ke tempat sampah'],
                            answer: 0,
                            explanation: 'Menemukan barang milik orang lain (Luqathah) wajib dijaga amanahnya dan diserahkan kepada pihak yang berwenang di sekolah untuk dicari pemiliknya.'
                        },
                        {
                            q: 'Kasus 2: Fatimah melihat temannya sedang diejek di kantin sekolah hingga bersedih. Tindakan terpuji yang sebaiknya Fatimah ambil adalah...',
                            options: ['Membela temannya secara bijak, menenangkan hatinya, dan menasihati teman yang mengejek', 'Ikut menertawakan agar disukai teman-teman populer', 'Memvideokan kejadian dan menyebarkannya di medsos', 'Pura-pura tidak tahu dan pergi begitu saja'],
                            answer: 0,
                            explanation: 'Mencegah perundungan (bullying) dan membela teman yang dizalimi adalah wujud amar ma\'ruf nahi munkar dan akhlak mulia.'
                        },
                        {
                            q: 'Kasus 3: Ridho sedang bermain game seru di ponselnya, lalu tiba-tiba azan Maghrib berkumandang dan ibunya memanggil untuk sholat. Ridho sebaiknya...',
                            options: ['Segera menjeda game, menjawab panggilan ibu dengan santun, mengambil wudhu untuk sholat', 'Marah-marah kepada ibu karena permainannya terganggu', 'Berpura-pura tidur di kamar agar tidak disuruh sholat', 'Melanjutkan main game sampai larut malam baru sholat'],
                            answer: 0,
                            explanation: 'Mendahulukan panggilan sholat dan berbakti kepada orang tua adalah cerminan pribadi muslim yang bertakwa.'
                        }
                    ]
                }
            ]
        }
    ],

    // Cerdas Cermat Timer (Kuis Cepat Acak)
    cerdasCermatBank: [
        {
            category: 'Al-Qur\'an',
            q: 'Al-Qur\'an pertama kali diturunkan di Gua Hira pada malam 17 Ramadhan yang diperingati sebagai...',
            options: ['Nuzulul Qur\'an', 'Isra\' Mi\'raj', 'Tahun Baru Hijriyah', 'Maulid Nabi'],
            answer: 0
        },
        {
            category: 'Aqidah',
            q: 'Malaikat yang bertugas menanyai manusia di dalam alam kubur adalah...',
            options: ['Munkar dan Nakir', 'Malik dan Ridwan', 'Raqib dan Atid', 'Jibril dan Mikail'],
            answer: 0
        },
        {
            category: 'Fiqih',
            q: 'Sholat sunnah yang dikerjakan secara berjamaah khusus hanya pada malam-malam bulan suci Ramadhan adalah...',
            options: ['Sholat Tarawih', 'Sholat Dhuha', 'Sholat Istikharah', 'Sholat Kusuf'],
            answer: 0
        },
        {
            category: 'SKI',
            q: 'Nama ibu kandung Nabi Muhammad SAW adalah...',
            options: ['Siti Aminah', 'Siti Khadijah', 'Siti Halimah', 'Siti Fatimah'],
            answer: 0
        },
        {
            category: 'Akhlak',
            q: 'Sikap menahan diri dari amarah ketika disakiti orang lain serta memaafkan kesalahannya dinamakan...',
            options: ['Sabar & Pemaaf', 'Pemberani', 'Dermawan', 'Cerdas'],
            answer: 0
        },
        {
            category: 'Al-Qur\'an',
            q: 'Surat terpanjang dalam mushaf Al-Qur\'an adalah Surat...',
            options: ['Al-Baqarah (286 Ayat)', 'Ali \'Imran', 'An-Nisa\'', 'Al-Ma\'idah'],
            answer: 0
        },
        {
            category: 'Aqidah',
            q: 'Nabi dan Rasul terakhir penutup para utusan Allah (Khatamun Nabiyyin) adalah...',
            options: ['Nabi Muhammad SAW', 'Nabi Isa AS', 'Nabi Ibrahim AS', 'Nabi Nuh AS'],
            answer: 0
        },
        {
            category: 'Fiqih',
            q: 'Menahan diri dari makan, minum, dan hal-hal yang membatalkan dari terbit fajar shadiq hingga terbenam matahari disebut...',
            options: ['Puasa (Shaum)', 'I\'tikaf', 'Tawaf', 'Wukuf'],
            answer: 0
        },
        {
            category: 'SKI',
            q: 'Kota tujuan hijrah Rasulullah SAW dan kaum muslimin dari Makkah yang kemudian dinamai Madinatul Munawwarah bernama asli...',
            options: ['Yatsrib', 'Thaif', 'Habasyah', 'Kuffah'],
            answer: 0
        },
        {
            category: 'Akhlak',
            q: 'Perkataan salam yang diajarkan dalam Islam saat berjumpa sesama muslim yang mendoakan keselamatan, rahmat, dan berkah adalah...',
            options: ['Assalamu\'alaikum Warahmatullahi Wabarakatuh', 'Selamat Pagi Teman', 'Halo Sahabat', 'Sampai Jumpa'],
            answer: 0
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PAI_DATA;
}
